import type { Metadata } from "next";
import { PageTexte, type BlocTexte } from "@/components/page-texte";
import { MARQUE, STATUT_JURIDIQUE, ZONE } from "@/lib/marque";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: `Mentions légales du site ${MARQUE.nom}, ${ZONE.villePrincipale}.`,
  alternates: { canonical: "/mentions-legales" },
  robots: { index: false, follow: true },
};

/* Tant que STATUT_JURIDIQUE.renseigne vaut false, on affiche un encart
   d’attente plutôt que d’inventer une dénomination ou un SIRET. Ces mentions
   sont obligatoires : le site ne doit pas rester en ligne durablement dans
   cet état. Voir la checklist de mise en service dans le rapport. */
const editeur: BlocTexte = STATUT_JURIDIQUE.renseigne
  ? {
      titre: "Éditeur du site",
      paragraphes: [
        `${STATUT_JURIDIQUE.denomination} — ${STATUT_JURIDIQUE.formeJuridique}`,
        `SIRET : ${STATUT_JURIDIQUE.siret}`,
        `Adresse : ${STATUT_JURIDIQUE.adresse}`,
        `Téléphone : ${MARQUE.telephone} — E-mail : ${MARQUE.emailContact}`,
        `Directrice de la publication : ${MARQUE.praticienne}`,
      ],
    }
  : {
      titre: "Éditeur du site",
      enAttente: true,
      paragraphes: [
        "[À COMPLÉTER] Les informations légales de l’éditrice (dénomination exacte, forme juridique, numéro SIRET et adresse du lieu de pratique) doivent être renseignées avant l’ouverture publique du site. Elles sont obligatoires pour un site professionnel.",
        `En attendant, ${MARQUE.praticienne} est joignable au ${MARQUE.telephone} et à l’adresse ${MARQUE.emailContact}.`,
      ],
    };

const BLOCS: BlocTexte[] = [
  editeur,
  {
    titre: "Activité",
    paragraphes: [
      `${MARQUE.praticienne} est praticienne en soins corporels de bien-être. Les massages proposés sur ce site sont des soins de détente et de confort. Ils ne constituent en aucun cas un acte médical ni paramédical, ne remplacent ni un diagnostic, ni un traitement, ni le travail d’un masseur-kinésithérapeute, et ne prétendent à aucune vertu thérapeutique.`,
    ],
  },
  {
    titre: "Hébergement",
    paragraphes: [
      "Le site est hébergé par Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis — vercel.com.",
    ],
  },
  {
    titre: "Propriété intellectuelle",
    paragraphes: [
      "L’ensemble des textes et des photographies présents sur ce site est protégé par le droit d’auteur. Toute reproduction, même partielle, est soumise à autorisation préalable.",
      "Conception et développement du site : Cœuru Atelier Web — web.coeuru.com.",
    ],
  },
  {
    titre: "Données personnelles",
    paragraphes: [
      "Les informations transmises par le formulaire de demande de rendez-vous servent uniquement à vous recontacter. Le détail du traitement, sa durée de conservation et vos droits sont décrits dans la politique de confidentialité.",
    ],
  },
];

export default function PageMentionsLegales() {
  return (
    <PageTexte
      surtitre="Informations légales"
      titre="Mentions légales"
      blocs={BLOCS}
    />
  );
}
