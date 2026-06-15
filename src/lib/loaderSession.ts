const LOADER_COMPLETE_KEY = "loader-complete";

export function markLoaderComplete() {
  sessionStorage.setItem(LOADER_COMPLETE_KEY, "true");
}

export function shouldPlayLoader() {
  const entry = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
  const type = entry?.type;

  if (type === "back_forward") return false;
  if (type === "reload") return true;

  return sessionStorage.getItem(LOADER_COMPLETE_KEY) !== "true";
}