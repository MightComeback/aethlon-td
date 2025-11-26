import { Canvas, useThree } from "@react-three/fiber";
import { OrthographicCamera, OrbitControls, Environment } from "@react-three/drei";
import { Suspense, useEffect, useMemo } from "react";
import * as THREE from "three";
import { GameScene } from "./GameScene";
import { GameHUD } from "./GameHUD";
import { WeatherSystem } from "@/systems/weather";
import { PostProcessing } from "@/systems/rendering/PostProcessing";
import { useMapStore } from "@/stores/mapStore";
import { useSettingsStore } from "@/stores/settingsStore";
import { WEATHER_QUALITY_PRESETS } from "@/data/weather/qualityPresets";

/**
 * Calculate optimal zoom to fit a map of given dimensions
 */
function calculateFitZoom(
  mapWidth: number,
  mapHeight: number,
  viewportWidth: number = window.innerWidth,
  viewportHeight: number = window.innerHeight
): number {
  const mapSize = Math.max(mapWidth, mapHeight);

  // For isometric view, account for the rotation
  // The isometric rotation makes the effective diagonal ~1.4x larger
  const effectiveSize = mapSize * 1.2;

  // Calculate zoom based on viewport (use smaller dimension with some padding)
  const zoomForWidth = (viewportWidth * 0.5) / effectiveSize;
  const zoomForHeight = (viewportHeight * 0.5) / effectiveSize;

  // Minimum zoom 30 for playability, max 100
  const zoom = Math.max(30, Math.min(100, Math.min(zoomForWidth, zoomForHeight)));
  return zoom;
}

/**
 * Camera controller that sets zoom based on map size
 */
function CameraController({ targetZoom }: { targetZoom: number }) {
  const { camera } = useThree();

  useEffect(() => {
    if ("zoom" in camera) {
      camera.zoom = targetZoom;
      camera.updateProjectionMatrix();
    }
  }, [camera, targetZoom]);

  return null;
}

export function GameView() {
  const loadedMap = useMapStore((s) => s.loadedMap);
  const graphicsQuality = useSettingsStore((s) => s.graphicsQuality);

  // Calculate initial zoom based on map size
  const targetZoom = useMemo(() => {
    if (!loadedMap) return 30;
    return calculateFitZoom(loadedMap.width, loadedMap.height);
  }, [loadedMap]);

  // Get quality preset for shadows and post-processing
  const qualityPreset = WEATHER_QUALITY_PRESETS[graphicsQuality];

  // Configure WebGL renderer with shadow settings
  const glConfig = useMemo(() => ({
    antialias: false,
    alpha: false,
    powerPreference: "high-performance" as const,
  }), []);

  return (
    <div className="relative h-full w-full">
      {/* Three.js Canvas */}
      <Canvas
        className="absolute inset-0"
        gl={glConfig}
        dpr={1}
        shadows="soft"
      >
        <color attach="background" args={["#1a1a2e"]} />
        <OrthographicCamera
          makeDefault
          position={[20, 20, 20]}
          zoom={targetZoom}
          near={0.1}
          far={1000}
        />
        {/* Set camera zoom after mount */}
        <CameraController targetZoom={targetZoom} />
        {/* Allow user to zoom and pan */}
        <OrbitControls
          enableRotate={false}
          enablePan={true}
          enableZoom={true}
          minZoom={5}
          maxZoom={150}
          zoomSpeed={0.5}
          panSpeed={1}
        />
        {/* Weather System - provides all lighting */}
        <WeatherSystem />
        <Suspense fallback={null}>
          <GameScene />
        </Suspense>
      </Canvas>

      {/* HUD Overlay */}
      <GameHUD />
    </div>
  );
}
