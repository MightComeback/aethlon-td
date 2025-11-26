/**
 * LightningSystem Component
 * Renders lightning bolts during thunderstorms
 * LOD-based: shows bolt geometry when zoomed in, flash-only when zoomed out
 */

import { useRef, useMemo, useState, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useWeatherStore } from "@/stores/weatherStore";
import { useSettingsStore } from "@/stores/settingsStore";
import { shouldRenderLightningBolts } from "@/data/weather";
import {
  createLightningMaterial,
  updateLightningMaterial,
  generateLightningSegments,
  createLightningGeometry,
} from "@/shaders/lightningBolt";
import { WeatherType } from "@/types/weather";

// Zoom threshold for showing bolt geometry
const BOLT_ZOOM_THRESHOLD = 25;

interface LightningBolt {
  geometry: THREE.BufferGeometry;
  position: THREE.Vector3;
  createdAt: number;
}

interface LightningSystemProps {
  mapWidth?: number;
  mapHeight?: number;
}

export function LightningSystem({}: LightningSystemProps) {
  const groupRef = useRef<THREE.Group>(null);
  const lightRef = useRef<THREE.PointLight>(null);
  const [bolts, setBolts] = useState<LightningBolt[]>([]);

  const { camera } = useThree();

  // Get weather state
  const currentWeather = useWeatherStore((s) => s.current);
  const lightning = useWeatherStore((s) => s.lightning);

  // Get quality settings
  const graphicsQuality = useSettingsStore((s) => s.graphicsQuality);
  const canRenderBolts = useMemo(
    () => shouldRenderLightningBolts(graphicsQuality),
    [graphicsQuality]
  );

  // Create material
  const material = useMemo(() => createLightningMaterial(), []);

  // Get current zoom level
  const zoom = useMemo(() => {
    if (camera instanceof THREE.OrthographicCamera) {
      return camera.zoom;
    }
    return 50; // Default
  }, [camera]);

  // Determine if we should show bolt geometry
  const showBoltGeometry = canRenderBolts && zoom >= BOLT_ZOOM_THRESHOLD;

  // Generate new bolt when lightning strikes
  useEffect(() => {
    if (
      currentWeather !== WeatherType.Thunderstorm ||
      !lightning.active ||
      !lightning.strikePosition ||
      !showBoltGeometry
    ) {
      return;
    }

    // Generate bolt from sky to strike position
    const [x, z] = lightning.strikePosition;
    const start = new THREE.Vector3(x + (Math.random() - 0.5) * 5, 40, z + (Math.random() - 0.5) * 5);
    const end = new THREE.Vector3(x, 0, z);

    // Generate segments with branches
    const allSegments = generateLightningSegments(start, end, {
      segments: 15,
      jitter: 4,
      branchChance: 0.35,
      branchLength: 0.3,
    });

    // Create geometries for each segment chain
    const newBolts: LightningBolt[] = allSegments.map((segments, index) => ({
      geometry: createLightningGeometry(segments, index === 0 ? 0.3 : 0.15),
      position: new THREE.Vector3(0, 0, 0),
      createdAt: Date.now(),
    }));

    setBolts(newBolts);
  }, [lightning.active, lightning.strikePosition, currentWeather, showBoltGeometry]);

  // Clean up old bolts
  useEffect(() => {
    if (!lightning.active && bolts.length > 0) {
      // Wait a bit then clear
      const timeout = setTimeout(() => {
        setBolts([]);
      }, 200);
      return () => clearTimeout(timeout);
    }
  }, [lightning.active, bolts.length]);

  // Update material and point light each frame
  useFrame((state) => {
    if (!material) return;

    updateLightningMaterial(material, {
      intensity: lightning.intensity,
      time: state.clock.elapsedTime,
    });

    // Update point light position and intensity
    if (lightRef.current && lightning.active && lightning.strikePosition) {
      const [x, z] = lightning.strikePosition;
      lightRef.current.position.set(x, 5, z);
      lightRef.current.intensity = lightning.intensity * 20; // Dramatic intensity
      lightRef.current.visible = true;
    } else if (lightRef.current) {
      lightRef.current.visible = false;
    }
  });

  // Don't render if not thunderstorm
  if (currentWeather !== WeatherType.Thunderstorm) {
    return null;
  }

  return (
    <group ref={groupRef}>
      {/* Dramatic point light at lightning strike location - always present for lighting effects */}
      <pointLight
        ref={lightRef}
        color="#a0d8ff"
        intensity={0}
        distance={50}
        decay={2}
        castShadow={false} // Disable shadows for performance
      />

      {/* Bolt geometry - only shown at high zoom */}
      {showBoltGeometry && bolts.map((bolt, index) => (
        <mesh
          key={`${bolt.createdAt}-${index}`}
          geometry={bolt.geometry}
          material={material}
          position={bolt.position}
        />
      ))}
    </group>
  );
}
