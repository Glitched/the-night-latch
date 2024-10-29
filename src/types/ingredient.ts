import { IngredientType } from "./ingredientType";
export type IngredientEntry = {
  name: string;
  type: IngredientType;
};

export const Ingredient = {
  RittenhouseRye: { name: "Rittenhouse Rye", type: IngredientType.Rye },
  Campari: { name: "Campari", type: IngredientType.Campari },
  Luxardo: { name: "Luxardo", type: IngredientType.Luxardo },
  StGermain: { name: "St. Germain", type: IngredientType.StGermain },
  CremeDeViolette: {
    name: "Creme de Violette",
    type: IngredientType.CremeDeViolette,
  },
  CaffeBorghetti: {
    name: "Caffe Borghetti",
    type: IngredientType.CoffeeLiqueur,
  },
  Cointreau: { name: "Cointreau", type: IngredientType.TripleSec },
  VidaMezcal: { name: "Vida Mezcal", type: IngredientType.Mezcal },
  TitosVodka: { name: "Titos Vodka", type: IngredientType.Vodka },
  CremeDeCassis: {
    name: "Creme de Cassis",
    type: IngredientType.CremeDeCassis,
  },
  Tanqueray: { name: "Tanqueray", type: IngredientType.Gin },
  TanquerayNo10: { name: "Tanqueray No. 10", type: IngredientType.Gin },
  PeychaudsBitters: {
    name: "Peychaud's Bitters",
    type: IngredientType.Bitters,
  },
  FernetBranca: { name: "Fernet Branca", type: IngredientType.Amaro },
  PussersRum: { name: "Pusser's Rum", type: IngredientType.DarkRum },
  Plantation3StarRum: {
    name: "Plantation 3 Star Rum",
    type: IngredientType.DarkRum,
  },
  Disaronno: { name: "Disaronno", type: IngredientType.Amaretto },
  AngosturaBitters: {
    name: "Angostura Bitters",
    type: IngredientType.Bitters,
  },
  RegansOrangeBitters: {
    name: "Regan's Orange Bitters",
    type: IngredientType.OrangeBitters,
  },
  AmaroMeletti: { name: "Amaro Meletti", type: IngredientType.Amaro },
  FourthaveSpirits: {
    name: "Fourthave Spirits",
    type: IngredientType.Campari,
  },
  Hatozaki: { name: "Hatozaki", type: IngredientType.JapaneseWhisky },
  MonkeyShoulder: {
    name: "Monkey Shoulder",
    type: IngredientType.Scotch,
  },
  PlymouthGin: { name: "Plymouth Gin", type: IngredientType.Gin },
  AltosTequila: { name: "Altos Tequila", type: IngredientType.Tequila },
  GreenChartreuse: {
    name: "Green Chartreuse",
    type: IngredientType.GreenChartreuse,
  },
  Lemon: { name: "Lemon", type: IngredientType.Lemon },
  Lime: { name: "Lime", type: IngredientType.Lime },
  Orange: { name: "Orange", type: IngredientType.Orange },
  EggWhite: { name: "Egg White", type: IngredientType.Eggs },
  SimpleSyrup: { name: "Simple Syrup", type: IngredientType.SimpleSyrup },
  Mint: { name: "Mint", type: IngredientType.Mint },
  CocchiAmericano: {
    name: "Cocchi Americano",
    type: IngredientType.SweetVermouth,
  },
  Soda: { name: "Soda", type: IngredientType.Soda },
  Dolin: { name: "Dolin", type: IngredientType.DryVermouth },
};
