/**
 * Post-Processing Effects
 * Adds bloom, SSAO, and tone mapping for cinematic visuals
 */

import { EffectComposer, Bloom, ToneMapping } from "@react-three/postprocessing";
import { ToneMappingMode } from "postprocessing";
import { useSettingsStore } from "@/stores/settingsStore";
import { WEATHER_QUALITY_PRESETS } from "@/data/weather/qualityPresets";

export function PostProcessing() {
  const graphicsQuality = useSettingsStore((s) => s.graphicsQuality);
  const preset = WEATHER_QUALITY_PRESETS[graphicsQuality];

  // Only render effects if post-processing is enabled
  if (!preset.postProcessing) return null;

  return (
    <EffectComposer multisampling={0}>
      {/* Tone Mapping - HDR look (medium+) */}
      {preset.toneMappingEnabled ? (
        <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
      ) : null}

      {/* Bloom - glowing emissive elements (high+) */}
      {preset.bloomEnabled ? (
        <Bloom
          intensity={0.3}
          luminanceThreshold={0.9}
          luminanceSmoothing={0.9}
          radius={0.3}
        />
      ) : null}

      {/* Note: Removed N8AO/SSAO to reduce GPU load */}
    </EffectComposer>
  );
}
