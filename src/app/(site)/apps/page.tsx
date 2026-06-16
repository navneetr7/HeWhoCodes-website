import { clipyShowcase } from "@/data/cliply";
import { flintShowcase } from "@/data/flint";
import { AppShowcase } from "@/features/apps/AppShowcase";
import { appsPageMetadata } from "@/lib/metadata";

export const metadata = appsPageMetadata;

const apps = [clipyShowcase, flintShowcase];

export default function AppsPage() {
  return (
    <main className="relative min-h-screen pt-36">
      <section className="site-content-grid mx-auto w-full max-w-7xl px-5 pb-20 sm:px-8">
        <p className="mb-5 max-w-2xl font-mono text-sm font-bold leading-6 text-[var(--text-muted-heading)]">
          Experiments, products, and everything between.
        </p>

        <h1 className="text-5xl font-black leading-none text-burnt-orange sm:text-6xl">Apps</h1>

        <div className="apps-showcase-list">
          {apps.map((app) => (
            <AppShowcase key={app.name} app={app} />
          ))}
        </div>
      </section>
    </main>
  );
}