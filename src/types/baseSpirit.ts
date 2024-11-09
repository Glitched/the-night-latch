import { IngredientType } from "./ingredientType";
export type IngredientEntry = {
  name: string;
  type: IngredientType;
};

export const BaseSpirit = [
  IngredientType.All,
  IngredientType.Whiskey,
  IngredientType.Gin,
  IngredientType.Tequila,
  IngredientType.DarkRum,
  IngredientType.WhiteRum,
  IngredientType.Mezcal,
  IngredientType.Vodka,
];

export const WhiskyTypes = [
  IngredientType.Whiskey,
  IngredientType.Bourbon,
  IngredientType.Rye,
  IngredientType.Scotch,
  IngredientType.IrishWhiskey,
  IngredientType.JapaneseWhisky,
];
