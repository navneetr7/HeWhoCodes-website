"use client";

import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";
import type { AnimationPlaybackControls } from "motion/react";
import { animate, motion, useMotionValue } from "motion/react";
import {
  glassPillOpacityTransition,
  glassPillSpringTransition,
  glassPillTrackingTransition,
} from "@/lib/motion";
import { cn } from "@/lib/utils";
import "./glass-pill.css";

export type GlassPillMetrics = {
  left: number;
  top: number;
  width: number;
  height: number;
};

export type GlassPillMoveOptions = {
  first?: boolean;
  instant?: boolean;
  tracking?: boolean;
};

export type GlassPillIndicatorHandle = {
  moveTo: (metrics: GlassPillMetrics, options?: GlassPillMoveOptions) => void;
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
    const y = useMotionValue(0);
    const width = useMotionValue(0);
    const height = useMotionValue(0);
    const scaleX = useMotionValue(1);
    const opacity = useMotionValue(0);
    const layoutControlsRef = useRef<AnimationPlaybackControls[]>([]);
    const opacityControlRef = useRef<AnimationPlaybackControls | null>(null);

    const stopLayoutAnimations = () => {
      layoutControlsRef.current.forEach((control) => control.stop());
      layoutControlsRef.current = [];
    };

    const stopOpacityAnimation = () => {
      opacityControlRef.current?.stop();
      opacityControlRef.current = null;
    };

    const stopAnimations = () => {
      stopLayoutAnimations();
      stopOpacityAnimation();
    };

    const setVisible = (visible: boolean) => {
      trackRef.current?.setAttribute("data-visible", visible ? "true" : "false");
    };

    const applyLayout = useCallback(
      (metrics: GlassPillMetrics) => {
        width.set(metrics.width);
        height.set(metrics.height);
        x.set(metrics.left);
        y.set(metrics.top);
        scaleX.set(1);
      },
      [height, scaleX, width, x, y],
    );

    const animateLayout = useCallback(
      (metrics: GlassPillMetrics, options?: GlassPillMoveOptions) => {
        const spring = options?.tracking ? glassPillTrackingTransition : glassPillSpringTransition;

        if (!options?.tracking) {
          stopLayoutAnimations();
        }

        scaleX.set(1);
        layoutControlsRef.current = [
          animate(x, metrics.left, spring),
          animate(y, metrics.top, spring),
          animate(width, metrics.width, spring),
          animate(height, metrics.height, spring),
        ];
      },
      [height, scaleX, width, x, y],
    );

    useImperativeHandle(
      ref,
      () => ({
        moveTo(metrics, options) {
          setVisible(true);

          if (reducedMotion || options?.instant) {
            stopAnimations();
            applyLayout(metrics);
            opacity.set(1);
            return;
          }

          if (options?.first) {
            stopAnimations();
            applyLayout(metrics);
            opacity.set(0);
            opacityControlRef.current = animate(opacity, 1, glassPillOpacityTransition);
            return;
          }

          if (opacity.get() < 1) {
            opacity.set(1);
          }

          animateLayout(metrics, options);
        },
        hide() {
          stopAnimations();
          setVisible(false);

          if (reducedMotion) {
            opacity.set(0);
            return;
          }

          opacityControlRef.current = animate(opacity, 0, glassPillOpacityTransition);
        },
      }),
      [animateLayout, applyLayout, height, opacity, reducedMotion, scaleX, width, x, y],
    );

    return (
      <motion.span
        ref={trackRef}
        aria-hidden
        className={cn("glass-clear-pill-track", className)}
        data-visible="false"
        style={{
          x,
          y,
          width,
          height,
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