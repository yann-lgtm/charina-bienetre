"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { PhotoReservee } from "@/components/photo-reservee";
import { DISTINCTION, MARQUE, ZONE } from "@/lib/marque";

/** La seconde ligne passe en terracotta : c’est là qu’est la promesse. */
export function HeroAccueil() {
  const lignes = MARQUE.heroLignes;

  return (
    <section className="relative overflow-hidden px-6 pb-20 pt-14 sm:px-10 lg:px-16 lg:pb-28 lg:pt-20">
      <div
        className="halo-terre derive-halo pointer-events-none absolute left-[-10%] top-[8%] h-[46vh] w-[70vw] max-w-3xl"
        aria-hidden
      />
      <div className="grain-doux pointer-events-none absolute inset-0" aria-hidden />

      <div className="relative z-10 grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
        <div>
          <motion.p
            className="capitales flex items-center gap-4 text-terracotta"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.1 }}
          >
            <span className="h-px w-12 bg-terracotta/50" aria-hidden />
            <span>{ZONE.resume}</span>
          </motion.p>

          <h1 className="mt-7 font-titre text-[clamp(2.6rem,7vw,5rem)] font-light leading-[0.98] tracking-[-0.035em] text-encre">
            {lignes.map((ligne, index) => (
              <span key={ligne} className="block overflow-hidden pb-[0.08em]">
                <motion.span
                  className={index === lignes.length - 1 ? "block text-terracotta" : "block"}
                  initial={{ y: "112%" }}
                  animate={{ y: 0 }}
                  transition={{
                    duration: 1.25,
                    delay: 0.25 + index * 0.12,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  {ligne}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="mt-8 max-w-xl text-pretty leading-relaxed text-encre-doux sm:text-lg">
              {MARQUE.praticienne} masse par le mouvement plutôt que par la force. Huit
              techniques apprises des Philippines à l’Europe, assemblées en un seul soin,
              recomposé pour chaque personne qui s’allonge sur sa table.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link
                href="/reservation"
                className="group relative inline-flex items-center justify-center gap-3 overflow-hidden bg-terracotta px-9 py-4 text-creme"
              >
                {/* Reflet qui traverse le bouton au survol */}
                <span
                  aria-hidden
                  className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/35 to-transparent transition-transform duration-[900ms] ease-out group-hover:translate-x-full"
                />
                <span className="capitales relative font-medium">Demander un rendez-vous</span>
                <span
                  aria-hidden
                  className="relative transition-transform duration-500 group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>

              <Link
                href="/soins"
                className="inline-flex items-center justify-center border border-encre/20 px-9 py-4 text-encre transition-colors duration-500 hover:border-terracotta hover:text-terracotta"
              >
                <span className="capitales">Voir les cinq soins</span>
              </Link>
            </div>

            <p className="mt-8 text-sm text-encre-discret">
              {DISTINCTION.long} · Séances d’une heure, de 70 à 85 €
            </p>
          </motion.div>
        </div>

        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          <PhotoReservee
            ratio="4 / 5"
            fichierAttendu="charina-portrait-cabinet.webp — portrait vertical, mains ou visage, lumière naturelle"
            className="w-full"
          />
        </motion.div>
      </div>
    </section>
  );
}
