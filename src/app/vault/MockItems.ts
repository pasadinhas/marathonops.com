import { Detail, Item, Modifier, Stat } from "./Item";

const White = "standard";
const Green = "enhanced";
const Blue = "deluxe";
//const Purple = "superior";
const Yellow = "prestige";

function modifiers(...modifiers: Modifier[]): Detail {
  return { type: "modifiers", modifiers };
}

function stats(...stats: Stat[]): Detail {
  return { type: "stats", stats };
}

function modifier(type: Modifier["type"], name: string, description: string): Modifier {
  return { type, name, description };
}

function stat(name: string, base: number, change: number): Stat {
  return { name, base, change };
}

function text(...texts: string[]): Detail[] {
  return [modifiers(...texts.map((text) => modifier("text", "", text)))];
}

let _id = 0;
const item = (
  name: string,
  type: string,
  rarity: string,
  details: Detail[],
  rows: number,
  cols: number,
  value: number,
  quantity: number = 1
): Item => ({
  id: _id++,
  name,
  type,
  rarity,
  details,
  rows,
  cols,
  value,
  quantity,
});

const LightRoundsDetails = text("Small-caliber compact ammunition used for a variety of ballistic weapon types.");
const PlushCompanionDetails = text("Loved and abandoned long ago.");
const EnzymeSuppressantsDetails = text("Lingering effects from your consumables last longer.");
const ProwlKitDetails = text("You move faster and reload weapons more quickly while crouched.");
const SmokeGrenadeDetails = text(
  "Tossable smoke screen of concentrated pollution that breaks sightlines and conceals those within."
);
const MechanicsKitDetails = text(
  "Removes hazardous mechanical (MCH) status effects (Immobilize, Overheat, Toxin).",
  "Maximizes Hardware stat for short duration."
);
const EightXSBasePackDetails = text("+8 slots to carry more items.");
const SurveyToolDetails = text(
  "Traxus pioneered this low-cost device to replace specialized engineering drones. Prone to false positives.",
  "Upon exfil, auto-sells for Traxus reputation."
);
const CreditsDetails = text("Currency used to purchase items from the Black Market.");

const NimbleFingersV5Details = [
  modifiers(
    modifier("trait", "Unique Trait", "Opening loot containers pings unopened loot container nearby."),
    modifier("increase", "", "Slightly increases hipfire accuracy and control.")
  ),
  stats(stat("Agility", 20, 5), stat("Loot Speed", 15, 50)),
  modifiers(modifier("modifier", "Vintage", "Upon exfil, this item's value will be increased.")),
];

const DistanceRunnerV2Details = [
  modifiers(modifier("decrease", "", "Slightly decrease weapon handling and aim down sights speed.")),
  stats(stat("Heat Capacity", 25, 10)),
];

const NimbleFingersV1Details = [stats(stat("Loot Speed", 10, 15))];

export const MockItems: Item[] = [
  item("Prowl Kit", "Core", White, ProwlKitDetails, 1, 2, 70, 1),
  item("Enzyme Suppressants", "Core", Green, EnzymeSuppressantsDetails, 1, 2, 35, 1),
  item("Nimble Fingers V5", "Implant", Yellow, NimbleFingersV5Details, 1, 2, 9000, 1),
  item("Nimble Fingers V1", "Implant", White, NimbleFingersV1Details, 1, 2, 35, 1),
  item("Distance Runner V2", "Implant", Green, DistanceRunnerV2Details, 1, 2, 70, 1),
  item("Light Rounds", "Ammo", White, LightRoundsDetails, 1, 1, 19, 450),
  item("Plush Companion", "Valuable", Blue, PlushCompanionDetails, 1, 1, 550, 1),
  item("Smoke Grenade", "Grenade Equipment", White, SmokeGrenadeDetails, 1, 2, 20, 1),
  item("Mechanic's Kit", "Cleanse Consumable", White, MechanicsKitDetails, 1, 1, 20, 1),
  item("8XS Base Pack", "Backpack", Green, EightXSBasePackDetails, 2, 2, 100, 1),
  item("Survey Tool", "Valuable", Green, SurveyToolDetails, 1, 1, 225, 1),
  item("Credits", "Currency", White, CreditsDetails, 1, 1, 50, 50),
];

// item("", "", Green, , 1, 1, , 1),
