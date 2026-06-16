"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { scrambleText } from "@/lib/scrambleText";
import {
  getReducedMotionPreference,
  getServerReducedMotionPreference,
  scrambleStepMs,
  subscribeToMotionPreference,
} from "@/lib/motion";

type Phase = "default" | "to-hover" | "at-hover" | "to-default";

type UseScrambleTextOptions = {
  defaultLabel: string;
  hoverLabel: string;
  stepMs?: number;
  /** After hover label is shown, revert to default while pointer stays active. */
  holdMs?: number;
  /** After pointer leaves, wait then scramble back to default. */
  leaveDelayMs?: number;
};

function clearTimer(timerRef: { current: number | null }) {
  if (timerRef.current !== null) {
    window.clearTimeout(timerRef.current);
    timerRef.current = null;
  }
}

export function useScrambleText({
  defaultLabel,
  hoverLabel,
  stepMs = scrambleStepMs,
  holdMs,
  leaveDelayMs,
}: UseScrambleTextOptions) {
  const [phase, setPhaseState] = useState<Phase>("default");
  const [tick, setTick] = useState(0);
  const phaseRef = useRef<Phase>("default");
  const isActiveRef = useRef(false);
  const holdTimerRef = useRef<number | null>(null);
  const leaveTimerRef = useRef<number | null>(null);
  const timedBehavior = holdMs !== undefined || leaveDelayMs !== undefined;

  const setPhase = useCallback((next: Phase) => {
    phaseRef.current = next;
    setPhaseState(next);
  }, []);

  const reducedMotion = useSyncExternalStore(
    subscribeToMotionPreference,
    getReducedMotionPreference,
    getServerReducedMotionPreference,
  );

  const startToHover = useCallback(() => {
    clearTimer(leaveTimerRef);

    if (reducedMotion) {
      setPhase("at-hover");
      return;
    }

    setPhase("to-hover");
    setTick(0);
  }, [reducedMotion, setPhase]);

  const startToDefault = useCallback(
    (animate: boolean) => {
      clearTimer(holdTimerRef);

      if (!animate || reducedMotion) {
        setPhase("default");
        setTick(hoverLabel.length);
        return;
      }

      setPhase("to-default");
      setTick(0);
    },
    [hoverLabel.length, reducedMotion, setPhase],
  );

  useEffect(() => {
    if (phase !== "to-hover" && phase !== "to-default") return;
    if (reducedMotion) return;

    const targetLabel = phase === "to-hover" ? hoverLabel : defaultLabel;

    const timer = window.setInterval(() => {
      setTick((value) => {
        const next = value + 1;

        if (next >= targetLabel.length) {
          window.clearInterval(timer);
          setPhase(phase === "to-hover" ? "at-hover" : "default");
          return targetLabel.length;
        }

        return next;
      });
    }, stepMs);

    return () => window.clearInterval(timer);
  }, [defaultLabel, hoverLabel, phase, reducedMotion, setPhase, stepMs]);

  useEffect(() => {
    if (phase !== "at-hover" || !holdMs || !isActiveRef.current) return;

    holdTimerRef.current = window.setTimeout(() => {
      if (isActiveRef.current) {
        startToDefault(true);
      }
    }, holdMs);

    return () => clearTimer(holdTimerRef);
  }, [holdMs, phase, startToDefault]);

  const activate = useCallback(() => {
    isActiveRef.current = true;
    clearTimer(leaveTimerRef);

    const current = phaseRef.current;
    if (current === "default" || current === "to-default") {
      startToHover();
    }
  }, [startToHover]);

  const deactivate = useCallback(() => {
    isActiveRef.current = false;
    clearTimer(holdTimerRef);

    const current = phaseRef.current;

    if (!timedBehavior) {
      startToDefault(false);
      return;
    }

    if (current === "at-hover" || current === "to-hover") {
      const delay = leaveDelayMs ?? 0;

      if (delay === 0) {
        startToDefault(true);
        return;
      }

      leaveTimerRef.current = window.setTimeout(() => {
        if (!isActiveRef.current) {
          startToDefault(true);
        }
      }, delay);
    }
  }, [leaveDelayMs, startToDefault, timedBehavior]);

  useEffect(() => {
    return () => {
      clearTimer(holdTimerRef);
      clearTimer(leaveTimerRef);
    };
  }, []);

  const displayText = (() => {
    if (phase === "default") return defaultLabel;
    if (phase === "at-hover") return hoverLabel;

    if (phase === "to-hover") {
      return reducedMotion ? hoverLabel : scrambleText(hoverLabel, tick);
    }

    return reducedMotion ? defaultLabel : scrambleText(defaultLabel, tick);
  })();

  return { displayText, activate, deactivate };
}