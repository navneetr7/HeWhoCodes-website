"use client";

import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { useSyncExternalStore } from "react";
import { GlassPanel } from "@/components/ui/GlassPanel";
import {
  getReducedMotionPreference,
  getServerReducedMotionPreference,
  subscribeToMotionPreference,
} from "@/lib/motion";
import { cn } from "@/lib/utils";

const FROST_SCROLL_THRESHOLD_PX = 48;

let scrollFrameId: number | null = null;

function subscribeToScrollFrost(onStoreChange: () => void) {
  const onScroll = () => {
    if (scrollFrameId !== null) return;

    scrollFrameId = window.requestAnimationFrame(() => {
      scrollFrameId = null;
      onStoreChange();
    });
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  return () => {
    window.removeEventListener("scroll", onScroll);
    if (scrollFrameId !== null) window.cancelAnimationFrame(scrollFrameId);
  };
}

function getScrollFrostSnapshot() {
  return window.scrollY > FROST_SCROLL_THRESHOLD_PX;
}

function getScrollFrostServerSnapshot() {
  return false;
}

type FrostedHeaderPanelProps = ComponentPropsWithoutRef<"div"> & {
  children: ReactNode;
};

export function FrostedHeaderPanel({ className, children, ...props }: FrostedHeaderPanelProps) {
  const scrolledForFrost = useSyncExternalStore(
    subscribeToScrollFrost,
    getScrollFrostSnapshot,
    getScrollFrostServerSnapshot,
  );
  const reducedMotion = useSyncExternalStore(
    subscribeToMotionPreference,
    getReducedMotionPreference,
    getServerReducedMotionPreference,
  );
  const liveFrost = !reducedMotion && scrolledForFrost;

  return (
    <GlassPanel
      className={cn("site-header__panel", liveFrost && "glass-frosted--live", className)}
      {...props}
    >
      {children}
    </GlassPanel>
  );
}