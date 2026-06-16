export type AppAction = {
  label: string;
  href: string;
  disabled?: boolean;
};

export type AppShowcaseData = {
  name: string;
  subtitle: string;
  description: string;
  category: string;
  badges: readonly string[];
  highlightsHeading: string;
  highlights: readonly string[];
  previewAccent: string;
  actions: {
    primary: AppAction;
    secondary?: AppAction;
  };
};