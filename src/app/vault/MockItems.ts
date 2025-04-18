import {
  InfoBlock,
  InfoDecrease,
  InfoIncrease,
  InfoModifier,
  InfoSources,
  InfoStat,
  InfoText,
  InfoTrait,
  InfoUsage,
  Item,
} from "./Item";

const White = "standard";
const Green = "enhanced";
const Blue = "deluxe";
//const Purple = "superior";
const Yellow = "prestige";

function usage(...usage: string[]): InfoUsage {
  return {
    type: "usage",
    usage,
  };
}

function sources(sources: { [name: string]: string[] }): InfoSources {
  return {
    type: "sources",
    sources,
  };
}

function text(description: string): InfoText {
  return {
    type: "text",
    description,
  };
}

function decrease(description: string): InfoDecrease {
  return {
    type: "decrease",
    description,
  };
}

function increase(description: string): InfoIncrease {
  return {
    type: "increase",
    description,
  };
}

function modifier(name: string, description: string): InfoModifier {
  return {
    type: "modifier",
    name,
    description,
  };
}

function trait(name: string, description: string): InfoTrait {
  return {
    type: "trait",
    name,
    description,
  };
}

function stat(name: string, base: number, change: number): InfoStat {
  return {
    type: "stat",
    name,
    base,
    change,
  };
}

let _id = 0;
const item = (
  name: string,
  type: string,
  rarity: string,
  info: InfoBlock[],
  rows: number,
  cols: number,
  value: number,
  quantity: number = 1
): Item => ({
  id: _id++,
  name,
  type,
  rarity,
  info,
  rows,
  cols,
  value,
  quantity,
});

const LightRoundsInfo = [[text("Small-caliber compact ammunition used for a variety of ballistic weapon types.")]];
const PlushCompanionInfo = [[text("Loved and abandoned long ago.")]];
const EnzymeSuppressantsInfo = [[text("Lingering effects from your consumables last longer.")]];
const ProwlKitInfo = [[text("You move faster and reload weapons more quickly while crouched.")]];
const SmokeGrenadeInfo = [
  [text("Tossable smoke screen of concentrated pollution that breaks sightlines and conceals those within.")],
];
const MechanicsKitInfo = [
  [
    text("Removes hazardous mechanical (MCH) status effects (Immobilize, Overheat, Toxin)."),
    text("Maximizes Hardware stat for short duration."),
  ],
];

const EightXSBasePackInfo = [[text("+8 slots to carry more items.")]];
const SurveyToolInfo = [
  [
    text("Traxus pioneered this low-cost device to replace specialized engineering drones. Prone to false positives."),
    text("Upon exfil, auto-sells for Traxus reputation."),
  ],
];
const CreditsInfo = [[text("Currency used to purchase items from the Black Market.")]];

const NimbleFingersV5Info = [
  [
    trait("Unique Trait", "Opening loot containers pings unopened loot container nearby."),
    increase("Slightly increases hipfire accuracy and control."),
  ],
  [stat("Agility", 20, 5), stat("Loot Speed", 15, 50)],
  [modifier("Vintage", "Upon exfil, this item's value will be increased.")],
];

const DistanceRunnerV2Info = [
  [decrease("Slightly decrease weapon handling and aim down sights speed.")],
  [stat("Heat Capacity", 25, 10)],
];

const NimbleFingersV1Info = [[stat("Loot Speed", 10, 15)]];

const BasicXerogelInfo = [
  [text("Multipurpose construction material, perfect for space colonies.")],
  [
    sources({ "Dire Marsh": ["Quarantine", "Greenhouse"], "Tool Cart": [] }),
    usage("Traxus Upgrades", "NuCaloric Vendor Unlocks", "Traxux Vendor Unlocks"),
  ],
];

export const MockItems: Item[] = [
  item("Prowl Kit", "Core", White, ProwlKitInfo, 1, 2, 70, 1),
  item("Enzyme Suppressants", "Core", Green, EnzymeSuppressantsInfo, 1, 2, 35, 1),
  item("Nimble Fingers V5", "Implant", Yellow, NimbleFingersV5Info, 1, 2, 9000, 1),
  item("Nimble Fingers V1", "Implant", White, NimbleFingersV1Info, 1, 2, 35, 1),
  item("Distance Runner V2", "Implant", Green, DistanceRunnerV2Info, 1, 2, 70, 1),
  item("Light Rounds", "Ammo", White, LightRoundsInfo, 1, 1, 19, 450),
  item("Plush Companion", "Valuable", Blue, PlushCompanionInfo, 1, 1, 550, 1),
  item("Smoke Grenade", "Grenade Equipment", White, SmokeGrenadeInfo, 1, 2, 20, 1),
  item("Mechanic's Kit", "Cleanse Consumable", White, MechanicsKitInfo, 1, 1, 20, 1),
  item("8XS Base Pack", "Backpack", Green, EightXSBasePackInfo, 2, 2, 100, 1),
  item("Survey Tool", "Valuable", Green, SurveyToolInfo, 1, 1, 225, 1),
  item("Credits", "Currency", White, CreditsInfo, 1, 1, 50, 50),
  item("Basic Xerogel", "Material", Green, BasicXerogelInfo, 1, 1, 70, 7),
];

// item("", "", Green, , 1, 1, , 1),
