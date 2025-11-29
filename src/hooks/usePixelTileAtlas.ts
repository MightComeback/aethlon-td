/**
 * usePixelTileAtlas Hook
 * Generates a texture atlas from procedurally generated 256x256 pixel art tiles
 * Returns a Three.js texture and material ready for instanced rendering
 */

import { useMemo, useEffect, useState } from "react";
import * as THREE from "three";
import {
  generateAllTiles,
  PROCEDURAL_TILE_SIZE,
} from "@/utils/proceduralTiles";

// Tile size in pixels (256x256 procedural tiles)
const TILE_SIZE = PROCEDURAL_TILE_SIZE;

// Atlas layout: 2x3 grid (more efficient packing)
const ATLAS_COLUMNS = 2;
const ATLAS_ROWS = 3;
const ATLAS_WIDTH = TILE_SIZE * ATLAS_COLUMNS;  // 512
const ATLAS_HEIGHT = TILE_SIZE * ATLAS_ROWS;    // 768

// UV size of one tile in atlas
const UV_TILE_WIDTH = 1 / ATLAS_COLUMNS;   // 0.5
const UV_TILE_HEIGHT = 1 / ATLAS_ROWS;     // 0.333...

interface PixelTileAtlasResult {
  texture: THREE.Texture | null;
  material: THREE.MeshStandardMaterial | null;
  isLoaded: boolean;
}

// Tile type to atlas position mapping
// Layout: [column, row]
const TILE_ATLAS_POSITIONS: Record<number, [number, number]> = {
  0: [0, 0], // Ground (grass) - top left
  1: [1, 0], // Path (dirt) - top right
  2: [0, 1], // Water - middle left
  3: [1, 1], // Blocked (stone) - middle right
  4: [0, 2], // Spawn - bottom left
  5: [1, 2], // Exit - bottom right
};

/**
 * Creates procedural pixel art tile atlas and returns texture + material
 */
export function usePixelTileAtlas(): PixelTileAtlasResult {
  const [isLoaded, setIsLoaded] = useState(false);

  // Generate the atlas texture
  const { texture, material } = useMemo(() => {
    // Generate all procedural tiles
    const tiles = generateAllTiles(42); // Fixed seed for consistency

    // Create canvas for atlas
    const canvas = document.createElement("canvas");
    canvas.width = ATLAS_WIDTH;
    canvas.height = ATLAS_HEIGHT;
    const ctx = canvas.getContext("2d")!;

    // Clear with transparent
    ctx.clearRect(0, 0, ATLAS_WIDTH, ATLAS_HEIGHT);

    // Draw tiles into atlas grid
    // Row 0: Ground, Path
    ctx.drawImage(tiles.grass, 0, 0);
    ctx.drawImage(tiles.dirt, TILE_SIZE, 0);
    // Row 1: Water, Stone
    ctx.drawImage(tiles.water, 0, TILE_SIZE);
    ctx.drawImage(tiles.stone, TILE_SIZE, TILE_SIZE);
    // Row 2: Spawn, Exit
    ctx.drawImage(tiles.spawn, 0, TILE_SIZE * 2);
    ctx.drawImage(tiles.exit, TILE_SIZE, TILE_SIZE * 2);

    // Create Three.js texture from canvas
    const tex = new THREE.CanvasTexture(canvas);
    tex.magFilter = THREE.NearestFilter; // Pixel-perfect scaling
    tex.minFilter = THREE.NearestFilter;
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.generateMipmaps = false;
    tex.colorSpace = THREE.SRGBColorSpace;

    // Create material with custom shader modifications for atlas UV mapping
    const mat = new THREE.MeshStandardMaterial({
      map: tex,
      roughness: 0.9,
      metalness: 0.0,
      side: THREE.FrontSide,
      fog: true,
    });

    // Store uniforms in userData
    mat.userData.uniforms = {
      tileUvSize: { value: new THREE.Vector2(UV_TILE_WIDTH, UV_TILE_HEIGHT) },
      time: { value: 0.0 },
      screenDarkening: { value: 0.0 },
      lightningFlash: { value: 0.0 },
      weatherTint: { value: new THREE.Vector3(1, 1, 1) },
      weatherTintStrength: { value: 0.0 },
    };

    // Modify shader to use atlas UV mapping
    mat.onBeforeCompile = (shader) => {
      // Merge uniforms
      Object.assign(shader.uniforms, mat.userData.uniforms);

      // Inject attribute and uniforms in vertex shader
      shader.vertexShader = shader.vertexShader.replace(
        '#include <common>',
        `
        #include <common>
        attribute vec2 uvOffset;
        uniform vec2 tileUvSize;
        `
      );

      // Modify UV calculation for atlas
      shader.vertexShader = shader.vertexShader.replace(
        '#include <uv_vertex>',
        `
        #include <uv_vertex>
        #ifdef USE_MAP
          // Map UV to tile in atlas
          // uv is 0-1 for the geometry, we scale and offset into atlas
          vMapUv = uv * tileUvSize + uvOffset;
        #endif
        `
      );

      // Inject weather uniforms in fragment shader
      shader.fragmentShader = shader.fragmentShader.replace(
        '#include <common>',
        `
        #include <common>
        uniform float screenDarkening;
        uniform float lightningFlash;
        uniform vec3 weatherTint;
        uniform float weatherTintStrength;
        `
      );

      // Add weather effects
      shader.fragmentShader = shader.fragmentShader.replace(
        '#include <dithering_fragment>',
        `
        #include <dithering_fragment>

        // Screen darkening (weather)
        gl_FragColor.rgb *= (1.0 - screenDarkening);

        // Weather tint
        if (weatherTintStrength > 0.0) {
          gl_FragColor.rgb = mix(gl_FragColor.rgb, gl_FragColor.rgb * weatherTint, weatherTintStrength);
        }

        // Lightning flash
        if (lightningFlash > 0.0) {
          gl_FragColor.rgb += vec3(lightningFlash);
        }
        `
      );
    };

    // Cache key for shader program
    mat.customProgramCacheKey = () => `pixelTileAtlas_v2_fog${mat.fog ? '1' : '0'}`;

    return { texture: tex, material: mat };
  }, []);

  // Mark as loaded after first render
  useEffect(() => {
    if (texture && material) {
      setIsLoaded(true);
    }
  }, [texture, material]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      texture?.dispose();
      material?.dispose();
    };
  }, [texture, material]);

  return { texture, material, isLoaded };
}

/**
 * Get UV offset for a tile type
 */
export function getTileUvOffset(tileType: number): [number, number] {
  const pos = TILE_ATLAS_POSITIONS[tileType] ?? [0, 0];
  return [pos[0] * UV_TILE_WIDTH, pos[1] * UV_TILE_HEIGHT];
}

/**
 * Update weather uniforms on the pixel tile material
 */
export function setPixelTileWeatherUniforms(
  material: THREE.Material,
  options: {
    time?: number;
    screenDarkening?: number;
    lightningFlash?: number;
    weatherTint?: THREE.Vector3;
    weatherTintStrength?: number;
  }
): void {
  if (!material.userData?.uniforms) return;
  const uniforms = material.userData.uniforms;

  if (options.time !== undefined) uniforms.time.value = options.time;
  if (options.screenDarkening !== undefined) uniforms.screenDarkening.value = options.screenDarkening;
  if (options.lightningFlash !== undefined) uniforms.lightningFlash.value = options.lightningFlash;
  if (options.weatherTint) uniforms.weatherTint.value.copy(options.weatherTint);
  if (options.weatherTintStrength !== undefined) uniforms.weatherTintStrength.value = options.weatherTintStrength;
}

export { TILE_ATLAS_POSITIONS, UV_TILE_WIDTH, UV_TILE_HEIGHT };
