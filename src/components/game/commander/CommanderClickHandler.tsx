/**
 * Commander Click Handler
 * Handles click-to-move input for the commander
 * Right-click to move, left-click for other interactions
 */

import { useCallback, useRef } from "react";
import { ThreeEvent } from "@react-three/fiber";
import * as THREE from "three";
import { useGameStore } from "@/stores/gameStore";
import { useMapStore } from "@/stores/mapStore";
import { TileType } from "@/types";

interface CommanderClickHandlerProps {
  mapWidth: number;
  mapHeight: number;
}

export function CommanderClickHandler({
  mapWidth,
  mapHeight,
}: CommanderClickHandlerProps) {
  const planeRef = useRef<THREE.Mesh>(null);

  const setCommanderTarget = useGameStore((s) => s.setCommanderTarget);
  const tiles = useMapStore((s) => s.loadedMap?.tiles);

  /**
   * Check if a tile position is valid for movement
   */
  const isValidPosition = useCallback(
    (gridX: number, gridY: number): boolean => {
      // No tiles loaded
      if (!tiles) return false;

      // Check bounds
      if (gridX < 0 || gridX >= mapWidth || gridY < 0 || gridY >= mapHeight) {
        return false;
      }

      // Get tile type at position (tiles is TileType[][])
      const tileType = tiles[gridX]?.[gridY];
      if (tileType === undefined) return false;

      // Cannot move on water or blocked tiles
      if (tileType === TileType.Water || tileType === TileType.Blocked) {
        return false;
      }

      return true;
    },
    [tiles, mapWidth, mapHeight]
  );

  /**
   * Handle right-click for movement
   */
  const handleContextMenu = useCallback(
    (event: ThreeEvent<MouseEvent>) => {
      event.stopPropagation();

      // Get intersection point on the plane
      const point = event.point;

      // Convert world position to grid position
      const gridX = Math.floor(point.x + mapWidth / 2);
      const gridY = Math.floor(point.z + mapHeight / 2);

      // Validate position
      if (!isValidPosition(gridX, gridY)) {
        return;
      }

      // Set target (center of tile)
      setCommanderTarget(gridX + 0.5, gridY + 0.5);
    },
    [mapWidth, mapHeight, isValidPosition, setCommanderTarget]
  );

  /**
   * Prevent default context menu
   */
  const handlePointerDown = useCallback((event: ThreeEvent<PointerEvent>) => {
    if (event.button === 2) {
      event.stopPropagation();
    }
  }, []);

  return (
    <mesh
      ref={planeRef}
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, 0.02, 0]}
      onContextMenu={handleContextMenu}
      onPointerDown={handlePointerDown}
    >
      <planeGeometry args={[mapWidth, mapHeight]} />
      <meshBasicMaterial visible={false} />
    </mesh>
  );
}

export default CommanderClickHandler;
