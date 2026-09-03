import Link from "next/link";
import { MARQUE } from "@/lib/marque";

export default function PageIntrouvable() {
  return (
    <section className="px-6 py-32 text-center sm:px-10 lg:px-16">
      <p className="capitales text-terracotta">Page introuvable</p>
      <h1 className="mx-auto mt-8 max-w-2xl text-balance font-titre text-[clamp(2rem,4.5vw,3.2rem)] font-light leading-tight text-encre">
        Cette page n’existe pas, ou n’existe plus.
      </h1>
      <p className="mx-auto mt-6 max-w-md leading-relaxed text-encre-doux">
        Vous cherchiez sans doute les soins ou la prise de rendez-vous.
      </p>

      <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
        <Link
          href="/soins"
          className="capitales bg-terracotta px-8 py-4 text-creme"
        >
          Voir les soins
        </Link>
        <a
          href={`tel:${MARQUE.telephoneLien}`}
          className="capitales border border-encre/20 px-8 py-4 text-encre transition-colors duration-500 hover:border-terracotta hover:text-terracotta"
        >
          {MARQUE.telephone}
        </a>
      </div>
    </section>
  );
}
