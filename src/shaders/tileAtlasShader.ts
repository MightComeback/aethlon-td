/**
 * Tile Atlas Shader Material
 * Customized MeshStandardMaterial for rendering textured tiles with atlas UV mapping
 * Includes weather effects: fog, screen darkening, lightning flash, tint
 */

import * as THREE from "three";
import { UV_TILE_SIZE } from "@/data/textures/tileAtlasConfig";

/**
 * Create a tile atlas material based on MeshStandardMaterial
 * @param atlas - The tile atlas texture (optional, can be set later)
 */
// Track material creation for debugging
let _materialInstanceCount = 0;

export function createTileAtlasMaterial(
  atlas?: THREE.Texture
): THREE.MeshStandardMaterial {
  const instanceId = ++_materialInstanceCount;
  console.log(`[tileAtlasShader] Creating material instance #${instanceId}`);

  const material = new THREE.MeshStandardMaterial({
    map: atlas || null,
    roughness: 0.8,
    metalness: 0.0,
    side: THREE.FrontSide,
    transparent: false,
    fog: true, // Enable fog support
  });

  // Store uniforms in userData to be accessible
  // NOTE: Fog uniforms are handled by Three.js automatically when scene.fog is set
  material.userData.uniforms = {
    tileUvSize: { value: UV_TILE_SIZE },
    time: { value: 0.0 },
    screenDarkening: { value: 0.0 },
    lightningFlash: { value: 0.0 },
    weatherTint: { value: new THREE.Vector3(1, 1, 1) },
    weatherTintStrength: { value: 0.0 },
  };

  material.onBeforeCompile = (shader) => {
    console.log(`[tileAtlasShader] onBeforeCompile called for instance #${instanceId}`);
    // Merge uniforms
    Object.assign(shader.uniforms, material.userData.uniforms);

    // 1. Inject attributes and uniforms in Vertex Shader
    shader.vertexShader = shader.vertexShader.replace(
      '#include <common>',
      `
      #include <common>
      attribute vec2 uvOffset;
      uniform float tileUvSize;
      uniform float time;
      `
    );

    // 2. Modify UV calculation to use Atlas Offset
    // We override vMapUv which is used by the map texture
    shader.vertexShader = shader.vertexShader.replace(
      '#include <uv_vertex>',
      `
      #include <uv_vertex>
      #ifdef USE_MAP
        vMapUv = uv * tileUvSize + uvOffset;
      #endif
      `
    );
    
    // Ensure we have position for fog (MeshStandardMaterial usually does this, but let's be safe)
    // Actually standard material calculates vViewPosition if needed for other things. 
    // We'll rely on the fact that we can calculate depth in fragment shader or use existing varyings.
    // To support our custom fog, we need vViewPosition or vWorldPosition.
    // MeshStandardMaterial vertex shader usually exports vViewPosition.

    // 3. Inject uniforms in Fragment Shader
    // NOTE: Do NOT declare fogColor, fogNear, fogFar, fogDensity here!
    // Three.js automatically injects these when scene.fog is set and material.fog = true
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

    // 4. Inject Weather Effects at the end of Fragment Shader
    // NOTE: Three.js handles fog automatically via #include <fog_fragment>
    // We only add our custom weather effects here
    shader.fragmentShader = shader.fragmentShader.replace(
      '#include <dithering_fragment>',
      `
      #include <dithering_fragment>

      // Screen darkening (thunderstorm)
      gl_FragColor.rgb *= (1.0 - screenDarkening);

      // Weather tint
      if (weatherTintStrength > 0.0) {
        gl_FragColor.rgb = mix(gl_FragColor.rgb, gl_FragColor.rgb * weatherTint, weatherTintStrength);
      }

      // Lightning flash (additive)
      if (lightningFlash > 0.0) {
        gl_FragColor.rgb += vec3(lightningFlash);
      }
      `
    );
  };

  // Necessary to make sure the onBeforeCompile is called and updates are tracked
  // Include fog state in cache key so shader recompiles when fog is added/removed
  material.customProgramCacheKey = () => {
    return `tileAtlasMaterial_fog${material.fog ? '1' : '0'}`;
  };

  return material;
}

/**
 * Update the atlas texture on an existing material
 */
export function setAtlasTexture(
  material: THREE.Material,
  atlas: THREE.Texture
): void {
  if (material instanceof THREE.MeshStandardMaterial) {
    material.map = atlas;
    material.needsUpdate = true;
  }
}

/**
 * Update lighting uniforms
 * With MeshStandardMaterial, lighting is handled by the scene lights.
 * This function is kept for compatibility but does not need to set shader uniforms for light.
 */
export function setLighting(
  material: THREE.Material,
  options: {
    ambientColor?: THREE.Vector3;
    ambientIntensity?: number;
    lightDirection?: THREE.Vector3;
    lightIntensity?: number;
  }
): void {
  // No-op: Lighting is handled by Scene lights + MeshStandardMaterial
}

// Debug flag - set to true to log uniform updates
let _debugWeatherUniforms = false;

export function setDebugWeatherUniforms(enabled: boolean): void {
  _debugWeatherUniforms = enabled;
}

/**
 * Update weather uniforms on a material
 */
export function setWeatherUniforms(
  material: THREE.Material,
  options: any
): void {
  if (!material.userData.uniforms) {
    if (_debugWeatherUniforms) {
      console.warn("[tileAtlasShader] setWeatherUniforms called but material.userData.uniforms is undefined!");
    }
    return;
  }
  const uniforms = material.userData.uniforms;

  if (options.time !== undefined) {
    uniforms.time.value = options.time;
  }
  if (options.screenDarkening !== undefined) {
    uniforms.screenDarkening.value = options.screenDarkening;
  }
  if (options.lightningFlash !== undefined) {
    uniforms.lightningFlash.value = options.lightningFlash;
  }
  if (options.weatherTint) {
    uniforms.weatherTint.value.copy(options.weatherTint);
  }
  if (options.weatherTintStrength !== undefined) {
    uniforms.weatherTintStrength.value = options.weatherTintStrength;
  }
  // NOTE: Fog is handled by Three.js scene.fog, not custom uniforms
}

/**
 * Convert hex color string to THREE.Vector3
 */
export function hexToVector3(hex: string): THREE.Vector3 {
  const clean = hex.replace("#", "");
  const r = parseInt(clean.slice(0, 2), 16) / 255;
  const g = parseInt(clean.slice(2, 4), 16) / 255;
  const b = parseInt(clean.slice(4, 6), 16) / 255;
  return new THREE.Vector3(r, g, b);
}

/**
 * Reset weather uniforms to default (clear weather)
 */
export function resetWeatherUniforms(material: THREE.Material): void {
  setWeatherUniforms(material, {
    screenDarkening: 0,
    lightningFlash: 0,
    weatherTint: new THREE.Vector3(1, 1, 1),
    weatherTintStrength: 0,
  });
}
