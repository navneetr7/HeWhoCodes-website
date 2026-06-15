import { site } from "@/data/site";

export const legal = {
  privacyUpdated: "2026-06-15",
  termsUpdated: "2026-06-15",
};

export type LegalSection = {
  title: string;
  paragraphs: string[];
  list?: string[];
};

export const privacySections: LegalSection[] = [
  {
    title: "Overview",
    paragraphs: [
      `This policy explains what information ${site.name} collects when you visit ${site.domain} and how it is used.`,
      "The site is operated as a personal portfolio and digital store. Contact details are listed at the bottom of this page.",
    ],
  },
  {
    title: "What we collect today",
    paragraphs: [
      "The public site is mostly static. We do not run accounts, newsletters, or storefront checkout yet.",
      "Like most websites, basic technical data may be processed by our hosting provider when you load a page, such as IP address, browser type, request time, and pages visited. This is used for security, performance, and reliability.",
    ],
  },
  {
    title: "What we will collect when the store launches",
    paragraphs: [
      "When purchases or contact flows go live, we may collect information needed to complete those requests, for example:",
    ],
    list: [
      "Name and email address",
      "Billing details required by the payment provider",
      "Order history and download or license delivery details",
      "Messages you send through a contact form",
    ],
  },
  {
    title: "Payment processing",
    paragraphs: [
      "Payments will be handled by a third-party payment provider. Card and banking details are collected and processed by that provider, not stored directly on this site.",
      "We will update this page with the exact provider name and links to their privacy policy before checkout goes live.",
    ],
  },
  {
    title: "How we use information",
    paragraphs: ["We use collected information to:"],
    list: [
      "Operate and improve the website",
      "Deliver digital products and purchase confirmations",
      "Respond to support or contact requests",
      "Meet legal, tax, and accounting obligations where applicable",
    ],
  },
  {
    title: "Retention and your rights",
    paragraphs: [
      "We keep information only as long as needed for the purposes above, unless a longer period is required by law.",
      "You may request access, correction, or deletion of personal data we hold by emailing the contact address below. We will respond within a reasonable time.",
    ],
  },
  {
    title: "Cookies and analytics",
    paragraphs: [
      "We do not use advertising cookies today. If analytics or other non-essential cookies are added later, this page will be updated and consent will be handled where required.",
    ],
  },
  {
    title: "Contact",
    paragraphs: [`Questions about this policy: ${site.contactEmail}`],
  },
];

export const termsSections: LegalSection[] = [
  {
    title: "Agreement",
    paragraphs: [
      `By using ${site.domain}, you agree to these terms. If you do not agree, please do not use the site.`,
    ],
  },
  {
    title: "The site",
    paragraphs: [
      `${site.name} is a personal website showcasing projects, apps, and digital products.`,
      "Content on the site is provided for general information. Project status, pricing, and availability may change without notice.",
    ],
  },
  {
    title: "Intellectual property",
    paragraphs: [
      `Unless stated otherwise, the site design, branding, text, code samples, and media are owned by ${site.owner} and protected by applicable copyright laws.`,
      "You may not copy, redistribute, or commercially exploit site content without permission, except where a product license explicitly allows it.",
    ],
  },
  {
    title: "Digital products and store terms",
    paragraphs: [
      "When the store launches, each product will be sold with a specific license. Unless a product page says otherwise, digital goods are licensed for personal or internal business use and may not be resold or redistributed.",
      "Prices, taxes, and available payment methods will be shown at checkout. We reserve the right to refuse or cancel orders in cases of error, fraud, or abuse.",
    ],
  },
  {
    title: "Refunds",
    paragraphs: [
      "Refund rules will be published on product pages before sales begin. For digital goods, refunds are generally limited once access or files have been delivered, except where required by law or where a product is materially not as described.",
    ],
  },
  {
    title: "Disclaimer",
    paragraphs: [
      "The site and products are provided on an \"as is\" basis without warranties of any kind, to the fullest extent permitted by law.",
      `${site.name} is not liable for indirect, incidental, or consequential damages arising from use of the site or purchased products.`,
    ],
  },
  {
    title: "Changes",
    paragraphs: [
      "These terms may be updated from time to time. The date at the top of this page shows when they were last revised. Continued use of the site after changes means you accept the updated terms.",
    ],
  },
  {
    title: "Contact",
    paragraphs: [`Questions about these terms: ${site.contactEmail}`],
  },
];