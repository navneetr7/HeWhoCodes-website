import type { GlassPillMetrics } from "@/lib/glassPill";

const PILL_STACK_SELECTOR = ".glass-clear-pill-stack";

function getPillStack(nav: HTMLElement) {
  return nav.querySelector<HTMLElement>(PILL_STACK_SELECTOR);
}

export function updateNavCoverFromMetrics(nav: HTMLElement, pill: GlassPillMetrics) {
  const stack = getPillStack(nav);
  if (!stack) return;

  if (pill.width <= 0 || pill.height <= 0) {
    stack.style.setProperty("--pill-cover-width", "0px");
    stack.style.setProperty("--pill-cover-height", "0px");
    return;
  }

  const navRect = nav.getBoundingClientRect();
  const stackRect = stack.getBoundingClientRect();

  stack.style.setProperty("--pill-cover-left", `${pill.left - (stackRect.left - navRect.left)}px`);
  stack.style.setProperty("--pill-cover-top", `${pill.top - (stackRect.top - navRect.top)}px`);
  stack.style.setProperty("--pill-cover-width", `${pill.width}px`);
  stack.style.setProperty("--pill-cover-height", `${pill.height}px`);
}

export function clearNavCover(nav: HTMLElement) {
  const stack = getPillStack(nav);
  if (!stack) return;

  stack.style.setProperty("--pill-cover-width", "0px");
  stack.style.setProperty("--pill-cover-height", "0px");
}