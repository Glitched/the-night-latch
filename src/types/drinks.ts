export type Drink = {
  title: string;
  instructions?: string;
  ingredients: { name: string; type: IngredientType; amount?: string }[];
};

export enum IngredientType {
  Whiskey = "Whiskey",
  Gin = "Gin",
  Tequila = "Tequila",
  WhiteRum = "White Rum",
  DarkRum = "Dark Rum",
  DryVermouth = "Dry Vermouth",
  SweetVermouth = "Sweet Vermouth",
  Bitters = "Bitters",
  Liqueur = "Liqueur",
  SimpleSyrup = "Simple Syrup",
  Soda = "Soda",
  Absinthe = "Absinthe",
  Mint = "Mint",
  Lemon = "Lemon",
  Lime = "Lime",
  Orange = "Orange",
  GreenChartreuse = "Green Chartreuse",
  Angostura = "Angostura",
  StGermain = "St. Germain",
  Campari = "Campari",
  Luxardo = "Luxardo Liqueur",
  CremeDeViolette = "Creme de Violette",
  CoffeeLiqueur = "Coffee Liqueur",
  Rye = "Rye",
  Prosecco = "Prosecco",
  Amaretto = "Amaretto",
  TripleSec = "Triple Sec",
  Mezcal = "Mezcal",
  Eggs = "Eggs",
}
