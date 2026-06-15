"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { scrambleText } from "@/lib/scrambleText";
import {
  getReducedMotionPreference,
  getServerReducedMotionPreference,
  scrambleStepMs,
  subscribeToMotionPreference,
} from "@/lib/motion";

type UseScrambleTextOptions = {
  defaultLabel: string;
  hoverLabel: string;
  stepMs?: number;
};

export function useScrambleText({
  defaultLabel,
  hoverLabel,
  stepMs = scrambleStepMs,
}: UseScrambleTextOptions) {
  const [active, setActive] = useState(false);
  const [tick, setTick] = useState(hoverLabel.length);
  const reducedMotion = useSyncExternalStore(
    subscribeToMotionPreference,
    getReducedMotionPreference,
    getServerReducedMotionPreference,
  );

  useEffect(() => {
    if (!active || reducedMotion) return;

    const timer = window.setInterval(() => {
      setTick((value) => {
        if (value >= hoverLabel.length) {
          window.clearInterval(timer);
          return hoverLabel.length;
        }

        return value + 1;
      });
    }, stepMs);

    return () => window.clearInterval(timer);
  }, [active, hoverLabel.length, reducedMotion, stepMs]);

  const displayText = active
    ? reducedMotion
      ? hoverLabel
      : scrambleText(hoverLabel, tick)
    : defaultLabel;

  const activate = () => {
    setTick(0);
    setActive(true);
  };

  const deactivate = () => {
    setActive(false);
    setTick(hoverLabel.length);
  };

  return { displayText, activate, deactivate };
}