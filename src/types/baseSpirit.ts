import { IngredientType } from "./ingredientType";
export type IngredientEntry = {
  name: string;
  type: IngredientType;
};

export const BaseSpirit = [
  IngredientType.Whiskey,
  IngredientType.Gin,
  IngredientType.Tequila,
  IngredientType.DarkRum,
  IngredientType.WhiteRum,
  IngredientType.Mezcal,
  IngredientType.Vodka,
];
