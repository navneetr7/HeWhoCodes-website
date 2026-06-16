"use client";

import { navLinks } from "@/data/site";
import { GlassPillNav } from "@/components/ui/GlassPillNav";

export function NavGlassNav() {
  return (
    <GlassPillNav
      aria-label="Primary"
      className="site-header__primary-nav font-semibold text-[0.6875rem] sm:text-base"
      items={navLinks.map((item) => ({
        label: item.label,
        href: item.href,
      }))}
      separator="/"
    />
  );
}