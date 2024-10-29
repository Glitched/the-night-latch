import type { IngredientEntry } from "./ingredient";

export type Drink = {
  title: string;
  instructions?: string;
  ingredients: { ingredient: IngredientEntry; amount?: string }[];
};
