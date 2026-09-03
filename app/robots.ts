import type { MetadataRoute } from "next";
import { MARQUE } from "@/lib/marque";

/* Contrairement aux pages d’atterrissage de coeuru, ce site doit être exploré
   dès la mise en ligne : le référencement local est sa raison d’être. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"],
    },
    sitemap: `${MARQUE.siteUrl}/sitemap.xml`,
  };
}
