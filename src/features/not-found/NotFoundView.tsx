import { unstable_noStore as noStore } from "next/cache";
import { pickNotFoundVariant } from "@/data/not-found";

export function NotFoundView() {
  noStore();
  const variant = pickNotFoundVariant();

  return (
    <main id="main" className="site-main relative flex min-h-screen flex-col">
      <section className="site-content-grid mx-auto flex w-full max-w-7xl flex-1 flex-col items-center justify-center px-5 pb-20 sm:px-8">
        <div
          className="not-found__stage"
          role="status"
          aria-label={`404. ${variant.lineOne} ${variant.lineTwo}. ${variant.eyebrow}`}
        >
          <div className="not-found__stack">
            <p className="glass-display__title not-found__phrase">
              <span className="glass-display__line">{variant.lineOne}</span>
              <span className="glass-display__line">{variant.lineTwo}</span>
            </p>
            <div className="not-found__meta">
              <p className="not-found__code">404</p>
              <p className="not-found__eyebrow">{variant.eyebrow}</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}