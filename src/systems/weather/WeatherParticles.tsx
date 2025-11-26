/**
 * WeatherParticles Component
 * GPU-instanced particle system for rain and snow
 * Uses shader-based animation for performance
 */

import { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useWeatherStore } from "@/stores/weatherStore";
import { useSettingsStore } from "@/stores/settingsStore";
import { getQualityPreset } from "@/data/weather";
import {
  createParticleMaterial,
  createParticleGeometry,
  updateParticleTime,
} from "@/shaders/weatherParticle";
import type { WeatherVisuals } from "@/types/weather";

interface WeatherParticlesProps {
  mapWidth?: number;
  mapHeight?: number;
}

// Base particle counts (scaled by quality)
const BASE_RAIN_COUNT = 50000;
const BASE_SNOW_COUNT = 25000;

export function WeatherParticles({
  mapWidth = 100,
  mapHeight = 100,
}: WeatherParticlesProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);

  // Get weather and quality settings
  const effectiveVisuals = useWeatherStore((s) => s.effectiveVisuals);
  const intensity = useWeatherStore((s) => s.intensity);
  const graphicsQuality = useSettingsStore((s) => s.graphicsQuality);

  // Calculate bounds based on map size
  const bounds = useMemo(() => {
    const halfWidth = mapWidth / 2;
    const halfHeight = mapHeight / 2;
    return {
      min: new THREE.Vector3(-halfWidth - 10, -2, -halfHeight - 10),
      max: new THREE.Vector3(halfWidth + 10, 40, halfHeight + 10),
    };
  }, [mapWidth, mapHeight]);

  // Get quality preset
  const qualityPreset = useMemo(
    () => getQualityPreset(graphicsQuality),
    [graphicsQuality]
  );

  // Determine particle type and count
  const particleConfig = useMemo(() => {
    const { particleType, particleDensity } = effectiveVisuals;

    if (!particleType || particleDensity === 0) {
      return { type: null, count: 0 };
    }

    const baseCount =
      particleType === "rain" ? BASE_RAIN_COUNT : BASE_SNOW_COUNT;
    const maxCount =
      particleType === "rain"
        ? qualityPreset.maxRainParticles
        : qualityPreset.maxSnowParticles;

    const scaledCount = Math.floor(
      baseCount * particleDensity * qualityPreset.particleMultiplier * intensity
    );

    return {
      type: particleType,
      count: Math.min(scaledCount, maxCount),
    };
  }, [effectiveVisuals, qualityPreset, intensity]);

  // Create geometry (simple quad)
  const geometry = useMemo(() => createParticleGeometry(), []);

  // Create material based on particle type
  const material = useMemo(() => {
    if (!particleConfig.type) return null;

    return createParticleMaterial({
      type: particleConfig.type,
      color: effectiveVisuals.particleColor,
      opacity: effectiveVisuals.particleOpacity,
      gravity: effectiveVisuals.particleSpeed,
      boundsMin: bounds.min,
      boundsMax: bounds.max,
      particleScale:
        effectiveVisuals.particleSize * (particleConfig.type === "rain" ? 3 : 1),
    });
  }, [particleConfig.type, effectiveVisuals, bounds]);

  // Generate instance attributes (positions and phases)
  const instanceData = useMemo(() => {
    if (!particleConfig.count) {
      return { offsets: new Float32Array(0), phases: new Float32Array(0) };
    }

    const count = particleConfig.count;
    const offsets = new Float32Array(count * 3);
    const phases = new Float32Array(count);

    const rangeX = bounds.max.x - bounds.min.x;
    const rangeY = bounds.max.y - bounds.min.y;
    const rangeZ = bounds.max.z - bounds.min.z;

    for (let i = 0; i < count; i++) {
      // Random initial positions within bounds
      offsets[i * 3] = bounds.min.x + Math.random() * rangeX;
      offsets[i * 3 + 1] = bounds.min.y + Math.random() * rangeY;
      offsets[i * 3 + 2] = bounds.min.z + Math.random() * rangeZ;

      // Random phase offset for animation variety
      phases[i] = Math.random() * 10;
    }

    return { offsets, phases };
  }, [particleConfig.count, bounds]);

  // Update instance attributes when count changes
  useEffect(() => {
    const mesh = meshRef.current;
    if (!mesh || !instanceData.offsets.length) return;

    // Set instance attributes
    const offsetAttr = new THREE.InstancedBufferAttribute(
      instanceData.offsets,
      3
    );
    const phaseAttr = new THREE.InstancedBufferAttribute(instanceData.phases, 1);

    mesh.geometry.setAttribute("instanceOffset", offsetAttr);
    mesh.geometry.setAttribute("instancePhase", phaseAttr);

    // Set instance count
    mesh.count = particleConfig.count;
  }, [instanceData, particleConfig.count]);

  // Update material uniforms each frame
  useFrame((state) => {
    if (!material) return;

    // Update time for animation
    updateParticleTime(material, state.clock.elapsedTime);

    // Update opacity based on weather intensity
    if (material.uniforms.uOpacity) {
      material.uniforms.uOpacity.value =
        effectiveVisuals.particleOpacity * intensity;
    }
  });

  // Don't render if no particles
  if (!particleConfig.type || !particleConfig.count || !material) {
    return null;
  }

  return (
    <instancedMesh
      ref={meshRef}
      args={[geometry, material, particleConfig.count]}
      frustumCulled={false}
    />
  );
}
