export const scrambleGlyphs = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

export function scrambleText(label: string, tick: number, glyphs = scrambleGlyphs) {
  return [...label]
    .map((char, index) => {
      if (char === " " || index < tick) return char;
      return glyphs[(tick * 5 + index * 7) % glyphs.length];
    })
    .join("");
}