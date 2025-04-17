export type Modifier = {
  type: "trait" | "increase" | "decrease" | "modifier" | "text";
  name?: string;
  description: string;
};

export type Stat = {
  name: string;
  base: number;
  change: number;
};

export type Detail = {
  type: "modifiers" | "stats";
  modifiers?: Modifier[];
  stats?: Stat[];
};

export type Item = {
  id: number;
  name: string;
  type: string;
  rarity: string;
  value: number;
  quantity: number;
  rows: number;
  cols: number;
  details: Detail[];
};
