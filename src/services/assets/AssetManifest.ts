import { AssetManifest, AssetDefinition } from './AssetLoader';

/**
 * Central manifest of all game assets
 *
 * This file defines what assets exist and where to find them.
 * Uses 3D models (.glb) for entities with proper shadows and stylized materials.
 * Textures used for terrain tiles and UI elements.
 */
export const gameAssetManifest: AssetManifest = {
  version: '2.0.0',
  categories: {
    terrain: {
      basePath: '/assets/terrain',
      assets: {
        // Terrain tile textures (used for texture atlases on tile meshes)
        terrain_atlas: {
          type: 'atlas',
          path: '/assets/terrain/terrain_atlas.png',
        },
        grass_diffuse: {
          type: 'texture',
          path: '/assets/terrain/grass/grass_diffuse.png',
        },
        grass_normal: {
          type: 'texture',
          path: '/assets/terrain/grass/grass_normal.png',
        },
        dirt_diffuse: {
          type: 'texture',
          path: '/assets/terrain/dirt/dirt_diffuse.png',
        },
        path_diffuse: {
          type: 'texture',
          path: '/assets/terrain/path/path_diffuse.png',
        },
        water_diffuse: {
          type: 'texture',
          path: '/assets/terrain/water/water_diffuse.png',
        },
        water_normal: {
          type: 'texture',
          path: '/assets/terrain/water/water_normal.png',
        },
      },
    },

    towers: {
      basePath: '/assets/models/towers',
      assets: {
        // Fire element towers - stylized low-poly 3D models
        fire_tower_tier1: {
          type: 'model',
          path: '/assets/models/towers/fire/fire_tower_tier1.glb',
          scale: 1.0,
          modelAnimations: ['idle', 'attack', 'build'],
          materialPreset: 'building',
        },
        fire_tower_tier2: {
          type: 'model',
          path: '/assets/models/towers/fire/fire_tower_tier2.glb',
          scale: 1.0,
          modelAnimations: ['idle', 'attack', 'build'],
          materialPreset: 'building',
        },
        fire_tower_tier3: {
          type: 'model',
          path: '/assets/models/towers/fire/fire_tower_tier3.glb',
          scale: 1.0,
          modelAnimations: ['idle', 'attack', 'build', 'special'],
          materialPreset: 'building',
        },

        // Water element towers
        water_tower_tier1: {
          type: 'model',
          path: '/assets/models/towers/water/water_tower_tier1.glb',
          scale: 1.0,
          modelAnimations: ['idle', 'attack', 'build'],
          materialPreset: 'building',
        },
        water_tower_tier2: {
          type: 'model',
          path: '/assets/models/towers/water/water_tower_tier2.glb',
          scale: 1.0,
          modelAnimations: ['idle', 'attack', 'build'],
          materialPreset: 'building',
        },
        water_tower_tier3: {
          type: 'model',
          path: '/assets/models/towers/water/water_tower_tier3.glb',
          scale: 1.0,
          modelAnimations: ['idle', 'attack', 'build', 'special'],
          materialPreset: 'building',
        },

        // Earth element towers
        earth_tower_tier1: {
          type: 'model',
          path: '/assets/models/towers/earth/earth_tower_tier1.glb',
          scale: 1.0,
          modelAnimations: ['idle', 'attack', 'build'],
          materialPreset: 'building',
        },
        earth_tower_tier2: {
          type: 'model',
          path: '/assets/models/towers/earth/earth_tower_tier2.glb',
          scale: 1.0,
          modelAnimations: ['idle', 'attack', 'build'],
          materialPreset: 'building',
        },
        earth_tower_tier3: {
          type: 'model',
          path: '/assets/models/towers/earth/earth_tower_tier3.glb',
          scale: 1.0,
          modelAnimations: ['idle', 'attack', 'build', 'special'],
          materialPreset: 'building',
        },

        // Air element towers
        air_tower_tier1: {
          type: 'model',
          path: '/assets/models/towers/air/air_tower_tier1.glb',
          scale: 1.0,
          modelAnimations: ['idle', 'attack', 'build'],
          materialPreset: 'building',
        },
        air_tower_tier2: {
          type: 'model',
          path: '/assets/models/towers/air/air_tower_tier2.glb',
          scale: 1.0,
          modelAnimations: ['idle', 'attack', 'build'],
          materialPreset: 'building',
        },
        air_tower_tier3: {
          type: 'model',
          path: '/assets/models/towers/air/air_tower_tier3.glb',
          scale: 1.0,
          modelAnimations: ['idle', 'attack', 'build', 'special'],
          materialPreset: 'building',
        },

        // Lightning element towers
        lightning_tower_tier1: {
          type: 'model',
          path: '/assets/models/towers/lightning/lightning_tower_tier1.glb',
          scale: 1.0,
          modelAnimations: ['idle', 'attack', 'build'],
          materialPreset: 'building',
        },
        lightning_tower_tier2: {
          type: 'model',
          path: '/assets/models/towers/lightning/lightning_tower_tier2.glb',
          scale: 1.0,
          modelAnimations: ['idle', 'attack', 'build'],
          materialPreset: 'building',
        },
        lightning_tower_tier3: {
          type: 'model',
          path: '/assets/models/towers/lightning/lightning_tower_tier3.glb',
          scale: 1.0,
          modelAnimations: ['idle', 'attack', 'build', 'special'],
          materialPreset: 'building',
        },

        // Merged element towers (Tier 2 elements)
        lava_tower: {
          type: 'model',
          path: '/assets/models/towers/merged/lava_tower.glb',
          scale: 1.0,
          modelAnimations: ['idle', 'attack', 'build', 'special'],
          materialPreset: 'building',
        },
        ice_tower: {
          type: 'model',
          path: '/assets/models/towers/merged/ice_tower.glb',
          scale: 1.0,
          modelAnimations: ['idle', 'attack', 'build', 'special'],
          materialPreset: 'building',
        },
        storm_tower: {
          type: 'model',
          path: '/assets/models/towers/merged/storm_tower.glb',
          scale: 1.0,
          modelAnimations: ['idle', 'attack', 'build', 'special'],
          materialPreset: 'building',
        },
        magma_tower: {
          type: 'model',
          path: '/assets/models/towers/merged/magma_tower.glb',
          scale: 1.0,
          modelAnimations: ['idle', 'attack', 'build', 'special'],
          materialPreset: 'building',
        },
        plasma_tower: {
          type: 'model',
          path: '/assets/models/towers/merged/plasma_tower.glb',
          scale: 1.0,
          modelAnimations: ['idle', 'attack', 'build', 'special'],
          materialPreset: 'building',
        },
      },
    },

    enemies: {
      basePath: '/assets/models/enemies',
      assets: {
        // Ground enemies - stylized low-poly 3D models
        goblin: {
          type: 'model',
          path: '/assets/models/enemies/ground/goblin.glb',
          scale: 0.8,
          modelAnimations: ['idle', 'walk', 'run', 'attack', 'hit', 'death'],
          materialPreset: 'enemy',
        },
        skeleton: {
          type: 'model',
          path: '/assets/models/enemies/ground/skeleton.glb',
          scale: 0.9,
          modelAnimations: ['idle', 'walk', 'run', 'attack', 'hit', 'death'],
          materialPreset: 'enemy',
        },
        orc: {
          type: 'model',
          path: '/assets/models/enemies/ground/orc.glb',
          scale: 1.2,
          modelAnimations: ['idle', 'walk', 'run', 'attack', 'hit', 'death'],
          materialPreset: 'enemy',
        },
        troll: {
          type: 'model',
          path: '/assets/models/enemies/ground/troll.glb',
          scale: 1.5,
          modelAnimations: ['idle', 'walk', 'attack', 'hit', 'death'],
          materialPreset: 'enemy',
        },
        knight: {
          type: 'model',
          path: '/assets/models/enemies/ground/knight.glb',
          scale: 1.0,
          modelAnimations: ['idle', 'walk', 'run', 'attack', 'block', 'hit', 'death'],
          materialPreset: 'enemy',
        },
        golem: {
          type: 'model',
          path: '/assets/models/enemies/ground/golem.glb',
          scale: 1.8,
          modelAnimations: ['idle', 'walk', 'attack', 'hit', 'death'],
          materialPreset: 'rock',
        },

        // Flying enemies
        bat: {
          type: 'model',
          path: '/assets/models/enemies/flying/bat.glb',
          scale: 0.5,
          modelAnimations: ['idle', 'fly', 'attack', 'hit', 'death'],
          materialPreset: 'enemy',
        },
        harpy: {
          type: 'model',
          path: '/assets/models/enemies/flying/harpy.glb',
          scale: 1.0,
          modelAnimations: ['idle', 'fly', 'dive', 'attack', 'hit', 'death'],
          materialPreset: 'enemy',
        },
        dragon: {
          type: 'model',
          path: '/assets/models/enemies/flying/dragon.glb',
          scale: 2.0,
          modelAnimations: ['idle', 'fly', 'dive', 'breath_attack', 'attack', 'hit', 'death'],
          materialPreset: 'enemy',
        },
        phoenix: {
          type: 'model',
          path: '/assets/models/enemies/flying/phoenix.glb',
          scale: 1.5,
          modelAnimations: ['idle', 'fly', 'attack', 'rebirth', 'death'],
          materialPreset: 'magic',
        },

        // Bosses
        demon_lord: {
          type: 'model',
          path: '/assets/models/enemies/bosses/demon_lord.glb',
          scale: 2.5,
          modelAnimations: ['idle', 'walk', 'attack', 'special_1', 'special_2', 'hit', 'death'],
          materialPreset: 'enemy',
        },
        frost_giant: {
          type: 'model',
          path: '/assets/models/enemies/bosses/frost_giant.glb',
          scale: 3.0,
          modelAnimations: ['idle', 'walk', 'attack', 'stomp', 'freeze_breath', 'hit', 'death'],
          materialPreset: 'enemy',
        },
        necromancer: {
          type: 'model',
          path: '/assets/models/enemies/bosses/necromancer.glb',
          scale: 1.2,
          modelAnimations: ['idle', 'walk', 'cast', 'summon', 'teleport', 'hit', 'death'],
          materialPreset: 'magic',
        },
      },
    },

    commander: {
      basePath: '/assets/models/commander',
      assets: {
        commander_default: {
          type: 'model',
          path: '/assets/models/commander/commander_default.glb',
          scale: 1.0,
          modelAnimations: ['idle', 'walk', 'run', 'cast', 'victory', 'defeat'],
          materialPreset: 'friendly',
        },
        commander_mage: {
          type: 'model',
          path: '/assets/models/commander/commander_mage.glb',
          scale: 1.0,
          modelAnimations: ['idle', 'walk', 'run', 'cast', 'channel', 'victory', 'defeat'],
          materialPreset: 'friendly',
        },
        commander_warrior: {
          type: 'model',
          path: '/assets/models/commander/commander_warrior.glb',
          scale: 1.0,
          modelAnimations: ['idle', 'walk', 'run', 'attack', 'block', 'victory', 'defeat'],
          materialPreset: 'friendly',
        },
      },
    },

    environment: {
      basePath: '/assets/models/environment',
      assets: {
        // Trees - stylized low-poly 3D
        pine_tree: {
          type: 'model',
          path: '/assets/models/environment/trees/pine.glb',
          scale: 1.0,
          modelAnimations: ['sway'],
          materialPreset: 'vegetation',
        },
        oak_tree: {
          type: 'model',
          path: '/assets/models/environment/trees/oak.glb',
          scale: 1.0,
          modelAnimations: ['sway'],
          materialPreset: 'vegetation',
        },
        dead_tree: {
          type: 'model',
          path: '/assets/models/environment/trees/dead.glb',
          scale: 1.0,
          materialPreset: 'vegetation',
        },
        bush: {
          type: 'model',
          path: '/assets/models/environment/vegetation/bush.glb',
          scale: 0.6,
          modelAnimations: ['sway'],
          materialPreset: 'vegetation',
        },

        // Rocks - stylized 3D
        rock_small: {
          type: 'model',
          path: '/assets/models/environment/rocks/rock_small.glb',
          scale: 0.5,
          materialPreset: 'rock',
        },
        rock_large: {
          type: 'model',
          path: '/assets/models/environment/rocks/rock_large.glb',
          scale: 1.0,
          materialPreset: 'rock',
        },
        rock_cliff: {
          type: 'model',
          path: '/assets/models/environment/rocks/rock_cliff.glb',
          scale: 1.5,
          materialPreset: 'rock',
        },
        boulder: {
          type: 'model',
          path: '/assets/models/environment/rocks/boulder.glb',
          scale: 0.8,
          materialPreset: 'rock',
        },

        // Props
        fence: {
          type: 'model',
          path: '/assets/models/environment/props/fence.glb',
          scale: 1.0,
          materialPreset: 'building',
        },
        well: {
          type: 'model',
          path: '/assets/models/environment/props/well.glb',
          scale: 1.0,
          materialPreset: 'building',
        },
        cart: {
          type: 'model',
          path: '/assets/models/environment/props/cart.glb',
          scale: 1.0,
          materialPreset: 'building',
        },
        crate: {
          type: 'model',
          path: '/assets/models/environment/props/crate.glb',
          scale: 0.5,
          materialPreset: 'building',
        },
        barrel: {
          type: 'model',
          path: '/assets/models/environment/props/barrel.glb',
          scale: 0.5,
          materialPreset: 'building',
        },
        sign_post: {
          type: 'model',
          path: '/assets/models/environment/props/sign_post.glb',
          scale: 1.0,
          materialPreset: 'building',
        },
      },
    },

    effects: {
      basePath: '/assets/effects',
      assets: {
        // Particle textures for compute shader particle system
        particle_fire: {
          type: 'texture',
          path: '/assets/effects/particles/fire.png',
        },
        particle_smoke: {
          type: 'texture',
          path: '/assets/effects/particles/smoke.png',
        },
        particle_spark: {
          type: 'texture',
          path: '/assets/effects/particles/spark.png',
        },
        particle_magic: {
          type: 'texture',
          path: '/assets/effects/particles/magic.png',
        },
        particle_water: {
          type: 'texture',
          path: '/assets/effects/particles/water.png',
        },
        particle_ice: {
          type: 'texture',
          path: '/assets/effects/particles/ice.png',
        },
        particle_lightning: {
          type: 'texture',
          path: '/assets/effects/particles/lightning.png',
        },
        particle_dust: {
          type: 'texture',
          path: '/assets/effects/particles/dust.png',
        },

        // Projectile models
        arrow: {
          type: 'model',
          path: '/assets/models/effects/projectiles/arrow.glb',
          scale: 0.5,
          materialPreset: 'building',
        },
        magic_bolt: {
          type: 'model',
          path: '/assets/models/effects/projectiles/magic_bolt.glb',
          scale: 0.3,
          materialPreset: 'magic',
        },
        ice_shard: {
          type: 'model',
          path: '/assets/models/effects/projectiles/ice_shard.glb',
          scale: 0.4,
          materialPreset: 'magic',
        },
        rock_projectile: {
          type: 'model',
          path: '/assets/models/effects/projectiles/rock.glb',
          scale: 0.3,
          materialPreset: 'rock',
        },

        // Impact/explosion textures for particle bursts
        impact_fire: {
          type: 'texture',
          path: '/assets/effects/impacts/fire_impact.png',
        },
        impact_ice: {
          type: 'texture',
          path: '/assets/effects/impacts/ice_impact.png',
        },
        impact_lightning: {
          type: 'texture',
          path: '/assets/effects/impacts/lightning_impact.png',
        },
        impact_generic: {
          type: 'texture',
          path: '/assets/effects/impacts/generic_impact.png',
        },
      },
    },

    ui: {
      basePath: '/assets/ui',
      assets: {
        // Frames (9-slice) - remain as textures for UI
        panel_wood: {
          type: 'texture',
          path: '/assets/ui/frames/panel_wood.png',
        },
        panel_gold: {
          type: 'texture',
          path: '/assets/ui/frames/panel_gold.png',
        },
        panel_stone: {
          type: 'texture',
          path: '/assets/ui/frames/panel_stone.png',
        },

        // Buttons
        button_wood: {
          type: 'texture',
          path: '/assets/ui/frames/button_wood.png',
        },
        button_gold: {
          type: 'texture',
          path: '/assets/ui/frames/button_gold.png',
        },
        button_hover: {
          type: 'texture',
          path: '/assets/ui/frames/button_hover.png',
        },

        // Icons atlas
        icons_elements: {
          type: 'atlas',
          path: '/assets/ui/icons/elements.png',
        },
        icons_resources: {
          type: 'atlas',
          path: '/assets/ui/icons/resources.png',
        },
        icons_abilities: {
          type: 'atlas',
          path: '/assets/ui/icons/abilities.png',
        },
        icons_status: {
          type: 'atlas',
          path: '/assets/ui/icons/status.png',
        },

        // Portraits
        commander_portrait: {
          type: 'texture',
          path: '/assets/ui/portraits/commander_portrait.png',
        },

        // Health/resource bars
        bar_health: {
          type: 'texture',
          path: '/assets/ui/bars/health_bar.png',
        },
        bar_mana: {
          type: 'texture',
          path: '/assets/ui/bars/mana_bar.png',
        },
        bar_cooldown: {
          type: 'texture',
          path: '/assets/ui/bars/cooldown_bar.png',
        },
      },
    },

    skybox: {
      basePath: '/assets/skybox',
      assets: {
        // Skybox textures for different weather/times
        sky_sunny: {
          type: 'texture',
          path: '/assets/skybox/sunny.png',
        },
        sky_cloudy: {
          type: 'texture',
          path: '/assets/skybox/cloudy.png',
        },
        sky_storm: {
          type: 'texture',
          path: '/assets/skybox/storm.png',
        },
        sky_night: {
          type: 'texture',
          path: '/assets/skybox/night.png',
        },
      },
    },
  },
};

/**
 * Get asset definition by category and name
 */
export function getAssetDefinition(
  category: string,
  name: string
): AssetDefinition | undefined {
  const cat = gameAssetManifest.categories[category];
  if (!cat) return undefined;
  return cat.assets[name];
}

/**
 * Get full path for an asset
 */
export function getAssetPath(category: string, name: string): string | undefined {
  const asset = getAssetDefinition(category, name);
  return asset?.path;
}

/**
 * Get all assets in a category
 */
export function getAssetsInCategory(
  category: string
): Record<string, AssetDefinition> {
  return gameAssetManifest.categories[category]?.assets ?? {};
}

/**
 * Get all category names
 */
export function getAssetCategories(): string[] {
  return Object.keys(gameAssetManifest.categories);
}

/**
 * Get all model assets (for preloading)
 */
export function getAllModelAssets(): Array<{ name: string; path: string; category: string }> {
  const models: Array<{ name: string; path: string; category: string }> = [];

  for (const [category, data] of Object.entries(gameAssetManifest.categories)) {
    for (const [name, asset] of Object.entries(data.assets)) {
      if (asset.type === 'model') {
        models.push({ name, path: asset.path, category });
      }
    }
  }

  return models;
}

/**
 * Get model asset definition with type narrowing
 */
export function getModelAsset(
  category: string,
  name: string
): (AssetDefinition & { type: 'model' }) | undefined {
  const asset = getAssetDefinition(category, name);
  if (asset?.type === 'model') {
    return asset as AssetDefinition & { type: 'model' };
  }
  return undefined;
}

export default gameAssetManifest;
