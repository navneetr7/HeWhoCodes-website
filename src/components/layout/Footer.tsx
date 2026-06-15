import { footerLinks, site } from "@/data/site";
import { GlassPillNav } from "@/components/ui/GlassPillNav";
import "./shell.css";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="shell-footer px-5 py-8 sm:px-8" id="contact">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 text-sm text-foreground/45 sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {year} {site.owner}. All rights reserved.
        </p>

        <GlassPillNav aria-label="Legal" items={[...footerLinks]} />
      </div>
    </footer>
  );
}