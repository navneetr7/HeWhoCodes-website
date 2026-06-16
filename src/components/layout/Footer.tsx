import { footerLinks, site } from "@/data/site";
import { GlassPillNav } from "@/components/ui/GlassPillNav";
import "./shell.css";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="shell-footer w-full py-8" id="contact">
      <div className="shell-footer__bar flex w-full flex-col items-center gap-3 text-center text-sm text-foreground/45 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:text-left">
        <p className="min-w-0">
          © {year} {site.owner}. All rights reserved.
        </p>

        <GlassPillNav aria-label="Legal" className="shell-footer__legal-nav w-auto" items={[...footerLinks]} />
      </div>
    </footer>
  );
}