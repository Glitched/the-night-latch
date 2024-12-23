import { menu } from "@/menu";
import { getByName, Ingredient, isDescendantOf } from "@/types/ingredient";
import { useState } from "react";
import DrinkListing from "./DrinkListing";
import { FilterModal } from "./FilterModal";
import { Button } from "./ui/button";

const Menu = () => {
  const [baseSpirit, setBaseSpirit] = useState<Ingredient | null>(null);
  const [requiredIngredient, setRequiredIngredient] = useState<string | null>(
    null
  );
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

  return (
    <section className="flex-grow">
      <FilterModal
        setBaseSpirit={setBaseSpirit}
        baseSpirit={baseSpirit}
        setRequiredIngredient={setRequiredIngredient}
        requiredIngredient={requiredIngredient}
      />
      {drinks.length > 0 ? (
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-8 p-0">
          {drinks.map((drink) => (
            <DrinkListing drink={drink} key={drink.title} />
          ))}
        </ul>
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
