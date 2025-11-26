# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
bun install          # Install dependencies
bun run dev          # Start development server
bun run build        # Build for production (includes typecheck)
bun run typecheck    # Run TypeScript type checking only
bun run lint         # Run ESLint
bun run start        # Start production server
```

## Architecture

### Entity-Component-System (ECS)

The game runtime uses ECS in `src/game/core/`:
- **Entity**: Lightweight identifier with component storage (by type string)
- **Component**: Pure data containers (Transform, Health, Movement, Attack) - no logic
- **System/ReactiveSystem**: Logic operators on entities with specific component sets
- **EntityManager**: Entity queries with component/tag indexing, lifecycle callbacks
- **SystemManager**: Priority-based system execution, entity lifecycle propagation
- **EventBus**: Pub/sub for game events (GameEvents, WeatherEvents)
- **GameLoop**: Fixed 60Hz timestep with interpolation, pause/resume, speed control

### State Management (Zustand + Immer)

Stores in `src/stores/`:
- **gameStore**: Game session (lives, currency, towers, enemies, game state machine)
- **editorStore**: Map editor (tiles, heightmap, objects, waypoints, undo/redo)
- **weatherStore**: Dynamic weather, transitions, lighting, particles
- **profileStore**: Commander profile with auto-save (30s debounce)

Use Zustand selector pattern to prevent unnecessary renders.

### Services

- **DatabaseService** (`src/services/database/`): SQLite (sql.js) + IndexedDB persistence
- **MapStorage/CommanderStorage** (`src/services/storage/`): Save/load operations
- **MapGenerator** (`src/services/mapGenerator/`): Procedural generation with seeded randomness

### 3D Rendering (React Three Fiber + Drei)

Key patterns:
- **InstancedTileGrid**: Uses InstancedBufferGeometry for 1000s of tiles with LOD
- **Custom Shaders** (`src/shaders/`): Tile atlas, weather particles, lightning bolts
- **useFrame**: Animation loop integration from R3F

## Domain Model

### Elements (Rock-Paper-Scissors + Mastery)
- **Tier 1**: Fire, Water, Earth, Air, Lightning
- **Tier 2** (merged): Lava (Fire+Earth), Ice (Water+Earth), Storm (Air+Lightning), Magma (Earth+Lightning), Plasma (Fire+Air)
- **Tier 3** (mastery): Volcano, Glacier, Hurricane, Mountain, Supercell
- Definitions in `src/data/elements/`

### Towers
- Organized by tier/element in `src/data/towers/definitions/`
- **Categories**: Damage, MagicDamage, PhysicalDamage, Buff, Debuff
- **Rarities**: Common → Legendary (based on tier & complexity)
- Separate merge recipes for tower upgrades (distinct from element merging)

### Enemies
- 80 types: Ground (50), Flying (30), Boss (20)
- Category abilities: Heal, Shield, Phase, Split, Regenerate, Summon
- 20+ status effects: Slow, Burn, Freeze, Poison, Stun, etc.

### Maps
- **TileTypes**: Ground, Path, Water, Blocked, Spawn, Exit
- **Heightmap**: 0-5 elevation per tile
- **Waypoints**: Ordered path nodes for enemy movement
- Per-map weather config and wave overrides

### Weather
- Types: Sunny, Rainy, HeavyRain, Thunderstorm, Snowy
- Gameplay modifiers: Range/speed multipliers, element bonuses
- Visual: Particles, lighting changes, fog, lightning strikes

## Key Conventions

- **Component/Event Types**: String constants (ComponentTypes, GameEvents enums)
- **Seeded Randomness**: Custom SeededRandom for reproducible procedural generation
- **Mesh System**: Procedural geometry (sphere, box, cylinder) with grayscale tinted by element
- **Persistence**: Debounced auto-save, database schema versioning with migrations
