import { footerLinks, site } from "@/data/site";
import { GlassPillNav } from "@/components/ui/GlassPillNav";
import "./shell.css";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="shell-footer w-full py-8" id="contact">
      <div className="shell-footer__bar flex w-full items-center justify-between gap-4 text-sm text-foreground/45">
        <p className="min-w-0 shrink-0">
          © {year} {site.owner}. All rights reserved.
        </p>

        <GlassPillNav aria-label="Legal" items={[...footerLinks]} />
      </div>
    </footer>
  );
}