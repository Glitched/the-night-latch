import { menu } from "@/menu";

/**
 * Converts a drink title into a URL-safe slug.
 * "Margarita & Co." -> "margarita-co"
 * "Rob Roy" -> "rob-roy"
 */
export function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Normalizes a string for slug matching.
 * Removes non-alpha characters and lowercases.
 * "Rob Roy" -> "robroy"
 * "rob-roy" -> "robroy"
 */
export function normalizeSlug(str: string): string {
  return str.toLowerCase().replace(/[^a-z]/g, "");
}

/**
 * Finds a drink by its URL slug.
 * Supports both "robroy" and "rob-roy" style slugs.
 */
export function findDrinkBySlug(slug: string): (typeof menu)[0] | undefined {
  const normalized = normalizeSlug(slug);
  return menu.find((drink) => normalizeSlug(drink.title) === normalized);
}

/**
 * Generates all valid slugs for static path generation.
 * Returns hyphenated and non-hyphenated versions, plus legacy
 * space-replaced slugs so previously shared links keep working.
 */
export function getAllDrinkSlugs(): string[] {
  const slugs = new Set<string>();
  for (const drink of menu) {
    // Hyphenated version: "Rob Roy" -> "rob-roy"
    slugs.add(slugify(drink.title));

    // Non-hyphenated version: "Rob Roy" -> "robroy"
    slugs.add(normalizeSlug(drink.title));

    // Legacy version with punctuation: "Margarita & Co." -> "margarita-&-co."
    slugs.add(drink.title.toLowerCase().replace(/\s+/g, "-"));
  }
  return [...slugs];
}
