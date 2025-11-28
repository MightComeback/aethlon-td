/**
 * GLTF/GLB Model Loader Service
 *
 * Handles loading, caching, and instancing of 3D models.
 * Supports animations and provides optimized cloning for many instances.
 */

import * as THREE from 'three';
import { GLTFLoader, GLTF } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';
import { KTX2Loader } from 'three/addons/loaders/KTX2Loader.js';

export interface LoadedModel {
  /** Original GLTF data */
  gltf: GLTF;
  /** The main scene/group from the model */
  scene: THREE.Group;
  /** All animations from the model */
  animations: THREE.AnimationClip[];
  /** Bounding box of the model */
  boundingBox: THREE.Box3;
  /** Model dimensions */
  dimensions: THREE.Vector3;
}

export interface ModelInstance {
  /** Cloned scene for this instance */
  object: THREE.Object3D;
  /** Animation mixer for this instance */
  mixer?: THREE.AnimationMixer;
  /** Available animation actions */
  actions: Map<string, THREE.AnimationAction>;
  /** Dispose this instance */
  dispose: () => void;
}

export interface ModelLoadOptions {
  /** Whether to enable Draco compression */
  useDraco?: boolean;
  /** Whether to enable KTX2 textures */
  useKTX2?: boolean;
  /** Apply shadow settings to meshes */
  castShadow?: boolean;
  receiveShadow?: boolean;
  /** Scale to apply to loaded model */
  scale?: number;
  /** Center the model on origin */
  center?: boolean;
}

const DEFAULT_OPTIONS: ModelLoadOptions = {
  useDraco: true,
  useKTX2: true,
  castShadow: true,
  receiveShadow: false,
  scale: 1,
  center: true,
};

class ModelLoaderService {
  private loader: GLTFLoader;
  private dracoLoader: DRACOLoader | null = null;
  private ktx2Loader: KTX2Loader | null = null;
  private cache: Map<string, LoadedModel> = new Map();
  private loadingPromises: Map<string, Promise<LoadedModel>> = new Map();

  constructor() {
    this.loader = new GLTFLoader();
  }

  /**
   * Initialize with a renderer (needed for KTX2)
   */
  init(renderer: THREE.WebGLRenderer): void {

    // Setup Draco decoder
    this.dracoLoader = new DRACOLoader();
    this.dracoLoader.setDecoderPath('/draco/');
    this.loader.setDRACOLoader(this.dracoLoader);

    // Setup KTX2 decoder (requires renderer for WebGL context)
    this.ktx2Loader = new KTX2Loader();
    this.ktx2Loader.setTranscoderPath('/basis/');
    this.ktx2Loader.detectSupport(renderer);
    this.loader.setKTX2Loader(this.ktx2Loader);
  }

  /**
   * Load a model from path
   */
  async load(
    path: string,
    options: ModelLoadOptions = {}
  ): Promise<LoadedModel> {
    const opts = { ...DEFAULT_OPTIONS, ...options };
    const cacheKey = `${path}:${JSON.stringify(opts)}`;

    // Return cached model
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)!;
    }

    // Return existing loading promise
    if (this.loadingPromises.has(cacheKey)) {
      return this.loadingPromises.get(cacheKey)!;
    }

    // Start loading
    const loadPromise = this.doLoad(path, opts, cacheKey);
    this.loadingPromises.set(cacheKey, loadPromise);

    try {
      const model = await loadPromise;
      return model;
    } finally {
      this.loadingPromises.delete(cacheKey);
    }
  }

  private async doLoad(
    path: string,
    options: ModelLoadOptions,
    cacheKey: string
  ): Promise<LoadedModel> {
    return new Promise((resolve, reject) => {
      this.loader.load(
        path,
        (gltf) => {
          const model = this.processGLTF(gltf, options);
          this.cache.set(cacheKey, model);
          resolve(model);
        },
        undefined,
        (error) => {
          console.error(`Failed to load model: ${path}`, error);
          reject(new Error(`Failed to load model: ${path}`));
        }
      );
    });
  }

  private processGLTF(gltf: GLTF, options: ModelLoadOptions): LoadedModel {
    const scene = gltf.scene;

    // Apply scale
    if (options.scale && options.scale !== 1) {
      scene.scale.setScalar(options.scale);
    }

    // Calculate bounding box
    const boundingBox = new THREE.Box3().setFromObject(scene);
    const dimensions = new THREE.Vector3();
    boundingBox.getSize(dimensions);

    // Center model
    if (options.center) {
      const center = new THREE.Vector3();
      boundingBox.getCenter(center);
      scene.position.sub(center);
      // Recalculate after centering
      boundingBox.setFromObject(scene);
    }

    // Apply shadow settings to all meshes
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = options.castShadow ?? true;
        child.receiveShadow = options.receiveShadow ?? false;

        // Ensure materials are set up for shadows
        if (child.material) {
          const materials = Array.isArray(child.material)
            ? child.material
            : [child.material];

          materials.forEach((mat) => {
            // Enable shadow receiving
            if (mat instanceof THREE.MeshStandardMaterial) {
              mat.needsUpdate = true;
            }
          });
        }
      }
    });

    return {
      gltf,
      scene,
      animations: gltf.animations,
      boundingBox,
      dimensions,
    };
  }

  /**
   * Create an instance of a loaded model
   */
  createInstance(model: LoadedModel, withAnimations = true): ModelInstance {
    // Clone the scene
    const object = model.scene.clone(true);

    // Setup animation mixer if model has animations
    let mixer: THREE.AnimationMixer | undefined;
    const actions = new Map<string, THREE.AnimationAction>();

    if (withAnimations && model.animations.length > 0) {
      mixer = new THREE.AnimationMixer(object);

      for (const clip of model.animations) {
        const action = mixer.clipAction(clip);
        actions.set(clip.name, action);
      }
    }

    // Dispose function
    const dispose = () => {
      mixer?.stopAllAction();
      object.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.geometry?.dispose();
          if (Array.isArray(child.material)) {
            child.material.forEach((m) => m.dispose());
          } else {
            child.material?.dispose();
          }
        }
      });
    };

    return {
      object,
      mixer,
      actions,
      dispose,
    };
  }

  /**
   * Preload multiple models
   */
  async preload(
    paths: string[],
    options?: ModelLoadOptions,
    onProgress?: (loaded: number, total: number) => void
  ): Promise<Map<string, LoadedModel>> {
    const results = new Map<string, LoadedModel>();
    const total = paths.length;

    for (let i = 0; i < paths.length; i++) {
      const path = paths[i];
      if (!path) continue;

      try {
        const model = await this.load(path, options);
        results.set(path, model);
      } catch (error) {
        console.warn(`Failed to preload: ${path}`);
      }

      onProgress?.(i + 1, total);
    }

    return results;
  }

  /**
   * Get cached model
   */
  getCached(path: string): LoadedModel | undefined {
    for (const [key, model] of this.cache) {
      if (key.startsWith(path)) {
        return model;
      }
    }
    return undefined;
  }

  /**
   * Clear a specific model from cache
   */
  clearCached(path: string): void {
    for (const [key] of this.cache) {
      if (key.startsWith(path)) {
        this.cache.delete(key);
        break;
      }
    }
  }

  /**
   * Clear all cached models
   */
  clearAll(): void {
    this.cache.clear();
  }

  /**
   * Dispose the loader and all resources
   */
  dispose(): void {
    this.cache.clear();
    this.loadingPromises.clear();
    this.dracoLoader?.dispose();
    this.ktx2Loader?.dispose();
  }

  /**
   * Get cache statistics
   */
  getCacheStats(): { count: number; models: string[] } {
    return {
      count: this.cache.size,
      models: Array.from(this.cache.keys()),
    };
  }
}

// Singleton instance
export const modelLoader = new ModelLoaderService();

export default ModelLoaderService;
