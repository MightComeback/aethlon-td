/**
 * Tile Atlas Shader Material
 * Custom shader for rendering textured tiles with atlas UV mapping
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

    // Final position
    gl_Position = projectionMatrix * modelViewMatrix * worldPosition;
  }
`;

// Fragment shader
const fragmentShader = /* glsl */ `
  precision highp float;

  // Uniforms
  uniform sampler2D tileAtlas;
  uniform vec3 ambientColor;
  uniform float ambientIntensity;
  uniform vec3 lightDirection;
  uniform float lightIntensity;

  // Varyings from vertex shader
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vWorldPosition;

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
      tileAtlas: { value: atlas ?? null },
      tileUvSize: { value: UV_TILE_SIZE },
      ambientColor: { value: new THREE.Vector3(1.0, 1.0, 1.0) },
      ambientIntensity: { value: 0.4 },
      lightDirection: { value: new THREE.Vector3(0.5, 1.0, 0.5).normalize() },
      lightIntensity: { value: 0.6 },
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
