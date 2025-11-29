import { menu } from "@/menu";
import { getByName, Ingredient, isDescendantOf } from "@/types/ingredient";
import { Shuffle, X } from "@phosphor-icons/react";
import { useState } from "react";
import DrinkListing from "./DrinkListing";
import { FilterModal } from "./FilterModal";
import { SearchInput } from "./SearchInput";
import { Button } from "./ui/button";

/**
 * RANKED SEARCH SYSTEM
 *
 * Searches drinks by name and ingredients using a 10-tier ranking system.
 * Each drink appears only once, at its highest matching tier.
 *
 * Tier priority (highest to lowest):
 *   1. Name starts with query         "neg" → "Negroni"
 *   2. Name initials match            "op" → "Old Pal"
 *   3. Word in name starts with       "pal" → "Old Pal"
 *   4. Name contains query            "gro" → "Negroni"
 *   5. Ingredient starts with         "camp" → drinks with "Campari"
 *   6. Ingredient initials match      "fb" → drinks with "Fernet Branca"
 *   7. Word in ingredient starts with "bra" → drinks with "Fernet Branca"
 *   8. Ingredient contains            "ern" → drinks with "Fernet Branca"
 *   9. Fuzzy name match               "ngi" → "Negroni" (n...g...i in order)
 *  10. Fuzzy ingredient match         "fntb" → drinks with "Fernet Branca"
 */

// Tier 1/5: Target starts with query
function startsWith(query: string, target: string): boolean {
  return target.toLowerCase().startsWith(query.toLowerCase());
}

// Tier 2/6: Each query char matches first letter of each word
// Query length must equal word count (e.g., "op" = 2 chars, "Old Pal" = 2 words)
function initialsMatch(query: string, target: string): boolean {
  const q = query.toLowerCase();
  const words = target.toLowerCase().split(/\s+/);
  if (q.length !== words.length) return false;
  return words.every((word, i) => word[0] === q[i]);
}

// Tier 3/7: Any word in target starts with query
function wordStartsWith(query: string, target: string): boolean {
  const q = query.toLowerCase();
  return target.toLowerCase().split(/\s+/).some((word) => word.startsWith(q));
}

// Tier 4/8: Query appears anywhere in target
function contains(query: string, target: string): boolean {
  return target.toLowerCase().includes(query.toLowerCase());
}

// Tier 9/10: All query chars appear in target in order (not necessarily consecutive)
function fuzzyMatch(query: string, target: string): boolean {
  const q = query.toLowerCase();
  const t = target.toLowerCase();
  let qi = 0;
  for (let ti = 0; ti < t.length && qi < q.length; ti++) {
    if (t[ti] === q[qi]) qi++;
  }
  return qi === q.length;
}

// Helper: returns true if any ingredient in the drink matches using the given matcher
function anyIngredient(
  drink: (typeof menu)[0],
  matcher: (query: string, target: string) => boolean,
  query: string
): boolean {
  return drink.ingredients.some((i) => matcher(query, i.ingredient.name));
}

// Main search function: returns drinks ordered by match quality
function rankedSearch(query: string): typeof menu {
  if (!query) return menu;

  // Build tiers from highest to lowest priority
  const tiers = [
    // Tiers 1-4: Name matches
    menu.filter((d) => startsWith(query, d.title)),
    menu.filter((d) => initialsMatch(query, d.title)),
    menu.filter((d) => wordStartsWith(query, d.title)),
    menu.filter((d) => contains(query, d.title)),
    // Tiers 5-8: Ingredient matches
    menu.filter((d) => anyIngredient(d, startsWith, query)),
    menu.filter((d) => anyIngredient(d, initialsMatch, query)),
    menu.filter((d) => anyIngredient(d, wordStartsWith, query)),
    menu.filter((d) => anyIngredient(d, contains, query)),
    // Tiers 9-10: Fuzzy matches
    menu.filter((d) => fuzzyMatch(query, d.title)),
    menu.filter((d) => anyIngredient(d, fuzzyMatch, query)),
  ];

  // Merge and dedupe: each drink keeps its highest rank (first occurrence)
  const seen = new Set<string>();
  const result: typeof menu = [];
  for (const tier of tiers) {
    for (const drink of tier) {
      if (!seen.has(drink.title)) {
        seen.add(drink.title);
        result.push(drink);
      }
    }
  }

  return result;
}

const Menu = () => {
  const [baseSpirit, setBaseSpirit] = useState<Ingredient | null>(null);
  const [requiredIngredient, setRequiredIngredient] = useState<string | null>(
    null
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [openDrink, setOpenDrink] = useState<string | null>(null);

  const drinks = rankedSearch(searchQuery)
    .filter((drink) => {
      if (!baseSpirit) {
        return true;
      }

      return drink.ingredients.some((i) =>
        isDescendantOf(i.ingredient, baseSpirit)
      );
    })
    .filter((drink) => {
      const ingredient = getByName(requiredIngredient ?? "");
      if (!ingredient) {
        return true;
      }

      return drink.ingredients.some((i) =>
        isDescendantOf(i.ingredient, ingredient)
      );
    });

  const hasFilters = baseSpirit || requiredIngredient || searchQuery;
  const totalDrinks = menu.length;

  return (
    <section className="flex-grow">
      <div className="flex justify-center items-center gap-4 mb-16 print:hidden">
        <SearchInput value={searchQuery} onChange={setSearchQuery} />
        <FilterModal
          setBaseSpirit={setBaseSpirit}
          baseSpirit={baseSpirit}
          setRequiredIngredient={setRequiredIngredient}
          requiredIngredient={requiredIngredient}
        />
      </div>
      {(baseSpirit || requiredIngredient) && (
        <div className="flex flex-wrap justify-center gap-2 mb-8 -mt-12 print:hidden">
          {baseSpirit && (
            <button
              onClick={() => setBaseSpirit(null)}
              className="inline-flex items-center gap-1 px-3 py-1 text-sm bg-secondary text-secondary-foreground rounded-full hover:bg-secondary/80"
            >
              {baseSpirit.name}
              <X size={14} />
            </button>
          )}
          {requiredIngredient && (
            <button
              onClick={() => setRequiredIngredient(null)}
              className="inline-flex items-center gap-1 px-3 py-1 text-sm bg-secondary text-secondary-foreground rounded-full hover:bg-secondary/80"
            >
              {requiredIngredient}
              <X size={14} />
            </button>
          )}
        </div>
      )}
      {drinks.length > 0 ? (
        <>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-8 p-0">
            {drinks.map((drink) => (
              <DrinkListing
                drink={drink}
                key={drink.title}
                open={openDrink === drink.title}
                onOpenChange={(open) => setOpenDrink(open ? drink.title : null)}
              />
            ))}
          </ul>
          <div className="flex flex-col items-center gap-4 mt-8 print:hidden">
            <Button
              variant="outline"
              onClick={() => {
                const randomDrink = drinks[Math.floor(Math.random() * drinks.length)];
                if (randomDrink) setOpenDrink(randomDrink.title);
              }}
            >
              <Shuffle size={18} />
              Surprise me
            </Button>
            <p className="text-base text-muted-foreground">
              {hasFilters
                ? `Showing ${drinks.length} of ${totalDrinks} drinks`
                : `${totalDrinks} drinks`}
            </p>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <p>Better luck next time.</p>
          <Button
            className="mt-4"
            variant="outline"
            onClick={() => {
              setBaseSpirit(null);
              setRequiredIngredient(null);
            }}
          >
            Reset
          </Button>
        </div>
      )}
    </section>
  );
};

export default Menu;
