import type { MetadataRoute } from "next";
import { legal } from "@/data/legal";
import { site } from "@/data/site";
import { siteUrl } from "@/lib/metadata";
import { publicRoutes } from "@/lib/routes";

const routeLastModified: Record<string, string> = {
  "/": site.contentUpdated,
  "/apps": site.contentUpdated,
  "/store": site.contentUpdated,
  "/privacy": legal.privacyUpdated,
  "/terms": legal.termsUpdated,
};

export default function sitemap(): MetadataRoute.Sitemap {
  return publicRoutes.map((route) => ({
    url: route.path === "/" ? siteUrl : `${siteUrl}${route.path}`,
    lastModified: routeLastModified[route.path],
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}