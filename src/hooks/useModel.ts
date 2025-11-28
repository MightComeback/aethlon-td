/**
 * Hook for loading and managing 3D models
 *
 * Uses the ModelLoader service for caching and provides
 * instance management with animations.
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import * as THREE from 'three';
import { modelLoader, LoadedModel, ModelInstance } from '@/services/assets/ModelLoader';
import { getModelAsset } from '@/services/assets/AssetManifest';
import {
  createPresetMaterial,
  MATERIAL_PRESETS,
  StylizedMaterialOptions,
} from '@/systems/rendering/StylizedMaterials';

export interface UseModelOptions {
  /** Category in asset manifest */
  category: string;
  /** Asset name in manifest */
  name: string;
  /** Whether to enable animations */
  withAnimations?: boolean;
  /** Override material options */
  materialOverrides?: StylizedMaterialOptions;
  /** Callback when model loads */
  onLoad?: (model: LoadedModel) => void;
  /** Callback on error */
  onError?: (error: Error) => void;
}

export interface UseModelResult {
  /** The 3D object to render */
  object: THREE.Object3D | null;
  /** Animation mixer if animations are enabled */
  mixer: THREE.AnimationMixer | null;
  /** Map of animation actions by name */
  actions: Map<string, THREE.AnimationAction>;
  /** Loading state */
  isLoading: boolean;
  /** Error if loading failed */
  error: Error | null;
  /** Play an animation */
  playAnimation: (name: string, options?: AnimationPlayOptions) => void;
  /** Stop all animations */
  stopAllAnimations: () => void;
  /** Model bounding box */
  boundingBox: THREE.Box3 | null;
  /** Model dimensions */
  dimensions: THREE.Vector3 | null;
}

export interface AnimationPlayOptions {
  /** Loop mode */
  loop?: THREE.AnimationActionLoopStyles;
  /** Blend duration for crossfade */
  blendDuration?: number;
  /** Time scale (speed) */
  timeScale?: number;
  /** Clamp when finished */
  clampWhenFinished?: boolean;
}

/**
 * Hook to load a 3D model from the asset manifest
 */
export function useModel(options: UseModelOptions): UseModelResult {
  const {
    category,
    name,
    withAnimations = true,
    materialOverrides,
    onLoad,
    onError,
  } = options;

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [instance, setInstance] = useState<ModelInstance | null>(null);
  const [loadedModel, setLoadedModel] = useState<LoadedModel | null>(null);

  const currentActionRef = useRef<THREE.AnimationAction | null>(null);

  // Load the model
  useEffect(() => {
    let mounted = true;
    let inst: ModelInstance | null = null;

    async function load() {
      try {
        const assetDef = getModelAsset(category, name);
        if (!assetDef) {
          throw new Error(`Model not found: ${category}/${name}`);
        }

        // Load the model
        const model = await modelLoader.load(assetDef.path, {
          scale: assetDef.scale,
          center: true,
          castShadow: true,
          receiveShadow: false,
        });

        if (!mounted) return;

        // Create an instance
        inst = modelLoader.createInstance(model, withAnimations);

        // Apply stylized materials
        const preset = assetDef.materialPreset || 'building';
        applyStylizedMaterials(inst.object, preset, materialOverrides);

        setLoadedModel(model);
        setInstance(inst);
        setIsLoading(false);
        onLoad?.(model);
      } catch (err) {
        if (!mounted) return;
        const error = err instanceof Error ? err : new Error(String(err));
        setError(error);
        setIsLoading(false);
        onError?.(error);
      }
    }

    setIsLoading(true);
    setError(null);
    load();

    return () => {
      mounted = false;
      inst?.dispose();
    };
  }, [category, name, withAnimations, materialOverrides, onLoad, onError]);

  // Play animation
  const playAnimation = useCallback(
    (animName: string, playOptions: AnimationPlayOptions = {}) => {
      if (!instance?.mixer || !instance.actions.has(animName)) return;

      const {
        loop = THREE.LoopRepeat,
        blendDuration = 0.3,
        timeScale = 1,
        clampWhenFinished = false,
      } = playOptions;

      const action = instance.actions.get(animName)!;

      // Crossfade from current animation
      if (currentActionRef.current && currentActionRef.current !== action) {
        currentActionRef.current.fadeOut(blendDuration);
      }

      action.reset();
      action.setLoop(loop, Infinity);
      action.timeScale = timeScale;
      action.clampWhenFinished = clampWhenFinished;
      action.fadeIn(blendDuration);
      action.play();

      currentActionRef.current = action;
    },
    [instance]
  );

  // Stop all animations
  const stopAllAnimations = useCallback(() => {
    instance?.mixer?.stopAllAction();
    currentActionRef.current = null;
  }, [instance]);

  return {
    object: instance?.object ?? null,
    mixer: instance?.mixer ?? null,
    actions: instance?.actions ?? new Map(),
    isLoading,
    error,
    playAnimation,
    stopAllAnimations,
    boundingBox: loadedModel?.boundingBox ?? null,
    dimensions: loadedModel?.dimensions ?? null,
  };
}

/**
 * Apply stylized materials to a model
 */
function applyStylizedMaterials(
  object: THREE.Object3D,
  preset: keyof typeof MATERIAL_PRESETS,
  overrides?: StylizedMaterialOptions
): void {
  object.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      // Preserve original texture if available
      const originalMaterial = child.material as THREE.MeshStandardMaterial;
      const map = originalMaterial?.map ?? null;
      const normalMap = originalMaterial?.normalMap ?? null;

      // Create new stylized material
      const newMaterial = createPresetMaterial(preset, {
        map,
        normalMap,
        ...overrides,
      });

      // Dispose old material
      originalMaterial?.dispose();

      child.material = newMaterial;
    }
  });
}

/**
 * Hook for updating animation mixer each frame
 */
export function useAnimationUpdate(
  mixer: THREE.AnimationMixer | null,
  deltaOverride?: number
): void {
  const lastTimeRef = useRef(performance.now());

  useEffect(() => {
    if (!mixer) return;

    let frameId: number;

    function update() {
      frameId = requestAnimationFrame(update);
      const now = performance.now();
      const delta = deltaOverride ?? (now - lastTimeRef.current) / 1000;
      lastTimeRef.current = now;
      mixer!.update(delta);
    }

    update();

    return () => cancelAnimationFrame(frameId);
  }, [mixer, deltaOverride]);
}

/**
 * Preload multiple models for a category
 */
export async function preloadModels(
  category: string,
  names: string[],
  onProgress?: (loaded: number, total: number) => void
): Promise<void> {
  const total = names.length;

  for (let i = 0; i < names.length; i++) {
    const name = names[i];
    const assetDef = getModelAsset(category, name!);

    if (assetDef) {
      try {
        await modelLoader.load(assetDef.path, { scale: assetDef.scale });
      } catch (err) {
        console.warn(`Failed to preload model: ${category}/${name}`);
      }
    }

    onProgress?.(i + 1, total);
  }
}

export default useModel;
