import { menu } from "@/menu";
import { getByName, Ingredient, isDescendantOf } from "@/types/ingredient";
import { useState } from "react";
import DrinkListing from "./DrinkListing";
import { FilterModal } from "./FilterModal";

const Menu = () => {
  const [baseSpirit, setBaseSpirit] = useState<Ingredient | null>(null);
  const [requiredIngredient, setRequiredIngredient] = useState<string | null>(
    null
  );
  return (
    <section>
      <FilterModal
        setBaseSpirit={setBaseSpirit}
        baseSpirit={baseSpirit}
        setRequiredIngredient={setRequiredIngredient}
        requiredIngredient={requiredIngredient}
      />
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-8 p-0">
        {menu
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
          .map((drink) => (
            <DrinkListing drink={drink} key={drink.title} />
          ))}
      </ul>
    </section>
  );
};

export default Menu;
