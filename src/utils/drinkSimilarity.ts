import type { Drink } from "@/types/drinks";

/**
 * Calculate similarity score between two drinks based on:
 * - Shared tasting notes (weighted heavily)
 * - Shared ingredients (weighted less)
 */
function getSimilarityScore(a: Drink, b: Drink): number {
  if (a.title === b.title) return -1; // Exclude self

  let score = 0;

  // Shared tasting notes (3 points each)
  const notesA = new Set(a.notes ?? []);
  const notesB = new Set(b.notes ?? []);
  for (const note of notesA) {
    if (notesB.has(note)) score += 3;
  }

  // Shared ingredients (1 point each)
  const ingredientsA = new Set(a.ingredients.map((i) => i.ingredient.name));
  const ingredientsB = new Set(b.ingredients.map((i) => i.ingredient.name));
  for (const ing of ingredientsA) {
    if (ingredientsB.has(ing)) score += 1;
  }

  return score;
}

/**
 * Find the most similar drinks to a given drink
 */
export function getSimilarDrinks(
  drink: Drink,
  allDrinks: Drink[],
  count: number = 3
): Drink[] {
  return allDrinks
    .map((d) => ({ drink: d, score: getSimilarityScore(drink, d) }))
    .filter((d) => d.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, count)
    .map((d) => d.drink);
}
