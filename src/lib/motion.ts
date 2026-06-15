export const loaderProgressStepMs = 20;
export const loaderHoldAt100Ms = 500;
export const loaderFadeOutMs = 500;
export const scrambleStepMs = 58;

export const glassPillSpringVisualDurationSec = 0.2;
export const glassPillSpringBounce = 0.16;
export const glassPillOpacityFadeSec = 0.16;
export const glassPillSpringTransition = {
  type: "spring" as const,
  visualDuration: glassPillSpringVisualDurationSec,
  bounce: glassPillSpringBounce,
};

export const glassPillOpacityTransition = {
  duration: glassPillOpacityFadeSec,
  ease: "easeOut" as const,
};

export function subscribeToMotionPreference(onStoreChange: () => void) {
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  media.addEventListener("change", onStoreChange);
  return () => media.removeEventListener("change", onStoreChange);
}

export function getReducedMotionPreference() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function getServerReducedMotionPreference() {
  return false;
}
