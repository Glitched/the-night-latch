import type { Ingredient } from "./ingredient";

export type Drink = {
  title: string;
  instructions: string;
  ingredients: { ingredient: Ingredient; amount?: string }[];
  notes?: string[];
};
