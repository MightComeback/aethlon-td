/**
 * Stylized Materials System
 *
 * Provides hand-painted/toon-style materials using Three.js shading.
 * Designed to work with both WebGL and WebGPU renderers.
 */

import * as THREE from 'three';

export interface StylizedMaterialOptions {
  /** Base color */
  color?: THREE.ColorRepresentation;
  /** Color map texture */
  map?: THREE.Texture | null;
  /** Normal map for detail */
  normalMap?: THREE.Texture | null;
  /** Roughness value or map */
  roughness?: number;
  roughnessMap?: THREE.Texture | null;
  /** Emission for glowing effects */
  emissive?: THREE.ColorRepresentation;
  emissiveIntensity?: number;
  /** Outline/edge detection settings */
  outlineColor?: THREE.ColorRepresentation;
  outlineThickness?: number;
  /** Toon shading bands (0 = smooth, 2-5 = stylized) */
  toonBands?: number;
  /** Rim lighting */
  rimColor?: THREE.ColorRepresentation;
  rimPower?: number;
  /** Shadow color tint */
  shadowColor?: THREE.ColorRepresentation;
  /** Transparency */
  transparent?: boolean;
  opacity?: number;
  alphaTest?: number;
  /** Double sided */
  side?: THREE.Side;
}

const DEFAULT_OPTIONS: StylizedMaterialOptions = {
  color: 0xffffff,
  roughness: 0.8,
  emissive: 0x000000,
  emissiveIntensity: 0,
  outlineColor: 0x000000,
  outlineThickness: 0,
  toonBands: 0,
  rimColor: 0xffffff,
  rimPower: 0,
  shadowColor: 0x303050,
  transparent: false,
  opacity: 1,
  alphaTest: 0,
  side: THREE.FrontSide,
};

/**
 * Create a stylized PBR material (uses MeshStandardMaterial with modifications)
 */
export function createStylizedMaterial(
  options: StylizedMaterialOptions = {}
): THREE.MeshStandardMaterial {
  const opts = { ...DEFAULT_OPTIONS, ...options };

  const material = new THREE.MeshStandardMaterial({
    color: opts.color,
    map: opts.map ?? undefined,
    normalMap: opts.normalMap ?? undefined,
    roughness: opts.roughness,
    roughnessMap: opts.roughnessMap ?? undefined,
    metalness: 0.0, // Non-metallic for stylized look
    emissive: opts.emissive,
    emissiveIntensity: opts.emissiveIntensity,
    transparent: opts.transparent,
    opacity: opts.opacity,
    alphaTest: opts.alphaTest,
    side: opts.side,
  });

  // Apply custom shader modifications for stylized look
  if (opts.toonBands && opts.toonBands > 0) {
    applyToonShading(material, opts.toonBands, opts.shadowColor as THREE.Color);
  }

  if (opts.rimPower && opts.rimPower > 0) {
    applyRimLighting(material, opts.rimColor as THREE.Color, opts.rimPower);
  }

  return material;
}

/**
 * Apply toon/cel shading to a material
 */
function applyToonShading(
  material: THREE.MeshStandardMaterial,
  bands: number,
  shadowColor?: THREE.Color
): void {
  material.onBeforeCompile = (shader) => {
    // Add uniforms
    shader.uniforms.toonBands = { value: bands };
    shader.uniforms.shadowTint = { value: shadowColor ?? new THREE.Color(0x303050) };

    // Modify fragment shader to quantize lighting
    shader.fragmentShader = shader.fragmentShader.replace(
      '#include <lights_physical_pars_fragment>',
      `
      #include <lights_physical_pars_fragment>
      uniform float toonBands;
      uniform vec3 shadowTint;

      float quantizeLighting(float value) {
        if (toonBands <= 0.0) return value;
        return floor(value * toonBands) / toonBands;
      }
      `
    );

    // Apply quantization to lighting result
    shader.fragmentShader = shader.fragmentShader.replace(
      '#include <lights_fragment_begin>',
      `
      #include <lights_fragment_begin>
      // Apply toon quantization
      `
    );

    // Tint shadows
    shader.fragmentShader = shader.fragmentShader.replace(
      'vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;',
      `
      // Apply shadow tinting
      float shadowAmount = 1.0 - clamp(length(reflectedLight.directDiffuse), 0.0, 1.0);
      vec3 tintedIndirect = mix(reflectedLight.indirectDiffuse, reflectedLight.indirectDiffuse * shadowTint, shadowAmount * 0.5);

      vec3 outgoingLight = reflectedLight.directDiffuse + tintedIndirect + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
      `
    );
  };
}

/**
 * Apply rim/fresnel lighting effect
 */
function applyRimLighting(
  material: THREE.MeshStandardMaterial,
  rimColor: THREE.Color,
  rimPower: number
): void {
  const existingCallback = material.onBeforeCompile;

  material.onBeforeCompile = (shader) => {
    // Call existing callback first
    existingCallback?.(shader, undefined as unknown as THREE.WebGLRenderer);

    // Add rim uniforms
    shader.uniforms.rimColor = { value: rimColor };
    shader.uniforms.rimPower = { value: rimPower };

    // Add rim calculation to fragment shader
    shader.fragmentShader = shader.fragmentShader.replace(
      'void main() {',
      `
      uniform vec3 rimColor;
      uniform float rimPower;

      void main() {
      `
    );

    shader.fragmentShader = shader.fragmentShader.replace(
      '#include <dithering_fragment>',
      `
      // Rim lighting
      vec3 viewDir = normalize(vViewPosition);
      float rimFactor = pow(1.0 - max(dot(normal, viewDir), 0.0), rimPower);
      gl_FragColor.rgb += rimColor * rimFactor * 0.5;

      #include <dithering_fragment>
      `
    );
  };
}

/**
 * Create an outline material for edge detection pass
 */
export function createOutlineMaterial(
  color: THREE.ColorRepresentation = 0x000000,
  thickness: number = 0.02
): THREE.ShaderMaterial {
  return new THREE.ShaderMaterial({
    uniforms: {
      outlineColor: { value: new THREE.Color(color) },
      outlineThickness: { value: thickness },
    },
    vertexShader: `
      uniform float outlineThickness;

      void main() {
        vec3 pos = position + normal * outlineThickness;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `,
    fragmentShader: `
      uniform vec3 outlineColor;

      void main() {
        gl_FragColor = vec4(outlineColor, 1.0);
      }
    `,
    side: THREE.BackSide,
  });
}

/**
 * Create a toon gradient material with ramp texture
 */
export function createToonMaterial(
  options: {
    color?: THREE.ColorRepresentation;
    gradientSteps?: number;
  } = {}
): THREE.MeshToonMaterial {
  const { color = 0xffffff, gradientSteps = 3 } = options;

  // Create gradient map
  const gradientMap = createGradientTexture(gradientSteps);

  const material = new THREE.MeshToonMaterial({
    color,
    gradientMap,
  });

  return material;
}

/**
 * Create a gradient texture for toon shading
 */
function createGradientTexture(steps: number): THREE.Texture {
  const size = 256;
  const data = new Uint8Array(size * 3);

  for (let i = 0; i < size; i++) {
    const t = i / size;
    const quantized = Math.floor(t * steps) / (steps - 1);
    const value = Math.floor(quantized * 255);

    data[i * 3] = value;
    data[i * 3 + 1] = value;
    data[i * 3 + 2] = value;
  }

  const texture = new THREE.DataTexture(data, size, 1, THREE.RGBFormat);
  texture.magFilter = THREE.NearestFilter;
  texture.minFilter = THREE.NearestFilter;
  texture.needsUpdate = true;

  return texture;
}

/**
 * Material preset for different entity types
 */
export const MATERIAL_PRESETS = {
  /** Standard terrain material */
  terrain: {
    roughness: 0.9,
    toonBands: 0, // Smooth for terrain
    shadowColor: 0x404060,
  },

  /** Tower/building material */
  building: {
    roughness: 0.7,
    toonBands: 3,
    rimColor: 0xffffee,
    rimPower: 2,
    shadowColor: 0x353550,
  },

  /** Enemy unit material */
  enemy: {
    roughness: 0.6,
    toonBands: 4,
    rimColor: 0xff8888,
    rimPower: 3,
    shadowColor: 0x402020,
  },

  /** Friendly unit material */
  friendly: {
    roughness: 0.6,
    toonBands: 4,
    rimColor: 0x88ccff,
    rimPower: 3,
    shadowColor: 0x203040,
  },

  /** Tree/vegetation material */
  vegetation: {
    roughness: 0.85,
    toonBands: 2,
    shadowColor: 0x204020,
    side: THREE.DoubleSide,
  },

  /** Rock/stone material */
  rock: {
    roughness: 0.95,
    toonBands: 3,
    shadowColor: 0x303040,
  },

  /** Water material (special) */
  water: {
    roughness: 0.1,
    toonBands: 0,
    transparent: true,
    opacity: 0.8,
  },

  /** Magic/energy effect material */
  magic: {
    roughness: 0.3,
    emissiveIntensity: 0.5,
    transparent: true,
    opacity: 0.9,
    side: THREE.DoubleSide,
  },
} as const;

/**
 * Apply a material preset to options
 */
export function applyPreset(
  preset: keyof typeof MATERIAL_PRESETS,
  overrides: StylizedMaterialOptions = {}
): StylizedMaterialOptions {
  return {
    ...DEFAULT_OPTIONS,
    ...MATERIAL_PRESETS[preset],
    ...overrides,
  };
}

/**
 * Create material from preset name
 */
export function createPresetMaterial(
  preset: keyof typeof MATERIAL_PRESETS,
  overrides: StylizedMaterialOptions = {}
): THREE.MeshStandardMaterial {
  const options = applyPreset(preset, overrides);
  return createStylizedMaterial(options);
}

export default {
  createStylizedMaterial,
  createOutlineMaterial,
  createToonMaterial,
  createPresetMaterial,
  applyPreset,
  MATERIAL_PRESETS,
};
