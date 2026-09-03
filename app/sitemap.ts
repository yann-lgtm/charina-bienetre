import type { MetadataRoute } from "next";
import { MARQUE } from "@/lib/marque";
import { SOINS_ACTIFS } from "@/lib/soins";

/* Les pages légales sont volontairement absentes : elles sont en noindex,
   les lister enverrait un signal contradictoire à Google. */
export default function sitemap(): MetadataRoute.Sitemap {
  const maintenant = new Date();

  const pages = [
    { url: "/", priority: 1 },
    { url: "/soins", priority: 0.9 },
    { url: "/reservation", priority: 0.9 },
    { url: "/a-propos", priority: 0.7 },
  ];

  return [
    ...pages.map((page) => ({
      url: `${MARQUE.siteUrl}${page.url}`,
      lastModified: maintenant,
      changeFrequency: "monthly" as const,
      priority: page.priority,
    })),
    ...SOINS_ACTIFS.map((soin) => ({
      url: `${MARQUE.siteUrl}/soins/${soin.slug}`,
      lastModified: maintenant,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
