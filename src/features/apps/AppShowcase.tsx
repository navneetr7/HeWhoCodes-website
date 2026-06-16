import { GlassPanel } from "@/components/ui/GlassPanel";
import "./apps-showcase.css";

export type AppShowcaseData = {
  name: string;
  tagline: string;
  description: string;
  requirements: string;
  highlightsHeading: string;
  highlights: readonly string[];
};

type AppShowcaseProps = {
  app: AppShowcaseData;
};

export function AppShowcase({ app }: AppShowcaseProps) {
  return (
    <article className="app-showcase">
      <GlassPanel className="app-showcase__panel">
        <div className="app-showcase__intro">
          <h2 className="app-showcase__title">{app.name}</h2>
          <div className="app-showcase__tagline-block">
            <p className="app-showcase__tagline">{app.tagline}</p>
            <p className="app-showcase__requirements">{app.requirements}</p>
          </div>
          <p className="app-showcase__description">{app.description}</p>
        </div>

        <section className="app-showcase__highlights-section">
          <h3 className="app-showcase__section-title">{app.highlightsHeading}</h3>
          <ul className="app-showcase__highlights">
            {app.highlights.map((highlight) => (
              <li key={highlight} className="app-showcase__highlight">
                {highlight}
              </li>
            ))}
          </ul>
        </section>
      </GlassPanel>
    </article>
  );
}