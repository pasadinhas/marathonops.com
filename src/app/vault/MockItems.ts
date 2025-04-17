import { Detail, Item } from "./Item";

const NimbleFingersV5Details: Detail[] = [
  {
    type: "modifiers",
    modifiers: [
      {
        type: "trait",
        name: "Unique Trait",
        description:
          "Opening loot containers pings unopened loot container nearby.",
      },
      {
        type: "increase",
        name: "",
        description: "Slightly increases hipfire accuracy and control.",
      },
    ],
  },
  {
    type: "stats",
    stats: [
      {
        name: "Agility",
        base: 20,
        change: 5,
      },
      {
        name: "Loot Speed",
        base: 15,
        change: 50,
      },
    ],
  },
  {
    type: "modifiers",
    modifiers: [
      {
        type: "modifier",
        name: "Vintage",
        description: "Upon exfil, this item's value will be increased.",
      },
    ],
  },
];

export const MockItems: Item[] = [
  {
    id: 0,
    rows: 2,
    cols: 4,
    rarity: "superior",
    value: 1200,
    quantity: 1,
    details: [],
  },
  {
    id: 1,
    rows: 2,
    cols: 2,
    rarity: "enhanced",
    value: 600,
    quantity: 1,
    details: [],
  },
  {
    id: 2,
    rows: 2,
    cols: 2,
    rarity: "prestige",
    value: 4200,
    quantity: 1,
    details: [],
  },
  {
    id: 3,
    rows: 1,
    cols: 2,
    rarity: "enhanced",
    value: 120,
    quantity: 1,
    details: [],
  },
  {
    id: 4,
    rows: 1,
    cols: 2,
    rarity: "deluxe",
    value: 75,
    quantity: 1,
    details: [],
  },
  {
    id: 5,
    rows: 1,
    cols: 2,
    rarity: "prestige",
    value: 30,
    quantity: 14,
    details: NimbleFingersV5Details,
  },
  {
    id: 6,
    rows: 1,
    cols: 1,
    rarity: "standard",
    value: 15,
    quantity: 240,
    details: [],
  },
  {
    id: 7,
    rows: 1,
    cols: 1,
    rarity: "enhanced",
    value: 25,
    quantity: 5,
    details: [],
  },
  {
    id: 8,
    rows: 1,
    cols: 1,
    rarity: "enhanced",
    value: 25,
    quantity: 1,
    details: [],
  },
  {
    id: 9,
    rows: 1,
    cols: 1,
    rarity: "enhanced",
    value: 40,
    quantity: 2,
    details: [],
  },
  {
    id: 10,
    rows: 1,
    cols: 1,
    rarity: "enhanced",
    value: 30,
    quantity: 1,
    details: [],
  },
  {
    id: 11,
    rows: 1,
    cols: 1,
    rarity: "enhanced",
    value: 5,
    quantity: 8,
    details: [],
  },
];
