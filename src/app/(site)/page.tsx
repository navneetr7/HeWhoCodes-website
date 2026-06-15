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
      <section className="mx-auto grid w-full max-w-7xl gap-12 px-5 pb-12 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end xl:max-w-[90rem] xl:gap-16 xl:px-12 2xl:max-w-screen-2xl 2xl:gap-20 2xl:px-16">
        <div>
          <p className="mb-5 max-w-2xl font-mono text-sm font-bold leading-6 text-[var(--text-muted-heading)] xl:text-base xl:leading-7 2xl:mb-6 2xl:text-lg 2xl:leading-8">
            Engineering useful things.
          </p>

          <h1 className="max-w-4xl text-6xl font-black leading-none text-foreground sm:text-8xl lg:text-9xl xl:text-[9rem] 2xl:max-w-5xl 2xl:text-[11rem]">
            Navneet
            <br />
            Raikwar
          </h1>

          <div className="mt-10 grid max-w-xl grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 xl:mt-12 xl:max-w-2xl xl:gap-10 2xl:mt-14 2xl:gap-12">
            <div>
              <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-[var(--text-muted-subtle)] xl:text-sm 2xl:text-base">
                Role
              </p>
              <p className="mt-2 font-bold text-foreground xl:text-lg 2xl:text-xl">AI Engineer</p>
              <p className="mt-1 font-mono text-xs text-[var(--text-muted-subtle)] xl:text-sm 2xl:text-base">
                IntegratingMe · 2018 - Present
              </p>
            </div>
            <div>
              <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-[var(--text-muted-subtle)] xl:text-sm 2xl:text-base">
                Focus
              </p>
              <p className="mt-2 font-bold text-foreground xl:text-lg 2xl:text-xl">
                Backend Systems · Intelligence · Automation
              </p>
            </div>
          </div>

          <GlassPillNav
            aria-label="Profile links"
            className="mt-10 flex w-full flex-wrap font-mono text-xs font-bold uppercase tracking-[0.12em] xl:mt-12 xl:text-sm 2xl:mt-14 2xl:text-base"
            items={profileLinks}
            separator="/"
          />
        </div>

        <aside className="p-0 xl:max-w-xl 2xl:max-w-2xl">
          <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-teal xl:text-sm 2xl:text-base">
            Stack preview
          </p>
          <GlassPillNav
            aria-label="Stack preview"
            className="mt-5 flex w-full flex-wrap font-mono text-xs xl:mt-6 xl:text-sm 2xl:mt-8 2xl:text-base"
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
