"use client";

import { useCallback, useEffect, useRef, useSyncExternalStore } from "react";
import type { GlassPillIndicatorHandle, GlassPillMetrics } from "@/lib/glassPill";
import { clearNavCover, updateNavCoverFromMetrics } from "@/lib/glassPillCover";
import { measurePillFromPointer, measurePillItem } from "@/lib/glassPillGeometry";
import {
  getReducedMotionPreference,
  getServerReducedMotionPreference,
  subscribeToMotionPreference,
} from "@/lib/motion";

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

  const handleMetricsChange = useCallback((metrics: GlassPillMetrics) => {
    const nav = navRef.current;
    if (!nav || indicatorHiddenRef.current) return;

    updateNavCoverFromMetrics(nav, metrics);
  }, []);

  const moveTo = useCallback(
    (index: number, options?: { instant?: boolean }) => {
      const nav = navRef.current;
      if (!nav) return;

      const metrics = measurePillItem(nav, index);
      if (!metrics) return;

      const isFirstShow = indicatorHiddenRef.current;
      indicatorHiddenRef.current = false;
      activeIndexRef.current = index;
      indicatorRef.current?.moveTo(metrics, { first: isFirstShow, instant: options?.instant });
    },
    [],
  );

  const applyPointerPosition = useCallback(
    (clientX: number, clientY: number, options?: { instant?: boolean }) => {
      const nav = navRef.current;
      if (!nav) return;

      const result = measurePillFromPointer(nav, clientX, clientY);
      if (!result) return;

      const isFirstShow = indicatorHiddenRef.current;
      indicatorHiddenRef.current = false;
      activeIndexRef.current = result.activeIndex;
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

    if (nav) clearNavCover(nav);
    indicatorRef.current?.hide();
  }, []);

  const syncIndicator = useCallback(() => {
    const nav = navRef.current;
    if (!nav) return;

    if (lastPointerRef.current) {
      const { x, y } = lastPointerRef.current;
      const result = measurePillFromPointer(nav, x, y);
      if (!result) return;

      activeIndexRef.current = result.activeIndex;
      indicatorRef.current?.moveTo(result.metrics, { tracking: true });
      return;
    }

    const index = activeIndexRef.current;
    if (index === null) return;

    const metrics = measurePillItem(nav, index);
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
    handleMetricsChange,
    hide,
    indicatorRef,
    moveTo,
    moveToPointer,
    navRef,
    setNavRef,
    reducedMotion,
  };
}