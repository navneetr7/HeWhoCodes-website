"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { Loader } from "@/components/brand/Loader";
import { clearLoaderPending, markLoaderComplete, shouldPlayLoader } from "@/lib/loaderSession";
import {
  getReducedMotionPreference,
  getServerReducedMotionPreference,
  subscribeToMotionPreference,
} from "@/lib/motion";

let loaderDecision: boolean | null = null;

function getLoaderDecision() {
  if (typeof window === "undefined") return false;
  loaderDecision ??= shouldPlayLoader();
  return loaderDecision;
}

function subscribe() {
  return () => {};
}

export function SiteLoader() {
  const shouldShow = useSyncExternalStore(subscribe, getLoaderDecision, () => false);
  const reducedMotion = useSyncExternalStore(
    subscribeToMotionPreference,
    getReducedMotionPreference,
    getServerReducedMotionPreference,
  );
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (reducedMotion) {
      markLoaderComplete();
      clearLoaderPending();
    }
  }, [reducedMotion]);

  useEffect(() => {
    if (!shouldShow) {
      clearLoaderPending();
    }
  }, [shouldShow]);

  if (!shouldShow || dismissed || reducedMotion) return null;

  return (
    <Loader
      onComplete={() => {
        markLoaderComplete();
        clearLoaderPending();
        setDismissed(true);
      }}
    />
  );
}