import Link from "next/link";
import { HeroAccueil } from "@/components/hero-accueil";
import { Manifeste } from "@/components/manifeste";
import { CarteSoin } from "@/components/carte-soin";
import { AppelReservation } from "@/components/appel-reservation";
import { ZoneDesservie } from "@/components/zone-desservie";
import { Reveler } from "@/components/reveler";
import { TitreSection } from "@/components/titre-section";
import { PhotoReservee } from "@/components/photo-reservee";
import { PILIERS } from "@/lib/contenu";
import { DISTINCTION, MARQUE } from "@/lib/marque";
import { SOINS_ACTIFS } from "@/lib/soins";
import { DonneesStructurees, ficheEtablissement } from "@/lib/seo";

export default function Accueil() {
  return (
    <>
      <DonneesStructurees donnees={ficheEtablissement()} />

      <HeroAccueil />

      <section className="px-6 py-24 sm:px-10 lg:px-16">
        <TitreSection
          surtitre="Sa façon de faire"
          titre="Ce qui change, par rapport au massage que vous avez déjà essayé."
        />

        <div className="mt-14 grid gap-10 md:grid-cols-3">
          {PILIERS.map((pilier, index) => (
            <Reveler
              key={pilier.titre}
              delai={index * 0.08}
              className="border-t border-sable-fonce/60 pt-7"
            >
              <h3 className="font-titre text-xl font-light leading-snug text-encre">
                {pilier.titre}
              </h3>
              <p className="mt-4 leading-relaxed text-encre-doux">{pilier.texte}</p>
            </Reveler>
          ))}
        </div>
      </section>

      <Manifeste />

      <section className="px-6 py-24 sm:px-10 lg:px-16">
        <TitreSection
          surtitre="Les soins"
          titre="Cinq soins d’une heure. Un seul but : que vous repartiez dénouée."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SOINS_ACTIFS.map((soin, index) => (
            <CarteSoin key={soin.slug} soin={soin} delai={index * 0.06} />
          ))}
        </div>

        <Reveler className="mt-12">
          <Link
            href="/soins"
            className="capitales inline-flex items-center gap-3 text-terracotta transition-opacity duration-500 hover:opacity-70"
          >
            Comparer les cinq soins
            <span aria-hidden>→</span>
          </Link>
        </Reveler>
      </section>

      <section className="bg-creme-chaud px-6 py-24 sm:px-10 lg:px-16">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveler>
            <PhotoReservee
              ratio="1 / 1"
              fichierAttendu="charina-mains-massage.webp — gros plan des mains au travail, carré"
            />
          </Reveler>

          <Reveler delai={0.1}>
            <p className="capitales text-terracotta">La praticienne</p>
            <h2 className="mt-6 text-balance font-titre text-[clamp(1.9rem,4vw,3rem)] font-light leading-[1.08] tracking-[-0.03em] text-encre">
              {MARQUE.praticienne}, née aux Philippines, formée à huit techniques.
            </h2>
            <p className="mt-7 leading-relaxed text-encre-doux">
              Le Hilot appris à la maison, puis le suédois, le californien, le lomi-lomi,
              les étirements thaï, le travail profond, les ventouses, le drainage. Elle a
              cessé de les pratiquer séparément le jour où elle a compris que ce qui
              l’intéressait, c’était de les faire tenir ensemble.
            </p>
            <p className="mt-5 leading-relaxed text-encre-doux">
              {DISTINCTION.long}. Elle n’en parle presque jamais — il faut souvent le lui
              arracher. Elle poursuit aujourd’hui une formation en Médecine Traditionnelle
              Chinoise.
            </p>
            <Link
              href="/a-propos"
              className="capitales mt-9 inline-flex items-center gap-3 text-terracotta transition-opacity duration-500 hover:opacity-70"
            >
              Son parcours
              <span aria-hidden>→</span>
            </Link>
          </Reveler>
        </div>
      </section>

      <ZoneDesservie />

      <AppelReservation />
    </>
  );
}
