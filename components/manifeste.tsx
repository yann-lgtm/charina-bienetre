"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";

const MANIFESTE =
  "On vient rarement pour une seule épaule bloquée. On vient parce qu’on n’a pas posé les armes depuis des mois, et qu’une heure sur une table est parfois le seul moment de la semaine où personne ne demande rien.";

/** Un mot qui s’allume quand le défilement atteint sa position dans la phrase. */
function Mot({
  texte,
  progression,
  debut,
  fin,
}: {
  texte: string;
  progression: MotionValue<number>;
  debut: number;
  fin: number;
}) {
  const opacite = useTransform(progression, [debut, fin], [0.16, 1]);

  /* `mot-manifeste` permet au CSS de forcer l'opacité pleine quand
     l'utilisatrice a demandé moins d'animations : motion, lui, ne neutralise
     que les déplacements, pas les opacités pilotées par le défilement. */
  return (
    <motion.span
      style={{ opacity: opacite }}
      className="mot-manifeste mr-[0.26em] inline-block"
    >
      {texte}
    </motion.span>
  );
}

export function Manifeste() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const mots = MANIFESTE.split(" ");

  return (
    <section ref={ref} className="relative h-[180vh] bg-creme-chaud">
      <div className="sticky top-0 flex min-h-[100svh] items-center px-6 py-24 sm:px-10 lg:px-16">
        <div
          className="halo-terre pointer-events-none absolute left-1/2 top-1/2 h-[40vh] w-[58vw] -translate-x-1/2 -translate-y-1/2 opacity-80"
          aria-hidden
        />

        <div className="relative mx-auto max-w-4xl text-center">
          <p className="capitales text-terracotta">Pourquoi on vient</p>

          <p className="mt-10 text-balance font-titre text-[clamp(1.5rem,3.6vw,2.9rem)] font-light leading-[1.25] tracking-[-0.025em] text-encre">
            {mots.map((mot, index) => (
              <Mot
                key={`${mot}-${index}`}
                texte={mot}
                progression={scrollYProgress}
                /* Repères bornés à [0,1] : l'animation native refuse le reste,
                   et un dépassement fait planter toute la page à l'hydratation.
                   La phrase finit de s'allumer aux quatre cinquièmes du parcours. */
                debut={(index / mots.length) * 0.8}
                fin={Math.min(1, (index / mots.length) * 0.8 + 0.14)}
              />
            ))}
          </p>
        </div>
      </div>
    </section>
  );
}
