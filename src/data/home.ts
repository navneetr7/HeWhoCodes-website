export const homeIntro = {
  eyebrow: "Engineering useful things.",
  nameLines: ["Navneet", "Raikwar"] as const,
};

export const homeRole = {
  label: "Role",
  title: "AI Engineer",
  detail: "IntegratingMe · 2018 - Present",
};

export const homeFocus = {
  label: "Focus",
  title: "Backend Systems · Intelligence · Automation",
};

const githubUsername = "navneetr7";

export const githubProfile = {
  href: `https://github.com/${githubUsername}`,
  username: githubUsername,
  contributionsUrl: `https://github-contributions-api.jogruber.de/v4/${githubUsername}?y=last`,
} as const;

export const profileLinks = [
  { href: "https://www.linkedin.com/in/hewhocodes", label: "LinkedIn" },
  { href: githubProfile.href, label: "GitHub" },
  { href: "mailto:hewhocodes@icloud.com", label: "Email" },
  { href: "/blog", label: "Blog" },
] as const;

export const stackPreviewLabel = "Stack preview";
