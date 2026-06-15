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
  instantIndicator?: boolean;
  scrollable?: boolean;
  separator?: string;
  tailCluster?: number;
  "aria-label"?: string;
};

function isInternalRoute(href: string) {
  return href.startsWith("/") && !href.startsWith("//");
}

export function GlassPillNav({
  items,
  className,
  instantIndicator = false,
  scrollable = false,
  separator,
  tailCluster = 0,
  "aria-label": ariaLabel,
}: GlassPillNavProps) {
  const { hide, indicatorRef, moveTo, moveToPointer, setNavRef, reducedMotion } =
    useGlassPillIndicator();

  const linkProps = (index: number) => ({
    className: "glass-clear-pill-link",
    onFocus: () => moveTo(index, { instant: instantIndicator }),
  });

  const trackPointer = (clientX: number, clientY: number) => {
    moveToPointer(clientX, clientY, { instant: instantIndicator });
  };

  const renderItem = (item: GlassPillItem, index: number, showSeparatorAfter: boolean) => (
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
      {separator && showSeparatorAfter ? (
        <span className="glass-clear-pill-separator">{separator}</span>
      ) : null}
    </Fragment>
  );

  const clusterSize =
    tailCluster > 1 && tailCluster < items.length ? tailCluster : 0;
  const splitIndex = clusterSize ? items.length - clusterSize : items.length;

  const links =
    clusterSize > 0 ? (
      <>
        {items
          .slice(0, splitIndex)
          .map((item, index) => renderItem(item, index, true))}
        <span className="glass-clear-pill-cluster inline-flex items-center gap-1">
          {items
            .slice(splitIndex)
            .map((item, offset) =>
              renderItem(item, splitIndex + offset, offset < clusterSize - 1),
            )}
        </span>
      </>
    ) : (
      items.map((item, index) => renderItem(item, index, index < items.length - 1))
    );

  return (
    <nav
      ref={setNavRef}
      aria-label={ariaLabel}
      className={cn(
        "glass-clear-pill-nav flex items-center gap-1",
        scrollable && "glass-clear-pill-nav--scrollable",
        className,
      )}
      onPointerEnter={(event) => trackPointer(event.clientX, event.clientY)}
      onPointerLeave={hide}
      onPointerMove={(event) => trackPointer(event.clientX, event.clientY)}
    >
      <GlassPillIndicator ref={indicatorRef} reducedMotion={reducedMotion} />

      {scrollable ? (
        <div className="glass-clear-pill-scroll flex min-w-0 items-center gap-1">{links}</div>
      ) : (
        links
      )}
    </nav>
  );
}
