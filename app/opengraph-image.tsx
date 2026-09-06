import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { MARQUE, ZONE } from "@/lib/marque";

/**
 * Vignette de partage — WhatsApp, Messenger, Facebook, iMessage, Google.
 *
 * Sans elle, un lien partagé n'affiche qu'une bande grise avec l'URL. Pour un
 * site de bien-être qui circulera surtout de bouche à oreille et par message,
 * c'est le premier contact visuel : il valait mieux ne pas le laisser vide.
 *
 * Typographique et non photographique, volontairement : le site n'a aucune
 * photo de Charina à ce jour (neuf emplacements tenus par `PhotoReservee`).
 * Le jour du shooting, cette image sera à refaire avec une vraie photo — c'est
 * là qu'elle gagnera le plus.
 *
 * Les couleurs sont recopiées de `globals.css` : le runtime OG ne lit pas les
 * variables CSS, et une image de partage n'a pas le droit de dépendre d'un
 * fichier qu'elle ne peut pas charger.
 *
 * Fraunces est lue depuis le dépôt, pas téléchargée : le moteur de rendu
 * n'accepte ni WOFF2 ni variable, et une vignette de partage qui dépend d'un
 * appel réseau échoue silencieusement le jour où l'appel échoue. Le fichier
 * fait 70 Ko et vit dans `app/_polices/` — le préfixe `_` le tient hors du
 * routage.
 */
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${MARQUE.nom} — ${MARQUE.baseline}`;

const CREME = "#faf7f2";
const SABLE = "#e9dccb";
const ENCRE = "#2a231e";
const ENCRE_DOUX = "#5c5148";
const TERRACOTTA = "#9d5740";

export default async function Image() {
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
          flexDirection: "column",
          justifyContent: "space-between",
          background: CREME,
          fontFamily: "Fraunces",
          padding: "72px 84px",
          /* Filet chaud sur la tranche gauche : la signature graphique du site,
             reconnaissable même en vignette de 300 px dans une conversation. */
          borderLeft: `18px solid ${TERRACOTTA}`,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 24,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: TERRACOTTA,
            }}
          >
            {ZONE.communes.slice(0, 3).join(" · ")}
          </div>
          <div
            style={{
              marginTop: 40,
              display: "flex",
              flexDirection: "column",
              fontSize: 92,
              lineHeight: 1.05,
              color: ENCRE,
            }}
          >
            <span>{MARQUE.heroLignes[0]}</span>
            <span style={{ color: TERRACOTTA }}>{MARQUE.heroLignes[1]}</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ width: 220, height: 2, background: SABLE }} />
          <div
            style={{
              marginTop: 28,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              fontSize: 30,
              color: ENCRE_DOUX,
            }}
          >
            <span style={{ color: ENCRE }}>{MARQUE.nom}</span>
            <span style={{ fontSize: 26 }}>{MARQUE.domaine}</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Fraunces", data: fraunces, style: "normal", weight: 300 }],
    },
  );
}
