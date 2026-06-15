"use client";

import { useCallback, useEffect, useRef, useSyncExternalStore } from "react";
import type { GlassPillIndicatorHandle } from "@/components/ui/GlassPillIndicator";
import {
  getReducedMotionPreference,
  getServerReducedMotionPreference,
  subscribeToMotionPreference,
} from "@/lib/motion";

function getLinks(nav: HTMLElement) {
  return [...nav.querySelectorAll<HTMLElement>(".glass-clear-pill-link")];
}

function measureLink(nav: HTMLElement, link: HTMLElement) {
  const navRect = nav.getBoundingClientRect();
  const itemRect = link.getBoundingClientRect();

  return {
    left: itemRect.left - navRect.left,
    top: itemRect.top - navRect.top,
    width: itemRect.width,
    height: itemRect.height,
  };
}

function measureItem(nav: HTMLElement, index: number) {
  const link = getLinks(nav)[index];
  if (!link) return null;
  return measureLink(nav, link);
}

type PillMetrics = {
  left: number;
  top: number;
  width: number;
  height: number;
};

const COVER_COMMIT = 0.6;

function lerpMetrics(from: PillMetrics, to: PillMetrics, progress: number): PillMetrics {
  const t = Math.min(1, Math.max(0, progress));

  return {
    left: from.left + (to.left - from.left) * t,
    top: from.top + (to.top - from.top) * t,
    width: from.width + (to.width - from.width) * t,
    height: from.height + (to.height - from.height) * t,
  };
}

function halfHalfMetrics(current: PillMetrics, next: PillMetrics, boundary: number): PillMetrics {
  const width = (current.width + next.width) / 2;

  return {
    left: boundary - width / 2,
    top: (current.top + next.top) / 2,
    width,
    height: Math.max(current.height, next.height),
  };
}

function isSameRow(current: PillMetrics, next: PillMetrics) {
  const rowTolerance = Math.min(current.height, next.height) * 0.45;
  return Math.abs(current.top - next.top) <= rowTolerance;
}

function pointerInMetrics(pointerX: number, pointerY: number, metrics: PillMetrics) {
  return (
    pointerX >= metrics.left &&
    pointerX <= metrics.left + metrics.width &&
    pointerY >= metrics.top &&
    pointerY <= metrics.top + metrics.height
  );
}

function measureFromPointer(nav: HTMLElement, clientX: number, clientY: number) {
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

function setActiveLink(nav: HTMLElement, index: number | null) {
  nav.querySelectorAll<HTMLElement>(".glass-clear-pill-link").forEach((link, linkIndex) => {
    link.classList.toggle("glass-clear-pill-link--active", index !== null && linkIndex === index);
  });
}

export function useGlassPillIndicator() {
  const navRef = useRef<HTMLElement>(null);
  const indicatorRef = useRef<GlassPillIndicatorHandle>(null);
  const activeIndexRef = useRef<number | null>(null);
  const lastPointerRef = useRef<{ x: number; y: number } | null>(null);
  const indicatorHiddenRef = useRef(true);
  const pointerFrameRef = useRef<number | null>(null);
  const pendingPointerRef = useRef<{
    x: number;
    y: number;
    instant?: boolean;
  } | null>(null);
  const reducedMotion = useSyncExternalStore(
    subscribeToMotionPreference,
    getReducedMotionPreference,
    getServerReducedMotionPreference,
  );

  const moveTo = useCallback((index: number, options?: { instant?: boolean }) => {
    const nav = navRef.current;
    if (!nav) return;

    const metrics = measureItem(nav, index);
    if (!metrics) return;

    const isFirstShow = indicatorHiddenRef.current;
    indicatorHiddenRef.current = false;
    activeIndexRef.current = index;
    setActiveLink(nav, index);
    indicatorRef.current?.moveTo(metrics, { first: isFirstShow, instant: options?.instant });
  }, []);

  const applyPointerPosition = useCallback(
    (clientX: number, clientY: number, options?: { instant?: boolean }) => {
      const nav = navRef.current;
      if (!nav) return;

      const result = measureFromPointer(nav, clientX, clientY);
      if (!result) return;

      const isFirstShow = indicatorHiddenRef.current;
      indicatorHiddenRef.current = false;
      activeIndexRef.current = result.activeIndex;
      setActiveLink(nav, result.activeIndex);
      indicatorRef.current?.moveTo(result.metrics, {
        first: isFirstShow,
        instant: options?.instant,
        tracking: !isFirstShow && !options?.instant,
      });
    },
    [],
  );

  const moveToPointer = useCallback(
    (clientX: number, clientY: number, options?: { instant?: boolean }) => {
      lastPointerRef.current = { x: clientX, y: clientY };
      pendingPointerRef.current = { x: clientX, y: clientY, instant: options?.instant };

      if (pointerFrameRef.current !== null) return;

      pointerFrameRef.current = window.requestAnimationFrame(() => {
        pointerFrameRef.current = null;
        const pending = pendingPointerRef.current;
        if (!pending) return;
        applyPointerPosition(pending.x, pending.y, { instant: pending.instant });
      });
    },
    [applyPointerPosition],
  );

  const hide = useCallback(() => {
    const nav = navRef.current;
    activeIndexRef.current = null;
    lastPointerRef.current = null;
    pendingPointerRef.current = null;
    indicatorHiddenRef.current = true;

    if (pointerFrameRef.current !== null) {
      window.cancelAnimationFrame(pointerFrameRef.current);
      pointerFrameRef.current = null;
    }

    if (nav) setActiveLink(nav, null);
    indicatorRef.current?.hide();
  }, []);

  const syncIndicator = useCallback(() => {
    const nav = navRef.current;
    if (!nav) return;

    if (lastPointerRef.current) {
      const { x, y } = lastPointerRef.current;
      const result = measureFromPointer(nav, x, y);
      if (!result) return;

      activeIndexRef.current = result.activeIndex;
      setActiveLink(nav, result.activeIndex);
      indicatorRef.current?.moveTo(result.metrics, { tracking: true });
      return;
    }

    const index = activeIndexRef.current;
    if (index === null) return;

    const metrics = measureItem(nav, index);
    if (!metrics) return;

    indicatorRef.current?.moveTo(metrics, { tracking: true });
  }, []);

  useEffect(() => {
    let resizeFrame: number | null = null;

    const onResize = () => {
      if (resizeFrame !== null) return;
      resizeFrame = window.requestAnimationFrame(() => {
        resizeFrame = null;
        syncIndicator();
      });
    };

    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      if (resizeFrame !== null) window.cancelAnimationFrame(resizeFrame);
      if (pointerFrameRef.current !== null) window.cancelAnimationFrame(pointerFrameRef.current);
    };
  }, [syncIndicator]);

  const setNavRef = useCallback(
    (node: HTMLElement | null) => {
      const prev = navRef.current;
      if (prev) {
        const prevScroll =
          prev.querySelector<HTMLElement>(".glass-clear-pill-scroll") ?? prev;
        prevScroll.removeEventListener("scroll", syncIndicator);
      }
      navRef.current = node;
      if (node) {
        const scrollEl =
          node.querySelector<HTMLElement>(".glass-clear-pill-scroll") ?? node;
        scrollEl.addEventListener("scroll", syncIndicator, { passive: true });
      }
    },
    [syncIndicator],
  );

  return {
    hide,
    indicatorRef,
    moveTo,
    moveToPointer,
    navRef,
    setNavRef,
    reducedMotion,
  };
}