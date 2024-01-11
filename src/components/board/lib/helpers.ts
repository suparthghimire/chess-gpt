import { Square } from "chess.js";

export const IndicesToPGN = (i: number, j: number): Square => {
  const files = ["a", "b", "c", "d", "e", "f", "g", "h"];
  const ranks = [8, 7, 6, 5, 4, 3, 2, 1];

  const file = files[j];
  const rank = ranks[i];

  return `${file}${rank}` as Square;
};
