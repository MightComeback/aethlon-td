/**
 * Pixel Art Object Components
 * Billboard sprites that replace 3D mesh objects
 * These always face the camera for classic 2D pixel art look
 */

import { PixelSprite } from "./PixelSprite";
import {
  PINE_TREE,
  OAK_TREE,
  BUSH,
  ROCK,
  SMALL_ROCK,
  FLOWER_RED,
  FLOWER_PURPLE,
  GRASS_TUFT,
  FENCE_POST,
  FENCE_HORIZONTAL,
  TORCH,
} from "@/data/sprites/objects";

interface ObjectProps {
  position: [number, number, number];
  scale?: number;
}

// ============================================
// TREES
// ============================================

export function PineTree({ position, scale = 1 }: ObjectProps) {
  return (
    <PixelSprite
      sprite={PINE_TREE}
      palette="nature"
      position={position}
      scale={scale * 1.2}
      pixelScale={2}
      anchor="bottom"
      castShadow
    />
  );
}

export function OakTree({ position, scale = 1 }: ObjectProps) {
  return (
    <PixelSprite
      sprite={OAK_TREE}
      palette="nature"
      position={position}
      scale={scale * 1.2}
      pixelScale={2}
      anchor="bottom"
      castShadow
    />
  );
}

// Birch, Willow, Dead trees use Pine/Oak with color variations
export function BirchTree({ position, scale = 1 }: ObjectProps) {
  return (
    <PixelSprite
      sprite={PINE_TREE}
      palette="nature"
      position={position}
      scale={scale * 1.1}
      pixelScale={2}
      anchor="bottom"
      castShadow
    />
  );
}

export function WillowTree({ position, scale = 1 }: ObjectProps) {
  return (
    <PixelSprite
      sprite={OAK_TREE}
      palette="nature"
      position={position}
      scale={scale * 1.3}
      pixelScale={2}
      anchor="bottom"
      castShadow
    />
  );
}

export function DeadTree({ position, scale = 1 }: ObjectProps) {
  return (
    <PixelSprite
      sprite={PINE_TREE}
      palette="nature"
      position={position}
      scale={scale * 0.9}
      pixelScale={2}
      anchor="bottom"
      castShadow
    />
  );
}

export function PineTreeSnow({ position, scale = 1 }: ObjectProps) {
  return (
    <PixelSprite
      sprite={PINE_TREE}
      palette="nature"
      position={position}
      scale={scale * 1.2}
      pixelScale={2}
      anchor="bottom"
      castShadow
    />
  );
}

// ============================================
// ROCKS & TERRAIN
// ============================================

export function Rock({ position, scale = 1 }: ObjectProps) {
  return (
    <PixelSprite
      sprite={ROCK}
      palette="nature"
      position={position}
      scale={scale * 0.8}
      pixelScale={2}
      anchor="bottom"
      castShadow
    />
  );
}

export function IceCrystal({ position, scale = 1 }: ObjectProps) {
  return (
    <PixelSprite
      sprite={SMALL_ROCK}
      palette="nature"
      position={position}
      scale={scale * 0.6}
      pixelScale={2}
      anchor="bottom"
      castShadow
    />
  );
}

export function VolcanicRock({ position, scale = 1 }: ObjectProps) {
  return (
    <PixelSprite
      sprite={ROCK}
      palette="nature"
      position={position}
      scale={scale * 0.9}
      pixelScale={2}
      anchor="bottom"
      castShadow
    />
  );
}

// ============================================
// PLANTS & VEGETATION
// ============================================

export function Bush({ position, scale = 1 }: ObjectProps) {
  return (
    <PixelSprite
      sprite={BUSH}
      palette="nature"
      position={position}
      scale={scale * 0.8}
      pixelScale={2}
      anchor="bottom"
      castShadow
    />
  );
}

export function GrassTuft({ position, scale = 1 }: ObjectProps) {
  return (
    <PixelSprite
      sprite={GRASS_TUFT}
      palette="nature"
      position={position}
      scale={scale * 0.5}
      pixelScale={2}
      anchor="bottom"
    />
  );
}

export function Flower({ position, scale = 1 }: ObjectProps) {
  return (
    <PixelSprite
      sprite={FLOWER_RED}
      palette="fantasy"
      position={position}
      scale={scale * 0.4}
      pixelScale={2}
      anchor="bottom"
    />
  );
}

export function Sunflower({ position, scale = 1 }: ObjectProps) {
  return (
    <PixelSprite
      sprite={FLOWER_PURPLE}
      palette="fantasy"
      position={position}
      scale={scale * 0.5}
      pixelScale={2}
      anchor="bottom"
    />
  );
}

export function Cactus({ position, scale = 1 }: ObjectProps) {
  return (
    <PixelSprite
      sprite={FENCE_POST}
      palette="nature"
      position={position}
      scale={scale * 0.7}
      pixelScale={2}
      anchor="bottom"
      castShadow
    />
  );
}

export function Mushroom({ position, scale = 1 }: ObjectProps) {
  return (
    <PixelSprite
      sprite={SMALL_ROCK}
      palette="nature"
      position={position}
      scale={scale * 0.4}
      pixelScale={2}
      anchor="bottom"
    />
  );
}

export function Cattail({ position, scale = 1 }: ObjectProps) {
  return (
    <PixelSprite
      sprite={GRASS_TUFT}
      palette="nature"
      position={position}
      scale={scale * 0.6}
      pixelScale={2}
      anchor="bottom"
    />
  );
}

// ============================================
// STRUCTURES
// ============================================

export function TowerBase({ position, scale = 1 }: ObjectProps) {
  return (
    <PixelSprite
      sprite={ROCK}
      palette="nature"
      position={position}
      scale={scale * 0.7}
      pixelScale={2}
      anchor="bottom"
      castShadow
    />
  );
}

export function Fence({ position, scale = 1 }: ObjectProps) {
  return (
    <PixelSprite
      sprite={FENCE_HORIZONTAL}
      palette="nature"
      position={position}
      scale={scale * 0.6}
      pixelScale={2}
      anchor="bottom"
      castShadow
    />
  );
}

export function House({ position, scale = 1 }: ObjectProps) {
  // TODO: Create proper house sprite
  return (
    <PixelSprite
      sprite={ROCK}
      palette="nature"
      position={position}
      scale={scale * 1.5}
      pixelScale={2}
      anchor="bottom"
      castShadow
    />
  );
}

export function Well({ position, scale = 1 }: ObjectProps) {
  return (
    <PixelSprite
      sprite={ROCK}
      palette="nature"
      position={position}
      scale={scale * 0.6}
      pixelScale={2}
      anchor="bottom"
      castShadow
    />
  );
}

export function Windmill({ position, scale = 1 }: ObjectProps) {
  return (
    <PixelSprite
      sprite={FENCE_POST}
      palette="nature"
      position={position}
      scale={scale * 1.5}
      pixelScale={2}
      anchor="bottom"
      castShadow
    />
  );
}

export function HayBale({ position, scale = 1 }: ObjectProps) {
  return (
    <PixelSprite
      sprite={BUSH}
      palette="nature"
      position={position}
      scale={scale * 0.5}
      pixelScale={2}
      anchor="bottom"
      castShadow
    />
  );
}

export function Log({ position, scale = 1 }: ObjectProps) {
  return (
    <PixelSprite
      sprite={FENCE_HORIZONTAL}
      palette="nature"
      position={position}
      scale={scale * 0.4}
      pixelScale={2}
      anchor="bottom"
      castShadow
    />
  );
}

export function Stump({ position, scale = 1 }: ObjectProps) {
  return (
    <PixelSprite
      sprite={FENCE_POST}
      palette="nature"
      position={position}
      scale={scale * 0.3}
      pixelScale={2}
      anchor="bottom"
      castShadow
    />
  );
}

export function Cabin({ position, scale = 1 }: ObjectProps) {
  return (
    <PixelSprite
      sprite={ROCK}
      palette="nature"
      position={position}
      scale={scale * 2}
      pixelScale={2}
      anchor="bottom"
      castShadow
    />
  );
}

export function Tent({ position, scale = 1 }: ObjectProps) {
  return (
    <PixelSprite
      sprite={BUSH}
      palette="nature"
      position={position}
      scale={scale * 0.8}
      pixelScale={2}
      anchor="bottom"
      castShadow
    />
  );
}

export function Grave({ position, scale = 1 }: ObjectProps) {
  return (
    <PixelSprite
      sprite={SMALL_ROCK}
      palette="nature"
      position={position}
      scale={scale * 0.5}
      pixelScale={2}
      anchor="bottom"
      castShadow
    />
  );
}

export function Lantern({ position, scale = 1 }: ObjectProps) {
  return (
    <PixelSprite
      sprite={TORCH}
      palette="fantasy"
      position={position}
      scale={scale * 0.6}
      pixelScale={2}
      anchor="bottom"
      castShadow
    />
  );
}

export function Snowman({ position, scale = 1 }: ObjectProps) {
  return (
    <PixelSprite
      sprite={SMALL_ROCK}
      palette="nature"
      position={position}
      scale={scale * 0.6}
      pixelScale={2}
      anchor="bottom"
      castShadow
    />
  );
}

export function Igloo({ position, scale = 1 }: ObjectProps) {
  return (
    <PixelSprite
      sprite={ROCK}
      palette="nature"
      position={position}
      scale={scale * 1.2}
      pixelScale={2}
      anchor="bottom"
      castShadow
    />
  );
}

// ============================================
// DECORATIONS
// ============================================

export function Pottery({ position, scale = 1 }: ObjectProps) {
  return (
    <PixelSprite
      sprite={SMALL_ROCK}
      palette="nature"
      position={position}
      scale={scale * 0.4}
      pixelScale={2}
      anchor="bottom"
    />
  );
}

export function Bones({ position, scale = 1 }: ObjectProps) {
  return (
    <PixelSprite
      sprite={SMALL_ROCK}
      palette="nature"
      position={position}
      scale={scale * 0.3}
      pixelScale={2}
      anchor="bottom"
    />
  );
}

export function Skull({ position, scale = 1 }: ObjectProps) {
  return (
    <PixelSprite
      sprite={SMALL_ROCK}
      palette="nature"
      position={position}
      scale={scale * 0.25}
      pixelScale={2}
      anchor="bottom"
    />
  );
}

export function Obelisk({ position, scale = 1 }: ObjectProps) {
  return (
    <PixelSprite
      sprite={FENCE_POST}
      palette="nature"
      position={position}
      scale={scale * 1.2}
      pixelScale={2}
      anchor="bottom"
      castShadow
    />
  );
}

export function FirePit({ position, scale = 1 }: ObjectProps) {
  return (
    <PixelSprite
      sprite={TORCH}
      palette="fantasy"
      position={position}
      scale={scale * 0.5}
      pixelScale={2}
      anchor="bottom"
    />
  );
}

export function SnowPile({ position, scale = 1 }: ObjectProps) {
  return (
    <PixelSprite
      sprite={BUSH}
      palette="nature"
      position={position}
      scale={scale * 0.4}
      pixelScale={2}
      anchor="bottom"
    />
  );
}

export function LilyPad({ position, scale = 1 }: ObjectProps) {
  return (
    <PixelSprite
      sprite={GRASS_TUFT}
      palette="nature"
      position={position}
      scale={scale * 0.3}
      pixelScale={2}
      anchor="bottom"
    />
  );
}

// ============================================
// MULTI-TILE STRUCTURES (using larger scale)
// ============================================

interface StructureProps extends ObjectProps {
  footprint?: [number, number];
}

export function LargeHouse({ position, scale = 1 }: StructureProps) {
  return (
    <PixelSprite
      sprite={ROCK}
      palette="nature"
      position={position}
      scale={scale * 2.5}
      pixelScale={2}
      anchor="bottom"
      castShadow
    />
  );
}

export function Farmhouse({ position, scale = 1 }: StructureProps) {
  return (
    <PixelSprite
      sprite={ROCK}
      palette="nature"
      position={position}
      scale={scale * 3}
      pixelScale={2}
      anchor="bottom"
      castShadow
    />
  );
}

export function Barn({ position, scale = 1 }: StructureProps) {
  return (
    <PixelSprite
      sprite={ROCK}
      palette="nature"
      position={position}
      scale={scale * 3.5}
      pixelScale={2}
      anchor="bottom"
      castShadow
    />
  );
}

export function WindmillStructure({ position, scale = 1 }: StructureProps) {
  return (
    <PixelSprite
      sprite={FENCE_POST}
      palette="nature"
      position={position}
      scale={scale * 3}
      pixelScale={2}
      anchor="bottom"
      castShadow
    />
  );
}

export function MarketStall({ position, scale = 1 }: StructureProps) {
  return (
    <PixelSprite
      sprite={FENCE_HORIZONTAL}
      palette="nature"
      position={position}
      scale={scale * 2}
      pixelScale={2}
      anchor="bottom"
      castShadow
    />
  );
}

export function Inn({ position, scale = 1 }: StructureProps) {
  return (
    <PixelSprite
      sprite={ROCK}
      palette="nature"
      position={position}
      scale={scale * 3}
      pixelScale={2}
      anchor="bottom"
      castShadow
    />
  );
}

export function Blacksmith({ position, scale = 1 }: StructureProps) {
  return (
    <PixelSprite
      sprite={ROCK}
      palette="nature"
      position={position}
      scale={scale * 2.5}
      pixelScale={2}
      anchor="bottom"
      castShadow
    />
  );
}

export function Church({ position, scale = 1 }: StructureProps) {
  return (
    <PixelSprite
      sprite={FENCE_POST}
      palette="nature"
      position={position}
      scale={scale * 4}
      pixelScale={2}
      anchor="bottom"
      castShadow
    />
  );
}

export function Bridge({ position, scale = 1 }: StructureProps) {
  return (
    <PixelSprite
      sprite={FENCE_HORIZONTAL}
      palette="nature"
      position={position}
      scale={scale * 2}
      pixelScale={2}
      anchor="bottom"
      castShadow
    />
  );
}

export function Pier({ position, scale = 1 }: StructureProps) {
  return (
    <PixelSprite
      sprite={FENCE_HORIZONTAL}
      palette="nature"
      position={position}
      scale={scale * 3}
      pixelScale={2}
      anchor="bottom"
      castShadow
    />
  );
}

export function StoneWall({ position, scale = 1 }: StructureProps) {
  return (
    <PixelSprite
      sprite={ROCK}
      palette="nature"
      position={position}
      scale={scale * 0.8}
      pixelScale={2}
      anchor="bottom"
      castShadow
    />
  );
}

export function Gate({ position, scale = 1 }: StructureProps) {
  return (
    <PixelSprite
      sprite={FENCE_POST}
      palette="nature"
      position={position}
      scale={scale * 1.5}
      pixelScale={2}
      anchor="bottom"
      castShadow
    />
  );
}
