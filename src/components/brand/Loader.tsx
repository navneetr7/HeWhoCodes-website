"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import {
  getReducedMotionPreference,
  getServerReducedMotionPreference,
  loaderFadeOutMs,
  loaderHoldAt100Ms,
  loaderProgressStepMs,
  subscribeToMotionPreference,
} from "@/lib/motion";
import "./loader.css";

type LoaderProps = {
  onComplete?: () => void;
};

export function Loader({ onComplete }: LoaderProps) {
  const [animatedProgress, setAnimatedProgress] = useState(0);
  const [complete, setComplete] = useState(false);
  const reducedMotion = useSyncExternalStore(
    subscribeToMotionPreference,
    getReducedMotionPreference,
    getServerReducedMotionPreference,
  );
  const progress = reducedMotion ? 100 : animatedProgress;

  useEffect(() => {
    if (reducedMotion) return;

    const timer = window.setInterval(() => {
      setAnimatedProgress((value) => {
        const next = Math.min(value + 1, 100);
        if (next === 100) window.clearInterval(timer);
        return next;
      });
    }, loaderProgressStepMs);

    return () => window.clearInterval(timer);
  }, [reducedMotion]);

  useEffect(() => {
    if (progress < 100) return;

    const holdMs = reducedMotion ? 0 : loaderHoldAt100Ms;

    const timer = window.setTimeout(() => {
      setComplete(true);
      onComplete?.();
    }, holdMs);

    return () => window.clearTimeout(timer);
  }, [onComplete, progress, reducedMotion]);

  return (
    <div
      aria-hidden={complete}
      aria-label="Loading site"
      aria-valuemax={100}
      aria-valuemin={0}
      aria-valuenow={progress}
      className="fixed inset-0 z-50 bg-background transition data-[hidden=true]:pointer-events-none data-[hidden=true]:opacity-0"
      data-hidden={complete}
      role="progressbar"
      style={{ transitionDuration: `${reducedMotion ? 0 : loaderFadeOutMs}ms` }}
    >
      <div className="relative h-full overflow-hidden">
        <div className="loader-atmosphere loader-background absolute inset-0" />
        <div className="loader-frost absolute inset-0" />
        <div aria-live="polite" className="loader-progress">
          {progress}
        </div>
      </div>
    </div>
  );
}