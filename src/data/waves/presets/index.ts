/**
 * Wave Presets Index
 * Central export for all wave presets
 */

import type { WavePreset, BossTemplate } from "@/types/wavePreset";
import { DIFFICULTY_PRESETS } from "./difficultyPresets";
import { SPECIAL_MODE_PRESETS } from "./specialModes";
import { THEME_PRESETS } from "./themePresets";
import { BOSS_TEMPLATES } from "./bossTemplates";

// ============================================================================
// All Presets Export
// ============================================================================

export const ALL_WAVE_PRESETS: WavePreset[] = [
  ...DIFFICULTY_PRESETS,
  ...THEME_PRESETS,
  ...SPECIAL_MODE_PRESETS,
];

export const ALL_BOSS_TEMPLATES: BossTemplate[] = BOSS_TEMPLATES;

// ============================================================================
// Preset Queries
// ============================================================================

/**
 * Get all presets by category
 */
export function getPresetsByCategory(category: WavePreset["category"]): WavePreset[] {
  return ALL_WAVE_PRESETS.filter((p) => p.category === category);
}

/**
 * Get a preset by ID
 */
export function getPresetById(id: string): WavePreset | undefined {
  return ALL_WAVE_PRESETS.find((p) => p.id === id);
}

/**
 * Get presets by tags
 */
export function getPresetsByTag(tag: string): WavePreset[] {
  return ALL_WAVE_PRESETS.filter((p) => p.tags.includes(tag));
}

/**
 * Search presets by name or description
 */
export function searchPresets(query: string): WavePreset[] {
  const lowerQuery = query.toLowerCase();
  return ALL_WAVE_PRESETS.filter(
    (p) =>
      p.name.toLowerCase().includes(lowerQuery) ||
      p.description.toLowerCase().includes(lowerQuery) ||
      p.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
  );
}

/**
 * Get boss template by ID
 */
export function getBossTemplateById(id: string): BossTemplate | undefined {
  return BOSS_TEMPLATES.find((t) => t.id === id);
}

/**
 * Get boss templates by boss type
 */
export function getBossTemplatesByType(bossType: string): BossTemplate[] {
  return BOSS_TEMPLATES.filter((t) => t.bossType === bossType);
}

/**
 * Get boss templates by difficulty
 */
export function getBossTemplatesByDifficulty(minDiff: number, maxDiff: number): BossTemplate[] {
  return BOSS_TEMPLATES.filter((t) => t.difficulty >= minDiff && t.difficulty <= maxDiff);
}

// Re-export individual preset arrays
export { DIFFICULTY_PRESETS } from "./difficultyPresets";
export { SPECIAL_MODE_PRESETS } from "./specialModes";
export { THEME_PRESETS } from "./themePresets";
export { BOSS_TEMPLATES } from "./bossTemplates";
