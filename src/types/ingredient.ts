export type Ingredient = {
  name: string;
  parent?: Ingredient;
  abv?: number;
};

const allIngredients: Ingredient[] = [];
const baseSpirits: Ingredient[] = [];

function registerIngredient(ingredient: Ingredient): Ingredient {
  allIngredients.push(ingredient);
  const isLiquor = ingredient.parent && ingredient.parent.name === "Liquor";
  if (isLiquor || ingredient.name === "NA") {
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
  abv: 50,
});
const Hatozaki = registerIngredient({
  name: "Hatozaki",
  parent: JapaneseWhisky,
  abv: 40,
});
const MonkeyShoulder = registerIngredient({
  name: "Monkey Shoulder",
  parent: Scotch,
  abv: 40,
});
const ElijahCraig = registerIngredient({
  name: "Elijah Craig",
  parent: Bourbon,
  abv: 47,
});

// Gin
const Gin = registerIngredient({ name: "Gin", parent: Liquor });
const LondonDry = registerIngredient({ name: "London Dry", parent: Gin });
const PlymouthGin = registerIngredient({
  name: "Plymouth Gin",
  parent: Gin,
  abv: 41.2,
});
const OldTom = registerIngredient({ name: "Old Tom", parent: Gin });
const Tanqueray = registerIngredient({
  name: "Tanqueray",
  parent: LondonDry,
  abv: 47.3,
});
const TanquerayNo10 = registerIngredient({
  name: "Tanqueray No. 10",
  parent: LondonDry,
  abv: 47.3,
});

// Tequila
const Tequila = registerIngredient({ name: "Tequila", parent: Liquor });
const Altos = registerIngredient({
  name: "Altos Tequila",
  parent: Tequila,
  abv: 40,
});

// Mezcal
const Mezcal = registerIngredient({ name: "Mezcal", parent: Liquor });
const VidaMezcal = registerIngredient({
  name: "Vida Mezcal",
  parent: Mezcal,
  abv: 42,
});

// Rum
const Rum = registerIngredient({ name: "Rum", parent: Liquor });
const WhiteRum = registerIngredient({ name: "White Rum", parent: Rum });
const DarkRum = registerIngredient({ name: "Dark Rum", parent: Rum });
const PussersRum = registerIngredient({
  name: "Pusser's Rum",
  parent: DarkRum,
  abv: 40,
});
const Plantation3StarRum = registerIngredient({
  name: "Plantation 3 Star Rum",
  parent: WhiteRum,
  abv: 41.2,
});

// Vodka
const Vodka = registerIngredient({ name: "Vodka", parent: Liquor });
const Titos = registerIngredient({
  name: "Titos Vodka",
  parent: Vodka,
  abv: 40,
});

// Amaro
const Amaro = registerIngredient({ name: "Amaro", parent: Liqueur });
const Aperol = registerIngredient({ name: "Aperol", parent: Amaro, abv: 11 });
const Campari = registerIngredient({
  name: "Campari",
  parent: Amaro,
  abv: 25,
});
const FernetBranca = registerIngredient({
  name: "Fernet Branca",
  parent: Amaro,
  abv: 39,
});
const AmaroMeletti = registerIngredient({
  name: "Amaro Meletti",
  parent: Amaro,
  abv: 32,
});
const AmaroNonino = registerIngredient({
  name: "Amaro Nonino",
  parent: Amaro,
  abv: 35,
});
const FourthaveSpirits = registerIngredient({
  name: "Fourthave Spirits",
  parent: Amaro,
  abv: 24,
});
const Cynar = registerIngredient({
  name: "Cynar",
  parent: Amaro,
  abv: 16.5,
});

// Liqueur
const Luxardo = registerIngredient({
  name: "Luxardo",
  parent: Liqueur,
  abv: 32,
});
const StGermain = registerIngredient({
  name: "St. Germain",
  parent: Liqueur,
  abv: 20,
});
const CremeDeViolette = registerIngredient({
  name: "Creme de Violette",
  parent: Liqueur,
  abv: 20,
});
const CaffeBorghetti = registerIngredient({
  name: "Caffe Borghetti",
  parent: Liqueur,
  abv: 25,
});
const TripleSec = registerIngredient({ name: "Triple Sec", parent: Liqueur });
const Cointreau = registerIngredient({
  name: "Cointreau",
  parent: TripleSec,
  abv: 40,
});
const CremeDeCassis = registerIngredient({
  name: "Creme de Cassis",
  parent: Liqueur,
  abv: 20,
});
const Amaretto = registerIngredient({ name: "Amaretto", parent: Liqueur });
const Disaronno = registerIngredient({
  name: "Disaronno",
  parent: Amaretto,
  abv: 28,
});

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
const MoleBitters = registerIngredient({
  name: "Mole Bitters",
  parent: Bitters,
});

const GreenChartreuse = registerIngredient({
  name: "Green Chartreuse",
  parent: Liqueur,
  abv: 55,
});
const YellowChartreuse = registerIngredient({
  name: "Yellow Chartreuse",
  parent: Liqueur,
  abv: 40,
});

// Syrup
const Syrup = registerIngredient({ name: "Syrup" });
const SimpleSyrup = registerIngredient({ name: "Simple Syrup", parent: Syrup });
const DemeraraSyrup = registerIngredient({
  name: "Demerara Syrup",
  parent: Syrup,
});
const HoneySyrup = registerIngredient({
  name: "Honey Syrup",
  parent: Syrup,
});

// ETC
const Soda = registerIngredient({ name: "Soda" });
const EggWhite = registerIngredient({ name: "Egg White" });
const ColdBrew = registerIngredient({ name: "Cold Brew" });

// Vermouth
const Vermouth = registerIngredient({ name: "Vermouth" });
const SweetVermouth = registerIngredient({
  name: "Sweet Vermouth",
  parent: Vermouth,
});
const CocchiDiTorino = registerIngredient({
  name: "Cocchi di Torino",
  parent: SweetVermouth,
  abv: 16,
});
const CarpanoAntica = registerIngredient({
  name: "Carpano Antica Formula",
  parent: SweetVermouth,
  abv: 16.5,
});
const DolinDry = registerIngredient({
  name: "Dolin Dry",
  parent: Vermouth,
  abv: 17.5,
});

// Wine
const Wine = registerIngredient({ name: "Wine" });
const WhiteWine = registerIngredient({ name: "White Wine", parent: Wine });
const RedWine = registerIngredient({ name: "Red Wine", parent: Wine });
const Prosecco = registerIngredient({
  name: "Prosecco",
  parent: WhiteWine,
  abv: 11,
});

// NA
const NA = registerIngredient({ name: "NA" });
const Pathfinder = registerIngredient({
  name: "Pathfinder",
  parent: NA,
  abv: 0,
});

export * as Ingredient from "./ingredient";

export {
  Altos,
  Amaretto,
  Amaro,
  AmaroMeletti,
  AmaroNonino,
  AngosturaBitters,
  Aperol,
  Bitters,
  Bourbon,
  CaffeBorghetti,
  Campari,
  CarpanoAntica,
  Citrus,
  CocchiDiTorino,
  Cointreau,
  Cynar,
  ColdBrew,
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
  HoneySyrup,
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
  MoleBitters,
  MonkeyShoulder,
  NA,
  OldTom,
  Orange,
  OrangeBitters,
  Pathfinder,
  PeychaudsBitters,
  Plantation3StarRum,
  PlymouthGin,
  Prosecco,
  PussersRum,
  RedWine,
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
  WhiteWine,
  Wine,
  YellowChartreuse,
  allIngredients,
  baseSpirits,
  getByName,
  isDescendantOf,
};
