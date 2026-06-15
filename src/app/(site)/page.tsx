import { GlassPillNav } from "@/components/ui/GlassPillNav";
import { stackPreview } from "@/data/stack";
import { StackSection } from "@/features/stack/StackSection";

const profileLinks = [
  { href: "https://www.linkedin.com/in/hewhocodes/", label: "LinkedIn" },
  { href: "https://github.com/hewhocodes", label: "GitHub" },
  { href: "mailto:hello@hewhocodes.com", label: "Email" },
  { href: "/resume.pdf", label: "Resume" },
];

const stackPreviewLinks = stackPreview.map((item) => ({
  href: "#stack",
  label: item,
}));

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden pt-36">
      <section className="mx-auto grid w-full max-w-7xl gap-12 px-5 pb-12 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
        <div>
          <p className="mb-5 max-w-2xl font-mono text-sm font-bold leading-6 text-[var(--text-muted-heading)]">
            Engineering useful things.
          </p>

          <h1 className="max-w-4xl text-6xl font-black leading-none text-foreground sm:text-8xl lg:text-9xl">
            Navneet
            <br />
            Raikwar
          </h1>

          <div className="mt-10 grid max-w-xl grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8">
            <div>
              <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-[var(--text-muted-subtle)]">
                Role
              </p>
              <p className="mt-2 font-bold text-foreground">AI Engineer</p>
              <p className="mt-1 font-mono text-xs text-[var(--text-muted-subtle)]">
                IntegratingMe · 2018 - Present
              </p>
            </div>
            <div>
              <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-[var(--text-muted-subtle)]">
                Focus
              </p>
              <p className="mt-2 font-bold text-foreground">Backend Systems · Intelligence · Automation</p>
            </div>
          </div>

          <GlassPillNav
            aria-label="Profile links"
            className="mt-10 w-full flex-wrap font-mono text-xs font-bold uppercase tracking-[0.12em]"
            items={profileLinks}
            separator="/"
          />
        </div>

        <aside className="p-0">
          <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-teal">
            Stack preview
          </p>
          <GlassPillNav
            aria-label="Stack preview"
            className="mt-5 w-full flex-wrap font-mono text-xs"
            instantIndicator
            items={stackPreviewLinks}
            separator="/"
          />
        </aside>
      </section>

      <StackSection />
    </main>
  );
}
