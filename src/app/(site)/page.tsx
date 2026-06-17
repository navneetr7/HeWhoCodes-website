import { GlassPillNav } from "@/components/ui/GlassPillNav";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  homeFocus,
  homeIntro,
  homeRole,
  profileLinks,
  stackPreviewLabel,
} from "@/data/home";
import { stackPreview } from "@/data/stack";
import { StackSection } from "@/features/stack/StackSection";
import { homePageJsonLd } from "@/lib/json-ld";
import { homePageMetadata } from "@/lib/metadata";

export const metadata = homePageMetadata;

const stackPreviewLinks = stackPreview.map((item) => ({
  href: "#stack",
  label: item,
}));

export default function Home() {
  return (
    <main id="main" className="site-main relative min-h-screen overflow-hidden">
      <JsonLd data={homePageJsonLd} />
      <section className="site-content-grid site-hero-grid mx-auto grid w-full max-w-7xl gap-12 px-5 pb-12 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
        <div className="min-w-0">
          <p className="page-eyebrow">{homeIntro.eyebrow}</p>

          <h1 className="max-w-4xl text-6xl font-black leading-none text-hero-name sm:text-8xl lg:text-9xl">
            {homeIntro.nameLines[0]}
            <br />
            {homeIntro.nameLines[1]}
          </h1>

          <div className="mt-10 grid max-w-xl grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8">
            <div>
              <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-[var(--text-muted-subtle)]">
                {homeRole.label}
              </p>
              <p className="mt-2 font-bold text-foreground">{homeRole.title}</p>
              <p className="mt-1 font-mono text-xs text-[var(--text-muted-subtle)]">{homeRole.detail}</p>
            </div>
            <div>
              <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-[var(--text-muted-subtle)]">
                {homeFocus.label}
              </p>
              <p className="mt-2 font-bold text-foreground">{homeFocus.title}</p>
            </div>
          </div>

          <GlassPillNav
            aria-label="Profile links"
            className="mt-10 flex w-full flex-wrap font-mono text-xs font-bold uppercase tracking-[0.12em]"
            items={[...profileLinks]}
            separator="/"
          />
        </div>

        <aside className="min-w-0 p-0">
          <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-teal">{stackPreviewLabel}</p>
          <GlassPillNav
            aria-label="Stack preview"
            className="mt-5 flex w-full flex-wrap font-mono text-xs"
            items={stackPreviewLinks}
            separator="/"
            tailCluster={2}
          />
        </aside>
      </section>

      <StackSection />
    </main>
  );
}