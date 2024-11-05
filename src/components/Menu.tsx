import { menu } from "@/menu";
import type { IngredientEntry } from "@/types/ingredient";
import type { IngredientType } from "@/types/ingredientType";
import { useState } from "react";
import DrinkListing from "./DrinkListing";
import { FilterModal } from "./FilterModal";

const Menu = () => {
  const [baseSpirit, setBaseSpirit] = useState<IngredientType | null>(null);
  const [requiredIngredient, setRequiredIngredient] =
    useState<IngredientEntry | null>(null);
  return (
    <section>
      <FilterModal
        setBaseSpirit={setBaseSpirit}
        setRequiredIngredient={setRequiredIngredient}
      />
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-8 p-0">
        {menu
          .filter((drink) => {
            if (!baseSpirit) return true;
            return drink.ingredients.some(
              (i) => i.ingredient.type === baseSpirit
            );
          })
          .filter((drink) => {
            if (!requiredIngredient) return true;
            return drink.ingredients.some(
              (i) => i.ingredient.name === requiredIngredient.name
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
