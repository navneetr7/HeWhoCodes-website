import { appShowcases } from "@/data/apps";
import { homeFocus, homeIntro, homeRole, profileLinks } from "@/data/home";
import { site } from "@/data/site";
import { siteUrl } from "@/lib/metadata";

const personId = `${siteUrl}/#person`;
const websiteId = `${siteUrl}/#website`;
const appsPageId = `${siteUrl}/apps#webpage`;

const sameAs = profileLinks
  .map((link) => link.href)
  .filter((href) => href.startsWith("http://") || href.startsWith("https://"));

const applicationCategoryByLabel: Record<string, string> = {
  Productivity: "https://schema.org/UtilitiesApplication",
  "Focus & Time": "https://schema.org/LifestyleApplication",
};

function appJsonLdId(name: string) {
  return `${siteUrl}/apps#${name.toLowerCase()}`;
}

function softwareApplicationJsonLd(app: (typeof appShowcases)[number]) {
  return {
    "@type": "SoftwareApplication",
    "@id": appJsonLdId(app.name),
    name: app.name,
    applicationCategory:
      applicationCategoryByLabel[app.category] ?? "https://schema.org/UtilitiesApplication",
    operatingSystem: "macOS",
    description: app.description,
    url: `${siteUrl}/apps`,
    author: { "@id": personId },
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/PreOrder",
    },
  };
}

const websiteJsonLd = {
  "@type": "WebSite",
  "@id": websiteId,
  name: site.name,
  url: siteUrl,
  description: `Portfolio and app store for ${site.brandHoverName}, ${homeRole.title}.`,
  author: { "@id": personId },
  inLanguage: "en",
};

const personJsonLd = {
  "@type": "Person",
  "@id": personId,
  name: site.brandHoverName,
  alternateName: site.name,
  url: siteUrl,
  email: site.contactEmail,
  jobTitle: homeRole.title,
  description: `${homeIntro.eyebrow} Focus: ${homeFocus.title}.`,
  sameAs,
};

export const homePageJsonLd = {
  "@context": "https://schema.org",
  "@graph": [personJsonLd, websiteJsonLd],
};

const appNodes = appShowcases.map((app) => softwareApplicationJsonLd(app));

export const appsPageJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    personJsonLd,
    websiteJsonLd,
    {
      "@type": "CollectionPage",
      "@id": appsPageId,
      name: `Apps · ${site.name}`,
      url: `${siteUrl}/apps`,
      isPartOf: { "@id": websiteId },
      about: appNodes.map((app) => ({ "@id": app["@id"] })),
    },
    ...appNodes,
  ],
};