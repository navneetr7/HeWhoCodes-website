import { GlassPillNav } from "@/components/ui/GlassPillNav";
import { githubProfile } from "@/data/home";
import { GitHubCalendar } from "./GitHubCalendar";
import type { ContributionDay } from "./contributionCalendar";
import "./github-activity.css";

type ContributionsResponse = { contributions?: unknown };

function isContributionDay(value: unknown): value is ContributionDay {
  if (!value || typeof value !== "object") return false;
  const day = value as Record<string, unknown>;
  return (
    typeof day.date === "string" &&
    /^\d{4}-\d{2}-\d{2}$/.test(day.date) &&
    typeof day.count === "number" &&
    Number.isInteger(day.count) &&
    day.count >= 0 &&
    typeof day.level === "number" &&
    Number.isInteger(day.level) &&
    day.level >= 0 &&
    day.level <= 4
  );
}

async function getContributions() {
  try {
    const response = await fetch(githubProfile.contributionsUrl, { next: { revalidate: 3600 } });
    if (!response.ok) return [];
    const data = (await response.json()) as ContributionsResponse;
    return Array.isArray(data.contributions) ? data.contributions.filter(isContributionDay) : [];
  } catch {
    return [];
  }
}

export async function GitHubActivity() {
  const contributions = await getContributions();

  return (
    <section
      aria-labelledby="github-activity-title"
      className="github-activity site-content-grid mx-auto w-full max-w-7xl px-5 py-12 sm:px-8 sm:py-16"
    >
      <div className="github-activity__content">
        {contributions.length ? (
          <GitHubCalendar contributions={contributions} />
        ) : (
          <div className="github-activity__heading">
            <div>
              <p className="github-activity__eyebrow">Open source</p>
              <h2 id="github-activity-title" className="github-activity__title">GitHub activity</h2>
            </div>
            <GlassPillNav
              aria-label="GitHub profile"
              className="github-activity__period font-mono text-xs"
              items={[{ href: githubProfile.href, label: "View on GitHub" }]}
            />
          </div>
        )}
      </div>
    </section>
  );
}
