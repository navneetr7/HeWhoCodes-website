import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";
import "./glass-surfaces.css";

type GlassPanelProps = ComponentPropsWithoutRef<"div"> & {
  tone?: "frosted" | "clear";
};

export function GlassPanel({
  className,
  tone = "frosted",
  ...props
}: GlassPanelProps) {
  return (
    <div
      className={cn("rounded-[2rem]", tone === "frosted" ? "glass-frosted" : "glass-clear-surface", className)}
      {...props}
    />
  );
}