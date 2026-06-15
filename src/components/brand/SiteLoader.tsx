"use client";

import { useState, useSyncExternalStore } from "react";
import { Loader } from "@/components/brand/Loader";
import { markLoaderComplete, shouldPlayLoader } from "@/lib/loaderSession";

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
  const [dismissed, setDismissed] = useState(false);

  if (!shouldShow || dismissed) return null;

  return (
    <Loader
      onComplete={() => {
        markLoaderComplete();
        setDismissed(true);
      }}
    />
  );
}