import { menu } from "@/menu";
import { getByName, Ingredient, isDescendantOf } from "@/types/ingredient";
import { getConfettiColors } from "@/utils/confettiColors";
import { Shuffle, X } from "@phosphor-icons/react";
import confetti from "canvas-confetti";
import { useCallback, useEffect, useRef, useState } from "react";
import { findDrinkBySlug } from "@/utils/drinkSlug";
import DrinkListing from "./DrinkListing";
import { FilterModal } from "./FilterModal";
import { PullIndicator } from "./PullIndicator";
import { SearchInput, type SearchInputHandle } from "./SearchInput";
import { Button } from "./ui/button";
import { usePullToRandom } from "@/hooks/use-pull-to-random";

// String matchers for ranked search
function startsWith(query: string, target: string): boolean {
  return target.toLowerCase().startsWith(query.toLowerCase());
}

function initialsMatch(query: string, target: string): boolean {
  const q = query.toLowerCase();
  const words = target.toLowerCase().split(/\s+/);
  if (q.length !== words.length) return false;
  return words.every((word, i) => word[0] === q[i]);
}

function wordStartsWith(query: string, target: string): boolean {
  const q = query.toLowerCase();
  return target.toLowerCase().split(/\s+/).some((word) => word.startsWith(q));
}

function contains(query: string, target: string): boolean {
  return target.toLowerCase().includes(query.toLowerCase());
}

function fuzzyMatch(query: string, target: string): boolean {
  const q = query.toLowerCase();
  const t = target.toLowerCase();
  let qi = 0;
  for (let ti = 0; ti < t.length && qi < q.length; ti++) {
    if (t[ti] === q[qi]) qi++;
  }
  return qi === q.length;
}

function anyIngredient(
  drink: (typeof menu)[0],
  matcher: (query: string, target: string) => boolean,
  query: string
): boolean {
  return drink.ingredients.some((i) => matcher(query, i.ingredient.name));
}

function anyNote(
  drink: (typeof menu)[0],
  matcher: (query: string, target: string) => boolean,
  query: string
): boolean {
  return drink.notes?.some((note) => matcher(query, note)) ?? false;
}

// Returns drinks ordered by match quality (name > ingredients > notes > fuzzy)
function rankedSearch(query: string): typeof menu {
  if (!query) return menu;

  const tiers = [
    menu.filter((d) => startsWith(query, d.title)),
    menu.filter((d) => initialsMatch(query, d.title)),
    menu.filter((d) => wordStartsWith(query, d.title)),
    menu.filter((d) => contains(query, d.title)),
    menu.filter((d) => anyIngredient(d, startsWith, query)),
    menu.filter((d) => anyIngredient(d, initialsMatch, query)),
    menu.filter((d) => anyIngredient(d, wordStartsWith, query)),
    menu.filter((d) => anyIngredient(d, contains, query)),
    menu.filter((d) => anyNote(d, startsWith, query)),
    menu.filter((d) => anyNote(d, contains, query)),
    menu.filter((d) => fuzzyMatch(query, d.title)),
    menu.filter((d) => anyIngredient(d, fuzzyMatch, query)),
  ];

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

const Menu = ({ initialDrink }: { initialDrink?: string | null }) => {
  const [baseSpirit, setBaseSpirit] = useState<Ingredient | null>(null);
  const [requiredIngredient, setRequiredIngredient] = useState<string | null>(
    null
  );
  const [requiredNote, setRequiredNote] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [openDrink, setOpenDrink] = useState<string | null>(initialDrink ?? null);
  const searchInputRef = useRef<SearchInputHandle>(null);
  const filteredDrinksRef = useRef<typeof menu>([]);

  const handleDrinkOpen = useCallback((drinkTitle: string | null) => {
    setOpenDrink(drinkTitle);
    if (drinkTitle) {
      const slug = drinkTitle.toLowerCase().replace(/\s+/g, "-");
      window.history.pushState({}, "", `/${slug}`);
    } else if (window.location.pathname !== "/") {
      window.history.pushState({}, "", "/");
    }
  }, []);

  const triggerSurprise = useCallback(() => {
    const currentDrinks = filteredDrinksRef.current;
    const randomDrink = currentDrinks[Math.floor(Math.random() * currentDrinks.length)];
    if (randomDrink) {
      confetti({
        particleCount: 100,
        spread: 120,
        origin: { y: 0.6 },
        ticks: 60,
        colors: randomDrink.color ? getConfettiColors(randomDrink.color) : undefined,
      });
      handleDrinkOpen(randomDrink.title);
    }
  }, [handleDrinkOpen]);

  // Pull-to-random gesture
  const { progress, isPulling, isReady } = usePullToRandom(triggerSurprise, {
    threshold: 60,
    resistance: 1.5,
  });

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      if (path === "/") {
        setOpenDrink(null);
      } else {
        const drink = findDrinkBySlug(path.slice(1));
        setOpenDrink(drink?.title ?? null);
      }
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const isInput = target.tagName === "INPUT" || target.tagName === "TEXTAREA";

      const isSearchShortcut =
        (e.key === "/" && !isInput) ||
        ((e.metaKey || e.ctrlKey) && (e.key === "k" || e.key === "p"));

      if (isSearchShortcut) {
        e.preventDefault();
        searchInputRef.current?.expand();
        searchInputRef.current?.focus();
      }

      if (e.key === "r" && !isInput && !e.metaKey && !e.ctrlKey && !e.altKey) {
        e.preventDefault();
        triggerSurprise();
      }

      if (e.key === "Escape" && openDrink) {
        handleDrinkOpen(null);
      }

      // Skip navigation if modifier keys are pressed (allows CMD+L, etc.)
      const hasModifier = e.metaKey || e.ctrlKey || e.altKey;
      const isPrev = e.key === "ArrowLeft" || e.key === "ArrowUp" || e.key === "h" || e.key === "k";
      const isNext = e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === "l" || e.key === "j";

      if (openDrink && (isPrev || isNext) && !hasModifier) {
        e.preventDefault();
        const currentDrinks = filteredDrinksRef.current;
        const currentIndex = currentDrinks.findIndex((d) => d.title === openDrink);
        if (currentIndex === -1) return;

        if (isPrev && currentIndex > 0) {
          handleDrinkOpen(currentDrinks[currentIndex - 1]!.title);
        } else if (isNext && currentIndex < currentDrinks.length - 1) {
          handleDrinkOpen(currentDrinks[currentIndex + 1]!.title);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [openDrink, triggerSurprise, handleDrinkOpen]);

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
    })
    .filter((drink) => {
      if (!requiredNote) {
        return true;
      }

      return drink.notes?.some(
        (note) => note.toLowerCase() === requiredNote.toLowerCase()
      );
    });

  filteredDrinksRef.current = drinks;

  const hasFilters = baseSpirit || requiredIngredient || requiredNote || searchQuery;
  const totalDrinks = menu.length;

  return (
    <section className="flex-grow">
      <PullIndicator progress={progress} isPulling={isPulling} isReady={isReady} />
      <div className="flex justify-center items-center gap-4 mb-16 print:hidden">
        <SearchInput
          ref={searchInputRef}
          value={searchQuery}
          onChange={setSearchQuery}
          onSubmit={() => {
            if (drinks.length > 0) {
              handleDrinkOpen(drinks[0]!.title);
            }
          }}
        />
        <FilterModal
          setBaseSpirit={setBaseSpirit}
          baseSpirit={baseSpirit}
          setRequiredIngredient={setRequiredIngredient}
          requiredIngredient={requiredIngredient}
          setRequiredNote={setRequiredNote}
          requiredNote={requiredNote}
        />
      </div>
      {(baseSpirit || requiredIngredient || requiredNote) && (
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
          {requiredNote && (
            <button
              onClick={() => setRequiredNote(null)}
              className="inline-flex items-center gap-1 px-3 py-1 text-sm bg-secondary text-secondary-foreground rounded-full hover:bg-secondary/80"
            >
              {requiredNote}
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
                onOpenChange={(open) => handleDrinkOpen(open ? drink.title : null)}
                onIngredientClick={(ingredientName) => {
                  setRequiredIngredient(ingredientName);
                  handleDrinkOpen(null);
                }}
                onNoteClick={(note) => {
                  setRequiredNote(note);
                  handleDrinkOpen(null);
                }}
                onDrinkClick={handleDrinkOpen}
                onNavigate={(direction) => {
                  const currentIndex = drinks.findIndex((d) => d.title === drink.title);
                  if (direction === "prev" && currentIndex > 0) {
                    handleDrinkOpen(drinks[currentIndex - 1]!.title);
                  } else if (direction === "next" && currentIndex < drinks.length - 1) {
                    handleDrinkOpen(drinks[currentIndex + 1]!.title);
                  }
                }}
                hasPrev={drinks.findIndex((d) => d.title === drink.title) > 0}
                hasNext={drinks.findIndex((d) => d.title === drink.title) < drinks.length - 1}
                allDrinks={menu}
                onCloseAutoFocus={(e) => {
                  if (searchQuery) {
                    e.preventDefault();
                    searchInputRef.current?.focus();
                  }
                }}
              />
            ))}
          </ul>
          <div className="flex flex-col items-center gap-4 mt-8 print:hidden">
            <Button variant="outline" onClick={triggerSurprise}>
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
              setRequiredNote(null);
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
