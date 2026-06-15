import { BrandScrambleLink } from "@/components/ui/BrandScrambleLink";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { NavGlassNav } from "@/components/ui/NavGlassNav";
import { MdKeyboardCommandKey } from "react-icons/md";
import "./shell.css";
import "@/components/ui/typography.css";

export function Header() {
  return (
    <header className="site-header fixed inset-x-0 top-3 z-30 px-3 sm:top-5 sm:px-4">
      <GlassPanel className="mx-auto flex w-fit max-w-[calc(100vw-1.5rem)] items-center gap-1.5 overflow-visible rounded-full px-3 py-2 text-[0.6875rem] sm:max-w-[calc(100vw-2rem)] sm:gap-4 sm:px-5 sm:py-3 sm:text-base">
        <MdKeyboardCommandKey aria-hidden className="size-3.5 shrink-0 text-accent sm:size-5" />
        <BrandScrambleLink />
        <span aria-hidden className="shell-divider shell-divider--compact" />
        <NavGlassNav />
      </GlassPanel>
    </header>
  );
}