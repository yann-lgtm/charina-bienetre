import { NextResponse } from "next/server";
import { Resend } from "resend";
import { honeypotDeclenche, ipDuClient, verifierDebit } from "@/lib/anti-spam";
import { MARQUE, ZONE } from "@/lib/marque";
import { SOINS_ACTIFS } from "@/lib/soins";

/* Lazy : instancier Resend au chargement du fichier ferait planter le build
   Vercel, où RESEND_API_KEY n’existe pas encore. Même leçon que sur coeuru,
   où treize routes avaient dû être corrigées pour cette raison. */
function getResend() {
  return new Resend(process.env.RESEND_API_KEY);
}

/**
 * Demande de rendez-vous.
 *
 * Pas de base de données (décision Yann du 2026-09-03) : chaque demande part
 * en e-mail et en notification ntfy. La liste vit donc dans la messagerie.
 * Le jour où le volume le justifie, c’est ici qu’on ajoutera l’écriture en
 * base — le formulaire et les pages ne bougeront pas.
 *
 * ⚠️ L’expéditeur est une adresse coeuru.com : c’est le seul domaine vérifié
 * chez Resend à ce jour. La cliente voit donc « Charina Bien-Être » en nom
 * d’expéditeur, mais une adresse technique coeuru.com. À corriger dès que le
 * domaine de Charina est vérifié chez Resend (voir le rapport de livraison).
 */

const EXPEDITEUR = `${MARQUE.nom} <contact@coeuru.com>`;

/** Notification poussée sur le téléphone. Sans topic configuré, on n’échoue pas. */
async function notifierNtfy(titre: string, corps: string) {
  const topic = process.env.NTFY_TOPIC;
  if (!topic) return;

  const serveur = process.env.NTFY_URL ?? "https://ntfy.sh";

  try {
    await fetch(`${serveur}/${topic}`, {
      method: "POST",
      headers: {
        Title: titre,
        Priority: "high",
        Tags: "massage",
      },
      body: corps,
    });
  } catch (erreur) {
    /* Une notification ratée ne doit jamais faire échouer la demande :
       l’e-mail, lui, est parti. */
    console.error("reservation : notification ntfy en échec", erreur);
  }
}

function texteNettoye(valeur: unknown, maximum: number): string {
  return typeof valeur === "string" ? valeur.trim().slice(0, maximum) : "";
}

export async function POST(requete: Request) {
  let corps: unknown;
  try {
    corps = await requete.json();
  } catch {
    return NextResponse.json({ erreur: "Requête illisible." }, { status: 400 });
  }

  const donnees = (corps ?? {}) as Record<string, unknown>;

  /* Champ piège, invisible pour une humaine : seul un robot le remplit.
     On répond « c’est bon » pour ne pas lui apprendre qu’il a été repéré. */
  if (honeypotDeclenche(donnees.site)) {
    return NextResponse.json({ ok: true });
  }

  const limite = verifierDebit(ipDuClient(requete), "reservation");
  if (!limite.ok) {
    return NextResponse.json(
      {
        erreur:
          "Nous avons déjà reçu plusieurs demandes depuis cet appareil. Appelez Charina directement, c’est plus rapide.",
      },
      { status: 429, headers: { "Retry-After": String(limite.reessayerDans ?? 3600) } },
    );
  }

  const nom = texteNettoye(donnees.nom, 80);
  const telephone = texteNettoye(donnees.telephone, 30);
  const email = texteNettoye(donnees.email, 160).toLowerCase();
  const creneaux = texteNettoye(donnees.creneaux, 400);
  const message = texteNettoye(donnees.message, 2000);
  const soinDemande = texteNettoye(donnees.soin, 120);

  if (nom.length < 2) {
    return NextResponse.json({ erreur: "Merci d’indiquer votre nom." }, { status: 400 });
  }
  /* Volontairement permissif : on accepte les espaces, points et indicatifs
     étrangers. Le but est d’écarter les saisies vides, pas de faire la leçon. */
  if (telephone.replace(/[^\d]/g, "").length < 9) {
    return NextResponse.json(
      { erreur: "Ce numéro de téléphone ne semble pas complet." },
      { status: 400 },
    );
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    return NextResponse.json(
      { erreur: "Cette adresse e-mail ne semble pas valide." },
      { status: 400 },
    );
  }
  if (creneaux.length < 3) {
    return NextResponse.json(
      { erreur: "Merci d’indiquer vos disponibilités, même approximatives." },
      { status: 400 },
    );
  }

  /* Le soin doit venir de la liste : un intitulé libre finirait tel quel dans
     l’e-mail de Charina, et c’est une porte ouverte à l’injection de contenu. */
  const soin = SOINS_ACTIFS.some((connu) => connu.nom === soinDemande)
    ? soinDemande
    : "À définir avec Charina";

  if (!process.env.RESEND_API_KEY) {
    console.error("reservation : RESEND_API_KEY absente");
    return NextResponse.json(
      {
        erreur: `L’envoi est momentanément indisponible. Appelez Charina au ${MARQUE.telephone}.`,
      },
      { status: 503 },
    );
  }

  const destinataire = process.env.EMAIL_NOTIFICATION ?? MARQUE.emailContact;
  const resend = getResend();

  const { error } = await resend.emails.send({
    from: EXPEDITEUR,
    to: destinataire,
    replyTo: email,
    subject: `Demande de rendez-vous — ${nom}`,
    text: [
      `${nom} demande un rendez-vous.`,
      "",
      `Soin : ${soin}`,
      `Téléphone : ${telephone}`,
      `E-mail : ${email}`,
      `Disponibilités : ${creneaux}`,
      "",
      message ? `Message :\n${message}` : "Aucun message complémentaire.",
      "",
      "Réponds directement à ce message pour lui écrire.",
    ].join("\n"),
  });

  if (error) {
    console.error("reservation : envoi Resend en échec", error);
    return NextResponse.json(
      {
        erreur: `La demande n’a pas pu être envoyée. Appelez Charina au ${MARQUE.telephone}.`,
      },
      { status: 502 },
    );
  }

  /* L’accusé de réception à la cliente et la notification poussée ne sont pas
     bloquants : la demande est déjà arrivée chez Charina. On les tente, et un
     échec est journalisé sans jamais faire croire à la cliente que sa demande
     s’est perdue. */
  const accuse = resend.emails
    .send({
      from: EXPEDITEUR,
      to: email,
      replyTo: destinataire,
      subject: "Votre demande de rendez-vous est bien arrivée",
      text: [
        `Bonjour ${nom.split(" ")[0]},`,
        "",
        "Votre demande de rendez-vous est bien arrivée. Charina vous rappelle en général sous 24 à 48 h pour caler le créneau et vous donner l’adresse exacte.",
        "",
        `Soin souhaité : ${soin}`,
        `Vos disponibilités : ${creneaux}`,
        "",
        `Si c’est urgent, le téléphone reste le plus rapide : ${MARQUE.telephone}.`,
        "",
        "À très bientôt,",
        `${MARQUE.praticienne} — ${MARQUE.nom}`,
        ZONE.resume,
      ].join("\n"),
    })
    .catch((erreur) => {
      console.error("reservation : accusé de réception en échec", erreur);
    });

  const notification = notifierNtfy(
    `Rendez-vous — ${nom}`,
    `${soin}\n${telephone}\n${creneaux}`,
  );

  await Promise.allSettled([accuse, notification]);

  return NextResponse.json({ ok: true });
}
