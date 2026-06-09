import type { RecipeIngredient } from "./ingredient";

/**
 * Best-effort attribution for a drink: any combination of the
 * creator's name, the bar it came from, and the year.
 */
export type DrinkSource = {
  creator?: string;
  bar?: string;
  /** A string so approximations like "c. 1916" or "1890s" work */
  year?: string;
};

export type Drink = {
  title: string;
  instructions: string;
  ingredients: { ingredient: RecipeIngredient; amount?: string }[];
  notes?: string[];
  color?: string;
  source?: DrinkSource;
};
