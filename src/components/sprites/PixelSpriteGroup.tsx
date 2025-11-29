/**
 * PixelSpriteGroup Component
 * Manages a collection of pixel sprites with Y-sorting for proper depth
 * Objects further from camera render behind closer objects
 */

import { useMemo } from "react";
import { PixelSprite } from "./PixelSprite";
import type { SpriteData, PaletteKey } from "@/utils/pixelArt";

// Use 'any' for mixed palette collections, or specific palette for typed collections
export interface SpriteInstance<P extends PaletteKey = PaletteKey> {
  id: string;
  sprite: SpriteData<P>;
  palette: P;
  position: [number, number, number];
  scale?: number;
  pixelScale?: number;
  onClick?: () => void;
}

// Looser type for mixed-palette sprite groups
export type AnySpriteInstance = {
  id: string;
  sprite: SpriteData<any>;
  palette: PaletteKey;
  position: [number, number, number];
  scale?: number;
  pixelScale?: number;
  onClick?: () => void;
}

interface PixelSpriteGroupProps {
  sprites: AnySpriteInstance[];
  /** Enable Y-sorting (default true) */
  ySort?: boolean;
  /** Base render order (sprites will increment from this) */
  baseRenderOrder?: number;
}

/**
 * Y-sort sprites so that objects with higher Z (further from camera)
 * render behind objects with lower Z (closer to camera)
 * In isometric view, this creates proper depth ordering
 */
export function PixelSpriteGroup({
  sprites,
  ySort = true,
  baseRenderOrder = 0,
}: PixelSpriteGroupProps) {
  // Sort sprites by distance from camera for proper depth
  const sortedSprites = useMemo(() => {
    if (!ySort) return sprites;

    // For isometric camera, we sort by Z position (depth into screen)
    // Higher Z = further away = render first (lower render order)
    return [...sprites].sort((a, b) => {
      // Primary sort: Z position (depth)
      const zDiff = b.position[2] - a.position[2];
      if (Math.abs(zDiff) > 0.01) return zDiff;

      // Secondary sort: Y position (height) - higher objects render on top
      return a.position[1] - b.position[1];
    });
  }, [sprites, ySort]);

  return (
    <group>
      {sortedSprites.map((spriteInstance, index) => (
        <PixelSprite
          key={spriteInstance.id}
          sprite={spriteInstance.sprite as any}
          palette={spriteInstance.palette as any}
          position={spriteInstance.position}
          scale={spriteInstance.scale}
          pixelScale={spriteInstance.pixelScale}
          renderOrder={baseRenderOrder + index}
          onClick={spriteInstance.onClick}
          castShadow
        />
      ))}
    </group>
  );
}

/**
 * Hook to create Y-sorted render order based on position
 * Use this when you need to manually control render order
 */
export function useYSortOrder(
  position: [number, number, number],
  mapHeight: number = 100
): number {
  // Convert Z position to render order
  // Objects at Z=0 get higher render order than objects at Z=mapHeight
  return Math.floor((mapHeight - position[2]) * 10);
}

/**
 * Utility to batch sprites by type for instanced rendering
 */
export function batchSpritesByType<P extends PaletteKey>(
  sprites: SpriteInstance<P>[]
): Map<string, SpriteInstance<P>[]> {
  const batches = new Map<string, SpriteInstance<P>[]>();

  for (const sprite of sprites) {
    // Create a key from the sprite data hash (simple approach)
    const key = `${sprite.palette}-${sprite.sprite.length}-${sprite.sprite[0]?.length}`;

    if (!batches.has(key)) {
      batches.set(key, []);
    }
    batches.get(key)!.push(sprite);
  }

  return batches;
}
