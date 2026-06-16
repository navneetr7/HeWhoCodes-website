import type { GlassPillMetrics, GlassPillPointerResult } from "@/lib/glassPill";

const PILL_LINK_SELECTOR = ".glass-clear-pill-link";
const COVER_COMMIT = 0.6;

function getLinks(nav: HTMLElement) {
  return [...nav.querySelectorAll<HTMLElement>(PILL_LINK_SELECTOR)];
}

function measureLink(nav: HTMLElement, link: HTMLElement): GlassPillMetrics {
  const navRect = nav.getBoundingClientRect();
  const itemRect = link.getBoundingClientRect();

  return {
    left: itemRect.left - navRect.left,
    top: itemRect.top - navRect.top,
    width: itemRect.width,
    height: itemRect.height,
  };
}

export function measurePillItem(nav: HTMLElement, index: number): GlassPillMetrics | null {
  const link = getLinks(nav)[index];
  if (!link) return null;
  return measureLink(nav, link);
}

function lerpMetrics(from: GlassPillMetrics, to: GlassPillMetrics, progress: number): GlassPillMetrics {
  const t = Math.min(1, Math.max(0, progress));

  return {
    left: from.left + (to.left - from.left) * t,
    top: from.top + (to.top - from.top) * t,
    width: from.width + (to.width - from.width) * t,
    height: from.height + (to.height - from.height) * t,
  };
}

function halfHalfMetrics(current: GlassPillMetrics, next: GlassPillMetrics, boundary: number): GlassPillMetrics {
  const width = (current.width + next.width) / 2;

  return {
    left: boundary - width / 2,
    top: (current.top + next.top) / 2,
    width,
    height: Math.max(current.height, next.height),
  };
}

function isSameRow(current: GlassPillMetrics, next: GlassPillMetrics) {
  const rowTolerance = Math.min(current.height, next.height) * 0.45;
  return Math.abs(current.top - next.top) <= rowTolerance;
}

function pointerInMetrics(pointerX: number, pointerY: number, metrics: GlassPillMetrics) {
  return (
    pointerX >= metrics.left &&
    pointerX <= metrics.left + metrics.width &&
    pointerY >= metrics.top &&
    pointerY <= metrics.top + metrics.height
  );
}

export function measurePillFromPointer(
  nav: HTMLElement,
  clientX: number,
  clientY: number,
): GlassPillPointerResult | null {
  const links = getLinks(nav);
  if (!links.length) return null;

  const navRect = nav.getBoundingClientRect();
  const pointerX = clientX - navRect.left;
  const pointerY = clientY - navRect.top;
  const metricsList = links.map((link) => measureLink(nav, link));

  for (let index = 0; index < links.length - 1; index += 1) {
    const current = metricsList[index];
    const next = metricsList[index + 1];
    if (!isSameRow(current, next)) continue;

    const rowTop = Math.min(current.top, next.top);
    const rowBottom = Math.max(current.top + current.height, next.top + next.height);
    if (pointerY < rowTop || pointerY > rowBottom) continue;

    const boundary = (current.left + current.width + next.left) / 2;
    const currentCenter = current.left + current.width / 2;
    const nextCenter = next.left + next.width / 2;
    const split = halfHalfMetrics(current, next, boundary);
    const currentThreshold = boundary - COVER_COMMIT * (boundary - currentCenter);
    const nextThreshold = boundary + COVER_COMMIT * (nextCenter - boundary);

    if (pointerX < currentThreshold || pointerX > nextThreshold) continue;

    if (pointerX <= boundary) {
      const span = boundary - currentThreshold;
      if (span <= 0) return { metrics: current, activeIndex: index };

      const progress = (pointerX - currentThreshold) / span;
      if (progress <= 0) return { metrics: current, activeIndex: index };

      return {
        metrics: lerpMetrics(current, split, progress),
        activeIndex: null,
      };
    }

    const span = nextThreshold - boundary;
    if (span <= 0) return { metrics: next, activeIndex: index + 1 };

    const progress = (pointerX - boundary) / span;
    if (progress >= 1) return { metrics: next, activeIndex: index + 1 };

    return {
      metrics: lerpMetrics(split, next, progress),
      activeIndex: null,
    };
  }

  for (let index = 0; index < metricsList.length; index += 1) {
    if (pointerInMetrics(pointerX, pointerY, metricsList[index])) {
      return { metrics: metricsList[index], activeIndex: index };
    }
  }

  let closestIndex = 0;
  let closestDistance = Number.POSITIVE_INFINITY;

  for (let index = 0; index < metricsList.length; index += 1) {
    const metrics = metricsList[index];
    const centerX = metrics.left + metrics.width / 2;
    const centerY = metrics.top + metrics.height / 2;
    const distance = (pointerX - centerX) ** 2 + (pointerY - centerY) ** 2;

    if (distance < closestDistance) {
      closestDistance = distance;
      closestIndex = index;
    }
  }

  return { metrics: metricsList[closestIndex], activeIndex: closestIndex };
}