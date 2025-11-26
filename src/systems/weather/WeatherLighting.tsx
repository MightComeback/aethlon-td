/**
 * WeatherLighting Component
 * Controls scene lighting based on current weather state
 * Updates both Three.js lights and tile shader uniforms
 */

import { useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useWeatherStore } from "@/stores/weatherStore";
import { useTileMaterialStore } from "@/stores/tileMaterialStore";
import {
  setLighting,
  setWeatherUniforms,
  hexToVector3,
} from "@/shaders/tileAtlasShader";

export function WeatherLighting() {
  const ambientRef = useRef<THREE.AmbientLight>(null);
  const directionalRef = useRef<THREE.DirectionalLight>(null);

  const { scene } = useThree();

  // Get tile material from store
  const tileMaterial = useTileMaterialStore((s) => s.material);

  // Subscribe to weather store
  const effectiveLighting = useWeatherStore((s) => s.effectiveLighting);
  const effectiveVisuals = useWeatherStore((s) => s.effectiveVisuals);
  const lightning = useWeatherStore((s) => s.lightning);
  const updateTransition = useWeatherStore((s) => s.updateTransition);
  const updateLightning = useWeatherStore((s) => s.updateLightning);

  // Update scene background color based on weather
  useEffect(() => {
    if (effectiveVisuals.screenTint && effectiveVisuals.screenTintStrength) {
      // Blend background with tint
      const baseColor = new THREE.Color("#1a1a2e");
      const tintColor = new THREE.Color(effectiveVisuals.screenTint);
      baseColor.lerp(tintColor, effectiveVisuals.screenTintStrength * 0.5);
      scene.background = baseColor;
    } else {
      scene.background = new THREE.Color("#1a1a2e");
    }
  }, [scene, effectiveVisuals.screenTint, effectiveVisuals.screenTintStrength]);

  // Main update loop
  useFrame((_, delta) => {
    // Update weather transitions
    updateTransition(delta);
    updateLightning(delta);

    // Calculate effective lighting with lightning boost
    let ambientIntensity = effectiveLighting.ambientIntensity;
    let directionalIntensity = effectiveLighting.directionalIntensity;

    // Apply lightning flash boost
    if (lightning.active && lightning.intensity > 0) {
      const flashBoost = lightning.intensity * (effectiveLighting.flashIntensity ?? 2.0);
      ambientIntensity = Math.min(2, ambientIntensity + flashBoost);
      directionalIntensity = Math.min(2, directionalIntensity + flashBoost * 0.5);
    }

    // Update Three.js lights
    if (ambientRef.current) {
      ambientRef.current.intensity = ambientIntensity;
      ambientRef.current.color.set(effectiveLighting.ambientColor);
    }

    if (directionalRef.current) {
      directionalRef.current.intensity = directionalIntensity;
      directionalRef.current.color.set(effectiveLighting.directionalColor);
      directionalRef.current.position.set(
        effectiveLighting.directionalPosition[0],
        effectiveLighting.directionalPosition[1],
        effectiveLighting.directionalPosition[2]
      );
    }

    // Update tile shader uniforms
    if (tileMaterial) {
      // Update base lighting
      setLighting(tileMaterial, {
        ambientColor: hexToVector3(effectiveLighting.ambientColor),
        ambientIntensity,
        lightIntensity: directionalIntensity,
      });

      // Update weather effects
      setWeatherUniforms(tileMaterial, {
        screenDarkening: effectiveVisuals.screenDarkening,
        lightningFlash: lightning.active ? lightning.intensity : 0,
        weatherTint: effectiveVisuals.screenTint
          ? hexToVector3(effectiveVisuals.screenTint)
          : new THREE.Vector3(1, 1, 1),
        weatherTintStrength: effectiveVisuals.screenTintStrength ?? 0,
        fogDensity: effectiveVisuals.fogDensity,
        fogColor: hexToVector3(effectiveVisuals.fogColor),
      });
    }
  });

  return (
    <>
      <ambientLight
        ref={ambientRef}
        intensity={effectiveLighting.ambientIntensity}
        color={effectiveLighting.ambientColor}
      />
      <directionalLight
        ref={directionalRef}
        intensity={effectiveLighting.directionalIntensity}
        color={effectiveLighting.directionalColor}
        position={effectiveLighting.directionalPosition}
      />
    </>
  );
}
