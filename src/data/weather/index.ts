/**
 * Weather Data Module
 * Re-exports all weather-related data and utilities
 */

export {
  WEATHER_DEFINITIONS,
  getWeatherDefinition,
  getAllWeatherDefinitions,
  getWeatherTypesForBiome,
  getRandomWeatherType,
} from "./definitions";

export {
  WEATHER_QUALITY_PRESETS,
  getQualityPreset,
  calculateParticleCount,
  getMaxRainParticles,
  getMaxSnowParticles,
  shouldRenderLightningBolts,
  isPostProcessingEnabled,
  detectRecommendedQuality,
} from "./qualityPresets";
