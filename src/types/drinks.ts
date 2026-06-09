import type { RecipeIngredient } from "./ingredient";

export type Drink = {
  title: string;
  instructions: string;
  ingredients: { ingredient: RecipeIngredient; amount?: string }[];
  notes?: string[];
  color?: string;
};
