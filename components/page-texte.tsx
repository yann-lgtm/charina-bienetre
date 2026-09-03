import { Reveler } from "@/components/reveler";
import { TitreSection } from "@/components/titre-section";

export type BlocTexte = {
  titre: string;
  paragraphes?: string[];
  points?: string[];
  /** Marque un bloc qui attend une information de Charina. */
  enAttente?: boolean;
};

/** Gabarit des pages légales : lisible, sans décor superflu. */
export function PageTexte({
  surtitre,
  titre,
  chapeau,
  blocs,
}: {
  surtitre: string;
  titre: string;
  chapeau?: string;
  blocs: BlocTexte[];
}) {
  return (
    <>
      <section className="px-6 pb-8 pt-16 sm:px-10 lg:px-16 lg:pt-24">
        <TitreSection niveau="h1" surtitre={surtitre} titre={titre} />
        {chapeau && (
          <Reveler delai={0.1}>
            <p className="mt-10 max-w-2xl leading-relaxed text-encre-doux">{chapeau}</p>
          </Reveler>
        )}
      </section>

      <section className="px-6 pb-16 sm:px-10 lg:px-16">
        <div className="max-w-2xl">
          {blocs.map((bloc, index) => (
            <Reveler key={bloc.titre} delai={index * 0.04} className="mt-12 first:mt-0">
              <h2 className="font-titre text-xl font-light text-encre">{bloc.titre}</h2>

              {bloc.paragraphes?.map((paragraphe, indexParagraphe) => (
                <p
                  key={indexParagraphe}
                  className={`mt-4 leading-relaxed ${
                    bloc.enAttente
                      ? "border-l-2 border-terracotta/50 bg-creme-chaud py-4 pl-5 text-encre-doux"
                      : "text-encre-doux"
                  }`}
                >
                  {paragraphe}
                </p>
              ))}

              {bloc.points && (
                <ul className="mt-4 space-y-3">
                  {bloc.points.map((point) => (
                    <li key={point} className="flex gap-4 leading-relaxed text-encre-doux">
                      <span
                        className="mt-[0.6em] h-px w-5 shrink-0 bg-terracotta/60"
                        aria-hidden
                      />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              )}
            </Reveler>
          ))}
        </div>
      </section>
    </>
  );
}
