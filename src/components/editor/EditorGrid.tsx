import { useMemo, useCallback, useRef } from "react";
import { ThreeEvent } from "@react-three/fiber";
import { useEditorStore } from "@/stores/editorStore";
import { TileType } from "@/types/map";
import { OBJECT_COMPONENTS, type EditorObjectType } from "./EditorObjects";

// Height unit for elevation (each level = this many units)
const ELEVATION_UNIT = 0.3;

function getTileBaseHeight(type: TileType): number {
  switch (type) {
    case TileType.Water:
      return 0.05; // Water is lower
    case TileType.Blocked:
      return 0.3; // Blocked is higher
    case TileType.Spawn:
    case TileType.Exit:
      return 0.15; // Special tiles slightly raised
    default:
      return 0.1;
  }
}

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
  const lastDrawnTile = useRef<{ x: number; z: number } | null>(null);

  const gridTiles = useMemo(() => {
    const result: Array<{ x: number; z: number; key: string }> = [];
    for (let x = 0; x < width; x++) {
      for (let z = 0; z < height; z++) {
        result.push({
          x: x - width / 2,
          z: z - height / 2,
          key: `${x},${z}`,
        });
      }
    }
    return result;
  }, [width, height]);

  // Convert world position to grid coordinates
  const worldToGrid = useCallback(
    (x: number, z: number) => {
      return {
        gridX: Math.floor(x + width / 2),
        gridZ: Math.floor(z + height / 2),
      };
    },
    [width, height]
  );

  // Handle tile interaction based on current tool
  const handleTileInteraction = useCallback(
    (x: number, z: number, isClick: boolean) => {
      const { gridX, gridZ } = worldToGrid(x, z);

      // Prevent drawing same tile multiple times in one stroke
      if (
        !isClick &&
        lastDrawnTile.current?.x === gridX &&
        lastDrawnTile.current?.z === gridZ
      ) {
        return;
      }

      lastDrawnTile.current = { x: gridX, z: gridZ };

      switch (currentTool) {
        case "paint":
          setTile(gridX, gridZ, selectedTileType);
          break;
        case "erase":
          setTile(gridX, gridZ, TileType.Ground);
          break;
        case "path":
          // Path tool only draws path tiles
          setTile(gridX, gridZ, TileType.Path);
          break;
        case "waypoint":
          if (isClick) {
            // Only add waypoint on click, not drag
            const tile = tiles[gridX]?.[gridZ];
            if (tile === TileType.Path || tile === TileType.Spawn || tile === TileType.Exit) {
              addWaypoint(gridX, gridZ);
            }
          }
          break;
        case "fill":
          if (isClick) {
            // Flood fill from this tile
            floodFill(gridX, gridZ, tiles, selectedTileType, setTile, width, height);
          }
          break;
        case "height_raise":
          adjustHeight(gridX, gridZ, 1);
          break;
        case "height_lower":
          adjustHeight(gridX, gridZ, -1);
          break;
        case "object_place":
          if (isClick) {
            placeObject(gridX, gridZ);
          }
          break;
        case "object_remove":
          if (isClick) {
            removeObjectAt(gridX, gridZ);
          }
          break;
        case "select":
          // Select tool - just highlights, no modification
          break;
      }
    },
    [currentTool, selectedTileType, setTile, adjustHeight, worldToGrid, addWaypoint, placeObject, removeObjectAt, tiles, width, height]
  );

  const handlePointerDown = useCallback(
    (x: number, z: number) => {
      isDrawing.current = true;
      lastDrawnTile.current = null;
      saveToHistory();
      handleTileInteraction(x, z, true);
    },
    [handleTileInteraction, saveToHistory]
  );

  const handlePointerMove = useCallback(
    (x: number, z: number) => {
      const drawableTools = ["paint", "erase", "path", "height_raise", "height_lower"];
      if (isDrawing.current && drawableTools.includes(currentTool)) {
        handleTileInteraction(x, z, false);
      }
    },
    [currentTool, handleTileInteraction]
  );

  const handlePointerUp = useCallback(() => {
    isDrawing.current = false;
    lastDrawnTile.current = null;
  }, []);

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

      {/* Tiles */}
      {gridTiles.map(({ x, z, key }) => {
        const { gridX, gridZ } = worldToGrid(x, z);
        const tileType = tiles[gridX]?.[gridZ] ?? TileType.Ground;
        const tileHeight = heightmap[gridX]?.[gridZ] ?? 0;
        const isHovered = hoveredTile?.x === gridX && hoveredTile?.y === gridZ;

        return (
          <EditorTile
            key={key}
            x={x}
            z={z}
            type={tileType}
            elevation={tileHeight}
            isHovered={isHovered}
            onPointerDown={() => handlePointerDown(x, z)}
            onPointerMove={() => handlePointerMove(x, z)}
            onPointerUp={handlePointerUp}
            onPointerEnter={() => setHoveredTile({ x: gridX, y: gridZ })}
            onPointerLeave={() => setHoveredTile(null)}
          />
        );
      })}

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
          index={wp.index}
        />
      ))}
    </group>
  );
}

interface EditorTileProps {
  x: number;
  z: number;
  type: TileType;
  elevation: number; // Heightmap value (0-5)
  isHovered: boolean;
  onPointerDown: () => void;
  onPointerMove: () => void;
  onPointerUp: () => void;
  onPointerEnter: () => void;
  onPointerLeave: () => void;
}

function EditorTile({
  x,
  z,
  type,
  elevation,
  isHovered,
  onPointerDown,
  onPointerMove,
  onPointerUp,
  onPointerEnter,
  onPointerLeave,
}: EditorTileProps) {
  const color = getTileColor(type, isHovered);
  const baseHeight = getTileBaseHeight(type);
  // Total height combines base tile height with elevation
  const totalHeight = baseHeight + elevation * ELEVATION_UNIT;
  // Position Y is at the center of the box
  const posY = totalHeight / 2;

  return (
    <mesh
      position={[x, posY, z]}
      onPointerDown={(e: ThreeEvent<PointerEvent>) => {
        e.stopPropagation();
        onPointerDown();
      }}
      onPointerMove={(e: ThreeEvent<PointerEvent>) => {
        e.stopPropagation();
        onPointerMove();
      }}
      onPointerUp={(e: ThreeEvent<PointerEvent>) => {
        e.stopPropagation();
        onPointerUp();
      }}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
    >
      <boxGeometry args={[0.95, totalHeight, 0.95]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

interface WaypointMarkerProps {
  x: number;
  y: number; // terrain height
  z: number;
  index: number;
}

function WaypointMarker({ x, y, z, index }: WaypointMarkerProps) {
  return (
    <group position={[x, y + 0.3, z]}>
      {/* Pin base */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.15, 8, 8]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.3} />
      </mesh>
      {/* Pin stem */}
      <mesh position={[0, 0.2, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 0.3, 6]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      {/* Number display would need a sprite or text - simplified for now */}
    </group>
  );
}

function getTileColor(type: TileType, isHovered: boolean): string {
  // Black and white color scheme
  const baseColors: Record<TileType, string> = {
    [TileType.Ground]: "#333333",
    [TileType.Path]: "#666666",
    [TileType.Water]: "#1a1a1a",
    [TileType.Blocked]: "#0a0a0a",
    [TileType.Spawn]: "#ffffff",
    [TileType.Exit]: "#888888",
  };

  const color = baseColors[type] || "#333333";

  if (isHovered) {
    // Lighten the color when hovered
    return lightenColor(color, 0.3);
  }

  return color;
}

function lightenColor(hex: string, amount: number): string {
  const num = parseInt(hex.slice(1), 16);
  const r = Math.min(255, Math.floor((num >> 16) + (255 - (num >> 16)) * amount));
  const g = Math.min(255, Math.floor(((num >> 8) & 0x00ff) + (255 - ((num >> 8) & 0x00ff)) * amount));
  const b = Math.min(255, Math.floor((num & 0x0000ff) + (255 - (num & 0x0000ff)) * amount));
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
}

// Flood fill algorithm
function floodFill(
  startX: number,
  startY: number,
  tiles: TileType[][],
  fillType: TileType,
  setTile: (x: number, y: number, type: TileType) => void,
  width: number,
  height: number
) {
  const targetType = tiles[startX]?.[startY];
  if (targetType === undefined || targetType === fillType) return;

  const stack: Array<[number, number]> = [[startX, startY]];
  const visited = new Set<string>();

  while (stack.length > 0) {
    const [x, y] = stack.pop()!;
    const key = `${x},${y}`;

    if (visited.has(key)) continue;
    if (x < 0 || x >= width || y < 0 || y >= height) continue;
    if (tiles[x]?.[y] !== targetType) continue;

    visited.add(key);
    setTile(x, y, fillType);

    stack.push([x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]);
  }
}
