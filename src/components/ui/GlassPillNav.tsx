"use client";

import Link from "next/link";
import { Fragment } from "react";
import { GlassPillIndicator } from "@/components/ui/GlassPillIndicator";
import { useGlassPillIndicator } from "@/hooks/useGlassPillIndicator";
import { cn } from "@/lib/utils";
import "./glass-pill.css";

export type GlassPillItem = {
  label: string;
  href: string;
};

type GlassPillNavProps = {
  items: GlassPillItem[];
  className?: string;
  separator?: string;
  "aria-label"?: string;
};

function isInternalRoute(href: string) {
  return href.startsWith("/") && !href.startsWith("//");
}

export function GlassPillNav({
  items,
  className,
  separator,
  "aria-label": ariaLabel,
}: GlassPillNavProps) {
  const { hide, indicatorRef, moveTo, navRef, reducedMotion } = useGlassPillIndicator();

  const linkProps = (index: number) => ({
    className: "glass-clear-pill-link",
    onFocus: () => moveTo(index),
    onMouseEnter: () => moveTo(index),
  });

  return (
    <nav
      ref={navRef}
      aria-label={ariaLabel}
      className={cn("glass-clear-pill-nav flex items-center gap-1", className)}
      onMouseLeave={hide}
    >
      <GlassPillIndicator ref={indicatorRef} reducedMotion={reducedMotion} />

      {items.map((item, index) => (
        <Fragment key={`${item.href}-${item.label}`}>
          {isInternalRoute(item.href) ? (
            <Link {...linkProps(index)} href={item.href}>
              {item.label}
            </Link>
          ) : (
            <a {...linkProps(index)} href={item.href}>
              {item.label}
            </a>
          )}
          {separator && index < items.length - 1 ? (
            <span className="glass-clear-pill-separator">{separator}</span>
          ) : null}
        </Fragment>
      ))}
    </nav>
  );
}