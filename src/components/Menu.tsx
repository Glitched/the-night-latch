import { menu } from "@/menu";
import { WhiskyTypes } from "@/types/baseSpirit";
import { IngredientType } from "@/types/ingredientType";
import { useState } from "react";
import DrinkListing from "./DrinkListing";
import { FilterModal } from "./FilterModal";

const Menu = () => {
  const [baseSpirit, setBaseSpirit] = useState<IngredientType | null>(null);
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
            if (!baseSpirit || baseSpirit === IngredientType.All) {
              return true;
            }

            // Show all whisky drinks
            if (baseSpirit === IngredientType.Whiskey) {
              return drink.ingredients.some((i) =>
                WhiskyTypes.includes(i.ingredient.type)
              );
            }

            return drink.ingredients.some(
              (i) => i.ingredient.type === baseSpirit
            );
          })
          .filter((drink) => {
            if (!requiredIngredient) return true;
            return drink.ingredients.some(
              (i) => i.ingredient.name === requiredIngredient
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
