"use client";

import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";
import type { AnimationPlaybackControls } from "motion/react";
import { animate, motion, useMotionValue } from "motion/react";
import { glassPillOpacityTransition, glassPillSpringTransition } from "@/lib/motion";
import { cn } from "@/lib/utils";
import "./glass-pill.css";

export type GlassPillMetrics = {
  left: number;
  width: number;
};

export type GlassPillIndicatorHandle = {
  moveTo: (metrics: GlassPillMetrics, options?: { first?: boolean; instant?: boolean }) => void;
  hide: () => void;
};

type GlassPillIndicatorProps = {
  reducedMotion: boolean;
  className?: string;
};

export const GlassPillIndicator = forwardRef<GlassPillIndicatorHandle, GlassPillIndicatorProps>(
  function GlassPillIndicator({ reducedMotion, className }, ref) {
    const trackRef = useRef<HTMLSpanElement>(null);
    const x = useMotionValue(0);
    const width = useMotionValue(0);
    const scaleX = useMotionValue(1);
    const opacity = useMotionValue(0);
    const animControlsRef = useRef<AnimationPlaybackControls[]>([]);

    const stopAnimations = () => {
      animControlsRef.current.forEach((control) => control.stop());
      animControlsRef.current = [];
    };

    const setVisible = (visible: boolean) => {
      trackRef.current?.setAttribute("data-visible", visible ? "true" : "false");
    };

    const applyLayout = useCallback(
      (metrics: GlassPillMetrics) => {
        width.set(metrics.width);
        x.set(metrics.left);
        scaleX.set(1);
      },
      [scaleX, width, x],
    );

    useImperativeHandle(
      ref,
      () => ({
        moveTo(metrics, options) {
          stopAnimations();
          setVisible(true);

          if (reducedMotion || options?.instant) {
            applyLayout(metrics);
            opacity.set(1);
            return;
          }

          if (options?.first) {
            applyLayout(metrics);
            opacity.set(0);
            animControlsRef.current = [
              animate(opacity, 1, glassPillOpacityTransition),
              animate(scaleX, 1, glassPillSpringTransition),
            ];
            return;
          }

          const currentVisualWidth = width.get() * scaleX.get();
          const nextScaleX =
            metrics.width > 0 ? Math.max(currentVisualWidth / metrics.width, 0.01) : 1;

          width.set(metrics.width);
          scaleX.set(nextScaleX);

          animControlsRef.current = [
            animate(x, metrics.left, glassPillSpringTransition),
            animate(scaleX, 1, glassPillSpringTransition),
          ];
        },
        hide() {
          stopAnimations();
          setVisible(false);

          if (reducedMotion) {
            opacity.set(0);
            return;
          }

          animControlsRef.current = [animate(opacity, 0, glassPillOpacityTransition)];
        },
      }),
      [applyLayout, opacity, reducedMotion, scaleX, width, x],
    );

    return (
      <motion.span
        ref={trackRef}
        aria-hidden
        className={cn("glass-clear-pill-track", className)}
        data-visible="false"
        style={{
          x,
          width,
          scaleX,
          opacity,
          originX: 0,
          originY: 0.5,
        }}
      >
        <span className="glass-clear-pill-surface" />
      </motion.span>
    );
  },
);
