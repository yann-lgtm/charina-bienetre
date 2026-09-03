import Link from "next/link";
import { Reveler } from "@/components/reveler";
import { MARQUE } from "@/lib/marque";

/** Bloc de fin de page : les deux seules façons de la joindre. */
export function AppelReservation({
  titre = "Réserver un soin",
  texte = "Dites-nous ce qui vous ferait du bien et quand vous êtes disponible. Charina vous rappelle pour caler le créneau.",
}: {
  titre?: string;
  texte?: string;
}) {
  return (
    <section className="px-6 py-24 sm:px-10 lg:px-16">
      <Reveler className="relative overflow-hidden bg-encre px-8 py-16 text-center sm:px-14 lg:py-20">
        <div
          className="halo-terre pointer-events-none absolute left-1/2 top-1/2 h-[36vh] w-[70%] -translate-x-1/2 -translate-y-1/2 opacity-60"
          aria-hidden
        />

        <div className="relative">
          <h2 className="text-balance font-titre text-[clamp(1.9rem,4vw,3rem)] font-light leading-tight text-creme">
            {titre}
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-pretty leading-relaxed text-sable">
            {texte}
          </p>

          <div className="mt-11 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/reservation"
              className="group relative inline-flex items-center justify-center gap-3 overflow-hidden bg-terracotta px-9 py-4 text-creme"
            >
              <span
                aria-hidden
                className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/35 to-transparent transition-transform duration-[900ms] ease-out group-hover:translate-x-full"
              />
              <span className="capitales relative font-medium">Demander un rendez-vous</span>
            </Link>

            <a
              href={`tel:${MARQUE.telephoneLien}`}
              className="inline-flex items-center justify-center border border-creme/30 px-9 py-4 text-creme transition-colors duration-500 hover:border-terracotta-clair hover:text-terracotta-clair"
            >
              <span className="capitales">{MARQUE.telephone}</span>
            </a>
          </div>

          <p className="mt-8 text-sm text-sable/70">
            Également joignable sur WhatsApp au même numéro.
          </p>
        </div>
      </Reveler>
    </section>
  );
}
