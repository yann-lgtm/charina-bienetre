import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";

/**
 * Favicon. Sans lui, l'onglet et le marque-page affichent le globe gris par
 * défaut — et une cliente qui garde le site ouvert entre deux rendez-vous ne
 * le retrouve pas dans sa barre d'onglets.
 *
 * Un « C » en Fraunces sur le crème du site : lisible à 32 px, et cohérent
 * avec la vignette de partage.
 */
export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default async function Icon() {
  const fraunces = await readFile(
    path.join(process.cwd(), "app/_polices/fraunces-300.ttf"),
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#9d5740",
          color: "#faf7f2",
          fontFamily: "Fraunces",
          fontSize: 46,
          /* Décalage optique : le C de Fraunces porte bas dans sa boîte. */
          paddingBottom: 6,
        }}
      >
        C
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Fraunces", data: fraunces, style: "normal", weight: 300 }],
    },
  );
}
