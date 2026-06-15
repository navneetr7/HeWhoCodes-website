import { BrandScrambleLink } from "@/components/ui/BrandScrambleLink";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { NavGlassNav } from "@/components/ui/NavGlassNav";
import { MdKeyboardCommandKey } from "react-icons/md";
import "./shell.css";
import "@/components/ui/typography.css";

export function Header() {
  return (
    <header className="fixed inset-x-0 top-5 z-30 px-4">
      <GlassPanel className="mx-auto flex w-fit max-w-[calc(100vw-2rem)] items-center gap-4 overflow-visible rounded-full px-5 py-3 text-base">
        <MdKeyboardCommandKey aria-hidden className="size-5 shrink-0 text-accent" />
        <BrandScrambleLink />
        <span aria-hidden className="shell-divider" />
        <NavGlassNav />
      </GlassPanel>
    </header>
  );
}