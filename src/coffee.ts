import shotSeyTurbo from "./data/shot-sey-turbo.json";
import type {
  Bean,
  CoffeeDrink,
  GaggiMateProfile,
  GearItem,
  SlimShot,
  Tea,
} from "./types/coffee";

// ── The bean on bar ──────────────────────────────────────────────────────────
// Update this when a new bag gets cracked. Placeholder bag until then.

export const currentBean: Bean = {
  name: "Hamasho Village",
  roaster: "SEY, Greenpoint",
  originTrail: ["Ethiopia", "Sidama", "Bensa", "Hamasho Village"],
  process: "Natural",
  varietal: "74158",
  elevation: "2,130–2,300 masl",
  tastingNotes: ["Blueberry", "Bergamot", "Honeysuckle"],
};

// ── Shot profiles ────────────────────────────────────────────────────────────
// GaggiMate exports, pasted verbatim. Phase durations are maximums — the
// exit targets end each phase early, which is why a "28 second" profile
// pulls in under 20.
//
// Community profile as a stand-in until the GaggiMate mod is installed
// and the house profiles exist.

export const seyTurbo: GaggiMateProfile = {
  label: "SEY Turbo 18g 1:2.2",
  type: "pro",
  description: "Light Roast - Coarse - 9-15s - 1:2.2 - SEY Turbo Style",
  temperature: 90.5,
  phases: [
    {
      name: "Pre-infusion",
      phase: "preinfusion",
      valve: 1,
      duration: 5,
      temperature: 90.5,
      transition: {
        type: "instant",
        duration: 0,
        adaptive: false,
      },
      pump: {
        target: "pressure",
        pressure: 2,
        flow: 0,
      },
      targets: [
        {
          type: "pressure",
          operator: "gte",
          value: 1.5,
        },
      ],
    },
    {
      name: "Ramp",
      phase: "brew",
      valve: 1,
      duration: 3,
      temperature: 90.5,
      transition: {
        type: "linear",
        duration: 3,
        adaptive: false,
      },
      pump: {
        target: "pressure",
        pressure: 3.5,
        flow: 0,
      },
      targets: [
        {
          type: "pressure",
          operator: "gte",
          value: 3.5,
        },
      ],
    },
    {
      name: "Extraction",
      phase: "brew",
      valve: 1,
      duration: 20,
      temperature: 90.5,
      transition: {
        type: "instant",
        duration: 0,
        adaptive: false,
      },
      pump: {
        target: "pressure",
        pressure: 3.5,
        flow: 0,
      },
      targets: [
        {
          type: "volumetric",
          operator: "gte",
          value: 39.6,
        },
      ],
    },
  ],
};

// A real pull of the profile above (community shot, slimmed by
// scripts/slim-shot.mjs — drop in a house export to replace it).
export const seyTurboShot = shotSeyTurbo as SlimShot;

// ── Drinks ───────────────────────────────────────────────────────────────────

export const coffeeDrinks: CoffeeDrink[] = [
  {
    title: "Espresso",
    description:
      "An ultra-light, high-clarity turbo shot: low pressure, coarse grind, fast pull. Ground on pour-over burrs with a paper basket filter — an unreasonable combination that works. The machine brews by weight and cuts the pump early so the last drips land exactly on target.",
    params: [
      { label: "Dose", value: "18 g in / 39.6 g out" },
      { label: "Ratio", value: "1:2.2" },
      { label: "Water", value: "90.5°C" },
      { label: "Time", value: "≈15 s" },
    ],
    profile: seyTurbo,
    shot: seyTurboShot,
  },
  {
    title: "Pour Over",
    description:
      "A Hario V60 on the burrs it was ground for. Slow, sweet, and the clearest look at what the bean actually tastes like.",
    params: [
      { label: "Dose", value: "20 g / 320 g" },
      { label: "Ratio", value: "1:16" },
      { label: "Water", value: "99°C" },
      { label: "Time", value: "≈3 min" },
    ],
    recipeSteps: [
      "Bloom with 60 g of water, swirl, and rest 45 seconds.",
      "Pour to 160 g in slow circles.",
      "Two more pours of 80 g each as the bed drains.",
      "Swirl gently and let it draw down flat.",
    ],
  },
  {
    title: "Americano",
    description:
      "The turbo shot stretched with hot water. Everything the espresso is, at a friendlier volume. Not the Campari one — that's a tab over.",
    params: [
      { label: "Build", value: "1 shot + 90 g water" },
      { label: "Water", value: "90.5°C" },
    ],
  },
];

// ── Tea ──────────────────────────────────────────────────────────────────────
// Deliberately a short list. Edit freely.

export const teas: Tea[] = [
  { name: "Jasmine Pearls", type: "Green", note: "Floral, rolled, patient." },
  { name: "Sencha", type: "Green", note: "Grassy and brisk." },
  { name: "English Breakfast", type: "Black", note: "For guests who want coffee without coffee." },
  { name: "Chamomile", type: "Herbal", note: "The closing-time option." },
];

// ── The setup ────────────────────────────────────────────────────────────────

export const gear: GearItem[] = [
  {
    name: "Gaggia Classic Pro · GaggiMate",
    detail:
      "A stock Classic Pro with an ESP32 brain transplant: PID temperature, full pressure and flow profiling, and brew-by-weight over a Bluetooth scale.",
  },
  {
    name: "Femobook A4Z",
    detail:
      "Electric grinder built around 1Zpresso ZP6 burrs — high-clarity pour-over geometry moonlighting as an espresso grinder.",
  },
  {
    name: "Paper basket filters",
    detail:
      "The trick that makes the ZP6 pull espresso: a paper filter under the puck keeps fast, coarse light-roast shots running clean.",
  },
  {
    name: "Hario V60",
    detail: "Plastic, because the coffee people are right about thermal mass.",
  },
];
