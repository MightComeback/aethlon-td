/**
 * Weather Quality Presets
 * Performance settings for different hardware capabilities
 */

import { QualityLevel, WeatherQualityPreset } from "@/types/weather";

export const WEATHER_QUALITY_PRESETS: Record<QualityLevel, WeatherQualityPreset> = {
  low: {
    particleMultiplier: 0.3,
    maxRainParticles: 5000,
    maxSnowParticles: 2500,
    lightningBolts: true,
    postProcessing: false,
    fogQuality: "simple",

    // Basic shadows enabled for low quality
    shadowsEnabled: true,
    shadowMapSize: 512,
    shadowMapType: "basic",
    shadowRadius: 1,
    shadowBias: -0.001,
    shadowNormalBias: 0.1,

    // Minimal post-processing
    bloomEnabled: false,
    ssaoEnabled: false,
    toneMappingEnabled: false,
  },
  medium: {
    particleMultiplier: 0.5,
    maxRainParticles: 15000,
    maxSnowParticles: 7500,
    lightningBolts: true,
    postProcessing: false,
    fogQuality: "simple",

    // PCF shadows for medium quality
    shadowsEnabled: true,
    shadowMapSize: 2048,
    shadowMapType: "pcf",
    shadowRadius: 2,
    shadowBias: -0.0005,
    shadowNormalBias: 0.05,

    // Tone mapping enabled
    bloomEnabled: false,
    ssaoEnabled: false,
    toneMappingEnabled: true,
  },
  high: {
    particleMultiplier: 0.75,
    maxRainParticles: 30000,
    maxSnowParticles: 15000,
    lightningBolts: true,
    postProcessing: true,
    fogQuality: "volumetric",

    // High-quality shadows
    shadowsEnabled: true,
    shadowMapSize: 4096,
    shadowMapType: "pcfsoft",
    shadowRadius: 3,
    shadowBias: -0.0005,
    shadowNormalBias: 0.05,

    // Full post-processing
    bloomEnabled: true,
    ssaoEnabled: true,
    toneMappingEnabled: true,
  },
  ultra: {
    particleMultiplier: 1.0,
    maxRainParticles: 50000,
    maxSnowParticles: 25000,
    lightningBolts: true,
    postProcessing: true,
    fogQuality: "volumetric",

    // Ultra-quality soft shadows
    shadowsEnabled: true,
    shadowMapSize: 4096,
    shadowMapType: "pcfsoft",
    shadowRadius: 4,
    shadowBias: -0.002,
    shadowNormalBias: 0.2,

    // Full post-processing with highest quality
    bloomEnabled: true,
    ssaoEnabled: true,
    toneMappingEnabled: true,
  },
};

/**
 * Get the quality preset for a given level
 */
export function getQualityPreset(level: QualityLevel): WeatherQualityPreset {
  return WEATHER_QUALITY_PRESETS[level];
}

/**
 * Calculate actual particle count based on quality and weather intensity
 */
export function calculateParticleCount(
  baseCount: number,
  quality: QualityLevel,
  intensity: number = 1
): number {
  const preset = WEATHER_QUALITY_PRESETS[quality];
  return Math.floor(baseCount * preset.particleMultiplier * intensity);
}

/**
 * Get max particle count for rain based on quality
 */
export function getMaxRainParticles(quality: QualityLevel): number {
  return WEATHER_QUALITY_PRESETS[quality].maxRainParticles;
}

/**
 * Get max particle count for snow based on quality
 */
export function getMaxSnowParticles(quality: QualityLevel): number {
  return WEATHER_QUALITY_PRESETS[quality].maxSnowParticles;
}

/**
 * Check if lightning bolts should be rendered at this quality
 */
export function shouldRenderLightningBolts(quality: QualityLevel): boolean {
  return WEATHER_QUALITY_PRESETS[quality].lightningBolts;
}

/**
 * Check if post-processing is enabled at this quality
 */
export function isPostProcessingEnabled(quality: QualityLevel): boolean {
  return WEATHER_QUALITY_PRESETS[quality].postProcessing;
}

/**
 * Detect recommended quality based on device capabilities
 */
export function detectRecommendedQuality(): QualityLevel {
  // Check for mobile devices
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );

  if (isMobile) {
    return "low";
  }

  // Check for hardware concurrency (CPU cores)
  const cores = navigator.hardwareConcurrency ?? 4;

  if (cores <= 2) {
    return "low";
  } else if (cores <= 4) {
    return "medium";
  } else if (cores <= 8) {
    return "high";
  }

  return "ultra";
}
