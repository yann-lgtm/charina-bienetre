import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // AVIF d'abord, WebP en repli : les photos du shooting seront lourdes et
    // la clientèle arrive presque toujours en 4G, sur téléphone.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
