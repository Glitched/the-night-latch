import { menu } from "@/menu";

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
 * Returns both hyphenated and non-hyphenated versions.
 */
export function getAllDrinkSlugs(): string[] {
  const slugs: string[] = [];
  for (const drink of menu) {
    // Add lowercase hyphenated version: "Rob Roy" -> "rob-roy"
    const hyphenated = drink.title.toLowerCase().replace(/\s+/g, "-");
    slugs.push(hyphenated);

    // Add non-hyphenated version: "Rob Roy" -> "robroy"
    const compact = normalizeSlug(drink.title);
    if (compact !== hyphenated.replace(/-/g, "")) {
      slugs.push(compact);
    }
  }
  return slugs;
}
