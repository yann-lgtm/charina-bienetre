/**
 * Emplacement photo en attente du shooting.
 *
 * Le brief est explicite : aucune image stock, et le contenant s’adapte à
 * l’image, jamais l’inverse. Ce composant réserve donc le ratio exact et
 * pose un aplat texturé à la place — le jour du shooting, on remplace le
 * bloc par un <Image /> au même ratio, et rien d’autre ne bouge dans la page.
 *
 * `fichierAttendu` documente, dans le code, la photo à venir : c’est la liste
 * de courses du shooting, et elle reste au bon endroit plutôt que dans un
 * document séparé qu’on perd.
 */
export function PhotoReservee({
  ratio = "4 / 5",
  fichierAttendu,
  className,
}: {
  ratio?: string;
  fichierAttendu: string;
  className?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden bg-creme-chaud ${className ?? ""}`}
      style={{ aspectRatio: ratio }}
      data-photo-attendue={fichierAttendu}
      role="presentation"
    >
      <div
        className="absolute inset-0 bg-gradient-to-br from-sable via-creme-chaud to-sable-fonce/60"
        aria-hidden
      />
      <div className="grain-doux pointer-events-none absolute inset-0" aria-hidden />
      <div className="absolute inset-4 border border-terracotta/15" aria-hidden />
    </div>
  );
}
