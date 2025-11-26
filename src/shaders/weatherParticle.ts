/**
 * Weather Particle Shader
 * GPU-animated particles for rain and snow
 * Uses instancing with per-particle offsets and phase
 */

import * as THREE from "three";

// Vertex shader - animates particle positions based on time
const vertexShader = /* glsl */ `
  // Per-instance attributes
  attribute vec3 instanceOffset;    // Initial spawn position
  attribute float instancePhase;    // Random phase offset for animation

  // Uniforms
  uniform float uTime;              // Current time
  uniform float uGravity;           // Fall speed multiplier
  uniform vec2 uWind;               // Wind direction and strength
  uniform float uCycleLength;       // Animation cycle length (for wrapping)
  uniform vec3 uBoundsMin;          // Particle bounds minimum
  uniform vec3 uBoundsMax;          // Particle bounds maximum
  uniform float uParticleScale;     // Base particle scale

  // Varyings
  varying float vAlpha;
  varying vec2 vUv;

  // Wrap value to bounds
  float wrap(float value, float minVal, float maxVal) {
    float range = maxVal - minVal;
    return minVal + mod(value - minVal, range);
  }

  void main() {
    vUv = uv;

    // Calculate animated time with phase offset
    float t = mod(uTime + instancePhase, uCycleLength);

    // Calculate position with gravity and wind
    vec3 pos = instanceOffset;
    pos.y -= uGravity * t;
    pos.x += uWind.x * t;
    pos.z += uWind.y * t;

    // Wrap around bounds
    pos.x = wrap(pos.x, uBoundsMin.x, uBoundsMax.x);
    pos.y = wrap(pos.y, uBoundsMin.y, uBoundsMax.y);
    pos.z = wrap(pos.z, uBoundsMin.z, uBoundsMax.z);

    // Calculate alpha fade near ground
    float groundFade = smoothstep(uBoundsMin.y, uBoundsMin.y + 2.0, pos.y);
    float topFade = smoothstep(uBoundsMax.y, uBoundsMax.y - 2.0, pos.y);
    vAlpha = groundFade * topFade;

    // Billboard: always face camera
    // Get camera right and up vectors from view matrix
    vec3 cameraRight = vec3(viewMatrix[0][0], viewMatrix[1][0], viewMatrix[2][0]);
    vec3 cameraUp = vec3(viewMatrix[0][1], viewMatrix[1][1], viewMatrix[2][1]);

    // Scale the billboard quad
    vec3 billboardPos = pos +
      cameraRight * position.x * uParticleScale +
      cameraUp * position.y * uParticleScale;

    // Transform to clip space
    gl_Position = projectionMatrix * viewMatrix * vec4(billboardPos, 1.0);
  }
`;

// Fragment shader - simple alpha-tested particle
const fragmentShader = /* glsl */ `
  precision highp float;

  uniform vec3 uColor;
  uniform float uOpacity;
  uniform float uAlphaTest;

  varying float vAlpha;
  varying vec2 vUv;

  void main() {
    // Simple circular/soft particle
    float dist = length(vUv - 0.5) * 2.0;
    float alpha = 1.0 - smoothstep(0.0, 1.0, dist);

    // Apply opacity and position-based alpha
    alpha *= uOpacity * vAlpha;

    // Alpha test for performance
    if (alpha < uAlphaTest) discard;

    gl_FragColor = vec4(uColor, alpha);
  }
`;

// Rain-specific fragment shader (elongated streaks)
const rainFragmentShader = /* glsl */ `
  precision highp float;

  uniform vec3 uColor;
  uniform float uOpacity;
  uniform float uAlphaTest;

  varying float vAlpha;
  varying vec2 vUv;

  void main() {
    // Elongated rain drop shape (vertical streak)
    float distX = abs(vUv.x - 0.5) * 2.0;
    float distY = abs(vUv.y - 0.5) * 2.0;

    // Horizontal falloff (narrow)
    float alphaX = 1.0 - smoothstep(0.0, 0.3, distX);
    // Vertical falloff (longer)
    float alphaY = 1.0 - smoothstep(0.0, 1.0, distY);

    float alpha = alphaX * alphaY;

    // Apply opacity and position-based alpha
    alpha *= uOpacity * vAlpha;

    // Alpha test for performance
    if (alpha < uAlphaTest) discard;

    gl_FragColor = vec4(uColor, alpha);
  }
`;

export interface ParticleShaderUniforms {
  uTime: THREE.IUniform<number>;
  uGravity: THREE.IUniform<number>;
  uWind: THREE.IUniform<THREE.Vector2>;
  uCycleLength: THREE.IUniform<number>;
  uBoundsMin: THREE.IUniform<THREE.Vector3>;
  uBoundsMax: THREE.IUniform<THREE.Vector3>;
  uParticleScale: THREE.IUniform<number>;
  uColor: THREE.IUniform<THREE.Vector3>;
  uOpacity: THREE.IUniform<number>;
  uAlphaTest: THREE.IUniform<number>;
}

export interface ParticleMaterialOptions {
  type: "rain" | "snow";
  color?: string;
  opacity?: number;
  gravity?: number;
  wind?: THREE.Vector2;
  boundsMin?: THREE.Vector3;
  boundsMax?: THREE.Vector3;
  particleScale?: number;
  cycleLength?: number;
}

/**
 * Create a weather particle material
 */
export function createParticleMaterial(
  options: ParticleMaterialOptions
): THREE.ShaderMaterial {
  const {
    type,
    color = type === "rain" ? "#6699cc" : "#ffffff",
    opacity = type === "rain" ? 0.5 : 0.8,
    gravity = type === "rain" ? 15 : 3,
    wind = new THREE.Vector2(0, 0),
    boundsMin = new THREE.Vector3(-100, -5, -100),
    boundsMax = new THREE.Vector3(100, 50, 100),
    particleScale = type === "rain" ? 0.15 : 0.08,
    cycleLength = 10,
  } = options;

  // Parse color
  const colorVec = new THREE.Vector3();
  const tempColor = new THREE.Color(color);
  colorVec.set(tempColor.r, tempColor.g, tempColor.b);

  return new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader: type === "rain" ? rainFragmentShader : fragmentShader,
    uniforms: {
      uTime: { value: 0 },
      uGravity: { value: gravity },
      uWind: { value: wind },
      uCycleLength: { value: cycleLength },
      uBoundsMin: { value: boundsMin },
      uBoundsMax: { value: boundsMax },
      uParticleScale: { value: particleScale },
      uColor: { value: colorVec },
      uOpacity: { value: opacity },
      uAlphaTest: { value: 0.01 },
    },
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide,
  });
}

/**
 * Update particle material time uniform
 */
export function updateParticleTime(
  material: THREE.ShaderMaterial,
  time: number
): void {
  if (material.uniforms.uTime) {
    material.uniforms.uTime.value = time;
  }
}

/**
 * Update particle material wind uniform
 */
export function updateParticleWind(
  material: THREE.ShaderMaterial,
  wind: THREE.Vector2
): void {
  if (material.uniforms.uWind) {
    material.uniforms.uWind.value.copy(wind);
  }
}

/**
 * Update particle material color
 */
export function updateParticleColor(
  material: THREE.ShaderMaterial,
  color: string
): void {
  if (material.uniforms.uColor) {
    const tempColor = new THREE.Color(color);
    material.uniforms.uColor.value.set(tempColor.r, tempColor.g, tempColor.b);
  }
}

/**
 * Update particle material opacity
 */
export function updateParticleOpacity(
  material: THREE.ShaderMaterial,
  opacity: number
): void {
  if (material.uniforms.uOpacity) {
    material.uniforms.uOpacity.value = opacity;
  }
}

/**
 * Create a simple quad geometry for billboarded particles
 */
export function createParticleGeometry(): THREE.PlaneGeometry {
  return new THREE.PlaneGeometry(1, 1);
}
