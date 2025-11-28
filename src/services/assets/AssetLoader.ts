import * as THREE from 'three';

export interface LoadProgress {
  loaded: number;
  total: number;
  currentAsset: string;
  percentage: number;
}

export interface TextureOptions {
  /** Use nearest neighbor filtering for pixel art */
  pixelArt?: boolean;
  /** Generate mipmaps */
  mipmaps?: boolean;
  /** Wrap mode */
  wrapS?: THREE.Wrapping;
  wrapT?: THREE.Wrapping;
  /** Flip Y axis */
  flipY?: boolean;
}

const DEFAULT_TEXTURE_OPTIONS: TextureOptions = {
  pixelArt: true,
  mipmaps: false,
  wrapS: THREE.ClampToEdgeWrapping,
  wrapT: THREE.ClampToEdgeWrapping,
  flipY: true,
};

type ProgressCallback = (progress: LoadProgress) => void;

class AssetLoaderService {
  private textureCache: Map<string, THREE.Texture> = new Map();
  private loadingPromises: Map<string, Promise<THREE.Texture>> = new Map();
  private textureLoader: THREE.TextureLoader;

  constructor() {
    this.textureLoader = new THREE.TextureLoader();
  }

  /**
   * Load a single texture with caching
   */
  async loadTexture(
    path: string,
    options: TextureOptions = {}
  ): Promise<THREE.Texture> {
    const opts = { ...DEFAULT_TEXTURE_OPTIONS, ...options };
    const cacheKey = this.getCacheKey(path, opts);

    // Return cached texture
    if (this.textureCache.has(cacheKey)) {
      return this.textureCache.get(cacheKey)!;
    }

    // Return existing loading promise to avoid duplicate loads
    if (this.loadingPromises.has(cacheKey)) {
      return this.loadingPromises.get(cacheKey)!;
    }

    // Start new load
    const loadPromise = this.doLoadTexture(path, opts, cacheKey);
    this.loadingPromises.set(cacheKey, loadPromise);

    try {
      const texture = await loadPromise;
      return texture;
    } finally {
      this.loadingPromises.delete(cacheKey);
    }
  }

  private async doLoadTexture(
    path: string,
    options: TextureOptions,
    cacheKey: string
  ): Promise<THREE.Texture> {
    return new Promise((resolve, reject) => {
      this.textureLoader.load(
        path,
        (texture) => {
          this.applyTextureOptions(texture, options);
          this.textureCache.set(cacheKey, texture);
          resolve(texture);
        },
        undefined,
        (error) => {
          console.error(`Failed to load texture: ${path}`, error);
          reject(new Error(`Failed to load texture: ${path}`));
        }
      );
    });
  }

  private applyTextureOptions(
    texture: THREE.Texture,
    options: TextureOptions
  ): void {
    if (options.pixelArt) {
      texture.magFilter = THREE.NearestFilter;
      texture.minFilter = options.mipmaps
        ? THREE.NearestMipmapLinearFilter
        : THREE.NearestFilter;
    } else {
      texture.magFilter = THREE.LinearFilter;
      texture.minFilter = options.mipmaps
        ? THREE.LinearMipmapLinearFilter
        : THREE.LinearFilter;
    }

    texture.wrapS = options.wrapS ?? THREE.ClampToEdgeWrapping;
    texture.wrapT = options.wrapT ?? THREE.ClampToEdgeWrapping;
    texture.flipY = options.flipY ?? true;
    texture.generateMipmaps = options.mipmaps ?? false;
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.needsUpdate = true;
  }

  /**
   * Load multiple textures with progress callback
   */
  async loadTextures(
    paths: string[],
    options: TextureOptions = {},
    onProgress?: ProgressCallback
  ): Promise<Map<string, THREE.Texture>> {
    const results = new Map<string, THREE.Texture>();
    const total = paths.length;

    for (let i = 0; i < paths.length; i++) {
      const path = paths[i];
      if (!path) continue;

      if (onProgress) {
        onProgress({
          loaded: i,
          total,
          currentAsset: path,
          percentage: (i / total) * 100,
        });
      }

      try {
        const texture = await this.loadTexture(path, options);
        results.set(path, texture);
      } catch (error) {
        console.warn(`Skipping failed texture: ${path}`);
      }
    }

    if (onProgress) {
      onProgress({
        loaded: total,
        total,
        currentAsset: '',
        percentage: 100,
      });
    }

    return results;
  }

  /**
   * Load a sprite sheet and return frame UVs
   */
  async loadSpriteSheet(
    path: string,
    frameWidth: number,
    frameHeight: number,
    options: TextureOptions = {}
  ): Promise<{
    texture: THREE.Texture;
    frames: Array<{ u: number; v: number; w: number; h: number }>;
    columns: number;
    rows: number;
  }> {
    const texture = await this.loadTexture(path, options);
    const image = texture.image as HTMLImageElement;

    const columns = Math.floor(image.width / frameWidth);
    const rows = Math.floor(image.height / frameHeight);
    const frames: Array<{ u: number; v: number; w: number; h: number }> = [];

    const frameW = frameWidth / image.width;
    const frameH = frameHeight / image.height;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < columns; col++) {
        frames.push({
          u: col * frameW,
          v: 1 - (row + 1) * frameH, // Flip Y for WebGL
          w: frameW,
          h: frameH,
        });
      }
    }

    return { texture, frames, columns, rows };
  }

  /**
   * Preload assets from manifest
   */
  async preloadFromManifest(
    manifest: AssetManifest,
    onProgress?: ProgressCallback
  ): Promise<void> {
    const allPaths: string[] = [];

    // Collect all texture paths from manifest
    for (const category of Object.values(manifest.categories)) {
      for (const asset of Object.values(category.assets)) {
        if (asset.type === 'texture' || asset.type === 'spritesheet') {
          allPaths.push(asset.path);
        }
      }
    }

    await this.loadTextures(allPaths, {}, onProgress);
  }

  /**
   * Get a cached texture (returns undefined if not loaded)
   */
  getCachedTexture(path: string): THREE.Texture | undefined {
    // Try exact path first
    for (const [key, texture] of this.textureCache) {
      if (key.startsWith(path)) {
        return texture;
      }
    }
    return undefined;
  }

  /**
   * Create a placeholder texture for missing assets
   */
  createPlaceholder(
    width: number = 64,
    height: number = 64,
    color: string = '#ff00ff'
  ): THREE.Texture {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d')!;

    // Checkerboard pattern for visibility
    const tileSize = 8;
    for (let y = 0; y < height; y += tileSize) {
      for (let x = 0; x < width; x += tileSize) {
        const isEven = ((x + y) / tileSize) % 2 === 0;
        ctx.fillStyle = isEven ? color : '#000000';
        ctx.fillRect(x, y, tileSize, tileSize);
      }
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.magFilter = THREE.NearestFilter;
    texture.minFilter = THREE.NearestFilter;
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  }

  /**
   * Dispose a specific texture
   */
  disposeTexture(path: string): void {
    for (const [key, texture] of this.textureCache) {
      if (key.startsWith(path)) {
        texture.dispose();
        this.textureCache.delete(key);
        break;
      }
    }
  }

  /**
   * Dispose all cached textures
   */
  disposeAll(): void {
    for (const texture of this.textureCache.values()) {
      texture.dispose();
    }
    this.textureCache.clear();
    this.loadingPromises.clear();
  }

  /**
   * Get cache statistics
   */
  getCacheStats(): { count: number; keys: string[] } {
    return {
      count: this.textureCache.size,
      keys: Array.from(this.textureCache.keys()),
    };
  }

  private getCacheKey(path: string, options: TextureOptions): string {
    return `${path}:${JSON.stringify(options)}`;
  }
}

// Asset manifest types
export interface AssetDefinition {
  type: 'texture' | 'spritesheet' | 'atlas' | 'model';
  path: string;
  frameWidth?: number;
  frameHeight?: number;
  animations?: Record<string, { start: number; end: number; fps: number }>;
  /** For 3D models - scale to apply on load */
  scale?: number;
  /** For 3D models - available animations in the model file */
  modelAnimations?: string[];
  /** Material preset to apply (from StylizedMaterials) */
  materialPreset?: 'terrain' | 'building' | 'enemy' | 'friendly' | 'vegetation' | 'rock' | 'water' | 'magic';
}

export interface AssetCategory {
  basePath: string;
  assets: Record<string, AssetDefinition>;
}

export interface AssetManifest {
  version: string;
  categories: Record<string, AssetCategory>;
}

// Singleton instance
export const assetLoader = new AssetLoaderService();

export default AssetLoaderService;
