"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

type ProprietesReveler = {
  children: ReactNode;
  className?: string;
  /** Retard en secondes, pour faire arriver les éléments l’un après l’autre. */
  delai?: number;
  as?: ElementType;
};

/** Fait apparaître son contenu quand il entre dans l’écran, une seule fois. */
export function Reveler({
  children,
  className,
  delai = 0,
  as: Balise = "div",
}: ProprietesReveler) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observateur = new IntersectionObserver(
      ([entree]) => {
        if (entree.isIntersecting) {
          setVisible(true);
          observateur.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );

    observateur.observe(element);
    return () => observateur.disconnect();
  }, []);

  return (
    <Balise
      ref={ref}
      className={`reveler ${className ?? ""}`}
      data-visible={visible}
      style={delai ? { transitionDelay: `${delai}s` } : undefined}
    >
      {children}
    </Balise>
  );
}
