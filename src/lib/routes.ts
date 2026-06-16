export const publicRoutes = [
  { path: "/", changeFrequency: "monthly" as const, priority: 1 },
  { path: "/apps", changeFrequency: "monthly" as const, priority: 0.9 },
  { path: "/store", changeFrequency: "monthly" as const, priority: 0.8 },
  { path: "/privacy", changeFrequency: "yearly" as const, priority: 0.3 },
  { path: "/terms", changeFrequency: "yearly" as const, priority: 0.3 },
] as const;

export function isInternalHref(href: string) {
  return href.startsWith("/") && !href.startsWith("//");
}

export function opensInNewTab(href: string) {
  return href.startsWith("http://") || href.startsWith("https://");
}