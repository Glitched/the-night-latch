import type { Drink } from "./types/drinks";
import * as Ingredient from "./types/ingredient";

export const menu: Drink[] = [
  {
    title: "Negroni",
    instructions:
      "Stir all the ingredients over ice, then strain into a double rocks glass. Garnish with the orange twist.",
    ingredients: [
      { ingredient: Ingredient.Tanqueray, amount: "1 oz" },
      { ingredient: Ingredient.Campari, amount: "1 oz" },
      { ingredient: Ingredient.CocchiDiTorino, amount: "1 oz" },
    ],
    notes: ["Bitter", "Boozy", "Herbal"],
  },
  {
    title: "Old Pal",
    instructions:
      "Stir all the ingredients over ice, then strain into a Nick & Nora glass. Garnish with the lemon twist.",
    ingredients: [
      { ingredient: Ingredient.RittenhouseRye, amount: "1 1/2 oz" },
      { ingredient: Ingredient.Campari, amount: "3/4 oz" },
      { ingredient: Ingredient.DolinDry, amount: "3/4 oz" },
    ],
    notes: ["Bitter", "Dry", "Boozy"],
  },
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
    notes: ["Tart", "Citrus", "Balanced", "Rich"],
  },
  {
    title: "Manhattan",
    instructions:
      "Stir all the ingredients over ice, then strain into a coupe. Garnish with the cherry.",
    ingredients: [
      { ingredient: Ingredient.RittenhouseRye, amount: "2 oz" },
      { ingredient: Ingredient.CocchiDiTorino, amount: "1 oz" },
      { ingredient: Ingredient.AngosturaBitters },
    ],
    notes: ["Boozy", "Sweet", "Rich", "Spiced"],
  },
  {
    title: "Old Fashioned",
    instructions:
      "Stir all the ingredients over ice, then strain into a double rocks glass over 1 large ice cube. Garnish with the orange and lemon twists.",
    ingredients: [
      { ingredient: Ingredient.ElijahCraig, amount: "2 oz" },
      { ingredient: Ingredient.DemeraraSyrup, amount: "1/8 oz" },
      { ingredient: Ingredient.AngosturaBitters },
    ],
    notes: ["Boozy", "Sweet", "Spiced"],
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
    notes: ["Coffee", "Smoky", "Bitter", "Complex"],
  },
  {
    title: "Gin Martini",
    instructions:
      "Stir all the ingredients over ice, then strain into a martini glass. Garnish with a lemon twist.",
    ingredients: [
      { ingredient: Ingredient.PlymouthGin, amount: "2 oz" },
      { ingredient: Ingredient.DolinDry, amount: "1 oz" },
      { ingredient: Ingredient.RegansOrangeBitters, amount: "1 dash" },
    ],
    notes: ["Boozy", "Dry", "Herbal"],
  },
  {
    title: "Vodka Martini",
    instructions:
      "Stir all the ingredients over ice, then strain into a martini glass. Garnish with an olive.",
    ingredients: [
      { ingredient: Ingredient.Titos, amount: "2 1/2 oz" },
      { ingredient: Ingredient.DolinDry, amount: "1/2 oz" },
    ],
    notes: ["Boozy", "Dry", "Strong"],
  },
  {
    title: "Margarita",
    instructions:
      "Rim half of a double rocks glass with salt. Shake all the ingredients with ice, then strain into the rimmed glass over ice cubes. Garnish with the lime wedge.",
    ingredients: [
      { ingredient: Ingredient.Altos, amount: "1 1/2 oz" },
      { ingredient: Ingredient.Lime, amount: "3/4 oz" },
      { ingredient: Ingredient.Cointreau, amount: "1/2 oz" },
      { ingredient: Ingredient.SimpleSyrup },
    ],
    notes: ["Tart", "Citrus", "Refreshing"],
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
    notes: ["Tart", "Citrus", "Balanced", "Refreshing"],
  },
  {
    title: "Mojito",
    instructions:
      "In a shaker, gently muddle the mint and simple syrup. Add the remaining ingredients and whip (shake with a few pieces of crushed ice just until the ingredients are incorporated). Dump into and double rocks glass and fill the glass with crushed ice. Garnish with the mint bouquet in the center of the ice and serve with a straw.",
    ingredients: [
      { ingredient: Ingredient.Plantation3StarRum, amount: "2 oz" },
      { ingredient: Ingredient.Lime, amount: "3/4 oz" },
      { ingredient: Ingredient.Mint, amount: "6-8 leaves" },
      { ingredient: Ingredient.SimpleSyrup, amount: "3/4 oz" },
      { ingredient: Ingredient.AngosturaBitters },
    ],
    notes: ["Refreshing", "Herbal", "Sweet", "Citrus"],
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
    notes: ["Floral", "Herbal", "Light"],
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
    notes: ["Refreshing", "Citrus", "Light", "Sessionable"],
  },
  {
    title: "Boulevardier",
    instructions:
      "Stir all the ingredients over ice, then strain into a coupe. Garnish with the lemon twist.",
    ingredients: [
      { ingredient: Ingredient.RittenhouseRye, amount: "1 1/2 oz" },
      { ingredient: Ingredient.Campari, amount: "3/4 oz" },
      { ingredient: Ingredient.CocchiDiTorino, amount: "3/4 oz" },
    ],
    notes: ["Bitter", "Boozy", "Sweet", "Complex"],
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
    notes: ["Boozy", "Fruity", "Spiced"],
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
    notes: ["Floral", "Citrus", "Tart", "Balanced"],
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
    notes: ["Tart", "Citrus", "Sweet", "Refreshing"],
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
    notes: ["Herbal", "Complex", "Balanced", "Tart"],
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
    notes: ["Herbal", "Tart", "Complex", "Balanced"],
  },
  {
    title: "Ferrari",
    instructions: "Serve in a rocks glass over 1 large ice cube. No garnish.",
    ingredients: [
      { ingredient: Ingredient.FernetBranca, amount: "1 1/2 oz" },
      { ingredient: Ingredient.Campari, amount: "1 1/2 oz" },
    ],
    notes: ["Bitter", "Herbal", "Strong", "Complex"],
  },
  {
    title: "Aperol Spritz",
    instructions:
      "Fill a highball glass with ice, then add the Aperol and soda water. Garnish with the orange slice.",
    ingredients: [
      { ingredient: Ingredient.Prosecco, amount: "3 oz" },
      { ingredient: Ingredient.Aperol, amount: "2 oz" },
      { ingredient: Ingredient.Soda, amount: "1 oz" },
    ],
    notes: ["Refreshing", "Bitter", "Light", "Citrus"],
  },
  {
    title: "Paper Plane",
    instructions:
      "Shake all the ingredients with ice, then strain into a coupe. No garnish.",
    ingredients: [
      { ingredient: Ingredient.Bourbon, amount: "3/4 oz" },
      { ingredient: Ingredient.Aperol, amount: "3/4 oz" },
      { ingredient: Ingredient.AmaroNonino, amount: "3/4 oz" },
      { ingredient: Ingredient.Lemon, amount: "3/4 oz" },
    ],
    notes: ["Balanced", "Bitter", "Citrus", "Complex"],
  },
  {
    title: "Espresso Martini",
    instructions:
      "Shake all the ingredients with ice, then strain into a coupe. Garnish with three coffee beans.",
    ingredients: [
      { ingredient: Ingredient.Titos, amount: "2 oz" },
      { ingredient: Ingredient.CaffeBorghetti, amount: "1/2 oz" },
      { ingredient: Ingredient.ColdBrew, amount: "1 oz" },
      { ingredient: Ingredient.SimpleSyrup, amount: "to taste" },
    ],
    notes: ["Coffee", "Sweet", "Rich"],
  },
  {
    title: "Black Tie Optional",
    instructions:
      "Shake all the ingredients with ice, then strain into a coupe. Garnish with three coffee beans.",
    ingredients: [
      { ingredient: Ingredient.RittenhouseRye, amount: "2 oz" },
      { ingredient: Ingredient.CaffeBorghetti, amount: "1/2 oz" },
      { ingredient: Ingredient.ColdBrew, amount: "1 oz" },
      { ingredient: Ingredient.AmaroNonino, amount: "1/4 oz" },
      { ingredient: Ingredient.DemeraraSyrup, amount: "1/4 oz" },
      { ingredient: Ingredient.MoleBitters },
    ],
    notes: ["Coffee", "Spiced", "Complex", "Rich"],
  },
  {
    title: "Naked and Famous",
    instructions:
      "Shake all the ingredients with ice, then strain into a coupe. No garnish.",
    ingredients: [
      { ingredient: Ingredient.Mezcal, amount: "3/4 oz" },
      { ingredient: Ingredient.Aperol, amount: "3/4 oz" },
      { ingredient: Ingredient.YellowChartreuse, amount: "3/4 oz" },
      { ingredient: Ingredient.Lime, amount: "3/4 oz" },
    ],
    notes: ["Smoky", "Herbal", "Balanced", "Complex"],
  },
  {
    title: "Gimlet",
    instructions:
      "Shake all the ingredients with ice, then strain into a coupe. Garnish with a lime wheel.",
    ingredients: [
      { ingredient: Ingredient.PlymouthGin, amount: "2 oz" },
      { ingredient: Ingredient.Lime, amount: "3/4 oz" },
      { ingredient: Ingredient.SimpleSyrup, amount: "3/4 oz" },
    ],
    notes: ["Tart", "Citrus", "Herbal", "Refreshing"],
  },
  {
    title: "French 75",
    instructions:
      "Shake the gin, lemon, and simple syrup with ice, then strain into a flute. Top with Prosecco. Garnish with the lemon twist.",
    ingredients: [
      { ingredient: Ingredient.Tanqueray, amount: "1 1/2 oz" },
      { ingredient: Ingredient.Lemon, amount: "3/4 oz" },
      { ingredient: Ingredient.SimpleSyrup, amount: "1/2 oz" },
      { ingredient: Ingredient.Prosecco, amount: "2 oz" },
    ],
    notes: ["Refreshing", "Citrus", "Light", "Dry"],
  },
  {
    title: "Hanky Panky",
    instructions:
      "Stir all the ingredients over ice, then strain into a coupe. Garnish with the orange twist.",
    ingredients: [
      { ingredient: Ingredient.PlymouthGin, amount: "1 1/2 oz" },
      { ingredient: Ingredient.CocchiDiTorino, amount: "1 1/2 oz" },
      { ingredient: Ingredient.FernetBranca, amount: "1 barspoon" },
    ],
    notes: ["Herbal", "Bitter", "Complex", "Boozy"],
  },
  {
    title: "Toronto",
    instructions:
      "Stir all the ingredients over ice, then strain into a coupe. Garnish with the orange twist.",
    ingredients: [
      { ingredient: Ingredient.RittenhouseRye, amount: "2 oz" },
      { ingredient: Ingredient.FernetBranca, amount: "1/4 oz" },
      { ingredient: Ingredient.DemeraraSyrup, amount: "1/4 oz" },
      { ingredient: Ingredient.AngosturaBitters },
    ],
    notes: ["Boozy", "Herbal", "Bitter", "Spiced"],
  },
  {
    title: "Bijou",
    instructions:
      "Stir all the ingredients over ice, then strain into a coupe. Garnish with a cherry.",
    ingredients: [
      { ingredient: Ingredient.Tanqueray, amount: "1 oz" },
      { ingredient: Ingredient.CocchiDiTorino, amount: "1 oz" },
      { ingredient: Ingredient.GreenChartreuse, amount: "1 oz" },
      { ingredient: Ingredient.RegansOrangeBitters },
    ],
    notes: ["Herbal", "Complex", "Sweet", "Boozy"],
  },
  {
    title: "Rob Roy",
    instructions:
      "Stir all the ingredients over ice, then strain into a coupe. Garnish with a cherry.",
    ingredients: [
      { ingredient: Ingredient.MonkeyShoulder, amount: "2 oz" },
      { ingredient: Ingredient.CocchiDiTorino, amount: "1 oz" },
      { ingredient: Ingredient.AngosturaBitters },
    ],
    notes: ["Boozy", "Sweet", "Smoky", "Rich"],
  },
  {
    title: "Golden Gate",
    instructions:
      "Shake all the ingredients with ice, then strain into a coupe. Garnish with a lemon or orange twist.",
    ingredients: [
      { ingredient: Ingredient.VidaMezcal, amount: "1 1/2 oz" },
      { ingredient: Ingredient.Aperol, amount: "3/4 oz" },
      { ingredient: Ingredient.Lemon, amount: "3/4 oz" },
      { ingredient: Ingredient.SimpleSyrup, amount: "1/2 oz" },
    ],
    notes: ["Smoky", "Citrus", "Bitter", "Refreshing"],
  },
  {
    title: "Hemingway Daiquiri",
    instructions:
      "Shake all the ingredients with ice, then strain into a coupe. Garnish with a lime wheel.",
    ingredients: [
      { ingredient: Ingredient.Plantation3StarRum, amount: "2 oz" },
      { ingredient: Ingredient.Lime, amount: "3/4 oz" },
      { ingredient: Ingredient.Grapefruit, amount: "1/2 oz" },
      { ingredient: Ingredient.Luxardo, amount: "1/2 oz" },
    ],
    notes: ["Tart", "Citrus", "Dry", "Refreshing"],
  },
  {
    title: "Paloma",
    instructions:
      "Rim half of a highball glass with salt. Shake the tequila, grapefruit, lime, and simple syrup with ice, then strain into the glass over ice. Top with soda. Garnish with the grapefruit wedge.",
    ingredients: [
      { ingredient: Ingredient.Altos, amount: "2 oz" },
      { ingredient: Ingredient.Grapefruit, amount: "1 1/2 oz" },
      { ingredient: Ingredient.Lime, amount: "1/2 oz" },
      { ingredient: Ingredient.SimpleSyrup, amount: "1/2 oz" },
      { ingredient: Ingredient.Soda },
    ],
    notes: ["Refreshing", "Citrus", "Tart", "Light"],
  },
  // NA drinks at the bottom
  {
    title: "Pathfinder Spritz",
    instructions:
      "Shake the Pathfinder and lemon juice with ice, then strain into a highball glass filled with ice. Top with soda water and garnish with the lemon wedge.",
    ingredients: [
      { ingredient: Ingredient.NA },
      { ingredient: Ingredient.Pathfinder, amount: "2 oz" },
      { ingredient: Ingredient.Lemon, amount: "1/2 oz" },
      { ingredient: Ingredient.Soda },
    ],
    notes: ["Refreshing", "Herbal", "Citrus", "Light"],
  },
  {
    title: "Haters got PhDs",
    instructions:
      "Shake all the ingredients with ice, then strain into a coupe. Garnish with the lime wedge.",
    ingredients: [
      { ingredient: Ingredient.NA },
      { ingredient: Ingredient.Pathfinder, amount: "2 oz" },
      { ingredient: Ingredient.Lime, amount: "1 oz" },
      { ingredient: Ingredient.SimpleSyrup, amount: "1/2 oz" },
    ],
    notes: ["Herbal", "Tart", "Citrus", "Balanced"],
  },
];

export const ingredientsInAllDrinks = Ingredient.allIngredients.filter(
  (ingredient) =>
    menu.some((drink) =>
      drink.ingredients.some((i) =>
        Ingredient.isDescendantOf(i.ingredient, ingredient)
      )
    )
);

export const allNotes = [
  ...new Set(menu.flatMap((drink) => drink.notes ?? [])),
].sort();
