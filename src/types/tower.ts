export enum TowerType {
  Arrow = "arrow",
  Cannon = "cannon",
  Magic = "magic",
  Ice = "ice",
  Lightning = "lightning",
}

export enum TargetingMode {
  First = "first",
  Last = "last",
  Strongest = "strongest",
  Weakest = "weakest",
  Closest = "closest",
}

export interface TowerStats {
  damage: number;
  attackSpeed: number; // attacks per second
  range: number;
  cost: number;
  upgradeCost: number;
}

export interface TowerUpgrade {
  id: string;
  name: string;
  description: string;
  cost: number;
  statModifiers: Partial<TowerStats>;
  level: number;
  path: "A" | "B";
}

export interface TowerDefinition {
  type: TowerType;
  name: string;
  description: string;
  baseStats: TowerStats;
  upgrades: {
    pathA: TowerUpgrade[];
    pathB: TowerUpgrade[];
  };
  specialAbility?: string;
}

export interface Tower {
  id: string;
  type: TowerType;
  position: { x: number; y: number };
  stats: TowerStats;
  upgradeLevel: {
    pathA: number;
    pathB: number;
  };
  targetingMode: TargetingMode;
  kills: number;
}

export interface MergeRecipe {
  input: [TowerType, TowerType];
  output: TowerType;
  minLevel: number;
}
