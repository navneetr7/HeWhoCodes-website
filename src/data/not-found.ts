export type NotFoundVariant = {
  lineOne: string;
  lineTwo: string;
  eyebrow: string;
};

export const notFoundVariants = [
  {
    lineOne: "Dead",
    lineTwo: "end",
    eyebrow: "Nothing deployed here.",
  },
  {
    lineOne: "Beyond the",
    lineTwo: "horizon",
    eyebrow: "You've gone past the edge.",
  },
  {
    lineOne: "Out of",
    lineTwo: "range",
    eyebrow: "This page isn't in orbit yet.",
  },
  {
    lineOne: "Wrong",
    lineTwo: "turn",
    eyebrow: "This path doesn't exist.",
  },
] as const satisfies readonly NotFoundVariant[];

export function pickNotFoundVariant() {
  const index = Math.floor(Math.random() * notFoundVariants.length);
  return notFoundVariants[index];
}