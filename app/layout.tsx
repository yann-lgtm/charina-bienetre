import type { Metadata } from "next";
import { Fraunces, Albert_Sans } from "next/font/google";
import { EnTete } from "@/components/en-tete";
import { Mouvement } from "@/components/mouvement";
import { Pied } from "@/components/pied";
import { MARQUE, ZONE } from "@/lib/marque";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

const albertSans = Albert_Sans({
  variable: "--font-albert",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(MARQUE.siteUrl),
  title: {
    default: `Massage à Ruoms et Vallon-Pont-d’Arc | Charina`,
    /* Suffixe court volontaire : « Charina Bien-Être » ferait déborder
       chaque titre au-delà des 60 caractères affichés par Google. */
    template: `%s | Charina`,
  },
  description: `Massages bien-être à ${ZONE.villePrincipale}, entre Ruoms et Vallon-Pont-d’Arc. Cinq soins d’une heure, de 70 à 85 €, par ${MARQUE.praticienne}.`,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: MARQUE.nom,
    url: MARQUE.siteUrl,
  },
  /* Contrairement aux pages d’atterrissage de coeuru, ce site doit être
     indexé dès la mise en ligne : c’est toute sa raison d’être. */
  robots: { index: true, follow: true },
};

export default function LayoutRacine({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body className={`${fraunces.variable} ${albertSans.variable} antialiased`}>
        <a
          href="#contenu"
          className="sr-only focus:not-sr-only focus:absolute focus:left-6 focus:top-6 focus:z-[60] focus:bg-terracotta focus:px-5 focus:py-3 focus:text-creme"
        >
          Aller au contenu
        </a>
        <Mouvement>
          <EnTete />
          <main id="contenu">{children}</main>
          <Pied />
        </Mouvement>
      </body>
    </html>
  );
}
