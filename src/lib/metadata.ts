import type { Metadata } from "next";
import { homeFocus, homeIntro, homeRole } from "@/data/home";
import { site } from "@/data/site";

export const siteUrl = `https://${site.domain}`;

export const siteMetadataBase = new URL(siteUrl);

const defaultDescription = `Portfolio and app store for ${site.name} — ${site.brandHoverName}, ${homeRole.title}.`;

const openGraphImage = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: `${site.name} — ${site.brandHoverName}`,
};

const sharedOpenGraph = {
  siteName: site.name,
  locale: "en_US" as const,
  type: "website" as const,
  images: [openGraphImage],
};

const sharedTwitter = {
  card: "summary_large_image" as const,
  images: [openGraphImage.url],
};

type PageMetadataOptions = {
  title: string;
  description: string;
  path?: `/${string}` | "/";
  noIndex?: boolean;
};

export function buildPageMetadata({
  title,
  description,
  path = "/",
  noIndex = false,
}: PageMetadataOptions): Metadata {
  const absoluteUrl = path === "/" ? siteUrl : `${siteUrl}${path}`;

  const metadata: Metadata = {
    title,
    description,
    openGraph: {
      ...sharedOpenGraph,
      title,
      description,
      url: absoluteUrl,
    },
    twitter: {
      ...sharedTwitter,
      title,
      description,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };

  if (!noIndex) {
    metadata.alternates = { canonical: path };
  }

  return metadata;
}

/** Root layout defaults only — no canonical/robots so error pages do not inherit index signals. */
export const defaultSiteMetadata: Metadata = {
  metadataBase: siteMetadataBase,
  title: site.name,
  description: defaultDescription,
  openGraph: {
    ...sharedOpenGraph,
    title: site.name,
    description: defaultDescription,
  },
  twitter: {
    ...sharedTwitter,
    title: site.name,
    description: defaultDescription,
  },
};

export const homePageMetadata: Metadata = buildPageMetadata({
  title: `${site.brandHoverName} · ${site.name}`,
  description: `${homeIntro.eyebrow} ${site.brandHoverName} is an ${homeRole.title} focused on ${homeFocus.title}. Portfolio, macOS apps, and digital products at ${site.domain}.`,
  path: "/",
});

export function legalPageMetadata(pageTitle: string, description: string, path: `/${string}`): Metadata {
  return buildPageMetadata({
    title: `${pageTitle} · ${site.name}`,
    description,
    path,
  });
}

export const privacyPageDescription = `How ${site.name} collects and uses information on ${site.domain}.`;

export const termsPageDescription = `Terms for using ${site.domain} and purchasing digital products.`;

export const appsPageMetadata: Metadata = buildPageMetadata({
  title: `Apps · ${site.name}`,
  description: `macOS apps and projects by ${site.brandHoverName} — Clipy clipboard manager and Flint attention tracking.`,
  path: "/apps",
});

export const storePageMetadata: Metadata = buildPageMetadata({
  title: `Store · ${site.name}`,
  description: `Digital products, licenses, and tools by ${site.name}.`,
  path: "/store",
});

export const notFoundPageMetadata: Metadata = buildPageMetadata({
  title: `Page not found · ${site.name}`,
  description: `The page you requested on ${site.domain} does not exist.`,
  noIndex: true,
});