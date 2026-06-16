import type { Metadata } from "next";
import { site } from "@/data/site";

export const defaultSiteMetadata: Metadata = {
  title: site.name,
  description: `Portfolio and app store for ${site.name}.`,
};

export function legalPageMetadata(pageTitle: string, description: string): Metadata {
  return {
    title: `${pageTitle} · ${site.name}`,
    description,
  };
}

export const privacyPageDescription = `How ${site.name} collects and uses information on ${site.domain}.`;

export const termsPageDescription = `Terms for using ${site.domain} and purchasing digital products.`;

export const appsPageMetadata: Metadata = {
  title: `Apps · ${site.name}`,
  description: `Apps and projects by ${site.name}.`,
};

export const storePageMetadata: Metadata = {
  title: `Store · ${site.name}`,
  description: `Digital products and macOS apps by ${site.name}.`,
};