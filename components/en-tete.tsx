"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { MARQUE } from "@/lib/marque";

const LIENS = [
  { href: "/soins", libelle: "Les soins" },
  { href: "/a-propos", libelle: "Charina" },
  { href: "/reservation", libelle: "Réserver" },
];

export function EnTete() {
  const chemin = usePathname();
  const [ouvert, setOuvert] = useState(false);
  const [defile, setDefile] = useState(false);

  useEffect(() => {
    const auDefilement = () => setDefile(window.scrollY > 24);
    auDefilement();
    window.addEventListener("scroll", auDefilement, { passive: true });
    return () => window.removeEventListener("scroll", auDefilement);
  }, []);

  /* Un changement de page laisse sinon le menu mobile ouvert par-dessus la
     nouvelle page. */
  useEffect(() => setOuvert(false), [chemin]);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-500 ${
        defile || ouvert
          ? "border-b border-sable-fonce/40 bg-creme/95 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <div className="flex items-center justify-between px-6 py-5 sm:px-10 lg:px-16">
        <Link
          href="/"
          className="font-titre text-lg tracking-[0.14em] text-encre transition-colors duration-500 hover:text-terracotta"
        >
          CHARINA
        </Link>

        <nav className="hidden items-center gap-10 md:flex">
          {LIENS.map((lien) => (
            <Link
              key={lien.href}
              href={lien.href}
              aria-current={chemin.startsWith(lien.href) ? "page" : undefined}
              className={`capitales transition-colors duration-500 hover:text-terracotta ${
                chemin.startsWith(lien.href) ? "text-terracotta" : "text-encre-doux"
              }`}
            >
              {lien.libelle}
            </Link>
          ))}
          <a
            href={`tel:${MARQUE.telephoneLien}`}
            className="capitales border border-terracotta px-6 py-3 text-terracotta transition-colors duration-500 hover:bg-terracotta hover:text-creme"
          >
            {MARQUE.telephone}
          </a>
        </nav>

        <button
          type="button"
          onClick={() => setOuvert((etat) => !etat)}
          aria-expanded={ouvert}
          aria-controls="menu-mobile"
          className="capitales text-encre-doux md:hidden"
        >
          {ouvert ? "Fermer" : "Menu"}
        </button>
      </div>

      {ouvert && (
        <nav
          id="menu-mobile"
          className="border-t border-sable-fonce/40 px-6 pb-8 pt-4 md:hidden"
        >
          {LIENS.map((lien) => (
            <Link
              key={lien.href}
              href={lien.href}
              className="block border-b border-sable-fonce/30 py-4 font-titre text-2xl font-light text-encre"
            >
              {lien.libelle}
            </Link>
          ))}
          <a
            href={`tel:${MARQUE.telephoneLien}`}
            className="mt-6 block bg-terracotta px-6 py-4 text-center text-creme"
          >
            <span className="capitales">Appeler le {MARQUE.telephone}</span>
          </a>
        </nav>
      )}
    </header>
  );
}
