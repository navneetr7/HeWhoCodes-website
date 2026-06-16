import type { AppShowcaseData } from "@/features/apps/types";

export const clipyShowcase: AppShowcaseData = {
  name: "Clipy",
  subtitle: "Clipboard manager for macOS",
  description:
    "Clipy keeps everything you copy within reach — text, links, images, documents, and files. Search instantly, pin what matters, and drag content directly into any app.",
  category: "Productivity",
  badges: ["macOS 26+", "Apple Silicon"],
  highlightsHeading: "At a glance",
  highlights: [
    "Clipboard history that stays out of the way",
    "Search, categories, and pinning built in",
    "Drag and drop into any app",
    "Effortless handling of large files",
    "Designed for macOS",
    "Private by design",
  ],
  previewAccent: "var(--teal)",
  actions: {
    primary: { label: "Coming soon", href: "#", disabled: true },
    secondary: { label: "Learn more", href: "mailto:hewhocodes@icloud.com?subject=Clipy" },
  },
};