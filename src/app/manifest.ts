import type { MetadataRoute } from "next";
import { site } from "@/data/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: site.name,
    description: `Portfolio and app store for ${site.brandHoverName}.`,
    start_url: "/",
    display: "standalone",
    background_color: "#080907",
    theme_color: "#080907",
    lang: "en",
    icons: [
      {
        src: "/brand/logo-h.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}