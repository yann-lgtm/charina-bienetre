import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AppelReservation } from "@/components/appel-reservation";
import { CarteSoin } from "@/components/carte-soin";
import { PhotoReservee } from "@/components/photo-reservee";
import { Reveler } from "@/components/reveler";
import { PRECAUTIONS } from "@/lib/contenu";
import { ZONE } from "@/lib/marque";
import { formaterDuree, formaterPrix, SOINS_ACTIFS, trouverSoin } from "@/lib/soins";
import { DonneesStructurees, ficheSoin, filAriane } from "@/lib/seo";

/* Next 15 : `params` est une promesse, dans generateMetadata comme dans la page. */
type Proprietes = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return SOINS_ACTIFS.map((soin) => ({ slug: soin.slug }));
}

export async function generateMetadata({ params }: Proprietes): Promise<Metadata> {
  const { slug } = await params;
  const soin = trouverSoin(slug);
  if (!soin) return {};

  return {
    title: soin.metaTitre,
    description: soin.metaDescription,
    alternates: { canonical: `/soins/${soin.slug}` },
  };
}

export default async function PageSoin({ params }: Proprietes) {
  const { slug } = await params;
  const soin = trouverSoin(slug);
  if (!soin) notFound();

  const autresSoins = SOINS_ACTIFS.filter((autre) => autre.slug !== soin.slug).slice(0, 3);

  return (
    <>
      <DonneesStructurees donnees={ficheSoin(soin)} />
      <DonneesStructurees
        donnees={filAriane([
          { nom: "Accueil", url: "/" },
          { nom: "Les soins", url: "/soins" },
          { nom: soin.nom, url: `/soins/${soin.slug}` },
        ])}
      />

      <article>
        <section className="relative overflow-hidden px-6 pb-16 pt-14 sm:px-10 lg:px-16 lg:pt-20">
          <div
            className="halo-terre pointer-events-none absolute left-[-8%] top-0 h-[38vh] w-[60vw] max-w-2xl"
            aria-hidden
          />

          <nav aria-label="Fil d’Ariane" className="relative">
            <Link
              href="/soins"
              className="capitales text-encre-discret transition-colors duration-500 hover:text-terracotta"
            >
              ← Tous les soins
            </Link>
          </nav>

          <div className="relative mt-10 grid items-start gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
            <div>
              <p className="capitales text-terracotta">{soin.accroche}</p>
              <h1 className="mt-6 text-balance font-titre text-[clamp(2.2rem,5.2vw,3.8rem)] font-light leading-[1.04] tracking-[-0.035em] text-encre">
                {soin.nom}
              </h1>
              <span className="filet-terre mt-8 w-40" data-visible="true" aria-hidden />

              <p className="mt-8 max-w-xl text-pretty leading-relaxed text-encre-doux sm:text-lg">
                {soin.resume}
              </p>

              <dl className="mt-10 flex flex-wrap gap-x-14 gap-y-6 border-t border-sable-fonce/60 pt-7">
                <div>
                  <dt className="capitales text-encre-discret">Durée</dt>
                  <dd className="mt-2 font-titre text-2xl font-light text-encre">
                    {formaterDuree(soin.dureeMinutes)}
                  </dd>
                </div>
                <div>
                  <dt className="capitales text-encre-discret">Tarif</dt>
                  <dd className="mt-2 font-titre text-2xl font-light text-encre">
                    {formaterPrix(soin.prixEuros)}
                  </dd>
                </div>
                <div>
                  <dt className="capitales text-encre-discret">Où</dt>
                  <dd className="mt-2 font-titre text-2xl font-light text-encre">
                    {ZONE.villePrincipale}
                  </dd>
                </div>
              </dl>

              <Link
                href="/reservation"
                className="group relative mt-10 inline-flex items-center justify-center gap-3 overflow-hidden bg-terracotta px-9 py-4 text-creme"
              >
                <span
                  aria-hidden
                  className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/35 to-transparent transition-transform duration-[900ms] ease-out group-hover:translate-x-full"
                />
                <span className="capitales relative font-medium">Réserver ce soin</span>
              </Link>
            </div>

            <PhotoReservee
              ratio="4 / 5"
              fichierAttendu={`soin-${soin.slug}.webp — vertical, ambiance de la séance`}
            />
          </div>
        </section>

        <section className="px-6 py-16 sm:px-10 lg:px-16">
          <div className="grid gap-16 lg:grid-cols-[1.15fr_0.85fr] lg:gap-24">
            <div className="max-w-2xl">
              {soin.paragraphes.map((paragraphe, index) => (
                <Reveler key={index} delai={index * 0.05}>
                  <p
                    className={`leading-[1.75] text-encre-doux ${
                      index === 0 ? "text-lg text-encre" : "mt-6"
                    }`}
                  >
                    {paragraphe}
                  </p>
                </Reveler>
              ))}

              <Reveler className="mt-16">
                <h2 className="font-titre text-2xl font-light text-encre">
                  Comment se passe la séance
                </h2>
                <ol className="mt-8 space-y-8">
                  {soin.deroule.map((etape, index) => (
                    <li key={etape.titre} className="flex gap-6">
                      <span
                        className="font-titre text-2xl font-light text-terracotta/60"
                        aria-hidden
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <h3 className="font-titre text-xl font-light text-encre">
                          {etape.titre}
                        </h3>
                        <p className="mt-3 leading-relaxed text-encre-doux">{etape.texte}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </Reveler>
            </div>

            <aside className="lg:sticky lg:top-28 lg:self-start">
              <Reveler className="border border-sable-fonce/60 bg-creme-chaud p-8">
                <h2 className="capitales text-terracotta">Ce soin est pour vous si</h2>
                <ul className="mt-6 space-y-4">
                  {soin.pourQui.map((cas) => (
                    <li key={cas} className="flex gap-4 leading-relaxed text-encre-doux">
                      <span
                        className="mt-[0.6em] h-px w-5 shrink-0 bg-terracotta/60"
                        aria-hidden
                      />
                      <span>{cas}</span>
                    </li>
                  ))}
                </ul>
              </Reveler>

              <Reveler delai={0.08} className="mt-8 border border-sable-fonce/60 p-8">
                <h2 className="capitales text-terracotta">Ce que ça apporte</h2>
                <ul className="mt-6 space-y-4">
                  {soin.bienfaits.map((bienfait) => (
                    <li key={bienfait} className="flex gap-4 leading-relaxed text-encre-doux">
                      <span
                        className="mt-[0.6em] h-px w-5 shrink-0 bg-terracotta/60"
                        aria-hidden
                      />
                      <span>{bienfait}</span>
                    </li>
                  ))}
                </ul>
              </Reveler>

              <Reveler delai={0.16} className="mt-8 border-l-2 border-terracotta/40 pl-7">
                <h2 className="font-titre text-xl font-light text-encre">Précautions</h2>
                <p className="mt-4 text-sm leading-relaxed text-encre-doux">
                  {PRECAUTIONS.intro}
                </p>
                <ul className="mt-4 space-y-2">
                  {PRECAUTIONS.points.map((point) => (
                    <li key={point} className="text-sm leading-relaxed text-encre-discret">
                      {point}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-sm leading-relaxed text-encre-doux">
                  {PRECAUTIONS.conclusion}
                </p>
              </Reveler>
            </aside>
          </div>
        </section>

        <section className="px-6 py-16 sm:px-10 lg:px-16">
          <h2 className="font-titre text-2xl font-light text-encre">Les autres soins</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {autresSoins.map((autre, index) => (
              <CarteSoin key={autre.slug} soin={autre} delai={index * 0.06} />
            ))}
          </div>
        </section>
      </article>

      <AppelReservation
        titre={`Réserver un ${soin.nom}`}
        texte={`${formaterDuree(soin.dureeMinutes)}, ${formaterPrix(soin.prixEuros)}, à ${ZONE.villePrincipale}. Envoyez vos disponibilités, Charina vous rappelle pour caler le créneau.`}
      />
    </>
  );
}
