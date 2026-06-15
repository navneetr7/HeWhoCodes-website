"use client";

import { navItems } from "@/data/site";
import { GlassPillNav } from "@/components/ui/GlassPillNav";

export function NavGlassNav() {
  return (
    <GlassPillNav
      aria-label="Primary"
      className="font-semibold"
      items={navItems.map((item) => ({
        label: item,
        href: `#${item.toLowerCase()}`,
      }))}
      separator="/"
    />
  );
}