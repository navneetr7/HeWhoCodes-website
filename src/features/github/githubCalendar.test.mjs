import assert from "node:assert/strict";
import test from "node:test";
import { getContributionCalendar } from "./contributionCalendar.ts";

test("builds a continuous calendar for the latest 12 months", () => {
  const contributions = [];
  for (let date = new Date("2025-08-31T00:00:00Z"); date <= new Date("2026-08-30T00:00:00Z"); date.setUTCDate(date.getUTCDate() + 1)) {
    contributions.push({ count: 1, date: date.toISOString().slice(0, 10), level: 1 });
  }

  const calendar = getContributionCalendar(contributions);

  assert.equal(calendar.startDate, "2025-09-01");
  assert.equal(calendar.endDate, "2026-08-30");
  assert.equal(calendar.total, 364);
  assert.deepEqual(calendar.months.map((month) => month.label), ["Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"]);
  assert.equal(calendar.months.reduce((total, month) => total + month.span, 0), calendar.weeks.length);
  assert.ok(calendar.weeks.every((week) => week.length === 7));
});
