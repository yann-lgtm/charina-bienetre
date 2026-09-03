import type { Metadata } from "next";
import { AppelReservation } from "@/components/appel-reservation";
import { PhotoReservee } from "@/components/photo-reservee";
import { Reveler } from "@/components/reveler";
import { TitreSection } from "@/components/titre-section";
import { BIO } from "@/lib/contenu";
import { DISTINCTION, MARQUE, ZONE } from "@/lib/marque";
import { DonneesStructurees, filAriane } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Praticienne en massage — Ruoms, Vallon-Pont-d’Arc",
  description: `${MARQUE.praticienne}, ${DISTINCTION.court.toLowerCase()} : origines philippines, Hilot traditionnel, huit techniques. Elle reçoit à ${ZONE.villePrincipale}, près de Ruoms.`,
  alternates: { canonical: "/a-propos" },
};

export default function PageAPropos() {
  return (
    <>
      <DonneesStructurees
        donnees={filAriane([
          { nom: "Accueil", url: "/" },
          { nom: "Charina", url: "/a-propos" },
        ])}
      />

      <section className="relative overflow-hidden px-6 pb-12 pt-16 sm:px-10 lg:px-16 lg:pt-24">
        <div
          className="halo-terre pointer-events-none absolute right-[-6%] top-[6%] h-[40vh] w-[55vw] max-w-2xl"
          aria-hidden
        />

        <div className="relative grid items-end gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          <div>
            <TitreSection
              niveau="h1"
              surtitre="La praticienne"
              titre={`${MARQUE.praticienne}, praticienne en soins corporels.`}
            />
            <Reveler delai={0.1}>
              <p className="mt-10 max-w-xl text-pretty text-lg leading-relaxed text-encre">
                {BIO.chapeau}
              </p>
            </Reveler>
          </div>

          <Reveler delai={0.15}>
            <PhotoReservee
              ratio="4 / 5"
              fichierAttendu="charina-portrait-exterieur.webp — portrait vertical, lumière naturelle"
            />
          </Reveler>
        </div>
      </section>

      <section className="px-6 py-16 sm:px-10 lg:px-16">
        <div className="max-w-2xl">
          {BIO.sections.map((bloc, indexBloc) => (
            <Reveler key={bloc.titre} delai={indexBloc * 0.05} className="mt-16 first:mt-0">
              <h2 className="font-titre text-[clamp(1.6rem,3vw,2.2rem)] font-light leading-tight text-encre">
                {bloc.titre}
              </h2>
              <span className="filet-terre mt-6 w-28" aria-hidden />
              {bloc.paragraphes.map((paragraphe, index) => (
                <p key={index} className="mt-6 leading-[1.75] text-encre-doux">
                  {paragraphe}
                </p>
              ))}
            </Reveler>
          ))}
        </div>
      </section>

      <section className="bg-creme-chaud px-6 py-20 sm:px-10 lg:px-16">
        <Reveler className="mx-auto max-w-3xl text-center">
          <p className="capitales text-terracotta">Distinction</p>
          <p className="mt-8 text-balance font-titre text-[clamp(1.6rem,3.4vw,2.6rem)] font-light leading-[1.2] text-encre">
            {DISTINCTION.long}
          </p>
          <p className="mx-auto mt-8 max-w-xl leading-relaxed text-encre-doux">
            Une reconnaissance entre gens du métier, pour une façon de travailler qui ne
            ressemble pas à celle des autres. Elle n’en parle pratiquement jamais : ce qui
            l’intéresse reste ce qui se passe sur la table.
          </p>
        </Reveler>
      </section>

      <AppelReservation
        titre="Venir la voir"
        texte={`Elle reçoit à ${ZONE.villePrincipale}, et travaille pour toute la région de ${ZONE.resume}.`}
      />
    </>
  );
}
