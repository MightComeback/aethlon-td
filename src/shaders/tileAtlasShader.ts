/**
 * Tile Atlas Shader Material
 * Custom shader for rendering textured tiles with atlas UV mapping
 * Includes weather effects: fog, screen darkening, lightning flash, tint
 */

import * as THREE from "three";
import { UV_TILE_SIZE } from "@/data/textures/tileAtlasConfig";

// Vertex shader
const vertexShader = /* glsl */ `
  // Per-instance attribute for UV offset in atlas
  attribute vec2 uvOffset;

  // Varyings passed to fragment shader
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vWorldPosition;
  varying float vDepth;

  // Uniforms
  uniform float tileUvSize;

  void main() {
    // Apply instance transform
    vec4 worldPosition = instanceMatrix * vec4(position, 1.0);
    vWorldPosition = worldPosition.xyz;

    // Transform normal for lighting
    mat3 normalMatrix = transpose(inverse(mat3(instanceMatrix)));
    vNormal = normalize(normalMatrix * normal);

    // Calculate texture UV with atlas offset
    // Scale the local UV (0-1 on box face) to tile size, then offset to atlas position
    vUv = uv * tileUvSize + uvOffset;

    // Calculate view space position for depth-based effects
    vec4 viewPosition = modelViewMatrix * worldPosition;
    vDepth = -viewPosition.z;

    // Final position
    gl_Position = projectionMatrix * viewPosition;
  }
`;

// Fragment shader with weather effects
const fragmentShader = /* glsl */ `
  precision highp float;

  // Base uniforms
  uniform sampler2D tileAtlas;
  uniform vec3 ambientColor;
  uniform float ambientIntensity;
  uniform vec3 lightDirection;
  uniform float lightIntensity;

  // Weather uniforms
  uniform float screenDarkening;      // 0-1, how much to darken the scene
  uniform float lightningFlash;       // 0-1, additive brightness for lightning
  uniform vec3 weatherTint;           // RGB tint color
  uniform float weatherTintStrength;  // 0-1, blend amount for tint
  uniform float fogDensity;           // 0-1, fog intensity
  uniform vec3 fogColor;              // RGB fog color
  uniform float fogNear;              // Fog start distance
  uniform float fogFar;               // Fog end distance

  // Varyings from vertex shader
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vWorldPosition;
  varying float vDepth;

  void main() {
    // Sample texture from atlas
    vec4 texColor = texture2D(tileAtlas, vUv);

    // Simple directional lighting
    vec3 normal = normalize(vNormal);
    vec3 lightDir = normalize(lightDirection);
    float diffuse = max(dot(normal, lightDir), 0.0);

    // Combine ambient and diffuse lighting
    vec3 ambient = ambientColor * ambientIntensity;
    vec3 diffuseLight = vec3(1.0) * diffuse * lightIntensity;
    vec3 lighting = ambient + diffuseLight;

    // Apply lighting to texture color
    vec3 finalColor = texColor.rgb * lighting;

    // === Weather Effects ===

    // Screen darkening (thunderstorm)
    finalColor *= (1.0 - screenDarkening);

    // Weather tint
    if (weatherTintStrength > 0.0) {
      finalColor = mix(finalColor, finalColor * weatherTint, weatherTintStrength);
    }

    // Distance fog
    if (fogDensity > 0.0) {
      float fogFactor = smoothstep(fogNear, fogFar, vDepth);
      fogFactor *= fogDensity;
      finalColor = mix(finalColor, fogColor, fogFactor);
    }

    // Lightning flash (additive, applied last)
    if (lightningFlash > 0.0) {
      finalColor += vec3(lightningFlash);
    }

    gl_FragColor = vec4(finalColor, texColor.a);
  }
`;

/**
 * Create a tile atlas shader material
 * @param atlas - The tile atlas texture (optional, can be set later)
 */
export function createTileAtlasMaterial(
  atlas?: THREE.Texture
): THREE.ShaderMaterial {
  return new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
      // Base uniforms
      tileAtlas: { value: atlas ?? null },
      tileUvSize: { value: UV_TILE_SIZE },
      ambientColor: { value: new THREE.Vector3(1.0, 1.0, 1.0) },
      ambientIntensity: { value: 0.4 },
      lightDirection: { value: new THREE.Vector3(0.5, 1.0, 0.5).normalize() },
      lightIntensity: { value: 0.6 },
      // Weather uniforms
      screenDarkening: { value: 0.0 },
      lightningFlash: { value: 0.0 },
      weatherTint: { value: new THREE.Vector3(1.0, 1.0, 1.0) },
      weatherTintStrength: { value: 0.0 },
      fogDensity: { value: 0.0 },
      fogColor: { value: new THREE.Vector3(0.5, 0.5, 0.6) },
      fogNear: { value: 10.0 },
      fogFar: { value: 100.0 },
    },
    side: THREE.FrontSide,
    transparent: false,
  });
}

/**
 * Update the atlas texture on an existing material
 */
export function setAtlasTexture(
  material: THREE.ShaderMaterial,
  atlas: THREE.Texture
): void {
  if (material.uniforms.tileAtlas) {
    material.uniforms.tileAtlas.value = atlas;
    material.needsUpdate = true;
  }
}

/**
 * Update lighting uniforms
 */
export function setLighting(
  material: THREE.ShaderMaterial,
  options: {
    ambientColor?: THREE.Vector3;
    ambientIntensity?: number;
    lightDirection?: THREE.Vector3;
    lightIntensity?: number;
  }
): void {
  if (options.ambientColor && material.uniforms.ambientColor) {
    material.uniforms.ambientColor.value.copy(options.ambientColor);
  }
  if (
    options.ambientIntensity !== undefined &&
    material.uniforms.ambientIntensity
  ) {
    material.uniforms.ambientIntensity.value = options.ambientIntensity;
  }
  if (options.lightDirection && material.uniforms.lightDirection) {
    material.uniforms.lightDirection.value.copy(options.lightDirection);
  }
  if (
    options.lightIntensity !== undefined &&
    material.uniforms.lightIntensity
  ) {
    material.uniforms.lightIntensity.value = options.lightIntensity;
  }
}

/**
 * Weather uniform options
 */
export interface WeatherUniformOptions {
  screenDarkening?: number;
  lightningFlash?: number;
  weatherTint?: THREE.Vector3;
  weatherTintStrength?: number;
  fogDensity?: number;
  fogColor?: THREE.Vector3;
  fogNear?: number;
  fogFar?: number;
}

/**
 * Update weather uniforms on a material
 */
export function setWeatherUniforms(
  material: THREE.ShaderMaterial,
  options: WeatherUniformOptions
): void {
  const uniforms = material.uniforms;

  if (options.screenDarkening !== undefined && uniforms.screenDarkening) {
    uniforms.screenDarkening.value = options.screenDarkening;
  }
  if (options.lightningFlash !== undefined && uniforms.lightningFlash) {
    uniforms.lightningFlash.value = options.lightningFlash;
  }
  if (options.weatherTint && uniforms.weatherTint) {
    uniforms.weatherTint.value.copy(options.weatherTint);
  }
  if (options.weatherTintStrength !== undefined && uniforms.weatherTintStrength) {
    uniforms.weatherTintStrength.value = options.weatherTintStrength;
  }
  if (options.fogDensity !== undefined && uniforms.fogDensity) {
    uniforms.fogDensity.value = options.fogDensity;
  }
  if (options.fogColor && uniforms.fogColor) {
    uniforms.fogColor.value.copy(options.fogColor);
  }
  if (options.fogNear !== undefined && uniforms.fogNear) {
    uniforms.fogNear.value = options.fogNear;
  }
  if (options.fogFar !== undefined && uniforms.fogFar) {
    uniforms.fogFar.value = options.fogFar;
  }
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
export function resetWeatherUniforms(material: THREE.ShaderMaterial): void {
  setWeatherUniforms(material, {
    screenDarkening: 0,
    lightningFlash: 0,
    weatherTint: new THREE.Vector3(1, 1, 1),
    weatherTintStrength: 0,
    fogDensity: 0,
    fogColor: new THREE.Vector3(0.5, 0.5, 0.6),
    fogNear: 10,
    fogFar: 100,
  });
}
