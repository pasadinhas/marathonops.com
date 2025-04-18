export type InfoUsage = {
  type: "usage";
  usage: string[];
};

export type InfoSources = {
  type: "sources";
  sources: {
    [name: string]: string[];
  };
};

export type InfoText = {
  type: "text";
  description: string;
};

export type InfoDecrease = {
  type: "decrease";
  description: string;
};

export type InfoIncrease = {
  type: "increase";
  description: string;
};

export type InfoModifier = {
  type: "modifier";
  name: string;
  description: string;
};

export type InfoTrait = {
  type: "trait";
  name: string;
  description: string;
};

export type InfoStat = {
  type: "stat";
  name: string;
  base: number;
  change: number;
};

export type InfoType =
  | InfoStat
  | InfoTrait
  | InfoModifier
  | InfoIncrease
  | InfoDecrease
  | InfoText
  | InfoSources
  | InfoUsage;

export type InfoBlock = Array<InfoType>;

export type Item = {
  id: number;
  name: string;
  type: string;
  rarity: string;
  value: number;
  quantity: number;
  rows: number;
  cols: number;
  info: InfoBlock[];
};
