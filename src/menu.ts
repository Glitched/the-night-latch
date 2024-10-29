import type { Drink } from "./types/drinks";
import { Ingredient } from "./types/ingredient";

export const menu: Drink[] = [
  {
    title: "Whisky Sour",
    instructions:
      "Dry shake all the ingredients, then shake again with ice. Double strain into a double rocks glass over 1 large ice cube. Add a dash of bitters on top and garnish with the orange and cherry flag.",
    ingredients: [
      { ingredient: Ingredient.RittenhouseRye, amount: "2 oz" },
      { ingredient: Ingredient.Lemon, amount: "3/4 oz" },
      { ingredient: Ingredient.EggWhite, amount: "1" },
      { ingredient: Ingredient.SimpleSyrup, amount: "3/4 oz" },
      { ingredient: Ingredient.AngosturaBitters },
    ],
  },
  {
    title: "Negroni",
    instructions:
      "Stir all the ingredients over ice, then strain into a double rocks glass. Garnish with the orange twist.",
    ingredients: [
      { ingredient: Ingredient.Tanqueray, amount: "1 oz" },
      { ingredient: Ingredient.Campari, amount: "1 oz" },
      { ingredient: Ingredient.CocchiAmericano, amount: "1 oz" },
    ],
  },
  {
    title: "Old Pal",
    instructions:
      "Stir all the ingredients over ice, then strain into a Nick & Nora glass. Garnish with the lemon twist.",
    ingredients: [
      { ingredient: Ingredient.RittenhouseRye, amount: "1 1/2 oz" },
      { ingredient: Ingredient.Campari, amount: "3/4 oz" },
      { ingredient: Ingredient.Dolin, amount: "3/4 oz" },
    ],
  },
  {
    title: "Manhattan",
    instructions:
      "Stir all the ingredients over ice, then strain into a coupe. Garnish with the cherry.",
    ingredients: [
      { ingredient: Ingredient.RittenhouseRye, amount: "2 oz" },
      { ingredient: Ingredient.CocchiAmericano, amount: "1 oz" },
      { ingredient: Ingredient.AngosturaBitters },
    ],
  },
  {
    title: "Old Fashioned",
    instructions:
      "Stir all the ingredients over ice, then strain into a double rocks glass over 1 large ice cube. Garnish with the orange and lemon twists.",
    ingredients: [
      { ingredient: Ingredient.RittenhouseRye, amount: "2 oz" },
      { ingredient: Ingredient.SimpleSyrup },
      { ingredient: Ingredient.AngosturaBitters },
    ],
  },
  {
    title: "Squeaky Wheel",
    instructions:
      "Stir all the ingredients over ice, then strain into a rocks glass over 1 large ice cube. Express the oils of an orange twist over the drink and use as a garnish.",
    ingredients: [
      { ingredient: Ingredient.VidaMezcal, amount: "1 oz" },
      { ingredient: Ingredient.CaffeBorghetti, amount: "1 oz" },
      { ingredient: Ingredient.Campari, amount: "3/4 oz" },
      { ingredient: Ingredient.Disaronno, amount: "1/4 oz" },
    ],
  },
  {
    title: "Martini",
    instructions:
      "Stir all the ingredients over ice, then strain into a martini glass. Garnish with the lemon twist.",
    ingredients: [
      { ingredient: Ingredient.PlymouthGin, amount: "2 1/2 oz" },
      { ingredient: Ingredient.Dolin, amount: "3/4 oz" },
      { ingredient: Ingredient.RegansOrangeBitters, amount: "1 dash" },
    ],
  },
  {
    title: "Margarita",
    instructions:
      "Rim half of a double rocks glass with salt. Shake all the ingredients with ice, then strain into the rimmed glass over ice cubes. Garnish with the lime wedge.",
    ingredients: [
      { ingredient: Ingredient.AltosTequila, amount: "1 1/2 oz" },
      { ingredient: Ingredient.Lime, amount: "3/4 oz" },
      { ingredient: Ingredient.Cointreau, amount: "1/2 oz" },
      { ingredient: Ingredient.SimpleSyrup },
    ],
  },
  {
    title: "Daiquiri",
    instructions:
      "Shake all the ingredients with ice, then strain into a coupe. Garnish with the lime wedge.",
    ingredients: [
      { ingredient: Ingredient.Plantation3StarRum, amount: "2 oz" },
      { ingredient: Ingredient.Lime, amount: "3/4 oz" },
      { ingredient: Ingredient.SimpleSyrup, amount: "3/4 oz" },
    ],
  },
  {
    title: "Mojito",
    instructions:
      "In a shaker, gently muddle the mint and simple syrup. Add the remaining ingredients and whip (shake with a few pieces of crushed ice just until the ingredients are incorporated). Dump into and double rocks glass and fill the glass with crushed ice. Garnish with the mint bouquet in the center of the ice and serve with a straw.",
    ingredients: [
      { ingredient: Ingredient.Plantation3StarRum },
      { ingredient: Ingredient.Lime },
      { ingredient: Ingredient.Mint },
      { ingredient: Ingredient.SimpleSyrup },
      { ingredient: Ingredient.AngosturaBitters },
    ],
  },
  {
    title: "Elder Fashion",
    instructions:
      "Stir all the ingredients over ice, then strain into a double rocks glass over 1 large ice cube. Garnish with the grapefruit twist.",
    ingredients: [
      { ingredient: Ingredient.PlymouthGin, amount: "2 oz" },
      { ingredient: Ingredient.StGermain, amount: "1/2 oz" },
      { ingredient: Ingredient.RegansOrangeBitters },
    ],
  },
  {
    title: "Tom Collins",
    instructions:
      "Short shake all the ingredients (except the club soda) with 3 ice cubes, then strain into a highball glass filled with ice cubes. Top with club soda. Garnish with the orange crescent and cherry flag and serve with a straw.",
    ingredients: [
      { ingredient: Ingredient.Tanqueray, amount: "2 oz" },
      { ingredient: Ingredient.Lemon, amount: "1 oz" },
      { ingredient: Ingredient.SimpleSyrup, amount: "3/4 oz" },
      { ingredient: Ingredient.Soda },
    ],
  },
  {
    title: "Boulevardier",
    instructions:
      "Stir all the ingredients over ice, then strain into a coupe. Garnish with the lemon twist.",
    ingredients: [
      { ingredient: Ingredient.RittenhouseRye, amount: "1 1/2 oz" },
      { ingredient: Ingredient.Campari, amount: "3/4 oz" },
      { ingredient: Ingredient.CocchiAmericano, amount: "3/4 oz" },
    ],
  },
  {
    title: "Fancy-Free",
    instructions:
      "Stir all the ingredients over ice, then strain into double rocks glass over 1 large ice cube. Garnish with the orange twist.",
    ingredients: [
      { ingredient: Ingredient.RittenhouseRye, amount: "2 oz" },
      { ingredient: Ingredient.Luxardo, amount: "1/2 oz" },
      { ingredient: Ingredient.AngosturaBitters },
      { ingredient: Ingredient.RegansOrangeBitters },
    ],
  },
  {
    title: "Aviation",
    instructions:
      "Shake all the ingredients with ice, then strain into a coupe. Garnish with the cherry.",
    ingredients: [
      { ingredient: Ingredient.Tanqueray, amount: "2 oz" },
      { ingredient: Ingredient.CremeDeViolette, amount: "1/4 oz" },
      { ingredient: Ingredient.Lemon, amount: "3/4 oz" },
      { ingredient: Ingredient.Luxardo, amount: "1/4 oz" },
      { ingredient: Ingredient.SimpleSyrup, amount: "1/2 oz" },
    ],
  },
  {
    title: "Fitzgerald",
    instructions:
      "Shake all the ingredients with ice, then strain into a double rocks glass. Garnish with the lemon wedge.",
    ingredients: [
      { ingredient: Ingredient.Tanqueray, amount: "2 oz" },
      { ingredient: Ingredient.Lemon, amount: "3/4 oz" },
      { ingredient: Ingredient.SimpleSyrup, amount: "1 oz" },
      { ingredient: Ingredient.AngosturaBitters },
    ],
  },
  {
    title: "Last Word",
    instructions:
      "Shake all the ingredients with ice, then strain into a coupe. No garnish.",
    ingredients: [
      { ingredient: Ingredient.Tanqueray, amount: "3/4 oz" },
      { ingredient: Ingredient.GreenChartreuse, amount: "3/4 oz" },
      { ingredient: Ingredient.Luxardo, amount: "3/4 oz" },
      { ingredient: Ingredient.Lime, amount: "3/4 oz" },
    ],
  },
  {
    title: "Final Ward",
    instructions:
      "Shake all the ingredients with ice, then strain into a coupe. No garnish.",
    ingredients: [
      { ingredient: Ingredient.RittenhouseRye, amount: "3/4 oz" },
      { ingredient: Ingredient.Lemon, amount: "3/4 oz" },
      { ingredient: Ingredient.GreenChartreuse, amount: "3/4 oz" },
      { ingredient: Ingredient.Luxardo, amount: "3/4 oz" },
    ],
  },
];
