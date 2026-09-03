"use client";

import { useState } from "react";
import { MARQUE } from "@/lib/marque";
import { formaterDuree, formaterPrix, SOINS_ACTIFS } from "@/lib/soins";

type Etat = "repos" | "envoi" | "envoye" | "erreur";

const CHAMP =
  "mt-3 w-full border-b border-encre/20 bg-transparent pb-3 text-encre outline-none transition-colors duration-500 placeholder:text-encre-discret/70 focus:border-terracotta";

/**
 * Demande de rendez-vous. Ce n’est pas une réservation ferme : rien n’est
 * débité, rien n’est bloqué dans un agenda. Charina rappelle. Le formulaire
 * le dit explicitement — c’est ce qui évite les malentendus au téléphone.
 */
export function FormulaireReservation({ soinPreselectionne }: { soinPreselectionne?: string }) {
  const [etat, setEtat] = useState<Etat>("repos");
  const [message, setMessage] = useState("");

  async function envoyer(evenement: React.FormEvent<HTMLFormElement>) {
    evenement.preventDefault();
    const donnees = new FormData(evenement.currentTarget);
    setEtat("envoi");

    try {
      const reponse = await fetch("/api/reservation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nom: donnees.get("nom"),
          telephone: donnees.get("telephone"),
          email: donnees.get("email"),
          soin: donnees.get("soin"),
          creneaux: donnees.get("creneaux"),
          message: donnees.get("message"),
          site: donnees.get("site"),
        }),
      });
      const resultat = await reponse.json();

      if (!reponse.ok) {
        setMessage(resultat.erreur ?? "Quelque chose s’est mal passé.");
        setEtat("erreur");
        return;
      }
      setEtat("envoye");
    } catch {
      setMessage("La connexion a échoué. Vérifiez votre réseau et réessayez.");
      setEtat("erreur");
    }
  }

  if (etat === "envoye") {
    return (
      <div
        role="status"
        className="border border-terracotta/40 bg-creme-chaud px-8 py-12 text-center"
      >
        <p className="font-titre text-[clamp(1.5rem,3vw,2.1rem)] font-light text-encre">
          C’est envoyé. Charina vous rappelle.
        </p>
        <p className="mx-auto mt-6 max-w-md leading-relaxed text-encre-doux">
          Elle vous répond en général sous 24 à 48 h, pour caler le créneau et vous donner
          l’adresse exacte. Si c’est urgent, le téléphone reste le plus rapide.
        </p>
        <a
          href={`tel:${MARQUE.telephoneLien}`}
          className="capitales mt-8 inline-block border border-terracotta px-8 py-3 text-terracotta transition-colors duration-500 hover:bg-terracotta hover:text-creme"
        >
          {MARQUE.telephone}
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={envoyer} noValidate={false}>
      {/* Champ piège : invisible et hors du parcours au clavier. */}
      <div className="absolute left-[-9999px]" aria-hidden>
        <label htmlFor="site">Ne remplissez pas ce champ</label>
        <input id="site" name="site" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-8 sm:grid-cols-2">
        <div>
          <label htmlFor="nom" className="capitales text-encre-discret">
            Prénom et nom
          </label>
          <input
            id="nom"
            name="nom"
            type="text"
            required
            autoComplete="name"
            className={CHAMP}
            placeholder="Camille Martin"
          />
        </div>

        <div>
          <label htmlFor="telephone" className="capitales text-encre-discret">
            Téléphone
          </label>
          <input
            id="telephone"
            name="telephone"
            type="tel"
            required
            autoComplete="tel"
            className={CHAMP}
            placeholder="06 12 34 56 78"
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="email" className="capitales text-encre-discret">
            E-mail
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={CHAMP}
            placeholder="camille@exemple.com"
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="soin" className="capitales text-encre-discret">
            Le soin qui vous intéresse
          </label>
          <select
            id="soin"
            name="soin"
            defaultValue={soinPreselectionne ?? ""}
            className={`${CHAMP} appearance-none`}
          >
            <option value="">Je ne sais pas encore — à voir avec Charina</option>
            {SOINS_ACTIFS.map((soin) => (
              <option key={soin.slug} value={soin.nom}>
                {soin.nom} — {formaterDuree(soin.dureeMinutes)},{" "}
                {formaterPrix(soin.prixEuros)}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="creneaux" className="capitales text-encre-discret">
            Vos disponibilités
          </label>
          <input
            id="creneaux"
            name="creneaux"
            type="text"
            required
            className={CHAMP}
            placeholder="Plutôt en semaine, en fin de journée"
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="message" className="capitales text-encre-discret">
            Autre chose à signaler ? (facultatif)
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            className={`${CHAMP} resize-none`}
            placeholder="Une zone douloureuse, une grossesse, une opération récente…"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={etat === "envoi"}
        className="group relative mt-12 inline-flex w-full items-center justify-center gap-3 overflow-hidden bg-terracotta px-10 py-5 text-creme transition-opacity duration-500 disabled:opacity-60 sm:w-auto"
      >
        <span
          aria-hidden
          className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/35 to-transparent transition-transform duration-[900ms] ease-out group-hover:translate-x-full"
        />
        <span className="capitales relative font-medium">
          {etat === "envoi" ? "Un instant…" : "Envoyer ma demande"}
        </span>
      </button>

      {etat === "erreur" && (
        <p role="alert" className="mt-6 text-sm text-terracotta">
          {message}
        </p>
      )}

      <p className="mt-8 text-sm leading-relaxed text-encre-discret">
        Cette demande n’est pas une réservation ferme : rien n’est débité et aucun créneau
        n’est bloqué tant que Charina ne vous a pas répondu. Vos coordonnées lui servent
        uniquement à vous rappeler.
      </p>
    </form>
  );
}
