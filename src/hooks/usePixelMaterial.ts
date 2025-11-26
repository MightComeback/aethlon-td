/**
 * Pixel Material Hook
 * Creates a specialized material for objects to give them a pixel-art look
 * Uses a noise pattern similar to the terrain
 */

import { useMemo } from "react";
import * as THREE from "three";

// Generate a shared pixel noise texture
function createNoiseTexture() {
  const size = 64;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;

  // Fill base
  ctx.fillStyle = "#808080";
  ctx.fillRect(0, 0, size, size);

  // Add noise
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const noise = (Math.random() - 0.5) * 0.2;
      const val = 128 + noise * 255;
      const c = Math.floor(Math.max(0, Math.min(255, val)));
      ctx.fillStyle = `rgb(${c}, ${c}, ${c})`;
      ctx.fillRect(x, y, 1, 1);
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.magFilter = THREE.NearestFilter;
  texture.minFilter = THREE.NearestFilter;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.colorSpace = THREE.NoColorSpace; // Keep linear for modulation
  
  return texture;
}

let sharedNoiseTexture: THREE.Texture | null = null;

export function usePixelMaterial(color: string, roughness = 0.9) {
  const material = useMemo(() => {
    if (!sharedNoiseTexture) {
      sharedNoiseTexture = createNoiseTexture();
    }

    const mat = new THREE.MeshStandardMaterial({
      color: color,
      roughness: roughness,
      metalness: 0.1,
      map: sharedNoiseTexture,
    });
    
    // Customize shader to modulate color with the noise texture
    // effectively using the texture as a "detail map" without replacing the color
    mat.onBeforeCompile = (shader) => {
      shader.fragmentShader = shader.fragmentShader.replace(
        '#include <map_fragment>',
        `
        #ifdef USE_MAP
          vec4 texelColor = texture2D( map, vMapUv );
          // Modulate base color by texture intensity (centered around 0.5)
          // Texture is grayscale 0.5 +/- noise
          float noise = texelColor.r; 
          diffuseColor.rgb *= (0.8 + noise * 0.4); 
        #endif
        `
      );
    };
    
    // Ensure cache key is unique per color if needed, 
    // but actually Three.js handles unique materials automatically.
    // However, sharing the program might be good.
    
    return mat;
  }, [color, roughness]);

  return material;
}

