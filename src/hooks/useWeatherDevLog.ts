/**
 * Weather Dev Log Hook
 * Subscribes to weather store changes and logs them to the dev console
 */

import { useEffect, useRef } from "react";
import { useWeatherStore } from "@/stores/weatherStore";
import { useDevLog } from "@/contexts/DevLogContext";

export function useWeatherDevLog() {
  const { devLog, devLogJson } = useDevLog();
  const prevWeatherRef = useRef<string | null>(null);
  const prevTransitioningRef = useRef(false);

  // Subscribe to weather changes
  const current = useWeatherStore((s) => s.current);
  const isTransitioning = useWeatherStore((s) => s.isTransitioning);
  const transition = useWeatherStore((s) => s.transition);
  const effectiveModifiers = useWeatherStore((s) => s.effectiveModifiers);
  const effectiveVisuals = useWeatherStore((s) => s.effectiveVisuals);
  const lightning = useWeatherStore((s) => s.lightning);

  useEffect(() => {
    // Log weather changes
    if (prevWeatherRef.current !== null && prevWeatherRef.current !== current) {
      devLog(`Weather changed: ${prevWeatherRef.current} → ${current}`, "info");
      devLogJson("Weather State", {
        type: current,
        modifiers: effectiveModifiers,
        visuals: {
          particleType: effectiveVisuals.particleType,
          particleDensity: effectiveVisuals.particleDensity,
          screenDarkening: effectiveVisuals.screenDarkening,
          fogDensity: effectiveVisuals.fogDensity,
        },
      });
    }
    prevWeatherRef.current = current;
  }, [current, devLog, devLogJson, effectiveModifiers, effectiveVisuals]);

  useEffect(() => {
    // Log transition start
    if (isTransitioning && !prevTransitioningRef.current && transition) {
      devLog(
        `Weather transitioning: ${transition.from} → ${transition.to} (${transition.duration}s)`,
        "info"
      );
    }
    prevTransitioningRef.current = isTransitioning;
  }, [isTransitioning, transition, devLog]);

  useEffect(() => {
    // Log lightning strikes
    if (lightning.active && lightning.boltVisible) {
      devLogJson("Lightning Strike", {
        position: lightning.strikePosition,
        intensity: lightning.intensity,
      });
    }
  }, [lightning.active, lightning.boltVisible, lightning.strikePosition, lightning.intensity, devLogJson]);
}
