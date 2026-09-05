import type { Metadata } from "next";
import { FormulaireReservation } from "@/components/formulaire-reservation";
import { Reveler } from "@/components/reveler";
import { TitreSection } from "@/components/titre-section";
import { ETAPES_RESERVATION } from "@/lib/contenu";
import { MARQUE, ZONE } from "@/lib/marque";
import { trouverSoin } from "@/lib/soins";
import { DonneesStructurees, ficheEtablissement, filAriane } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Réserver un massage à Ruoms, Vallon-Pont-d’Arc",
  description: `Demandez un rendez-vous avec ${MARQUE.praticienne} à ${ZONE.villePrincipale}. Séances d’une heure, de 70 à 85 €. Réponse sous 24 à 48 h.`,
  alternates: { canonical: "/reservation" },
};

/* Next 15 : `searchParams` est une promesse. Le lien « Réserver ce soin »
   d’une page détail pourra passer ?soin=slug pour présélectionner la liste. */
type Proprietes = { searchParams: Promise<{ soin?: string }> };

export default async function PageReservation({ searchParams }: Proprietes) {
  const { soin: slugDemande } = await searchParams;
  const soinPreselectionne = slugDemande ? trouverSoin(slugDemande)?.nom : undefined;

  return (
    <>
      <DonneesStructurees donnees={ficheEtablissement()} />
      <DonneesStructurees
        donnees={filAriane([
          { nom: "Accueil", url: "/" },
          { nom: "Réserver", url: "/reservation" },
        ])}
      />

      <section className="relative overflow-hidden px-6 pb-10 pt-16 sm:px-10 lg:px-16 lg:pt-24">
        <div
          className="halo-terre pointer-events-none absolute left-[-8%] top-[4%] h-[36vh] w-[55vw] max-w-2xl"
          aria-hidden
        />
        <div className="relative">
          <TitreSection
            niveau="h1"
            surtitre="Prendre rendez-vous"
            titre="Dites-nous quand vous êtes libre, Charina vous rappelle."
          />
          <Reveler delai={0.1}>
            <p className="mt-10 max-w-2xl text-pretty leading-relaxed text-encre-doux sm:text-lg">
              Il n’y a pas de réservation en ligne : elle préfère vous parler avant de fixer
              un créneau, pour être sûre de vous proposer le bon soin. Remplissez le
              formulaire, ou appelez-la directement au{" "}
              <a
                href={`tel:${MARQUE.telephoneLien}`}
                className="text-terracotta underline decoration-terracotta/40 underline-offset-4 transition-colors duration-500 hover:decoration-terracotta"
              >
                {MARQUE.telephone}
              </a>{" "}
              — elle est aussi sur WhatsApp au même numéro.
            </p>
          </Reveler>
        </div>
      </section>

      <section className="px-6 py-14 sm:px-10 lg:px-16">
        <div className="grid gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-24">
          <Reveler className="max-w-2xl">
            <FormulaireReservation soinPreselectionne={soinPreselectionne} />
          </Reveler>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <Reveler delai={0.1} className="border border-sable-fonce/60 bg-creme-chaud p-8">
              <h2 className="capitales text-terracotta">Ce qui se passe ensuite</h2>
              <ol className="mt-8 space-y-8">
                {ETAPES_RESERVATION.map((etape, index) => (
                  <li key={etape.titre} className="flex gap-6">
                    <span
                      className="font-titre text-2xl font-light text-terracotta/60"
                      aria-hidden
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="font-titre text-lg font-light text-encre">
                        {etape.titre}
                      </h3>
                      <p className="mt-2 leading-relaxed text-encre-doux">{etape.texte}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </Reveler>

            <Reveler delai={0.18} className="mt-8 border-l-2 border-terracotta/40 pl-7">
              <h2 className="font-titre text-xl font-light text-encre">Où elle reçoit</h2>
              <p className="mt-4 leading-relaxed text-encre-doux">
                À {ZONE.villePrincipale}, et pour {ZONE.alentours}. L’adresse
                exacte vous est communiquée à la confirmation du rendez-vous.
              </p>
              <p className="mt-5 leading-relaxed text-encre-doux">
                Le règlement se fait sur place, à l’issue du soin.
              </p>
            </Reveler>
          </aside>
        </div>
      </section>
    </>
  );
}
