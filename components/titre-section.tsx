import { Reveler } from "@/components/reveler";

/** Surtitre en capitales, grand titre, filet qui se dessine dessous. */
export function TitreSection({
  surtitre,
  titre,
  className,
  niveau = "h2",
}: {
  surtitre: string;
  titre: string;
  className?: string;
  /** Une page détail commence par un h1 ; les sections d’accueil, par des h2. */
  niveau?: "h1" | "h2";
}) {
  const Titre = niveau;

  return (
    <Reveler className={className}>
      <p className="capitales text-terracotta">{surtitre}</p>
      <Titre className="mt-6 max-w-3xl text-balance font-titre text-[clamp(2rem,4.4vw,3.4rem)] font-light leading-[1.08] tracking-[-0.03em] text-encre">
        {titre}
      </Titre>
      <span className="filet-terre mt-8 w-40" aria-hidden />
    </Reveler>
  );
}
