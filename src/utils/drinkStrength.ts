import type { Drink } from "@/types/drinks";

/**
 * Parses an amount string like "1 1/2 oz" into a numeric oz value.
 * Handles fractions, mixed numbers, dashes, barspoons, and edge cases.
 */
export function parseOz(amount: string | undefined): number {
  if (!amount) return 0;

  const s = amount.toLowerCase().trim();

  // Special cases
  if (s === "to taste" || s.includes("leaves")) return 0;
  if (s.includes("dash")) {
    // A dash is approximately 1/32 oz (some say 1/48, we'll use 1/32)
    const match = s.match(/^(\d+)\s*dash/);
    const count = match?.[1] ? parseInt(match[1], 10) : 1;
    return count * (1 / 32);
  }
  if (s.includes("barspoon")) {
    // A barspoon is approximately 1/8 oz
    const match = s.match(/^(\d+)\s*barspoon/);
    const count = match?.[1] ? parseInt(match[1], 10) : 1;
    return count * 0.125;
  }

  // Remove "oz" suffix
  const withoutOz = s.replace(/\s*oz$/, "").trim();
  if (!withoutOz) return 0;

  // Parse mixed number like "1 1/2" or just "1" or just "3/4"
  return parseMixedNumber(withoutOz);
}

/**
 * Parses a mixed number string like "1 1/2" into a decimal.
 * Also handles plain integers "2" and plain fractions "3/4".
 */
function parseMixedNumber(s: string): number {
  const parts = s.split(/\s+/);

  if (parts.length === 2 && parts[0] && parts[1]) {
    // Mixed number: "1 1/2"
    const whole = parseInt(parts[0], 10);
    const frac = parseFraction(parts[1]);
    return whole + frac;
  } else if (parts.length === 1 && parts[0]) {
    // Either a whole number or a fraction
    if (parts[0].includes("/")) {
      return parseFraction(parts[0]);
    }
    return parseFloat(parts[0]) || 0;
  }

  return 0;
}

/**
 * Parses a fraction string like "3/4" into a decimal.
 */
function parseFraction(s: string): number {
  const [num, denom] = s.split("/").map((x) => parseInt(x, 10));
  if (!num || !denom || denom === 0) return 0;
  return num / denom;
}

/**
 * Calculates the estimated ABV of a drink based on its ingredients.
 * Returns the ABV as a percentage (e.g., 25 for 25%).
 * Returns null if the drink has no measurable alcohol content.
 */
export function calculateDrinkStrength(drink: Drink): number | null {
  let totalAlcoholOz = 0;
  let totalOz = 0;

  for (const { ingredient, amount } of drink.ingredients) {
    const oz = parseOz(amount);
    const abv = ingredient.abv ?? 0;

    totalAlcoholOz += oz * (abv / 100);
    totalOz += oz;
  }

  // If we have no measurable volume, can't calculate
  if (totalOz === 0) return null;

  // Return ABV as percentage
  return (totalAlcoholOz / totalOz) * 100;
}

/**
 * Formats drink strength for display.
 * Returns a string like "25% ABV" or null if not calculable.
 */
export function formatDrinkStrength(drink: Drink): string | null {
  const abv = calculateDrinkStrength(drink);
  if (abv === null) return null;

  // Round to nearest whole number
  return `${Math.round(abv)}% ABV`;
}

/**
 * Calculates "Drink Units" (DUs) - a fun easter egg metric.
 * DU = ABV (as integer) × total ounces
 * e.g., 20% ABV × 5oz = 100 DUs
 */
export function calculateDrinkUnits(drink: Drink): number | null {
  const abv = calculateDrinkStrength(drink);
  if (abv === null) return null;

  let totalOz = 0;
  for (const { amount } of drink.ingredients) {
    totalOz += parseOz(amount);
  }

  if (totalOz === 0) return null;

  return Math.round(abv) * totalOz;
}
