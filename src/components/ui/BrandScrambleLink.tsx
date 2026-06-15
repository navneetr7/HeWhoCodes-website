import { site } from "@/data/site";
import { ScrambleText } from "@/components/ui/ScrambleText";
import "./typography.css";

export function BrandScrambleLink() {
  return (
    <ScrambleText
      className="brand-scramble-link"
      defaultLabel={site.name}
      hoverLabel={site.brandHoverName}
      href="/"
    />
  );
}