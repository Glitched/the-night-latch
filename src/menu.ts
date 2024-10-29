import type { Drink } from "./types/drinks";
import { IngredientType } from "./types/drinks";
export const menu: Drink[] = [
  {
    title: "Whisky Sour",
    instructions:
      "( Dry shake all the ingredients, then shake again with ice. Double strain into a double rocks glass over 1 large ice cube. Add a dash of bitters on top and garnish with the orange and cherry flag.",
    ingredients: [
      { name: "Rittenhouse Rye", type: IngredientType.Rye, amount: "2 oz" },
      { name: "Lemon", type: IngredientType.Lemon, amount: "3/4 oz" },
      { name: "Egg White", type: IngredientType.Eggs, amount: "1" },
      {
        name: "Simple Syrup",
        type: IngredientType.SimpleSyrup,
        amount: "3/4 oz",
      },
      {
        name: "Angostura Bitters",
        type: IngredientType.Bitters,
      },
    ],
  },
  {
    title: "Negroni",
    ingredients: [
      { name: "Gin", type: IngredientType.Gin },
      { name: "Campari", type: IngredientType.Campari },
      { name: "Sweet Vermouth", type: IngredientType.SweetVermouth },
    ],
  },
  {
    title: "Manhattan",
    ingredients: [
      { name: "Rye", type: IngredientType.Rye },
      { name: "Sweet Vermouth", type: IngredientType.SweetVermouth },
      { name: "Angostura Bitters", type: IngredientType.Bitters },
    ],
  },
  {
    title: "Old Fashioned",
    ingredients: [
      { name: "Whisky", type: IngredientType.Rye },
      { name: "Simple Syrup", type: IngredientType.SimpleSyrup },
      { name: "Angostura Bitters", type: IngredientType.Bitters },
    ],
  },
  {
    title: "Squeaky Wheel",
    ingredients: [
      { name: "Mezcal", type: IngredientType.Mezcal },
      { name: "Coffee Liqueur", type: IngredientType.CoffeeLiqueur },
      { name: "Campari", type: IngredientType.Campari },
      { name: "Amaretto", type: IngredientType.Amaretto },
    ],
  },
  {
    title: "Margarita",
    ingredients: [
      { name: "Tequila", type: IngredientType.Tequila },
      { name: "Lime", type: IngredientType.Lime },
      { name: "Triple Sec", type: IngredientType.TripleSec },
    ],
  },
  {
    title: "Daiquiri",
    ingredients: [
      { name: "White Rum", type: IngredientType.WhiteRum },
      { name: "Lime", type: IngredientType.Lime },
      { name: "Simple Syrup", type: IngredientType.SimpleSyrup },
    ],
  },
  {
    title: "Mojito",
    ingredients: [
      { name: "White Rum", type: IngredientType.WhiteRum },
      { name: "Lime", type: IngredientType.Lime },
      { name: "Mint", type: IngredientType.Mint },
      { name: "Simple Syrup", type: IngredientType.SimpleSyrup },
      { name: "Angostura Bitters", type: IngredientType.Bitters },
    ],
  },
  {
    title: "Elder Fashioned",
    ingredients: [
      { name: "Gin", type: IngredientType.Gin },
      { name: "St. Germain", type: IngredientType.StGermain },
      { name: "Orange Bitters", type: IngredientType.Bitters },
    ],
  },
  {
    title: "Tom Collins",
    ingredients: [
      { name: "Gin", type: IngredientType.Gin },
      { name: "Lemon Juice", type: IngredientType.Lemon },
      { name: "Simple Syrup", type: IngredientType.SimpleSyrup },
      { name: "Soda", type: IngredientType.Soda },
    ],
  },
  {
    title: "Boulevardier",
    ingredients: [
      { name: "Whisky", type: IngredientType.Rye },
      { name: "Campari", type: IngredientType.Campari },
      { name: "Sweet Vermouth", type: IngredientType.SweetVermouth },
    ],
  },
  {
    title: "Fancy Free",
    ingredients: [
      { name: "Rye", type: IngredientType.Rye },
      { name: "Luxardo Liqueur", type: IngredientType.Liqueur },
      { name: "Angostura Bitters", type: IngredientType.Bitters },
      { name: "Orange Bitters", type: IngredientType.Bitters },
    ],
  },
  {
    title: "Aviation",
    ingredients: [
      { name: "Gin", type: IngredientType.Gin },
      { name: "Lemon", type: IngredientType.Lemon },
      { name: "Luxardo Liqueur", type: IngredientType.Liqueur },
      { name: "Creme de Violette", type: IngredientType.CremeDeViolette },
    ],
  },
  {
    title: "Fitzgerald",
    ingredients: [
      { name: "Gin", type: IngredientType.Gin },
      { name: "Lemon", type: IngredientType.Lemon },
      { name: "Simple Syrup", type: IngredientType.SimpleSyrup },
      { name: "Angostura Bitters", type: IngredientType.Bitters },
    ],
  },
  {
    title: "Last Word",
    ingredients: [
      { name: "Gin", type: IngredientType.Gin },
      { name: "Green Chartreuse", type: IngredientType.GreenChartreuse },
      { name: "Luxardo Liqueur", type: IngredientType.Liqueur },
      { name: "Lime", type: IngredientType.Lime },
    ],
  },
  {
    title: "Final Ward",
    ingredients: [
      { name: "Rye", type: IngredientType.Rye },
      { name: "Lemon", type: IngredientType.Lemon },
      { name: "Green Chartreuse", type: IngredientType.GreenChartreuse },
      { name: "Luxardo Liqueur", type: IngredientType.Liqueur },
    ],
  },
];
