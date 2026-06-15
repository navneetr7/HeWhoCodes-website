"use client";

import { useCallback, useEffect, useRef, useSyncExternalStore } from "react";
import type { GlassPillIndicatorHandle } from "@/components/ui/GlassPillIndicator";
import {
  getReducedMotionPreference,
  getServerReducedMotionPreference,
  subscribeToMotionPreference,
} from "@/lib/motion";

function measureItem(nav: HTMLElement, index: number) {
  const item = nav.querySelectorAll<HTMLElement>(".glass-clear-pill-link")[index];
  if (!item) return null;

  const navRect = nav.getBoundingClientRect();
  const itemRect = item.getBoundingClientRect();

  return {
    left: itemRect.left - navRect.left,
    top: itemRect.top - navRect.top,
    width: itemRect.width,
    height: itemRect.height,
  };
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

    const isFirstShow = activeIndexRef.current === null;
    activeIndexRef.current = index;
    setActiveLink(nav, index);
    indicatorRef.current?.moveTo(metrics, { first: isFirstShow, instant: options?.instant });
  }, []);

  const hide = useCallback(() => {
    const nav = navRef.current;
    activeIndexRef.current = null;
    if (nav) setActiveLink(nav, null);
    indicatorRef.current?.hide();
  }, []);

  useEffect(() => {
    const syncOnResize = () => {
      const index = activeIndexRef.current;
      if (index === null) return;

      const nav = navRef.current;
      if (!nav) return;

      const metrics = measureItem(nav, index);
      if (!metrics) return;

      indicatorRef.current?.moveTo(metrics, { instant: true });
    };

    window.addEventListener("resize", syncOnResize);
    return () => window.removeEventListener("resize", syncOnResize);
  }, []);

  return {
    hide,
    indicatorRef,
    moveTo,
    navRef,
    reducedMotion,
  };
}
