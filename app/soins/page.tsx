import type { Metadata } from "next";
import { CarteSoin } from "@/components/carte-soin";
import { AppelReservation } from "@/components/appel-reservation";
import { Reveler } from "@/components/reveler";
import { TitreSection } from "@/components/titre-section";
import { PRECAUTIONS } from "@/lib/contenu";
import { ZONE } from "@/lib/marque";
import { SOINS_ACTIFS } from "@/lib/soins";
import { DonneesStructurees, filAriane } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Les cinq massages — Ruoms, Vallon-Pont-d’Arc",
  description: `Cinq massages d’une heure à ${ZONE.villePrincipale}, de 70 à 85 € : signature, sportif et ventouses, intuitif, relaxant, drainant. ${ZONE.resume}.`,
  alternates: { canonical: "/soins" },
};

export default function PageSoins() {
  return (
    <>
      <DonneesStructurees
        donnees={filAriane([
          { nom: "Accueil", url: "/" },
          { nom: "Les soins", url: "/soins" },
        ])}
      />

      <section className="px-6 pb-8 pt-16 sm:px-10 lg:px-16 lg:pt-24">
        <TitreSection
          niveau="h1"
          surtitre="Les soins"
          titre="Cinq soins d’une heure, et de quoi choisir sans se tromper."
        />

        <Reveler delai={0.1}>
          <p className="mt-10 max-w-2xl text-pretty leading-relaxed text-encre-doux sm:text-lg">
            Tous durent une heure, tous se font sur table avec de l’huile chaude. Ce qui
            change, c’est l’intention : réveiller ou apaiser, aller au fond ou envelopper,
            cibler une zone ou parcourir le corps entier. Si vous hésitez, prenez la
            Signature — c’est la plus représentative de son travail.
          </p>
        </Reveler>
      </section>

      <section className="px-6 pb-8 sm:px-10 lg:px-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SOINS_ACTIFS.map((soin, index) => (
            <CarteSoin key={soin.slug} soin={soin} delai={index * 0.06} />
          ))}
        </div>
      </section>

      <section className="px-6 py-20 sm:px-10 lg:px-16">
        <Reveler className="max-w-3xl border-l-2 border-terracotta/40 pl-8">
          <h2 className="font-titre text-2xl font-light text-encre">
            Avant de réserver, quelques précautions
          </h2>
          <p className="mt-5 leading-relaxed text-encre-doux">{PRECAUTIONS.intro}</p>
          <ul className="mt-6 space-y-3">
            {PRECAUTIONS.points.map((point) => (
              <li key={point} className="flex gap-4 leading-relaxed text-encre-doux">
                <span className="mt-[0.6em] h-px w-5 shrink-0 bg-terracotta/60" aria-hidden />
                <span>{point}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 leading-relaxed text-encre-doux">{PRECAUTIONS.conclusion}</p>
        </Reveler>
      </section>

      <AppelReservation />
    </>
  );
}
