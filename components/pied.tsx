import Link from "next/link";
import { MARQUE, ZONE } from "@/lib/marque";
import { SOINS_ACTIFS } from "@/lib/soins";

export function Pied() {
  return (
    <footer className="mt-32 border-t border-sable-fonce/50 bg-creme-chaud px-6 py-16 sm:px-10 lg:px-16">
      <div className="grid gap-12 md:grid-cols-3">
        <div>
          <p className="font-titre text-2xl tracking-[0.14em] text-encre">CHARINA</p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-encre-doux">
            {MARQUE.baseline}
          </p>
          <p className="mt-6 text-sm leading-relaxed text-encre-discret">
            {ZONE.resume}
          </p>
        </div>

        <nav aria-label="Les soins">
          <p className="capitales text-encre-discret">Les soins</p>
          <ul className="mt-5 space-y-3">
            {SOINS_ACTIFS.map((soin) => (
              <li key={soin.slug}>
                <Link
                  href={`/soins/${soin.slug}`}
                  className="text-sm text-encre-doux transition-colors duration-500 hover:text-terracotta"
                >
                  {soin.nom}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="capitales text-encre-discret">Prendre rendez-vous</p>
          <ul className="mt-5 space-y-3 text-sm">
            <li>
              <a
                href={`tel:${MARQUE.telephoneLien}`}
                className="text-encre-doux transition-colors duration-500 hover:text-terracotta"
              >
                {MARQUE.telephone}
              </a>
            </li>
            <li>
              <a
                href={MARQUE.whatsapp}
                target="_blank"
                rel="noopener"
                className="text-encre-doux transition-colors duration-500 hover:text-terracotta"
              >
                WhatsApp
              </a>
            </li>
            <li>
              <a
                href={MARQUE.instagram}
                target="_blank"
                rel="noopener"
                className="text-encre-doux transition-colors duration-500 hover:text-terracotta"
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                href={MARQUE.facebook}
                target="_blank"
                rel="noopener"
                className="text-encre-doux transition-colors duration-500 hover:text-terracotta"
              >
                Facebook
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-14 flex flex-col gap-4 border-t border-sable-fonce/40 pt-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-encre-discret">
          © {new Date().getFullYear()} {MARQUE.nom}
        </p>
        <nav className="flex flex-wrap gap-x-8 gap-y-3">
          <Link
            href="/mentions-legales"
            className="capitales text-encre-discret transition-colors duration-500 hover:text-terracotta"
          >
            Mentions légales
          </Link>
          <Link
            href="/politique-confidentialite"
            className="capitales text-encre-discret transition-colors duration-500 hover:text-terracotta"
          >
            Confidentialité
          </Link>
        </nav>
      </div>
    </footer>
  );
}
