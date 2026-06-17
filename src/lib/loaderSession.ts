export const LOADER_COMPLETE_KEY = "loader-complete";

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

export function clearLoaderPending() {
  document.documentElement.classList.remove("loader-pending");
}

export function getLoaderBootstrapScript() {
  return `(function(){try{var reduced=window.matchMedia("(prefers-reduced-motion: reduce)").matches;if(reduced)return;var nav=performance.getEntriesByType("navigation")[0];var type=nav&&nav.type;if(type==="back_forward")return;if(type!=="reload"&&sessionStorage.getItem("${LOADER_COMPLETE_KEY}")==="true")return;document.documentElement.classList.add("loader-pending")}catch(e){}})();`;
}