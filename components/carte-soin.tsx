import Link from "next/link";
import { Reveler } from "@/components/reveler";
import { formaterDuree, formaterPrix, type Soin } from "@/lib/soins";

export function CarteSoin({ soin, delai = 0 }: { soin: Soin; delai?: number }) {
  return (
    <Reveler delai={delai} as="article">
      <Link
        href={`/soins/${soin.slug}`}
        className="group flex h-full flex-col border border-sable-fonce/50 bg-creme p-8 transition-colors duration-500 hover:border-terracotta/60"
      >
        <p className="capitales text-terracotta">{soin.accroche}</p>

        <h3 className="mt-5 font-titre text-2xl font-light leading-tight text-encre sm:text-[1.7rem]">
          {soin.nom}
        </h3>

        <p className="mt-4 flex-1 leading-relaxed text-encre-doux">{soin.resume}</p>

        <div className="mt-8 flex items-center justify-between border-t border-sable-fonce/50 pt-5">
          <span className="text-sm text-encre-discret">
            {formaterDuree(soin.dureeMinutes)} · {formaterPrix(soin.prixEuros)}
          </span>
          <span
            aria-hidden
            className="text-terracotta transition-transform duration-500 group-hover:translate-x-1"
          >
            →
          </span>
        </div>
      </Link>
    </Reveler>
  );
}
