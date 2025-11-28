# 3D Model Specifications

This document details all 3D models needed for the game's graphics system. Models should be created in a **stylized/hand-painted low-poly style** similar to The Settlers Online or other browser strategy games.

## General Guidelines

### Style
- **Low-poly** stylized aesthetic (500-2000 triangles per model)
- **Hand-painted textures** with soft gradients, no harsh shadows baked in
- **Bright, saturated colors** with clear silhouettes
- Models should read well at isometric camera distance

### Technical Requirements
- **Format**: GLB (binary GLTF) preferred for smaller file size
- **Scale**: 1 unit = 1 game tile (approximately 1 meter)
- **Origin**: Center-bottom of model (feet for characters, base for buildings)
- **Orientation**: Forward = -Z axis (Three.js convention)
- **Textures**: Embedded in GLB, 512x512 or 1024x1024 max
- **Animations**: Embedded in GLB with named clips

### Material Setup
- Use PBR materials (the game applies stylized shading at runtime)
- Roughness: 0.6-0.9 (non-metallic look)
- Metalness: 0.0-0.1 (minimal metallic)
- Emissive: Use for glowing elements (crystals, magic effects)

---

## Tower Models

All towers should be ~1.5-2.5 units tall with a clear base that fits on a single tile.

### Fire Element Towers
| Model | Path | Scale | Animations | Description |
|-------|------|-------|------------|-------------|
| `fire_tower_tier1` | `/assets/models/towers/fire/fire_tower_tier1.glb` | 1.0 | idle, attack, build | Basic brazier/torch tower |
| `fire_tower_tier2` | `/assets/models/towers/fire/fire_tower_tier2.glb` | 1.0 | idle, attack, build | Larger flame pedestal |
| `fire_tower_tier3` | `/assets/models/towers/fire/fire_tower_tier3.glb` | 1.0 | idle, attack, build, special | Volcanic spire with lava |

### Water Element Towers
| Model | Path | Scale | Animations | Description |
|-------|------|-------|------------|-------------|
| `water_tower_tier1` | `/assets/models/towers/water/water_tower_tier1.glb` | 1.0 | idle, attack, build | Fountain/water basin |
| `water_tower_tier2` | `/assets/models/towers/water/water_tower_tier2.glb` | 1.0 | idle, attack, build | Coral spire |
| `water_tower_tier3` | `/assets/models/towers/water/water_tower_tier3.glb` | 1.0 | idle, attack, build, special | Tidal wave monument |

### Earth Element Towers
| Model | Path | Scale | Animations | Description |
|-------|------|-------|------------|-------------|
| `earth_tower_tier1` | `/assets/models/towers/earth/earth_tower_tier1.glb` | 1.0 | idle, attack, build | Stone pillar |
| `earth_tower_tier2` | `/assets/models/towers/earth/earth_tower_tier2.glb` | 1.0 | idle, attack, build | Boulder catapult |
| `earth_tower_tier3` | `/assets/models/towers/earth/earth_tower_tier3.glb` | 1.0 | idle, attack, build, special | Mountain fortress |

### Air Element Towers
| Model | Path | Scale | Animations | Description |
|-------|------|-------|------------|-------------|
| `air_tower_tier1` | `/assets/models/towers/air/air_tower_tier1.glb` | 1.0 | idle, attack, build | Wind vane tower |
| `air_tower_tier2` | `/assets/models/towers/air/air_tower_tier2.glb` | 1.0 | idle, attack, build | Tornado spire |
| `air_tower_tier3` | `/assets/models/towers/air/air_tower_tier3.glb` | 1.0 | idle, attack, build, special | Storm citadel |

### Lightning Element Towers
| Model | Path | Scale | Animations | Description |
|-------|------|-------|------------|-------------|
| `lightning_tower_tier1` | `/assets/models/towers/lightning/lightning_tower_tier1.glb` | 1.0 | idle, attack, build | Tesla coil |
| `lightning_tower_tier2` | `/assets/models/towers/lightning/lightning_tower_tier2.glb` | 1.0 | idle, attack, build | Lightning rod array |
| `lightning_tower_tier3` | `/assets/models/towers/lightning/lightning_tower_tier3.glb` | 1.0 | idle, attack, build, special | Storm conductor |

### Merged Element Towers (Tier 2 Elements)
| Model | Path | Scale | Animations | Description |
|-------|------|-------|------------|-------------|
| `lava_tower` | `/assets/models/towers/merged/lava_tower.glb` | 1.0 | idle, attack, build, special | Fire+Earth: Molten rock tower |
| `ice_tower` | `/assets/models/towers/merged/ice_tower.glb` | 1.0 | idle, attack, build, special | Water+Earth: Frozen crystal spire |
| `storm_tower` | `/assets/models/towers/merged/storm_tower.glb` | 1.0 | idle, attack, build, special | Air+Lightning: Thundercloud obelisk |
| `magma_tower` | `/assets/models/towers/merged/magma_tower.glb` | 1.0 | idle, attack, build, special | Earth+Lightning: Charged stone |
| `plasma_tower` | `/assets/models/towers/merged/plasma_tower.glb` | 1.0 | idle, attack, build, special | Fire+Air: Energy vortex |

### Tower Animation Specifications
- **idle**: Subtle ambient motion (floating particles, flickering flames, rotating elements) - looping
- **attack**: Projectile launch or beam activation - 0.5-1s duration
- **build**: Construction/materialization effect - 1-2s duration
- **special**: Ultimate ability activation - 1-2s duration

---

## Enemy Models

Enemies should have clear silhouettes and be easily distinguishable at game scale.

### Ground Enemies
| Model | Path | Scale | Animations | Description |
|-------|------|-------|------------|-------------|
| `goblin` | `/assets/models/enemies/ground/goblin.glb` | 0.8 | idle, walk, run, attack, hit, death | Small green humanoid |
| `skeleton` | `/assets/models/enemies/ground/skeleton.glb` | 0.9 | idle, walk, run, attack, hit, death | Undead warrior |
| `orc` | `/assets/models/enemies/ground/orc.glb` | 1.2 | idle, walk, run, attack, hit, death | Large green brute |
| `troll` | `/assets/models/enemies/ground/troll.glb` | 1.5 | idle, walk, attack, hit, death | Massive regenerating creature |
| `knight` | `/assets/models/enemies/ground/knight.glb` | 1.0 | idle, walk, run, attack, block, hit, death | Armored warrior |
| `golem` | `/assets/models/enemies/ground/golem.glb` | 1.8 | idle, walk, attack, hit, death | Stone construct |

### Flying Enemies
| Model | Path | Scale | Animations | Description |
|-------|------|-------|------------|-------------|
| `bat` | `/assets/models/enemies/flying/bat.glb` | 0.5 | idle, fly, attack, hit, death | Small flying mammal |
| `harpy` | `/assets/models/enemies/flying/harpy.glb` | 1.0 | idle, fly, dive, attack, hit, death | Bird-woman hybrid |
| `dragon` | `/assets/models/enemies/flying/dragon.glb` | 2.0 | idle, fly, dive, breath_attack, attack, hit, death | Classic dragon |
| `phoenix` | `/assets/models/enemies/flying/phoenix.glb` | 1.5 | idle, fly, attack, rebirth, death | Fire bird |

### Boss Enemies
| Model | Path | Scale | Animations | Description |
|-------|------|-------|------------|-------------|
| `demon_lord` | `/assets/models/enemies/bosses/demon_lord.glb` | 2.5 | idle, walk, attack, special_1, special_2, hit, death | Horned demon commander |
| `frost_giant` | `/assets/models/enemies/bosses/frost_giant.glb` | 3.0 | idle, walk, attack, stomp, freeze_breath, hit, death | Massive ice creature |
| `necromancer` | `/assets/models/enemies/bosses/necromancer.glb` | 1.2 | idle, walk, cast, summon, teleport, hit, death | Dark mage |

### Enemy Animation Specifications
- **idle**: Breathing/ambient motion - looping
- **walk**: Standard movement cycle - looping, ~1 second per cycle
- **run**: Fast movement cycle - looping, ~0.5 seconds per cycle
- **fly**: Wing flapping cycle - looping
- **attack**: Melee or ranged attack - 0.5-1s
- **hit**: Flinch/damage reaction - 0.2-0.3s
- **death**: Death and collapse - 1-2s, NOT looping

---

## Commander Models

Player-controlled hero units.

| Model | Path | Scale | Animations | Description |
|-------|------|-------|------------|-------------|
| `commander_default` | `/assets/models/commander/commander_default.glb` | 1.0 | idle, walk, run, cast, victory, defeat | Basic commander |
| `commander_mage` | `/assets/models/commander/commander_mage.glb` | 1.0 | idle, walk, run, cast, channel, victory, defeat | Magic-focused commander |
| `commander_warrior` | `/assets/models/commander/commander_warrior.glb` | 1.0 | idle, walk, run, attack, block, victory, defeat | Combat-focused commander |

---

## Environment Models

### Trees
| Model | Path | Scale | Animations | Description |
|-------|------|-------|------------|-------------|
| `pine_tree` | `/assets/models/environment/trees/pine.glb` | 1.0 | sway | Conifer tree |
| `oak_tree` | `/assets/models/environment/trees/oak.glb` | 1.0 | sway | Deciduous tree |
| `dead_tree` | `/assets/models/environment/trees/dead.glb` | 1.0 | - | Leafless dead tree |
| `bush` | `/assets/models/environment/vegetation/bush.glb` | 0.6 | sway | Small shrub |

### Rocks
| Model | Path | Scale | Animations | Description |
|-------|------|-------|------------|-------------|
| `rock_small` | `/assets/models/environment/rocks/rock_small.glb` | 0.5 | - | Small stone |
| `rock_large` | `/assets/models/environment/rocks/rock_large.glb` | 1.0 | - | Large boulder |
| `rock_cliff` | `/assets/models/environment/rocks/rock_cliff.glb` | 1.5 | - | Cliff face piece |
| `boulder` | `/assets/models/environment/rocks/boulder.glb` | 0.8 | - | Round boulder |

### Props
| Model | Path | Scale | Animations | Description |
|-------|------|-------|------------|-------------|
| `fence` | `/assets/models/environment/props/fence.glb` | 1.0 | - | Wooden fence segment |
| `well` | `/assets/models/environment/props/well.glb` | 1.0 | - | Stone well |
| `cart` | `/assets/models/environment/props/cart.glb` | 1.0 | - | Wooden cart |
| `crate` | `/assets/models/environment/props/crate.glb` | 0.5 | - | Wooden crate |
| `barrel` | `/assets/models/environment/props/barrel.glb` | 0.5 | - | Wooden barrel |
| `sign_post` | `/assets/models/environment/props/sign_post.glb` | 1.0 | - | Directional sign |

---

## Projectile Models

Small models for tower projectiles.

| Model | Path | Scale | Description |
|-------|------|-------|-------------|
| `arrow` | `/assets/models/effects/projectiles/arrow.glb` | 0.5 | Wooden arrow |
| `magic_bolt` | `/assets/models/effects/projectiles/magic_bolt.glb` | 0.3 | Glowing energy bolt |
| `ice_shard` | `/assets/models/effects/projectiles/ice_shard.glb` | 0.4 | Ice crystal projectile |
| `rock_projectile` | `/assets/models/effects/projectiles/rock.glb` | 0.3 | Small boulder |

---

## Texture Assets (2D)

These remain as 2D textures for terrain, particles, and UI.

### Terrain Textures
- `/assets/terrain/terrain_atlas.png` - Tile atlas for all terrain types
- `/assets/terrain/grass/grass_diffuse.png` - Grass color map
- `/assets/terrain/grass/grass_normal.png` - Grass normal map
- `/assets/terrain/dirt/dirt_diffuse.png` - Dirt/path color map
- `/assets/terrain/water/water_diffuse.png` - Water color map
- `/assets/terrain/water/water_normal.png` - Animated water normals

### Particle Textures (64x64 or 128x128, with alpha)
- `/assets/effects/particles/fire.png` - Fire particle
- `/assets/effects/particles/smoke.png` - Smoke puff
- `/assets/effects/particles/spark.png` - Electric spark
- `/assets/effects/particles/magic.png` - Magic sparkle
- `/assets/effects/particles/water.png` - Water droplet
- `/assets/effects/particles/ice.png` - Ice crystal
- `/assets/effects/particles/lightning.png` - Lightning bolt
- `/assets/effects/particles/dust.png` - Dust cloud

### Impact Textures (for particle bursts)
- `/assets/effects/impacts/fire_impact.png`
- `/assets/effects/impacts/ice_impact.png`
- `/assets/effects/impacts/lightning_impact.png`
- `/assets/effects/impacts/generic_impact.png`

### UI Textures
All UI textures from the original manifest remain valid - 9-slice panels, buttons, icons.

### Skybox Textures
- `/assets/skybox/sunny.png` - Clear day sky
- `/assets/skybox/cloudy.png` - Overcast sky
- `/assets/skybox/storm.png` - Stormy sky
- `/assets/skybox/night.png` - Night sky

---

## Directory Structure

```
public/assets/
├── models/
│   ├── towers/
│   │   ├── fire/
│   │   │   ├── fire_tower_tier1.glb
│   │   │   ├── fire_tower_tier2.glb
│   │   │   └── fire_tower_tier3.glb
│   │   ├── water/
│   │   ├── earth/
│   │   ├── air/
│   │   ├── lightning/
│   │   └── merged/
│   ├── enemies/
│   │   ├── ground/
│   │   ├── flying/
│   │   └── bosses/
│   ├── commander/
│   ├── environment/
│   │   ├── trees/
│   │   ├── rocks/
│   │   ├── vegetation/
│   │   └── props/
│   └── effects/
│       └── projectiles/
├── terrain/
├── effects/
│   ├── particles/
│   └── impacts/
├── ui/
└── skybox/
```

---

## Fallback Behavior

The game includes fallback procedural meshes for all entity types. If a model file is missing:

- **Towers**: Fall back to `TowerMesh` component (procedural geometry from definition)
- **Enemies**: Fall back to `EnemyMesh` component (procedural geometry from definition)
- **Environment**: Will not render (optional decorations)

This allows the game to run without any 3D models while artists create assets.

---

## Model Count Summary

| Category | Count |
|----------|-------|
| Tower Models | 20 |
| Enemy Models | 13 |
| Commander Models | 3 |
| Environment Models | 10 |
| Projectile Models | 4 |
| **Total 3D Models** | **50** |
| Texture Assets | ~30 |
