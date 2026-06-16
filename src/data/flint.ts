import type { AppShowcaseData } from "@/features/apps/types";

export const flintShowcase: AppShowcaseData = {
  name: "Flint",
  subtitle: "Attention tracking for macOS",
  description:
    "Flint quietly tracks how you spend time across apps and turns it into a clear picture of focus, distraction, and recovery. No screenshots. No keylogging. No cloud. Everything stays on your device.",
  category: "Focus & Time",
  badges: ["macOS 12+", "On-device", "Private"],
  highlightsHeading: "At a glance",
  highlights: [
    "Understand where your attention goes",
    "Track focus, drift, and recovery over time",
    "Visualise your day with timelines and reports",
    "Build better habits through gentle nudges",
    "AI-powered insights with your own API key",
    "Private by design",
  ],
  previewAccent: "var(--burnt-orange)",
  actions: {
    primary: { label: "Coming soon", href: "#", disabled: true },
    secondary: { label: "Learn more", href: "mailto:hewhocodes@icloud.com?subject=Flint" },
  },
};