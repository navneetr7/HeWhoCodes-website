"use client";

import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import { useScrambleText } from "@/hooks/useScrambleText";
import { cn } from "@/lib/utils";

type ScrambleTextBaseProps = {
  defaultLabel: string;
  hoverLabel: string;
  className?: string;
  stepMs?: number;
  holdMs?: number;
  leaveDelayMs?: number;
};

type ScrambleTextLinkProps = ScrambleTextBaseProps &
  Omit<ComponentPropsWithoutRef<typeof Link>, "children"> & {
    href: string;
  };

type ScrambleTextSpanProps = ScrambleTextBaseProps &
  Omit<ComponentPropsWithoutRef<"span">, "children"> & {
    href?: undefined;
  };

export type ScrambleTextProps = ScrambleTextLinkProps | ScrambleTextSpanProps;

export function ScrambleText({
  defaultLabel,
  hoverLabel,
  className,
  stepMs,
  holdMs,
  leaveDelayMs,
  href,
  ...props
}: ScrambleTextProps) {
  const { displayText, activate, deactivate } = useScrambleText({
    defaultLabel,
    hoverLabel,
    stepMs,
    holdMs,
    leaveDelayMs,
  });

  const interactionHandlers = {
    onBlur: deactivate,
    onFocus: activate,
    onMouseEnter: activate,
    onMouseLeave: deactivate,
  };

  if (href) {
    const linkProps = props as Omit<ScrambleTextLinkProps, keyof ScrambleTextBaseProps | "href">;

    return (
      <Link className={cn(className)} href={href} {...interactionHandlers} {...linkProps}>
        {displayText}
      </Link>
    );
  }

  const spanProps = props as Omit<ScrambleTextSpanProps, keyof ScrambleTextBaseProps>;

  return (
    <span className={cn(className)} {...interactionHandlers} {...spanProps}>
      {displayText}
    </span>
  );
}