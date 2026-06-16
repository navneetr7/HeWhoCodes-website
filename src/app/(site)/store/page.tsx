import { storeHorizon, storeIntro } from "@/data/store";
import { storePageMetadata } from "@/lib/metadata";
import "@/features/store/store-section.css";

export const metadata = storePageMetadata;

export default function StorePage() {
  return (
    <main className="relative min-h-screen pt-36">
      <section className="site-content-grid mx-auto w-full max-w-7xl px-5 pb-20 sm:px-8">
        <p className="mb-5 max-w-2xl font-mono text-sm font-bold leading-6 text-[var(--text-muted-heading)]">
          {storeIntro.eyebrow}
        </p>

        <h1 className="text-5xl font-black leading-none text-burnt-orange sm:text-6xl">{storeIntro.title}</h1>

        <div className="store-horizon__stage">
          <p className="store-horizon__title">
            <span className="store-horizon__line">{storeHorizon.lineOne}</span>
            <span className="store-horizon__line">{storeHorizon.lineTwo}</span>
          </p>
        </div>
      </section>
    </main>
  );
}