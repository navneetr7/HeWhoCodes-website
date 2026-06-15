"use client";

import { navItems } from "@/data/site";
import { GlassPillNav } from "@/components/ui/GlassPillNav";

export function NavGlassNav() {
  return (
    <GlassPillNav
      aria-label="Primary"
      scrollable
      className="font-semibold text-[0.6875rem] sm:text-base"
      items={navItems.map((item) => ({
        label: item,
        href: `#${item.toLowerCase()}`,
      }))}
      separator="/"
    />
  );
}