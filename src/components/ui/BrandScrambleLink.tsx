import { site } from "@/data/site";
import { ScrambleText } from "@/components/ui/ScrambleText";
import { brandScrambleHoldMs, brandScrambleLeaveDelayMs } from "@/lib/motion";
import "./typography.css";

export function BrandScrambleLink() {
  return (
    <ScrambleText
      className="brand-scramble-link"
      defaultLabel={site.name}
      holdMs={brandScrambleHoldMs}
      hoverLabel={site.brandHoverName}
      href="/"
      leaveDelayMs={brandScrambleLeaveDelayMs}
    />
  );
}