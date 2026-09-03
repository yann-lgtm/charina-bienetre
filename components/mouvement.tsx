"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

/**
 * Respect de « animations réduites », en un seul endroit.
 *
 * `reducedMotion="user"` laisse motion neutraliser lui-même les déplacements
 * quand le système le demande. C’est ce qui évite les branchements
 * `mouvementReduit ? … : …` dans les composants : le serveur et le client
 * rendraient alors des arbres différents, et l’hydratation échouerait —
 * c’est exactement le bug qui a été corrigé ici le 2026-09-03.
 */
export function Mouvement({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
