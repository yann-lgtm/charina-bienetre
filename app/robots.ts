import type { MetadataRoute } from "next";
import { INDEXATION, MARQUE } from "@/lib/marque";

/* Contrairement aux pages d’atterrissage de coeuru, ce site doit être exploré
   dès la mise en ligne : le référencement local est sa raison d’être. */
export default function robots(): MetadataRoute.Robots {
  /* Site fermé aux moteurs : on refuse tout et on n'annonce pas de sitemap —
     l'annoncer reviendrait à leur tendre la liste des pages qu'on leur
     interdit. */
  if (!INDEXATION.ouverte) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"],
    },
    sitemap: `${MARQUE.siteUrl}/sitemap.xml`,
  };
}
