/**
 * Lightning Bolt Shader
 * Renders procedural lightning bolt geometry with glow effect
 */

import * as THREE from "three";

// Vertex shader
const vertexShader = /* glsl */ `
  varying float vDistance;
  varying vec2 vUv;

  void main() {
    vUv = uv;
    vDistance = position.x; // Use x as distance along bolt for glow falloff

    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

// Fragment shader with glow effect
const fragmentShader = /* glsl */ `
  precision highp float;

  uniform vec3 uColor;
  uniform vec3 uCoreColor;
  uniform float uIntensity;
  uniform float uTime;
  uniform float uGlowWidth;

  varying float vDistance;
  varying vec2 vUv;

  void main() {
    // Core glow - bright center, falloff at edges
    float distFromCenter = abs(vUv.y - 0.5) * 2.0;

    // Core (very bright center line)
    float core = 1.0 - smoothstep(0.0, 0.15, distFromCenter);

    // Inner glow
    float innerGlow = 1.0 - smoothstep(0.0, 0.4, distFromCenter);

    // Outer glow
    float outerGlow = 1.0 - smoothstep(0.0, 1.0, distFromCenter);

    // Combine layers
    float glow = core * 1.0 + innerGlow * 0.6 + outerGlow * 0.3;

    // Flickering effect
    float flicker = 0.85 + 0.15 * sin(uTime * 80.0 + vDistance * 10.0);

    // Apply intensity with flicker
    glow *= uIntensity * flicker;

    // Color blend - white core, colored glow
    vec3 color = mix(uColor, uCoreColor, core);

    // Final color with alpha based on glow
    float alpha = glow * uIntensity;

    if (alpha < 0.01) discard;

    gl_FragColor = vec4(color * glow, alpha);
  }
`;

/**
 * Create lightning bolt material
 */
export function createLightningMaterial(): THREE.ShaderMaterial {
  return new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
      uColor: { value: new THREE.Vector3(0.6, 0.8, 1.0) }, // Light blue
      uCoreColor: { value: new THREE.Vector3(1.0, 1.0, 1.0) }, // White core
      uIntensity: { value: 1.0 },
      uTime: { value: 0 },
      uGlowWidth: { value: 0.5 },
    },
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide,
  });
}

/**
 * Update lightning material uniforms
 */
export function updateLightningMaterial(
  material: THREE.ShaderMaterial,
  options: {
    intensity?: number;
    time?: number;
    color?: THREE.Vector3;
  }
): void {
  if (options.intensity !== undefined && material.uniforms.uIntensity) {
    material.uniforms.uIntensity.value = options.intensity;
  }
  if (options.time !== undefined && material.uniforms.uTime) {
    material.uniforms.uTime.value = options.time;
  }
  if (options.color && material.uniforms.uColor) {
    material.uniforms.uColor.value.copy(options.color);
  }
}

/**
 * Generate jagged lightning bolt segments
 */
export function generateLightningSegments(
  start: THREE.Vector3,
  end: THREE.Vector3,
  options: {
    segments?: number;
    jitter?: number;
    branchChance?: number;
    branchLength?: number;
  } = {}
): THREE.Vector3[][] {
  const {
    segments = 12,
    jitter = 3,
    branchChance = 0.3,
    branchLength = 0.4,
  } = options;

  const mainBolt: THREE.Vector3[] = [start.clone()];
  const branches: THREE.Vector3[][] = [];

  const direction = end.clone().sub(start);
  const length = direction.length();
  direction.normalize();

  // Generate main bolt segments
  for (let i = 1; i < segments; i++) {
    const t = i / segments;
    const basePoint = start.clone().lerp(end, t);

    // Add random jitter perpendicular to direction
    const perpX = new THREE.Vector3(-direction.z, 0, direction.x);
    const perpY = new THREE.Vector3(0, 1, 0);

    const offsetX = (Math.random() - 0.5) * jitter;
    const offsetY = (Math.random() - 0.5) * jitter * 0.5;

    basePoint.add(perpX.multiplyScalar(offsetX));
    basePoint.add(perpY.multiplyScalar(offsetY));

    mainBolt.push(basePoint);

    // Possibly create a branch
    if (i < segments - 2 && Math.random() < branchChance) {
      const branchEnd = basePoint.clone().add(
        new THREE.Vector3(
          (Math.random() - 0.5) * length * branchLength,
          -Math.random() * length * branchLength * 0.5,
          (Math.random() - 0.5) * length * branchLength
        )
      );

      // Recursive call for branch (fewer segments, less jitter)
      const branchSegments = generateLightningSegments(basePoint, branchEnd, {
        segments: Math.floor(segments * 0.4),
        jitter: jitter * 0.6,
        branchChance: branchChance * 0.3,
        branchLength: branchLength * 0.5,
      });

      branches.push(...branchSegments);
    }
  }

  mainBolt.push(end.clone());

  return [mainBolt, ...branches];
}

/**
 * Create geometry from lightning segments
 */
export function createLightningGeometry(
  segments: THREE.Vector3[],
  width: number = 0.5
): THREE.BufferGeometry {
  if (segments.length < 2) {
    return new THREE.BufferGeometry();
  }

  const positions: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];

  let vertexIndex = 0;

  for (let i = 0; i < segments.length - 1; i++) {
    const start = segments[i];
    const end = segments[i + 1];

    if (!start || !end) continue;

    const direction = end.clone().sub(start).normalize();

    // Create perpendicular vector for width
    const up = new THREE.Vector3(0, 1, 0);
    const perp = direction.clone().cross(up).normalize().multiplyScalar(width);

    if (perp.length() < 0.01) {
      // Fallback if direction is parallel to up
      perp.set(width, 0, 0);
    }

    // Four vertices per segment (quad)
    const v0 = start.clone().sub(perp);
    const v1 = start.clone().add(perp);
    const v2 = end.clone().add(perp);
    const v3 = end.clone().sub(perp);

    positions.push(
      v0.x, v0.y, v0.z,
      v1.x, v1.y, v1.z,
      v2.x, v2.y, v2.z,
      v3.x, v3.y, v3.z
    );

    const uStart = i / (segments.length - 1);
    const uEnd = (i + 1) / (segments.length - 1);

    uvs.push(
      uStart, 0,
      uStart, 1,
      uEnd, 1,
      uEnd, 0
    );

    // Two triangles per quad
    indices.push(
      vertexIndex, vertexIndex + 1, vertexIndex + 2,
      vertexIndex, vertexIndex + 2, vertexIndex + 3
    );

    vertexIndex += 4;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(positions, 3)
  );
  geometry.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
  geometry.setIndex(indices);

  return geometry;
}
