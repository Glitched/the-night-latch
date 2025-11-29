import { menu } from "@/menu";
import { getByName, Ingredient, isDescendantOf } from "@/types/ingredient";
import { Shuffle, X } from "@phosphor-icons/react";
import { useState } from "react";
import DrinkListing from "./DrinkListing";
import { FilterModal } from "./FilterModal";
import { Button } from "./ui/button";

const Menu = () => {
  const [baseSpirit, setBaseSpirit] = useState<Ingredient | null>(null);
  const [requiredIngredient, setRequiredIngredient] = useState<string | null>(
    null
  );
  const [openDrink, setOpenDrink] = useState<string | null>(null);
  const drinks = menu
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

  const hasFilters = baseSpirit || requiredIngredient;
  const totalDrinks = menu.length;

  return (
    <section className="flex-grow">
      <FilterModal
        setBaseSpirit={setBaseSpirit}
        baseSpirit={baseSpirit}
        setRequiredIngredient={setRequiredIngredient}
        requiredIngredient={requiredIngredient}
      />
      {hasFilters && (
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
