# Graphics Rework Plan: Settlers-Style Aesthetic

## Target Style Analysis

Based on the reference image (The Settlers Online / browser strategy RPG):
- **Stylized 3D meshes** with painted textures
- **Rich, detailed terrain** with grass variations, dirt patches, foliage
- **Hand-painted texture style** on low-poly 3D buildings
- **Lush environmental details**: trees, rocks, bushes, flowers
- **Soft fog/atmosphere** at map edges
- **Warm, inviting color palette** with natural tones
- **UI**: Ornate frames, gold accents, medieval fantasy theme
- **Real-time shadows** from 3D geometry

## Rendering Architecture

### WebGPU Migration
- Replace WebGLRenderer with WebGPURenderer
- Leverage compute shaders for particle systems
- TSL (Three.js Shading Language) for custom materials
- Better instancing performance for terrain/units

---

## Current State vs Target

| Aspect | Current | Target |
|--------|---------|--------|
| **Renderer** | WebGL (THREE.WebGLRenderer) | WebGPU (THREE.WebGPURenderer) |
| **Terrain** | Procedural pixel-art tiles, flat colors | Textured 3D tiles, painted atlas, organic blending |
| **Buildings/Towers** | 3D primitives (boxes, spheres, cylinders) | Low-poly 3D models with painted textures |
| **Enemies** | 3D primitives with grayscale tinting | Low-poly 3D models with painted textures, skeletal animation |
| **Trees/Objects** | Procedural 3D geometry | Textured 3D models (stylized low-poly) |
| **UI** | Basic HTML/CSS panels | Ornate medieval frames, textured backgrounds |
| **Effects** | Shader particles (WebGL) | Compute shader particles (WebGPU), TSL materials |
| **Shadows** | PCF shadow maps | VSM or PCF soft shadows from 3D geometry |
| **Atmosphere** | Fog uniform, weather tinting | Volumetric fog, god rays, atmospheric scattering |

---

## Phase 1: Asset Pipeline & Infrastructure

### 1.1 Sprite Loading System
**Files to create:**
- `src/services/assets/AssetLoader.ts` - Centralized texture/sprite loading
- `src/services/assets/SpriteAtlas.ts` - Atlas packing and UV management
- `src/services/assets/AssetManifest.ts` - Asset definitions and metadata

**Features needed:**
- Async texture loading with progress callbacks
- Sprite atlas generation (TexturePacker format support)
- Hot-reload support for development
- Memory management (dispose unused textures)
- Fallback/placeholder system during loading

### 1.2 Sprite Renderer Component
**Files to create:**
- `src/components/shared/IsometricSprite.tsx` - Billboard sprite with depth sorting
- `src/components/shared/AnimatedSprite.tsx` - Frame-based animation support
- `src/hooks/useSprite.ts` - Sprite loading hook with caching

**Features needed:**
- Proper depth sorting for isometric view (y-sorting)
- Shadow casting from sprites
- Batched rendering (InstancedMesh for same sprite type)
- Animation state machine integration

### 1.3 Asset Organization
**Directory structure:**
```
public/assets/
├── terrain/
│   ├── grass/
│   │   ├── grass_base_01.png - grass_base_04.png
│   │   ├── grass_flowers_01.png - grass_flowers_03.png
│   │   └── grass_dirt_transition_01.png - _16.png (marching squares)
│   ├── dirt/
│   ├── path/
│   │   ├── path_straight.png, path_corner.png, path_end.png
│   │   └── path_cobble_variants/
│   ├── water/
│   │   └── water_animated_01.png - _04.png (frames)
│   └── decorations/
│       ├── rocks_small_01.png - _06.png
│       ├── flowers_01.png - _08.png
│       └── grass_tufts_01.png - _04.png
├── buildings/
│   ├── towers/
│   │   ├── fire/
│   │   │   ├── fire_tower_tier1.png
│   │   │   ├── fire_tower_tier2.png
│   │   │   └── fire_tower_tier3.png
│   │   ├── water/
│   │   ├── earth/
│   │   └── ... (per element)
│   └── structures/
│       ├── house_01.png - house_04.png
│       ├── mill.png
│       └── barracks.png
├── units/
│   ├── enemies/
│   │   ├── ground/
│   │   │   ├── goblin_walk_sheet.png (8 frames)
│   │   │   ├── goblin_attack_sheet.png (6 frames)
│   │   │   └── goblin_death_sheet.png (5 frames)
│   │   ├── flying/
│   │   └── bosses/
│   └── commander/
│       ├── commander_idle_sheet.png
│       ├── commander_walk_sheet.png
│       └── commander_cast_sheet.png
├── environment/
│   ├── trees/
│   │   ├── pine_01.png - pine_04.png
│   │   ├── oak_01.png - oak_03.png
│   │   └── dead_tree_01.png - _02.png
│   ├── rocks/
│   │   ├── rock_large_01.png - _03.png
│   │   └── rock_cliff_01.png - _04.png
│   └── props/
│       ├── fence_01.png - _03.png
│       ├── cart.png
│       └── well.png
├── effects/
│   ├── projectiles/
│   │   ├── fireball_sheet.png
│   │   ├── arrow.png
│   │   └── magic_bolt_sheet.png
│   ├── impacts/
│   │   ├── explosion_sheet.png
│   │   ├── splash_sheet.png
│   │   └── dust_sheet.png
│   └── auras/
│       ├── buff_glow_sheet.png
│       └── debuff_sheet.png
├── ui/
│   ├── frames/
│   │   ├── panel_wood.9.png (9-slice)
│   │   ├── panel_gold.9.png
│   │   ├── button_normal.png
│   │   ├── button_hover.png
│   │   └── button_pressed.png
│   ├── icons/
│   │   ├── elements/ (fire.png, water.png, etc.)
│   │   ├── resources/ (gold.png, gems.png, etc.)
│   │   └── abilities/
│   └── portraits/
│       ├── commander_portrait.png
│       └── enemy_portraits/
└── fog/
    └── fog_edge_01.png - _04.png
```

---

## Phase 2: Terrain Rework

### 2.1 Replace Procedural Tiles with Sprite Tiles
**Files to modify:**
- `src/hooks/useTileAtlas.ts` → Load real texture atlas instead of canvas generation
- `src/data/textures/tileAtlasConfig.ts` → Update UV mappings for new atlas
- `src/shaders/tileAtlasShader.ts` → Adjust for pre-lit sprites (reduce lighting influence)

**Changes:**
1. Replace `generateTileAtlas()` canvas drawing with `loadTileAtlas()` image loading
2. Create high-resolution atlas (2048x2048 or 4096x4096)
3. Update UV calculations for new tile dimensions (64x64 or 128x128 per tile)
4. Add tile variation selection (random grass variants per tile)

### 2.2 Terrain Decoration Layer
**Files to create:**
- `src/components/game/terrain/TerrainDecorations.tsx` - Scattered props on ground tiles
- `src/services/mapGenerator/decorationPlacer.ts` - Procedural decoration distribution

**Features:**
- Per-tile decoration probability based on tile type
- Decoration types: flowers, rocks, grass tufts, debris
- Instanced rendering for performance
- Seed-based placement for reproducibility

### 2.3 Enhanced Tile Blending
**Files to modify:**
- `src/utils/tileBlending.ts` → Enhanced marching squares with more variants
- Add "organic edge" tiles (not just gradients)

**Changes:**
- Increase transition variants from 16 to 47 (full autotile set)
- Add corner pieces for natural-looking boundaries
- Support for multi-layer blending (grass → dirt → path)

### 2.4 Water Rendering
**Files to create:**
- `src/components/game/terrain/WaterLayer.tsx` - Animated water surface
- `src/shaders/waterShader.ts` - Water reflection/caustics shader

**Features:**
- Animated water tiles (4-8 frame loop)
- Subtle wave distortion shader
- Shore foam effect
- Reflection of nearby objects (optional, performance toggle)

---

## Phase 3: Building & Tower Sprites

### 3.1 Tower Sprite System
**Files to modify:**
- `src/components/game/towers/TowerMesh.tsx` → `TowerSprite.tsx`
- `src/data/towers/definitions/` → Add sprite references per tower

**Changes:**
1. Replace procedural mesh generation with sprite rendering
2. Each tower definition gains `spriteSheet` and `animations` fields
3. Support for:
   - Idle animation (subtle movement, smoke, glow)
   - Attack animation (firing, charging)
   - Construction animation (building up)
   - Upgrade animation (transformation)

### 3.2 Tower Data Schema Update
```typescript
interface TowerDefinition {
  // ... existing fields ...
  sprites: {
    idle: string;           // path to sprite/sheet
    attack?: string;        // optional attack animation
    upgrade?: string;       // upgrade transition
    shadow?: string;        // separate shadow sprite
  };
  spriteConfig: {
    width: number;          // sprite dimensions
    height: number;
    anchor: [number, number]; // pivot point
    frames?: number;        // animation frames
    fps?: number;           // animation speed
  };
}
```

### 3.3 Structure Sprites
**Files to modify:**
- `src/components/editor/EditorObjects.tsx` → Support sprite-based objects
- `src/data/objects/definitions.ts` → Add sprite references

---

## Phase 4: Unit Sprites (Enemies & Commander)

### 4.1 Enemy Sprite System
**Files to modify:**
- `src/components/game/enemies/EnemyMesh.tsx` → `EnemySprite.tsx`
- `src/data/enemies/definitions/` → Add sprite sheets per enemy

**Animation states needed:**
- Walk (8-directional or 4-directional with flip)
- Attack
- Hit/Hurt
- Death
- Special abilities (per enemy type)

### 4.2 Sprite Animation Controller
**Files to create:**
- `src/systems/animation/SpriteAnimator.ts` - Animation state machine
- `src/components/shared/AnimatedUnit.tsx` - Shared unit rendering

**Features:**
- State machine for animation transitions
- Direction-based frame selection
- Animation blending (walk → attack → walk)
- Event callbacks (on attack frame, on death complete)

### 4.3 Commander Sprite
**Files to modify:**
- `src/components/game/commander/CommanderMesh.tsx` → `CommanderSprite.tsx`

**Animations needed:**
- Idle (breathing, cape movement)
- Walk (8 directions)
- Cast ability
- Victory pose
- Defeat

### 4.4 Health Bars & Status Effects
**Files to modify:**
- Health bar rendering (keep as 3D overlay or convert to sprite)
- Status effect icons above units

---

## Phase 5: Environment Objects

### 5.1 Tree & Rock Sprites
**Files to create:**
- `src/components/game/environment/TreeSprite.tsx`
- `src/components/game/environment/RockSprite.tsx`
- `src/components/game/environment/PropSprite.tsx`

**Features:**
- Multiple variants per type (random selection)
- Subtle idle animation (tree sway in wind)
- Shadow sprites (separate layer)
- Depth sorting integration

### 5.2 Fog of War / Map Edges
**Files to create:**
- `src/components/game/environment/MapFog.tsx`
- Soft sprite-based fog at map boundaries
- Volumetric appearance through layered sprites

---

## Phase 6: Visual Effects (VFX)

### 6.1 Projectile System
**Files to create:**
- `src/components/game/effects/Projectile.tsx`
- `src/systems/combat/ProjectileManager.ts`

**Features:**
- Sprite-based projectiles with trails
- Arc trajectories for arrows
- Particle trails for magic
- Impact effects on hit

### 6.2 Impact & Ability Effects
**Files to create:**
- `src/components/game/effects/ImpactEffect.tsx`
- `src/components/game/effects/AuraEffect.tsx`

**Features:**
- Explosion sprites
- Element-specific effects (fire burst, ice shards, etc.)
- Buff/debuff auras around units
- Screen shake on big impacts

### 6.3 Weather Effects Enhancement
**Files to modify:**
- `src/systems/weather/WeatherParticles.tsx` → Keep shader approach, enhance visuals
- Add sprite-based elements (falling leaves, dust motes)

---

## Phase 7: UI Overhaul

### 7.1 UI Framework
**Files to create:**
- `src/components/ui/NineSlicePanel.tsx` - Scalable ornate frames
- `src/components/ui/OrnateButton.tsx` - Themed buttons
- `src/components/ui/IconBadge.tsx` - Resource/status icons
- `src/components/ui/Tooltip.tsx` - Styled tooltips

### 7.2 Game HUD Rework
**Files to modify:**
- `src/components/game/GameHUD.tsx` → Complete visual overhaul

**Changes:**
- Replace flat panels with ornate frames
- Add wood/metal textures to backgrounds
- Integrate icon sprites for resources
- Add portrait frame for commander
- Minimap with styled border

### 7.3 Tower Selection Panel
**Changes:**
- Card-style tower display with ornate borders
- Tower preview sprites instead of color boxes
- Upgrade path visualization
- Element icons with glow effects

### 7.4 Menus & Overlays
**Files to modify:**
- Main menu, pause menu, victory/defeat screens
- Map editor UI panels
- Settings menus

---

## Phase 8: Polish & Optimization

### 8.1 Sprite Batching
- Implement texture atlasing for draw call reduction
- Group sprites by texture for batch rendering
- Use InstancedMesh for repeated sprites (enemies, decorations)

### 8.2 LOD for Sprites
- Multiple resolution variants per sprite
- Automatic selection based on zoom level
- Simplified sprites at far zoom

### 8.3 Memory Management
- Texture dispose on scene exit
- Lazy loading of off-screen assets
- Compressed texture formats (WebP, basis)

### 8.4 Animation Optimization
- Shared animation clocks
- Frame skipping at distance
- Culling off-screen animations

---

## Implementation Order (Recommended)

### Sprint 1: Foundation
1. Asset loader infrastructure
2. Basic sprite renderer component
3. First terrain tiles (grass, path)
4. Verify rendering pipeline works

### Sprint 2: Terrain Complete
5. Full terrain tile set
6. Tile blending with real sprites
7. Terrain decorations
8. Water animation

### Sprint 3: Buildings
9. Tower sprites (start with 1 element, all tiers)
10. Tower animations
11. Expand to all tower types
12. Structure sprites

### Sprint 4: Units
13. Enemy sprites (start with 5 core types)
14. Animation system
15. Expand to all enemy types
16. Commander sprites

### Sprint 5: Environment
17. Tree and rock sprites
18. Props and decorations
19. Map edge fog
20. Environmental animations

### Sprint 6: Effects
21. Projectile system
22. Impact effects
23. Ability VFX
24. Enhance weather

### Sprint 7: UI
25. UI component library
26. HUD overhaul
27. Menus and panels
28. Icons and portraits

### Sprint 8: Polish
29. Performance optimization
30. LOD implementation
31. Final visual polish
32. Quality presets update

---

## Asset Creation Requirements

### Sprite Specifications
| Asset Type | Size (px) | Format | Frames | Notes |
|------------|-----------|--------|--------|-------|
| Terrain tiles | 128x64 | PNG | 1-4 | Isometric diamond |
| Tower sprites | 128x192 | PNG | 4-8 | Tall with ground shadow |
| Enemy sprites | 64x64 | PNG | 8/anim | Sheet per animation |
| Tree sprites | 128x256 | PNG | 1-4 | Multiple variants |
| Rock sprites | 64x64 | PNG | 1 | Multiple variants |
| UI frames | Variable | 9-slice | 1 | Scalable borders |
| Icons | 32x32, 64x64 | PNG | 1 | With alpha |
| Effects | 64x64 | PNG | 6-12 | Sheet format |

### Art Style Guidelines
- **Palette**: Warm, natural colors (reference: Settlers, Forge of Empires)
- **Outlines**: Subtle dark outlines, not harsh black
- **Shading**: Soft gradients, hand-painted look
- **Perspective**: Consistent isometric angle (2:1 ratio)
- **Detail level**: Readable at 50% zoom, beautiful at 100%

---

## Technical Debt & Breaking Changes

### Breaking Changes
1. **TowerMesh.tsx** → Complete rewrite to sprite-based
2. **EnemyMesh.tsx** → Complete rewrite to sprite-based
3. **CommanderMesh.tsx** → Complete rewrite to sprite-based
4. **useTileAtlas.ts** → Major changes to load real textures
5. **Tower/Enemy definitions** → Schema additions for sprites

### Files to Delete (Eventually)
- `src/hooks/usePixelTexture.ts` - No longer needed
- `src/hooks/usePixelMaterial.ts` - No longer needed
- Procedural geometry helpers if fully replaced

### Migration Strategy
1. Create new sprite components alongside existing mesh components
2. Add feature flag to toggle between old/new rendering
3. Migrate one system at a time
4. Remove old components after validation

---

## Resource Estimation

### Art Assets Needed
- **Terrain**: ~100 sprites (tiles + transitions + decorations)
- **Towers**: ~75 sprites (25 towers × 3 tiers, some shared)
- **Enemies**: ~400 sprites (80 enemies × 5 animations avg)
- **Environment**: ~50 sprites (trees, rocks, props)
- **Effects**: ~100 sprites (projectiles, impacts, auras)
- **UI**: ~75 elements (frames, buttons, icons)
- **Total**: ~800 unique art assets

### Development Effort
- Asset pipeline: Medium complexity
- Rendering changes: High complexity
- Animation system: Medium complexity
- UI overhaul: Medium complexity
- Testing & polish: Ongoing

---

## Open Questions

1. **Art source**: Will assets be created in-house, commissioned, or purchased?
2. **Animation complexity**: Full 8-direction or 4-direction with flipping?
3. **Resolution targets**: Support 4K displays? Mobile?
4. **Backward compatibility**: Need to support old saves with new graphics?
5. **Performance floor**: Minimum device specs to target?
