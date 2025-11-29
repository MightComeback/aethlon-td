/**
 * Pixel Art Demo Scene
 * Test scene for the new pixel art sprite system
 * Renders sample tiles and objects to verify the system works
 */

import { useMemo } from "react";
import { PixelSprite, PixelSpriteGroup, type AnySpriteInstance } from "@/components/sprites";
import { OBJECTS } from "@/data/sprites/objects";
import { TILES } from "@/data/sprites/tiles";

/**
 * Demo component showing pixel art sprites in the 3D scene
 */
export function PixelArtDemo() {
  // Create a collection of demo sprites
  const demoSprites = useMemo<AnySpriteInstance[]>(() => {
    const sprites: AnySpriteInstance[] = [];
    let id = 0;

    // Add some trees in a scattered pattern
    const treePositions: [number, number, number][] = [
      [-3, 0, -2],
      [2, 0, -3],
      [-1, 0, 1],
      [4, 0, -1],
      [-4, 0, 2],
      [1, 0, 3],
    ];

    for (const pos of treePositions) {
      const usePine = Math.random() > 0.5;
      sprites.push({
        id: `tree-${id++}`,
        sprite: usePine ? OBJECTS.pineTree : OBJECTS.oakTree,
        palette: "nature",
        position: pos,
        scale: 1.5,
        pixelScale: 2,
      });
    }

    // Add some bushes
    const bushPositions: [number, number, number][] = [
      [-2, 0, -1],
      [0, 0, -2],
      [3, 0, 0],
      [-3, 0, 1],
    ];

    for (const pos of bushPositions) {
      sprites.push({
        id: `bush-${id++}`,
        sprite: OBJECTS.bush,
        palette: "nature",
        position: pos,
        scale: 1,
        pixelScale: 2,
      });
    }

    // Add some rocks
    const rockPositions: [number, number, number][] = [
      [1, 0, -1],
      [-1, 0, 2],
      [2, 0, 1],
    ];

    for (const pos of rockPositions) {
      const isSmall = Math.random() > 0.5;
      sprites.push({
        id: `rock-${id++}`,
        sprite: isSmall ? OBJECTS.smallRock : OBJECTS.rock,
        palette: "nature",
        position: pos,
        scale: 1,
        pixelScale: 2,
      });
    }

    // Add some flowers
    const flowerPositions: [number, number, number][] = [
      [0.5, 0, 0],
      [-0.5, 0, 0.5],
      [1.5, 0, -0.5],
      [-1.5, 0, 1.5],
    ];

    for (const pos of flowerPositions) {
      const isRed = Math.random() > 0.5;
      sprites.push({
        id: `flower-${id++}`,
        sprite: isRed ? OBJECTS.flowerRed : OBJECTS.flowerPurple,
        palette: "fantasy",
        position: pos,
        scale: 0.8,
        pixelScale: 2,
      });
    }

    // Add grass tufts
    const grassPositions: [number, number, number][] = [
      [0, 0, -0.5],
      [-2, 0, 0],
      [2.5, 0, -0.5],
      [-0.5, 0, 2],
    ];

    for (const pos of grassPositions) {
      sprites.push({
        id: `grass-${id++}`,
        sprite: OBJECTS.grassTuft,
        palette: "nature",
        position: pos,
        scale: 0.7,
        pixelScale: 2,
      });
    }

    // Add a torch
    sprites.push({
      id: `torch-${id++}`,
      sprite: OBJECTS.torch,
      palette: "fantasy",
      position: [0, 0, 0],
      scale: 1.2,
      pixelScale: 2,
    });

    return sprites;
  }, []);

  return (
    <group>
      {/* Ground plane for reference */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#2d6e3f" />
      </mesh>

      {/* Render all sprites with Y-sorting */}
      <PixelSpriteGroup sprites={demoSprites} ySort={true} />
    </group>
  );
}

/**
 * Tile Demo - shows the tile sprites
 */
export function TileDemo() {
  return (
    <group>
      {/* Grass tile */}
      <PixelSprite
        sprite={TILES.grass}
        palette="nature"
        position={[-2, 0.5, 0]}
        scale={2}
        pixelScale={2}
        billboard={false}
      />

      {/* Dirt tile */}
      <PixelSprite
        sprite={TILES.dirt}
        palette="nature"
        position={[0, 0.5, 0]}
        scale={2}
        pixelScale={2}
        billboard={false}
      />

      {/* Stone tile */}
      <PixelSprite
        sprite={TILES.stone}
        palette="nature"
        position={[2, 0.5, 0]}
        scale={2}
        pixelScale={2}
        billboard={false}
      />

      {/* Water tile */}
      <PixelSprite
        sprite={TILES.water[0]}
        palette="nature"
        position={[4, 0.5, 0]}
        scale={2}
        pixelScale={2}
        billboard={false}
      />
    </group>
  );
}
