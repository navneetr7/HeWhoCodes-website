import Link from "next/link";
import type { CSSProperties } from "react";
import { GlassPanel } from "@/components/ui/GlassPanel";
import type { AppShowcaseData } from "@/features/apps/types";
import { isInternalHref } from "@/lib/routes";
import "./apps-showcase.css";

type AppShowcaseProps = {
  app: AppShowcaseData;
};

function AppActionButton({
  action,
  variant,
}: {
  action: AppShowcaseData["actions"]["primary"];
  variant: "primary" | "secondary";
}) {
  const className = `app-showcase__cta app-showcase__cta--${variant}`;

  if (action.disabled) {
    return (
      <span aria-disabled="true" className={className}>
        {action.label}
      </span>
    );
  }

  if (isInternalHref(action.href)) {
    return (
      <Link className={className} href={action.href}>
        {action.label}
      </Link>
    );
  }

  return (
    <a className={className} href={action.href}>
      {action.label}
    </a>
  );
}

function AppPreview({ app }: { app: AppShowcaseData }) {
  return (
    <div
      aria-hidden
      className="app-showcase__preview"
      style={{ "--app-preview-accent": app.previewAccent } as CSSProperties}
    >
      <div className="app-showcase__preview-chrome">
        <span />
        <span />
        <span />
      </div>
      <div className="app-showcase__preview-body">
        <span className="app-showcase__preview-label">{app.name}</span>
      </div>
    </div>
  );
}

export function AppShowcase({ app }: AppShowcaseProps) {
  return (
    <article className="app-showcase">
      <GlassPanel className="app-showcase__panel">
        <div className="app-showcase__layout">
          <div className="app-showcase__main">
            <header className="app-showcase__header">
              <div className="app-showcase__heading">
                <h2 className="app-showcase__title">{app.name}</h2>
                <p className="app-showcase__subtitle">{app.subtitle}</p>
              </div>

              <div className="app-showcase__meta">
                <span className="app-showcase__badge app-showcase__badge--category">{app.category}</span>
                {app.badges.map((badge) => (
                  <span key={badge} className="app-showcase__badge">
                    {badge}
                  </span>
                ))}
              </div>

              <p className="app-showcase__description">{app.description}</p>
            </header>

            <section className="app-showcase__highlights-section">
              <h3 className="app-showcase__section-title">{app.highlightsHeading}</h3>
              <ul className="app-showcase__highlights">
                {app.highlights.map((highlight) => (
                  <li key={highlight} className="app-showcase__highlight">
                    {highlight}
                  </li>
                ))}
              </ul>

              <div className="app-showcase__actions">
                <AppActionButton action={app.actions.primary} variant="primary" />
                {app.actions.secondary ? (
                  <AppActionButton action={app.actions.secondary} variant="secondary" />
                ) : null}
              </div>
            </section>
          </div>

          <AppPreview app={app} />
        </div>
      </GlassPanel>
    </article>
  );
}