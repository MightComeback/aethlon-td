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
  // Extended stats
  health: number; // tower health
  armor: number; // physical damage reduction
  magicPen: number; // ignores X magic resistance
  armorPen: number; // ignores X armor
  critChance?: number; // 0-1 probability
  critMultiplier?: number; // damage multiplier on crit
  splashRadius?: number; // AoE damage radius
  projectileSpeed?: number; // for projectile-based towers
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

// ============================================================================
// Extended Tower System (Element + Category)
// ============================================================================

import type { Element } from "./element";
import type { StatusEffectType } from "./enemy";

/**
 * Tower category determines primary role and damage type
 */
export enum TowerCategory {
  Damage = "damage", // General damage dealers (balanced)
  MagicDamage = "magic_damage", // Ignores armor, affected by magic resist
  PhysicalDamage = "physical_damage", // High base damage, reduced by armor
  Buff = "buff", // Buffs nearby towers
  Debuff = "debuff", // Applies status effects to enemies
}

/**
 * Tower rarity determined by tier and merge complexity
 */
export enum TowerRarity {
  Common = "common", // Tier 1 base
  Uncommon = "uncommon", // Tier 1 special / Tier 2 base
  Rare = "rare", // Tier 2 special / Tier 3 base
  Epic = "epic", // Tier 3 special
  Legendary = "legendary", // Tier 3 ultimate recipes
}

/**
 * Buff configuration for buff towers
 */
export enum BuffType {
  AttackSpeed = "attack_speed",
  Damage = "damage",
  Range = "range",
  CritChance = "crit_chance",
  ArmorPen = "armor_pen",
  MagicPen = "magic_pen",
}

export interface BuffConfig {
  type: BuffType;
  radius: number; // tiles
  strength: number; // percentage or flat bonus
  stackable: boolean;
}

/**
 * Status effect configuration for debuff towers
 */
export interface StatusEffectConfig {
  type: StatusEffectType;
  chance: number; // 0-1 probability to apply
  duration: number; // seconds
  strength: number; // effect-specific value
}

/**
 * Tower ability (active or passive)
 */
export interface TowerAbility {
  id: string;
  name: string;
  description: string;
  cooldown: number; // ms
  duration?: number; // ms (for buffs/debuffs)
  strength: number; // ability-specific value
  type: "active" | "passive" | "aura";
}

/**
 * Tower mesh part (like EnemyMeshPart)
 */
export interface TowerMeshPart {
  type: "sphere" | "box" | "cylinder" | "cone" | "dodecahedron" | "torus" | "octahedron";
  position: [number, number, number];
  rotation?: [number, number, number];
  size: number[];
  color: string; // Grayscale hex (element color applied at runtime)
  emissive?: string; // Emissive color for glowing parts
  flatShading?: boolean;
  animated?: {
    type: "rotate" | "bob" | "pulse";
    speed: number;
    axis?: "x" | "y" | "z";
  };
}

/**
 * Tower mesh configuration (like EnemyMeshConfig)
 */
export interface TowerMeshConfig {
  baseShape: "pedestal" | "tower" | "obelisk" | "crystal" | "statue" | "orb";
  scale: number;
  height: number; // total tower height
  parts: TowerMeshPart[];
  projectileMesh?: TowerMeshPart[]; // visual for projectiles
  effectColor: string; // element-based tint applied at runtime
}

/**
 * Extended tower definition with element and category
 */
export interface ExtendedTowerDefinition {
  id: string; // unique identifier e.g., "fire_damage_t1"
  type: TowerType; // enum value for backward compat
  name: string;
  description: string;

  // Classification
  element: Element;
  category: TowerCategory;
  tier: 1 | 2 | 3;
  rarity: TowerRarity;

  // Stats
  baseStats: TowerStats;

  // Abilities
  ability?: TowerAbility;
  statusEffect?: StatusEffectConfig;
  buff?: BuffConfig;

  // Visual
  meshConfig: TowerMeshConfig;

  // Merge info
  mergeRecipe?: {
    id?: string; // Optional recipe ID
    inputs: [string, string]; // Tower IDs
    output: string;
    tier: number;
    rarity: TowerRarity;
  };
  mergeOutput?: string[]; // IDs of towers this can become

  // Unlocking
  unlockCondition?: {
    type: "level" | "achievement" | "recipe_discovered";
    value: string | number;
  };
}

/**
 * Extended runtime tower instance
 */
export interface ExtendedTower {
  id: string;
  definitionId: string; // References ExtendedTowerDefinition.id
  type: TowerType;
  position: { x: number; y: number };
  stats: TowerStats;
  element: Element;
  category: TowerCategory;

  // Upgrades (in-game progression, separate from merge)
  upgradeLevel: number; // 0-3 simple upgrade path

  // Runtime state
  targetingMode: TargetingMode;
  kills: number;
  damageDealt: number;
  lastAttackTime: number;
  currentTarget?: string; // Enemy ID

  // Ability state
  abilityCooldown?: number;
  activeBuffs?: string[]; // IDs of buffs currently active
}

/**
 * Tower tier configuration
 */
export interface TowerTierConfig {
  tier: number;
  statMultiplier: number;
  costMultiplier: number;
  minRarity: TowerRarity;
  colorSaturation: number; // 0-1 for visual distinction
}
