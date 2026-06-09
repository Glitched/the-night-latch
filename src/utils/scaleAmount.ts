import { parseMixedNumber } from "./drinkStrength";

// Matches mixed numbers ("1 1/2"), fractions ("3/4"), and integers, so
// ranges like "6-8 leaves" scale both ends
const NUMBER_TOKEN = /\d+\s+\d+\/\d+|\d+\/\d+|\d+/g;

function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

/**
 * Formats a decimal as a mixed fraction to the nearest eighth, the
 * finest unit on the menu. 2.25 -> "2 1/4", 0.375 -> "3/8".
 */
function formatMixedNumber(value: number): string {
  const whole = Math.floor(value);
  const eighths = Math.round((value - whole) * 8);
  if (eighths === 0) return `${whole}`;
  if (eighths === 8) return `${whole + 1}`;
  const divisor = gcd(eighths, 8);
  const fraction = `${eighths / divisor}/${8 / divisor}`;
  return whole > 0 ? `${whole} ${fraction}` : fraction;
}

/**
 * Scales the numeric parts of an amount string for batching.
 * "1 1/2 oz" × 2 -> "3 oz", "1 dash" × 3 -> "3 dashes",
 * "6-8 leaves" × 2 -> "12-16 leaves". Non-numeric amounts like
 * "to taste" pass through unchanged.
 */
export function scaleAmount(amount: string, factor: number): string {
  if (factor === 1) return amount;

  const scaled = amount.replace(NUMBER_TOKEN, (token) =>
    formatMixedNumber(parseMixedNumber(token) * factor)
  );

  return scaled
    .replace(/^(\d+) dash(es)?/, (_, n) => `${n} ${n === "1" ? "dash" : "dashes"}`)
    .replace(/^(\d+) barspoon(s)?/, (_, n) => `${n} ${n === "1" ? "barspoon" : "barspoons"}`);
}
