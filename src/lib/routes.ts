export function isInternalHref(href: string) {
  return href.startsWith("/") && !href.startsWith("//");
}

export function opensInNewTab(href: string) {
  return href.startsWith("http://") || href.startsWith("https://");
}