import type { CSSProperties } from "react";
import type { ContributionDay } from "./contributionCalendar";
import { getContributionCalendar } from "./contributionCalendar";

const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const dateFormatter = new Intl.DateTimeFormat("en-US", {
  day: "numeric",
  month: "short",
  timeZone: "UTC",
  year: "numeric",
});

function formatDate(date: string) {
  return dateFormatter.format(new Date(`${date}T00:00:00Z`));
}

export function GitHubCalendar({ contributions }: { contributions: ContributionDay[] }) {
  const calendar = getContributionCalendar(contributions);
  const gridStyle = { "--week-count": calendar.weeks.length } as CSSProperties;

  return (
    <>
      <div className="github-activity__heading">
        <div>
          <p className="github-activity__eyebrow">Open source</p>
          <h2 id="github-activity-title" className="github-activity__title">
            GitHub activity
          </h2>
        </div>
        <span className="github-activity__range">Latest 12 months</span>
      </div>

      <div className="github-calendar__scroll">
        <div
          className="github-calendar"
          role="img"
          aria-label={`GitHub contributions from ${formatDate(calendar.startDate)} to ${formatDate(calendar.endDate)}`}
        >
          <div className="github-calendar__months" style={gridStyle} aria-hidden>
            {calendar.months.map((month) => (
              <span
                key={`${month.column}-${month.label}`}
                style={{ gridColumn: `${month.column} / span ${month.span}` }}
              >
                {month.label}
              </span>
            ))}
          </div>
          <div className="github-calendar__body">
            <div className="github-calendar__weekdays" aria-hidden>
              {weekdays.map((day) => <span key={day}>{day}</span>)}
            </div>
            <div className="github-calendar__weeks" style={gridStyle} aria-hidden>
              {calendar.weeks.flatMap((week, weekIndex) =>
                week.map((day, dayIndex) => (
                  <span
                    key={`${weekIndex}-${dayIndex}`}
                    className="github-calendar__day"
                    data-level={day?.level}
                    title={day ? `${day.count} contribution${day.count === 1 ? "" : "s"} on ${formatDate(day.date)}` : undefined}
                  />
                )),
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="github-activity__summary">
        <span>
          {calendar.total.toLocaleString("en-US")} contributions · {formatDate(calendar.startDate)} – {formatDate(calendar.endDate)}
        </span>
        <span className="github-calendar__legend" aria-label="Contribution intensity from less to more">
          Less
          {[0, 1, 2, 3, 4].map((level) => <i key={level} data-level={level} />)}
          More
        </span>
      </div>
    </>
  );
}
