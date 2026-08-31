export type ContributionLevel = 0 | 1 | 2 | 3 | 4;

export type ContributionDay = {
  count: number;
  date: string;
  level: ContributionLevel;
};

export type CalendarWindow = {
  endDate: string;
  months: { column: number; label: string; span: number }[];
  startDate: string;
  total: number;
  weeks: (ContributionDay | null)[][];
};

const dayMilliseconds = 86_400_000;
const monthFormatter = new Intl.DateTimeFormat("en-US", { month: "short", timeZone: "UTC" });

function parseDate(date: string) {
  return new Date(`${date}T00:00:00Z`);
}

function formatDate(date: Date) {
  return date.toISOString().slice(0, 10);
}

function buildCalendarWindow(days: ContributionDay[]): CalendarWindow {
  if (!days.length) return { endDate: "", months: [], startDate: "", total: 0, weeks: [] };

  const start = parseDate(days[0].date);
  const end = parseDate(days.at(-1)!.date);
  const gridStart = new Date(start.getTime() - start.getUTCDay() * dayMilliseconds);
  const gridEnd = new Date(end.getTime() + (6 - end.getUTCDay()) * dayMilliseconds);
  const contributions = new Map(days.map((day) => [day.date, day]));
  const weeks: (ContributionDay | null)[][] = [];

  for (let time = gridStart.getTime(); time <= gridEnd.getTime(); time += dayMilliseconds) {
    const date = formatDate(new Date(time));
    const week = Math.floor((time - gridStart.getTime()) / (7 * dayMilliseconds));
    weeks[week] ??= [];
    weeks[week].push(date < days[0].date || date > days.at(-1)!.date ? null : (contributions.get(date) ?? null));
  }

  const monthByColumn = new Map<number, string>();
  for (const day of days) {
    const date = parseDate(day.date);
    if (date.getUTCDate() !== 1 && day !== days[0]) continue;
    const column = Math.floor((date.getTime() - gridStart.getTime()) / (7 * dayMilliseconds)) + 1;
    monthByColumn.set(column, monthFormatter.format(date));
  }

  const monthEntries = [...monthByColumn];

  return {
    endDate: days.at(-1)!.date,
    months: monthEntries.map(([column, label], index) => ({
      column,
      label,
      span: (monthEntries[index + 1]?.[0] ?? weeks.length + 1) - column,
    })),
    startDate: days[0].date,
    total: days.reduce((total, day) => total + day.count, 0),
    weeks,
  };
}

export function getContributionCalendar(contributions: ContributionDay[]) {
  const days = [...contributions].sort((a, b) => a.date.localeCompare(b.date));
  if (!days.length) return buildCalendarWindow([]);

  const latest = parseDate(days.at(-1)!.date);
  const startDate = formatDate(
    new Date(Date.UTC(latest.getUTCFullYear(), latest.getUTCMonth() - 11, 1)),
  );

  return buildCalendarWindow(days.filter((day) => day.date >= startDate));
}
