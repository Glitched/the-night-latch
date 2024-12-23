export type Ingredient = {
  name: string;
  parent?: Ingredient;
};

const allIngredients: Ingredient[] = [];
const baseSpirits: Ingredient[] = [];

function registerIngredient(ingredient: Ingredient): Ingredient {
  allIngredients.push(ingredient);
  if (ingredient.parent && ingredient.parent.name === "Liquor") {
    baseSpirits.push(ingredient);
  }
  return ingredient;
}

function getByName(name: string): Ingredient | null {
  const ingredient = allIngredients.find(
    (ingredient) => ingredient.name === name
  );
  return ingredient ?? null;
}

function isDescendantOf(ingredient: Ingredient, parent: Ingredient): boolean {
  if (ingredient.parent === parent || ingredient === parent) {
    return true;
  }

  if (!ingredient.parent) {
    return false;
  }

  return isDescendantOf(ingredient.parent, parent);
}

const Fruit = registerIngredient({ name: "Fruit" });
const Citrus = registerIngredient({ name: "Citrus", parent: Fruit });
const Lime = registerIngredient({ name: "Lime", parent: Citrus });
const Lemon = registerIngredient({ name: "Lemon", parent: Citrus });
const Orange = registerIngredient({ name: "Orange", parent: Citrus });
const Grapefruit = registerIngredient({ name: "Grapefruit", parent: Citrus });

const Herb = registerIngredient({ name: "Herb" });
const Mint = registerIngredient({ name: "Mint", parent: Herb });
const Rosemary = registerIngredient({ name: "Rosemary", parent: Herb });
const Thyme = registerIngredient({ name: "Thyme", parent: Herb });

const Liquor = registerIngredient({ name: "Liquor" });
const Liqueur = registerIngredient({ name: "Liqueur" });

// Whisky
const Whisky = registerIngredient({ name: "Whisky", parent: Liquor });
const Rye = registerIngredient({ name: "Rye", parent: Whisky });
const Bourbon = registerIngredient({ name: "Bourbon", parent: Whisky });
const Scotch = registerIngredient({ name: "Scotch", parent: Whisky });
const IrishWhisky = registerIngredient({
  name: "Irish Whisky",
  parent: Whisky,
});
const JapaneseWhisky = registerIngredient({
  name: "Japanese Whisky",
  parent: Whisky,
});
const RittenhouseRye = registerIngredient({
  name: "Rittenhouse Rye",
  parent: Rye,
});
const Hatozaki = registerIngredient({
  name: "Hatozaki",
  parent: JapaneseWhisky,
});
const MonkeyShoulder = registerIngredient({
  name: "Monkey Shoulder",
  parent: Scotch,
});
const ElijahCraig = registerIngredient({
  name: "Elijah Craig",
  parent: Bourbon,
});

// Gin
const Gin = registerIngredient({ name: "Gin", parent: Liquor });
const LondonDry = registerIngredient({ name: "London Dry", parent: Gin });
const PlymouthGin = registerIngredient({ name: "Plymouth Gin", parent: Gin });
const OldTom = registerIngredient({ name: "Old Tom", parent: Gin });
const Tanqueray = registerIngredient({ name: "Tanqueray", parent: LondonDry });
const TanquerayNo10 = registerIngredient({
  name: "Tanqueray No. 10",
  parent: LondonDry,
});

// Tequila
const Tequila = registerIngredient({ name: "Tequila", parent: Liquor });
const Altos = registerIngredient({ name: "Altos Tequila", parent: Tequila });

// Mezcal
const Mezcal = registerIngredient({ name: "Mezcal", parent: Liquor });
const VidaMezcal = registerIngredient({ name: "Vida Mezcal", parent: Mezcal });

// Rum
const Rum = registerIngredient({ name: "Rum", parent: Liquor });
const WhiteRum = registerIngredient({ name: "White Rum", parent: Rum });
const DarkRum = registerIngredient({ name: "Dark Rum", parent: Rum });
const PussersRum = registerIngredient({
  name: "Pusser's Rum",
  parent: DarkRum,
});
const Plantation3StarRum = registerIngredient({
  name: "Plantation 3 Star Rum",
  parent: WhiteRum,
});

// Vodka
const Vodka = registerIngredient({ name: "Vodka", parent: Liquor });
const Titos = registerIngredient({ name: "Titos Vodka", parent: Vodka });

// Amaro
const Amaro = registerIngredient({ name: "Amaro", parent: Liqueur });
const Campari = registerIngredient({ name: "Campari", parent: Amaro });
const FernetBranca = registerIngredient({
  name: "Fernet Branca",
  parent: Amaro,
});
const AmaroMeletti = registerIngredient({
  name: "Amaro Meletti",
  parent: Amaro,
});
const FourthaveSpirits = registerIngredient({
  name: "Fourthave Spirits",
  parent: Amaro,
});

// Liqueur
const Luxardo = registerIngredient({ name: "Luxardo", parent: Liqueur });
const StGermain = registerIngredient({ name: "St. Germain", parent: Liqueur });
const CremeDeViolette = registerIngredient({
  name: "Creme de Violette",
  parent: Liqueur,
});
const CaffeBorghetti = registerIngredient({
  name: "Caffe Borghetti",
  parent: Liqueur,
});
const TripleSec = registerIngredient({ name: "Triple Sec", parent: Liqueur });
const Cointreau = registerIngredient({ name: "Cointreau", parent: TripleSec });
const CremeDeCassis = registerIngredient({
  name: "Creme de Cassis",
  parent: Liqueur,
});
const Amaretto = registerIngredient({ name: "Amaretto", parent: Liqueur });
const Disaronno = registerIngredient({ name: "Disaronno", parent: Amaretto });

// Bitters
const Bitters = registerIngredient({ name: "Bitters" });
const AngosturaBitters = registerIngredient({
  name: "Angostura Bitters",
  parent: Bitters,
});
const PeychaudsBitters = registerIngredient({
  name: "Peychaud's Bitters",
  parent: Bitters,
});
const OrangeBitters = registerIngredient({
  name: "Orange Bitters",
  parent: Bitters,
});
const RegansOrangeBitters = registerIngredient({
  name: "Regan's Orange Bitters",
  parent: OrangeBitters,
});

const GreenChartreuse = registerIngredient({
  name: "Green Chartreuse",
  parent: Liqueur,
});
const YellowChartreuse = registerIngredient({
  name: "Yellow Chartreuse",
  parent: Liqueur,
});

// Syrup
const Syrup = registerIngredient({ name: "Syrup" });
const SimpleSyrup = registerIngredient({ name: "Simple Syrup", parent: Syrup });
const DemeraraSyrup = registerIngredient({
  name: "Demerara Syrup",
  parent: Syrup,
});

// ETC
const Soda = registerIngredient({ name: "Soda" });
const EggWhite = registerIngredient({ name: "Egg White" });

// Vermouth
const Vermouth = registerIngredient({ name: "Vermouth" });
const SweetVermouth = registerIngredient({
  name: "Sweet Vermouth",
  parent: Vermouth,
});
const CocchiAmericano = registerIngredient({
  name: "Cocchi Americano",
  parent: SweetVermouth,
});
const DolinDry = registerIngredient({ name: "Dolin Dry", parent: Vermouth });

export * as Ingredient from "./ingredient";

export {
  Altos,
  Amaretto,
  Amaro,
  AmaroMeletti,
  AngosturaBitters,
  Bitters,
  Bourbon,
  CaffeBorghetti,
  Campari,
  Citrus,
  CocchiAmericano,
  Cointreau,
  CremeDeCassis,
  CremeDeViolette,
  DarkRum,
  DemeraraSyrup,
  Disaronno,
  DolinDry,
  EggWhite,
  ElijahCraig,
  FernetBranca,
  FourthaveSpirits,
  Fruit,
  Gin,
  Grapefruit,
  GreenChartreuse,
  Hatozaki,
  Herb,
  IrishWhisky,
  JapaneseWhisky,
  Lemon,
  Lime,
  Liqueur,
  Liquor,
  LondonDry,
  Luxardo,
  Mezcal,
  Mint,
  MonkeyShoulder,
  OldTom,
  Orange,
  OrangeBitters,
  PeychaudsBitters,
  Plantation3StarRum,
  PlymouthGin,
  PussersRum,
  RegansOrangeBitters,
  RittenhouseRye,
  Rosemary,
  Rum,
  Rye,
  Scotch,
  SimpleSyrup,
  Soda,
  StGermain,
  SweetVermouth,
  Syrup,
  Tanqueray,
  TanquerayNo10,
  Tequila,
  Thyme,
  Titos,
  TripleSec,
  Vermouth,
  VidaMezcal,
  Vodka,
  Whisky,
  WhiteRum,
  YellowChartreuse,
  allIngredients,
  baseSpirits,
  getByName,
  isDescendantOf,
};
