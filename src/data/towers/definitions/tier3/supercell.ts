/**
 * Supercell Element - Tier 3 Towers (Storm + Lightning mastery)
 * Ultimate Lightning element specialization
 */

import {
  TowerCategory,
  TowerRarity,
  BuffType,
  type ExtendedTowerDefinition,
} from "@/types/tower";
import { MergedElementT2, MergedElementT3, BaseElement } from "@/types/element";
import { StatusEffectType } from "@/types/enemy";
import { createTowerId } from "../../mergeGraph";

export const SUPERCELL_TIER3_TOWERS: ExtendedTowerDefinition[] = [
  // 1. Supercell Damage Tower
  {
    id: createTowerId(MergedElementT3.Supercell, TowerCategory.Damage, 3),
    type: "supercell_damage" as any,
    name: "Mega Thunder Spire",
    description: "Commands the most powerful thunderstorms with devastating chain lightning.",
    element: MergedElementT3.Supercell,
    category: TowerCategory.Damage,
    tier: 3,
    rarity: TowerRarity.Rare,
    baseStats: {
      damage: 95,
      attackSpeed: 1.1,
      range: 3.8,
      cost: 640,
      upgradeCost: 320,
      health: 220,
      armor: 12,
      magicPen: 8,
      armorPen: 8,
    },
    ability: {
      id: "chain_lightning",
      name: "Chain Lightning",
      description: "Fires a bolt that chains to 5 additional enemies.",
      cooldown: 12000,
      duration: 500,
      strength: 5,
      type: "active",
    },
    statusEffect: {
      type: StatusEffectType.Stun,
      chance: 0.3,
      duration: 0.8,
      strength: 1,
    },
    mergeRecipe: {
      inputs: [
        createTowerId(MergedElementT2.Storm, TowerCategory.Debuff, 2),
        createTowerId(BaseElement.Lightning, TowerCategory.Damage, 1),
      ],
      output: createTowerId(MergedElementT3.Supercell, TowerCategory.Damage, 3),
      tier: 3,
      rarity: TowerRarity.Rare,
    },
    meshConfig: {
      baseShape: "obelisk",
      scale: 1.5,
      height: 2.0,
      effectColor: "#191970",
      parts: [
        { type: "box", position: [0, 0, 0], size: [0.25, 0.2, 0.25], color: "#3a3a3a" },
        { type: "cylinder", position: [0, 0.3, 0], size: [0.14, 0.6], color: "#444444" },
        { type: "sphere", position: [0, 0.85, 0], size: [0.16], color: "#555555", emissive: "#191970", animated: { type: "pulse", speed: 3 } },
        { type: "cone", position: [0, 1.1, 0], size: [0.08, 0.25], color: "#888888", emissive: "#ffff00", animated: { type: "pulse", speed: 5 } },
        { type: "sphere", position: [0.12, 0.7, 0.08], size: [0.04], color: "#aaaaaa", emissive: "#ffffff", animated: { type: "pulse", speed: 6 } },
      ],
    },
  },

  // 2. Supercell Magic Damage Tower
  {
    id: createTowerId(MergedElementT3.Supercell, TowerCategory.MagicDamage, 3),
    type: "supercell_magic_damage" as any,
    name: "Storm Core Reactor",
    description: "Channels concentrated storm energy for devastating magical attacks.",
    element: MergedElementT3.Supercell,
    category: TowerCategory.MagicDamage,
    tier: 3,
    rarity: TowerRarity.Rare,
    baseStats: {
      damage: 82,
      attackSpeed: 1.0,
      range: 4.0,
      cost: 690,
      upgradeCost: 345,
      health: 190,
      armor: 10,
      magicPen: 22,
      armorPen: 0,
    },
    mergeRecipe: {
      inputs: [
        createTowerId(MergedElementT2.Storm, TowerCategory.MagicDamage, 2),
        createTowerId(BaseElement.Lightning, TowerCategory.Damage, 1),
      ],
      output: createTowerId(MergedElementT3.Supercell, TowerCategory.MagicDamage, 3),
      tier: 3,
      rarity: TowerRarity.Rare,
    },
    meshConfig: {
      baseShape: "crystal",
      scale: 1.45,
      height: 1.8,
      effectColor: "#ffff00",
      parts: [
        { type: "octahedron", position: [0, 0.25, 0], size: [0.2], color: "#3a3a3a" },
        { type: "dodecahedron", position: [0, 0.65, 0], size: [0.16], color: "#444444", emissive: "#191970", animated: { type: "rotate", speed: 1.2, axis: "y" } },
        { type: "cone", position: [0, 0.95, 0], size: [0.06, 0.2], color: "#888888", emissive: "#ffff00", animated: { type: "pulse", speed: 4 } },
      ],
    },
  },

];
