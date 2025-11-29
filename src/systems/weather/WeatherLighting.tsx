/**
 * WeatherLighting Component
 * Controls scene lighting based on current weather state
 * Updates both Three.js lights and tile shader uniforms
 */

import { useRef, useEffect, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { CameraHelper } from "three";
import { useWeatherStore } from "@/stores/weatherStore";
import { useTileMaterialStore } from "@/stores/tileMaterialStore";
import { useSettingsStore } from "@/stores/settingsStore";
import { useDevLogSafe } from "@/contexts/DevLogContext";
import { WEATHER_QUALITY_PRESETS } from "@/data/weather/qualityPresets";
import {
  setLighting,
  setWeatherUniforms,
  hexToVector3,
} from "@/shaders/tileAtlasShader";

export function WeatherLighting() {
  const ambientRef = useRef<THREE.AmbientLight>(null);
  const directionalRef = useRef<THREE.DirectionalLight>(null);
  const [shadowHelper, setShadowHelper] = useState<CameraHelper | null>(null);
  const lastDebugLogRef = useRef(0);

  const { scene } = useThree();
  const { devLog, devLogJson } = useDevLogSafe();

  // Get tile material from store
  const tileMaterial = useTileMaterialStore((s) => s.material);

  // Get graphics quality for shadow configuration
  const graphicsQuality = useSettingsStore((s) => s.graphicsQuality);
  const debugMode = useSettingsStore((s) => s.debugMode);
  const qualityPreset = WEATHER_QUALITY_PRESETS[graphicsQuality];

  // Subscribe to weather store
  const effectiveLighting = useWeatherStore((s) => s.effectiveLighting);
  const effectiveVisuals = useWeatherStore((s) => s.effectiveVisuals);
  const lightning = useWeatherStore((s) => s.lightning);
  const updateTransition = useWeatherStore((s) => s.updateTransition);
  const updateLightning = useWeatherStore((s) => s.updateLightning);

  // Configure directional light shadows
  useEffect(() => {
    if (!directionalRef.current) return;

    const light = directionalRef.current;

    if (qualityPreset.shadowsEnabled) {
      light.castShadow = true;
      light.shadow.mapSize.width = qualityPreset.shadowMapSize;
      light.shadow.mapSize.height = qualityPreset.shadowMapSize;
      light.shadow.bias = qualityPreset.shadowBias;
      light.shadow.normalBias = qualityPreset.shadowNormalBias;
      light.shadow.radius = qualityPreset.shadowRadius;

      // Configure orthographic shadow camera for isometric view
      // INCREASED SIZE to ensure everything is covered
      const shadowSize = 200;
      light.shadow.camera.left = -shadowSize;
      light.shadow.camera.right = shadowSize;
      light.shadow.camera.top = shadowSize;
      light.shadow.camera.bottom = -shadowSize;
      light.shadow.camera.near = 0.1;
      light.shadow.camera.far = 500; // Increased far plane

      light.shadow.camera.updateProjectionMatrix();

      console.log('Shadows enabled:', {
        mapSize: qualityPreset.shadowMapSize,
        type: qualityPreset.shadowMapType,
        shadowCameraSize: shadowSize,
        bias: qualityPreset.shadowBias,
        normalBias: qualityPreset.shadowNormalBias,
      });

      // Add shadow camera helper in debug mode
      if (debugMode && !shadowHelper) {
        const helper = new CameraHelper(light.shadow.camera);
        scene.add(helper);
        setShadowHelper(helper);
        console.log('Shadow camera helper added');
      }
    } else {
      light.castShadow = false;
      console.log('Shadows disabled');
    }

    // Clean up helper when debug mode is disabled
    return () => {
      if (shadowHelper) {
        scene.remove(shadowHelper);
        setShadowHelper(null);
      }
    };
  }, [qualityPreset, debugMode, shadowHelper, scene]);

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
  useFrame((state, delta) => {
    // Update weather transitions
    updateTransition(delta);
    updateLightning(delta);

    const time = state.clock.elapsedTime;

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
      // Update base lighting (handled by scene lights now, but kept for interface compatibility)
      setLighting(tileMaterial, {
        ambientColor: hexToVector3(effectiveLighting.ambientColor),
        ambientIntensity,
        lightIntensity: directionalIntensity,
      });

      const weatherTint = effectiveVisuals.screenTint
        ? hexToVector3(effectiveVisuals.screenTint)
        : new THREE.Vector3(1, 1, 1);

      // Update weather effects
      setWeatherUniforms(tileMaterial, {
        time: time,
        screenDarkening: effectiveVisuals.screenDarkening,
        lightningFlash: lightning.active ? lightning.intensity : 0,
        weatherTint,
        weatherTintStrength: effectiveVisuals.screenTintStrength ?? 0,
        // Fog handled by scene.fog below
      });

      // Debug logging (throttled)
      const now = Date.now();
      if (now - lastDebugLogRef.current > 2000) {
        lastDebugLogRef.current = now;
        const mat = tileMaterial as THREE.MeshStandardMaterial;
        const currentFog = scene.fog as THREE.Fog | null;
        devLogJson("WeatherLighting Update", {
          materialExists: !!tileMaterial,
          materialType: tileMaterial.type,
          materialVisible: mat.visible,
          mapTexture: mat.map ? "present" : "null",
          uniformsExist: !!mat.userData?.uniforms,
          appliedValues: {
            screenDarkening: effectiveVisuals.screenDarkening,
            weatherTintStrength: effectiveVisuals.screenTintStrength ?? 0,
            lightningFlash: lightning.active ? lightning.intensity : 0,
            fogDensity: effectiveVisuals.fogDensity,
          },
          fog: currentFog ? {
            near: currentFog.near,
            far: currentFog.far,
            color: `#${currentFog.color.getHexString()}`,
          } : null,
          ambientIntensity,
          directionalIntensity,
        });
      }
    } else {
      // Log when material is missing
      const now = Date.now();
      if (now - lastDebugLogRef.current > 2000) {
        lastDebugLogRef.current = now;
        devLog("WeatherLighting: tileMaterial is NULL!", "warn");
      }
    }

    // Update Scene Fog (Global Fog)
    // Calculate fog near/far based on fogDensity (0-1)
    // Higher density = closer fog (shorter visibility)
    const prevFogState = !!scene.fog;
    if (effectiveVisuals.fogDensity > 0) {
      const fogNear = 5 + (1 - effectiveVisuals.fogDensity) * 50; // 5-55 based on density
      const fogFar = 50 + (1 - effectiveVisuals.fogDensity) * 150; // 50-200 based on density

      if (!scene.fog || !(scene.fog instanceof THREE.Fog)) {
        scene.fog = new THREE.Fog(effectiveVisuals.fogColor, fogNear, fogFar);
        // When fog state changes, materials need recompilation
        if (tileMaterial) {
          tileMaterial.needsUpdate = true;
          devLog("Fog enabled - material marked for update", "info");
        }
      }
      const fog = scene.fog as THREE.Fog;
      fog.color.set(effectiveVisuals.fogColor);
      fog.near = fogNear;
      fog.far = fogFar;
    } else {
      if (prevFogState && scene.fog) {
        scene.fog = null;
        // When fog state changes, materials need recompilation
        if (tileMaterial) {
          tileMaterial.needsUpdate = true;
          devLog("Fog disabled - material marked for update", "info");
        }
      }
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

      {/* Hemisphere light and Fill light removed to prevent washing out shadows.
          Relying on ambient + main directional for high contrast pixel art look. */}
    </>
  );
}
