/**
 * Types for the coffee & tea menu.
 *
 * GaggiMate profiles are stored verbatim as exported from the machine
 * (both the "standard" and "pro" schema variants), so updating the menu
 * after tuning a profile is a straight paste-over. Shot telemetry is the
 * slimmed form produced by scripts/slim-shot.mjs.
 */

export type GaggiMateTransition = {
  type: "instant" | "linear";
  duration: number;
  adaptive: boolean;
};

export type GaggiMatePump = {
  target: "pressure" | "flow";
  pressure: number;
  flow: number;
};

/** A condition that ends a phase early, e.g. "39.6g in the cup". */
export type GaggiMateExitTarget = {
  type: "pressure" | "flow" | "volumetric";
  operator: "gte" | "lte";
  value: number;
};

export type GaggiMatePhase = {
  name: string;
  phase: "preinfusion" | "brew";
  valve: number;
  /** Seconds. A maximum — exit targets usually end the phase sooner. */
  duration: number;
  temperature: number;
  transition: GaggiMateTransition;
  /** 0 means pump off (a bloom). */
  pump: GaggiMatePump | 0;
  targets?: GaggiMateExitTarget[];
};

export type GaggiMateProfile = {
  label: string;
  type: "standard" | "pro";
  description: string;
  temperature: number;
  utility?: boolean;
  phases: GaggiMatePhase[];
};

export type ShotSample = {
  /** ms since shot start */
  t: number;
  /** target pressure, bar (0 after the pump cuts) */
  tp: number;
  /** actual pressure, bar */
  cp: number;
  /** weight in cup, g */
  v: number;
  /** scale-measured flow, g/s */
  vf: number;
};

export type SlimShot = {
  profile: string;
  /** ms */
  duration: number;
  /** ms between samples */
  sampleInterval: number;
  /** final weight in cup, g */
  volume: number;
  samples: ShotSample[];
  phaseTransitions: { sampleIndex: number; phaseName: string }[];
};

export type Bean = {
  name: string;
  roaster: string;
  /** Country first, most specific last — rendered as a breadcrumb. */
  originTrail: string[];
  process: string;
  varietal: string;
  elevation: string;
  tastingNotes: string[];
  /** A plain-language line explaining the process/varietal/elevation jargon. */
  description?: string;
};

export type CoffeeDrink = {
  title: string;
  /** One line shown on the card, like a cocktail's ingredient list. */
  blurb: string;
  /** Fuller story, shown when the drink is opened. */
  description: string;
  /** Short stats rendered as chips: dose, ratio, temperature, time… */
  params: { label: string; value: string }[];
  /** Espresso drinks: the GaggiMate profile they're pulled with. */
  profile?: GaggiMateProfile;
  /** A representative real pull of that profile, for the chart. */
  shot?: SlimShot;
  /** Pour over etc.: brew steps. */
  recipeSteps?: string[];
};

export type Tea = {
  name: string;
  type: string;
  tastingNotes: string[];
  caffeineFree?: boolean;
  producer?: string;
  cultivar?: string;
  region?: string;
  description?: string;
  /** e.g. "6 g / 200 ml at 200°F / 2 minutes" */
  brew?: string;
};

export type GearItem = {
  name: string;
  detail: string;
};
