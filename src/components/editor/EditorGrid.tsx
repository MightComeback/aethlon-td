import { useMemo, useCallback, useRef } from "react";
import { useEditorStore } from "@/stores/editorStore";
import { TileType } from "@/types/map";
import { floodFill } from "@/utils/colors.utils";
import { ELEVATION_UNIT, getTileBaseHeight } from "@/constants/grid.constants";
import { EditorObjectType, OBJECT_COMPONENTS } from "@/utils/objects.utils";
import {
  InstancedTileGrid,
  InteractionPlane,
} from "@/components/shared/InstancedTileGrid";

export function EditorGrid() {
  const {
    width,
    height,
    tiles,
    heightmap,
    objects,
    setTile,
    adjustHeight,
    selectedTileType,
    currentTool,
    hoveredTile,
    setHoveredTile,
    addWaypoint,
    waypoints,
    saveToHistory,
    placeObject,
    removeObjectAt,
  } = useEditorStore();

  const isDrawing = useRef(false);
  const lastDrawnTile = useRef<{ x: number; y: number } | null>(null);

  // Handle tile interaction based on current tool
  const handleTileInteraction = useCallback(
    (x: number, y: number, isClick: boolean) => {
      // Prevent drawing same tile multiple times in one stroke
      if (
        !isClick &&
        lastDrawnTile.current?.x === x &&
        lastDrawnTile.current?.y === y
      ) {
        return;
      }

      lastDrawnTile.current = { x, y };

      switch (currentTool) {
        case "paint":
          setTile(x, y, selectedTileType);
          break;
        case "erase":
          setTile(x, y, TileType.Ground);
          break;
        case "path":
          setTile(x, y, TileType.Path);
          break;
        case "waypoint":
          if (isClick) {
            const tile = tiles[x]?.[y];
            if (
              tile === TileType.Path ||
              tile === TileType.Spawn ||
              tile === TileType.Exit
            ) {
              addWaypoint(x, y);
            }
          }
          break;
        case "fill":
          if (isClick) {
            floodFill(x, y, tiles, selectedTileType, setTile, width, height);
          }
          break;
        case "height_raise":
          adjustHeight(x, y, 1);
          break;
        case "height_lower":
          adjustHeight(x, y, -1);
          break;
        case "object_place":
          if (isClick) {
            placeObject(x, y);
          }
          break;
        case "object_remove":
          if (isClick) {
            removeObjectAt(x, y);
          }
          break;
        case "select":
          break;
      }
    },
    [
      currentTool,
      selectedTileType,
      setTile,
      adjustHeight,
      addWaypoint,
      placeObject,
      removeObjectAt,
      tiles,
      width,
      height,
    ]
  );

  const handlePointerDown = useCallback(
    (tile: { x: number; y: number }) => {
      isDrawing.current = true;
      lastDrawnTile.current = null;
      saveToHistory();
      handleTileInteraction(tile.x, tile.y, true);
    },
    [handleTileInteraction, saveToHistory]
  );

  const handlePointerMove = useCallback(
    (tile: { x: number; y: number }) => {
      const drawableTools = [
        "paint",
        "erase",
        "path",
        "height_raise",
        "height_lower",
      ];
      if (isDrawing.current && drawableTools.includes(currentTool)) {
        handleTileInteraction(tile.x, tile.y, false);
      }
    },
    [currentTool, handleTileInteraction]
  );

  const handlePointerUp = useCallback(() => {
    isDrawing.current = false;
    lastDrawnTile.current = null;
  }, []);

  const handleTileHover = useCallback(
    (tile: { x: number; y: number } | null) => {
      setHoveredTile(tile);
    },
    [setHoveredTile]
  );

  const handleTileClick = useCallback(
    (_tile: { x: number; y: number }) => {
      // Click already handled by pointerDown for most tools
    },
    []
  );

  // Waypoint markers with terrain height
  const waypointMarkers = useMemo(() => {
    return waypoints.map((wp, index) => {
      const tileType = tiles[wp.x]?.[wp.y] ?? TileType.Ground;
      const tileElevation = heightmap[wp.x]?.[wp.y] ?? 0;
      const baseHeight = getTileBaseHeight(tileType);
      const totalHeight = baseHeight + tileElevation * ELEVATION_UNIT;

      return {
        ...wp,
        worldX: wp.x - width / 2,
        worldZ: wp.y - height / 2,
        terrainHeight: totalHeight,
        index,
      };
    });
  }, [waypoints, width, height, tiles, heightmap]);

  // Placed objects with terrain height
  const placedObjects = useMemo(() => {
    return objects.map((obj) => {
      const tileType = tiles[obj.x]?.[obj.y] ?? TileType.Ground;
      const tileElevation = heightmap[obj.x]?.[obj.y] ?? 0;
      const baseHeight = getTileBaseHeight(tileType);
      const totalHeight = baseHeight + tileElevation * ELEVATION_UNIT;

      return {
        ...obj,
        worldX: obj.x - width / 2,
        worldZ: obj.y - height / 2,
        terrainHeight: totalHeight,
      };
    });
  }, [objects, width, height, tiles, heightmap]);

  return (
    <group>
      {/* Grid helper lines */}
      <gridHelper
        args={[Math.max(width, height), Math.max(width, height), "#333", "#222"]}
      />

      {/* Instanced tile rendering */}
      <InstancedTileGrid
        width={width}
        height={height}
        tiles={tiles}
        heightmap={heightmap}
        hoveredTile={hoveredTile}
      />

      {/* Interaction plane for efficient raycasting */}
      <InteractionPlane
        width={width}
        height={height}
        onTileHover={handleTileHover}
        onTileClick={handleTileClick}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerMove={handlePointerMove}
      />

      {/* Placed objects */}
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

      {/* Waypoint markers */}
      {waypointMarkers.map((wp) => (
        <WaypointMarker
          key={`wp-${wp.index}`}
          x={wp.worldX}
          z={wp.worldZ}
          y={wp.terrainHeight}
        />
      ))}
    </group>
  );
}

interface WaypointMarkerProps {
  x: number;
  y: number;
  z: number;
}

function WaypointMarker({ x, y, z }: WaypointMarkerProps) {
  return (
    <group position={[x, y + 0.3, z]}>
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.15, 8, 8]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#ffffff"
          emissiveIntensity={0.3}
        />
      </mesh>
      <mesh position={[0, 0.2, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 0.3, 6]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
    </group>
  );
}
