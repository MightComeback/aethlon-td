import { useRef, useEffect, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Group } from "three";
import { IsometricGrid } from "./IsometricGrid";
import {
  CommanderController,
  CommanderClickHandler,
} from "./commander";
import { useGameStore } from "@/stores/gameStore";
import { useMapStore } from "@/stores/mapStore";
import { useWeatherStore } from "@/stores/weatherStore";
import { useSettingsStore } from "@/stores/settingsStore";
import { useWeatherDevLog } from "@/hooks/useWeatherDevLog";
import { WEATHER_QUALITY_PRESETS } from "@/data/weather/qualityPresets";
import { TileType } from "@/types/map";
import { ELEVATION_UNIT, getTileBaseHeight } from "@/constants/grid.constants";
import { OBJECT_COMPONENTS, type EditorObjectType } from "@/utils/objects.utils";

export function GameScene() {
  const groupRef = useRef<Group>(null);
  const { camera } = useThree();

  // Dev logging for weather changes
  useWeatherDevLog();

  // Get map data from mapStore
  const loadedMap = useMapStore((s) => s.loadedMap);
  const mapWidth = loadedMap?.width ?? 10;
  const mapHeight = loadedMap?.height ?? 10;
  const tiles = loadedMap?.tiles;
  const heightmap = loadedMap?.heightmap;
  const objects = loadedMap?.objects;

  // Get graphics quality for shadows
  const graphicsQuality = useSettingsStore((s) => s.graphicsQuality);
  const qualityPreset = WEATHER_QUALITY_PRESETS[graphicsQuality];

  // Get zoom from camera for LOD
  const zoom = "zoom" in camera ? (camera.zoom as number) : 50;

  // Game state
  const initCommander = useGameStore((s) => s.initCommander);
  const updateCommanderPosition = useGameStore((s) => s.updateCommanderPosition);
  const speed = useGameStore((s) => s.speed);
  const isPaused = useGameStore((s) => s.isPaused);

  // Weather updates
  const updateTransition = useWeatherStore((s) => s.updateTransition);
  const updateLightning = useWeatherStore((s) => s.updateLightning);
  const checkDynamicWeather = useWeatherStore((s) => s.checkDynamicWeather);

  // Initialize commander position
  useEffect(() => {
    // Initialize commander at center of map
    initCommander(mapWidth / 2, mapHeight / 2);
  }, [initCommander, mapWidth, mapHeight]);

  // Game loop
  useFrame((_, delta) => {
    if (isPaused) return;

    const adjustedDelta = delta * speed;

    // Update weather transitions
    updateTransition(adjustedDelta);
    updateLightning(adjustedDelta);
    checkDynamicWeather(adjustedDelta);

    // Update commander movement
    updateCommanderPosition(adjustedDelta);
  });

  // Calculate object positions with terrain height (like EditorGrid does)
  const placedObjects = useMemo(() => {
    if (!objects || !tiles || !heightmap) return [];

    return objects.map((obj) => {
      const tileType = tiles[obj.x]?.[obj.y] ?? TileType.Ground;
      const tileElevation = heightmap[obj.x]?.[obj.y] ?? 0;
      const baseHeight = getTileBaseHeight(tileType);
      const totalHeight = baseHeight + tileElevation * ELEVATION_UNIT;

      return {
        ...obj,
        worldX: obj.x - mapWidth / 2,
        worldZ: obj.y - mapHeight / 2,
        terrainHeight: totalHeight,
      };
    });
  }, [objects, tiles, heightmap, mapWidth, mapHeight]);

  return (
    <group ref={groupRef}>
      {/* Ground plane shadow receiver */}
      {qualityPreset.shadowsEnabled && (
        <mesh
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, -0.1, 0]}
          receiveShadow
        >
          <planeGeometry args={[mapWidth * 2, mapHeight * 2]} />
          <shadowMaterial opacity={0.8} color="#000000" transparent />
        </mesh>
      )}

      <IsometricGrid
        width={mapWidth}
        height={mapHeight}
        tiles={tiles}
        heightmap={heightmap}
        zoom={zoom}
      />

      {/* Placed objects from map data */}
      {placedObjects.map((obj) => {
        const ObjectComponent = OBJECT_COMPONENTS[obj.type as EditorObjectType];
        if (!ObjectComponent) return null;
        return (
          <ObjectComponent
            key={obj.id}
            position={[obj.worldX, obj.terrainHeight, obj.worldZ]}
            scale={obj.scale ?? 1}
          />
        );
      })}

      {/* Commander */}
      <CommanderController mapWidth={mapWidth} mapHeight={mapHeight} />

      {/* Click handler for commander movement */}
      <CommanderClickHandler mapWidth={mapWidth} mapHeight={mapHeight} />
    </group>
  );
}
