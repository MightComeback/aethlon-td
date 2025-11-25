# Aethlon Map Editor - Implementation Plan

## Overview

The Map Editor is a full-featured 2.5D tile-based editor for creating TD maps with:
- Interactive isometric 3D view with rotation and zoom
- Clear iconography for all tools and tiles
- Path/waypoint system for enemy routes
- Wave/enemy configuration
- Environment objects (trees, rocks, decorations)
- Tile textures and theming

---

## Current State Analysis

### What Exists
| Component | Status | Location |
|-----------|--------|----------|
| EditorGrid | Functional | `src/components/editor/EditorGrid.tsx` |
| TilePalette | Basic | `src/components/editor/TilePalette.tsx` |
| EditorToolbar | Stub | `src/components/editor/EditorToolbar.tsx` |
| MapEditor | Container | `src/components/editor/MapEditor.tsx` |
| editorStore | Complete | `src/stores/editorStore.ts` |
| MapStorage | Complete | `src/services/MapStorage.ts` |
| Map Types | Complete | `src/types/map.ts` |
| Enemy Types | Complete | `src/types/enemy.ts` |

### What's Missing
- Camera controls (rotation, zoom, pan)
- Icon system for tools/tiles
- Waypoint placement UI
- Wave/enemy designer
- Environment objects (trees, rocks)
- Tile textures/themes
- Path visualization
- Save/load integration
- Test play mode

---

## Implementation Phases

### Phase 1: Camera & View Controls
**Goal:** Full 2.5D camera with intuitive controls

#### 1.1 Camera System
- [ ] OrbitControls integration with constraints
  - Rotation: Limited to isometric angles (0°, 90°, 180°, 270°)
  - Zoom: Min 30, Max 150 (orthographic zoom)
  - Pan: Bounded to map extents
- [ ] Camera state in editorStore
  - `cameraAngle: 0 | 90 | 180 | 270`
  - `cameraZoom: number`
  - `cameraPan: { x: number, y: number }`
- [ ] View controls UI
  - Rotation buttons (CW/CCW) with icons
  - Zoom slider or +/- buttons
  - Reset view button
  - Minimap (optional, future)

#### 1.2 Camera Controls Component
```typescript
// src/components/editor/CameraControls.tsx
interface CameraControlsProps {
  onRotate: (direction: 'cw' | 'ccw') => void
  onZoom: (delta: number) => void
  onResetView: () => void
  currentAngle: number
  currentZoom: number
}
```

---

### Phase 2: Icon System
**Goal:** Clear, consistent icons for all editor elements

#### 2.1 Icon Library
Using Lucide React icons + custom SVG for game-specific icons

**Tool Icons:**
| Tool | Icon | Keyboard |
|------|------|----------|
| Select | `MousePointer2` | S |
| Paint | `Paintbrush` | P |
| Erase | `Eraser` | E |
| Path | `Route` | L |
| Waypoint | `MapPin` | W |
| Fill | `PaintBucket` | F |
| Eyedropper | `Pipette` | I |

**Tile Type Icons:**
| Tile | Icon | Color |
|------|------|-------|
| Ground | `Square` | `#4a7c59` (green) |
| Path | `Road` | `#8b7355` (brown) |
| Water | `Waves` | `#4a90a4` (blue) |
| Blocked | `XSquare` | `#4a4a4a` (gray) |
| Spawn | `CircleDot` | `#e74c3c` (red) |
| Exit | `Flag` | `#f1c40f` (gold) |

**Environment Object Icons:**
| Object | Icon |
|--------|------|
| Tree (Pine) | `TreePine` |
| Tree (Deciduous) | `TreeDeciduous` |
| Rock | `Mountain` |
| Bush | `Shrub` |
| Crate | `Package` |

#### 2.2 Icon Component
```typescript
// src/components/ui/Icon.tsx
interface IconProps {
  name: IconName
  size?: 'sm' | 'md' | 'lg'
  color?: string
  className?: string
}
```

---

### Phase 3: Enhanced Toolbar & Tile Palette
**Goal:** Professional editor UI with clear tools

#### 3.1 Toolbar Redesign
```
┌─────────────────────────────────────────────────────────────────┐
│ ← Back  │ [S][P][E][L][W][F][I] │ Map: Untitled* │ [Save][Test] │
└─────────────────────────────────────────────────────────────────┘
```
- Tool buttons with icons + tooltips
- Active tool highlight
- Keyboard shortcut hints
- Map name (editable)
- Modified indicator (*)
- Save/Test buttons

#### 3.2 Tile Palette Redesign
```
┌──────────────────┐
│ TILES            │
├──────────────────┤
│ [■] Ground       │
│ [≡] Path         │
│ [~] Water        │
│ [X] Blocked      │
│ [●] Spawn        │
│ [⚑] Exit         │
├──────────────────┤
│ OBJECTS          │
├──────────────────┤
│ [🌲] Pine Tree   │
│ [🌳] Oak Tree    │
│ [�ite Rock        │
│ [🌿] Bush        │
├──────────────────┤
│ THEMES           │
├──────────────────┤
│ [Grassland ▼]    │
└──────────────────┘
```

- Collapsible sections
- Visual tile previews (3D thumbnails)
- Active selection highlight
- Theme selector dropdown

---

### Phase 4: Environment Objects
**Goal:** Placeable decorative/blocking objects

#### 4.1 Object Types
```typescript
// src/types/objects.ts
enum ObjectType {
  TreePine = 'tree_pine',
  TreeOak = 'tree_oak',
  TreeDead = 'tree_dead',
  Rock = 'rock',
  RockLarge = 'rock_large',
  Bush = 'bush',
  Crate = 'crate',
  Barrel = 'barrel',
  Fence = 'fence',
  Sign = 'sign',
}

interface MapObject {
  id: string
  type: ObjectType
  position: { x: number, y: number }
  rotation: number // 0, 90, 180, 270
  scale: number // 0.5 - 2.0
}
```

#### 4.2 Object Properties
| Object | Blocks Path | Blocks Build | Visual Height |
|--------|-------------|--------------|---------------|
| TreePine | Yes | Yes | 2 tiles |
| TreeOak | Yes | Yes | 2.5 tiles |
| Rock | Yes | Yes | 0.5 tiles |
| RockLarge | Yes | Yes | 1 tile |
| Bush | No | Yes | 0.5 tiles |
| Crate | Yes | Yes | 1 tile |
| Fence | No | No | 0.5 tiles |

#### 4.3 Object Rendering
- 3D meshes for each object type
- Simple geometric shapes (low-poly style)
- Consistent art direction
- Selection highlight on hover
- Drag to reposition
- Rotation handle

---

### Phase 5: Path & Waypoint System
**Goal:** Visual path creation with waypoints

#### 5.1 Path Visualization
- Dashed line showing enemy route
- Arrows indicating direction
- Waypoint markers (numbered)
- Path validation indicators (green=valid, red=invalid)

#### 5.2 Waypoint Editing
```typescript
interface Waypoint {
  id: string
  x: number
  y: number
  order: number
}
```

**Interactions:**
- Click path tile to add waypoint
- Drag waypoint to reposition
- Right-click to delete waypoint
- Auto-reorder on drag
- Snap to tile centers

#### 5.3 Path Validation Rules
- Must start from Spawn tile
- Must end at Exit tile
- Must be contiguous (no gaps)
- Minimum 5 tiles length
- No loops (optional, could allow)

---

### Phase 6: Wave & Enemy Configuration
**Goal:** Design enemy waves for the map

#### 6.1 Wave Editor Panel
```
┌─────────────────────────────────────────┐
│ WAVES                              [+]  │
├─────────────────────────────────────────┤
│ Wave 1 ▼                           [🗑] │
│ ├─ Grunt ×10 (delay: 0.5s)              │
│ ├─ Runner ×5 (delay: 0.3s)              │
│ └─ [+ Add Enemy]                        │
├─────────────────────────────────────────┤
│ Wave 2 ▼                           [🗑] │
│ ├─ Tank ×3 (delay: 1.0s)                │
│ └─ [+ Add Enemy]                        │
├─────────────────────────────────────────┤
│ Wave 3 (Boss) ▼                    [🗑] │
│ ├─ Boss ×1                              │
│ └─ [+ Add Enemy]                        │
├─────────────────────────────────────────┤
│ [+ Add Wave]                            │
├─────────────────────────────────────────┤
│ Difficulty: ████████░░ Hard             │
│ Est. Duration: 5:30                     │
└─────────────────────────────────────────┘
```

#### 6.2 Wave Data Structure
```typescript
interface WaveEnemy {
  type: EnemyType
  count: number
  spawnDelay: number // seconds between spawns
  startDelay: number // delay before first spawn
  spawnPoint?: string // specific spawn point ID (if multiple)
}

interface Wave {
  id: string
  number: number
  enemies: WaveEnemy[]
  isBossWave: boolean
  bonusReward: number
  timeBetweenWaves: number // seconds until next wave starts
}
```

#### 6.3 Enemy Type Selector
Modal/dropdown with enemy cards:
```
┌───────────────────────────────────────────────┐
│ SELECT ENEMY TYPE                             │
├───────────────────────────────────────────────┤
│ ┌─────────┐ ┌─────────┐ ┌─────────┐          │
│ │  Grunt  │ │ Runner  │ │  Tank   │          │
│ │   👤    │ │   🏃    │ │   🛡️    │          │
│ │ HP: 100 │ │ HP: 50  │ │ HP: 500 │          │
│ │ Spd: 1  │ │ Spd: 2  │ │ Spd: 0.5│          │
│ └─────────┘ └─────────┘ └─────────┘          │
│ ┌─────────┐ ┌─────────┐ ┌─────────┐          │
│ │  Swarm  │ │ Healer  │ │  Boss   │          │
│ │   🐜    │ │   💚    │ │   👹    │          │
│ │ HP: 20  │ │ HP: 150 │ │ HP:2000 │          │
│ │ Spd: 1.5│ │ Spd: 0.8│ │ Spd: 0.3│          │
│ └─────────┘ └─────────┘ └─────────┘          │
└───────────────────────────────────────────────┘
```

#### 6.4 Difficulty Calculator
Based on:
- Total enemy health
- Path length
- Number of buildable tiles
- Wave count and spacing
- Enemy abilities (armor, speed, etc.)

Output: Easy / Medium / Hard / Expert / Nightmare

---

### Phase 7: Textures & Theming
**Goal:** Visual variety for different map themes

#### 7.1 Theme System
```typescript
enum MapTheme {
  Grassland = 'grassland',
  Desert = 'desert',
  Tundra = 'tundra',
  Volcanic = 'volcanic',
  Shadow = 'shadow',
}

interface ThemeConfig {
  name: string
  groundTexture: string
  pathTexture: string
  waterColor: string
  ambientColor: string
  skyColor: string
  objects: ObjectType[] // available objects for this theme
}
```

#### 7.2 Tile Textures
Using Three.js materials with:
- Base color maps
- Normal maps (optional, for depth)
- Variation (random rotation/UV offset)

**Texture Atlas Approach:**
- Single sprite sheet per theme
- UV mapping for each tile type
- Reduces draw calls

#### 7.3 Theme Presets
| Theme | Ground | Path | Water | Ambient |
|-------|--------|------|-------|---------|
| Grassland | Grass | Dirt | Blue | Warm |
| Desert | Sand | Stone | Oasis | Hot |
| Tundra | Snow | Ice | Frozen | Cold |
| Volcanic | Ash | Lava Rock | Lava | Red |
| Shadow | Dark Stone | Purple | Void | Purple |

---

### Phase 8: Properties Panel
**Goal:** Context-sensitive property editing

#### 8.1 Panel Modes
**No Selection:**
```
┌──────────────────┐
│ MAP PROPERTIES   │
├──────────────────┤
│ Name: [Untitled] │
│ Size: 20 × 15    │
│ Theme: Grassland │
├──────────────────┤
│ Tiles: 247       │
│ Path: 32         │
│ Objects: 15      │
│ Waves: 10        │
└──────────────────┘
```

**Tile Selected:**
```
┌──────────────────┐
│ TILE (5, 8)      │
├──────────────────┤
│ Type: Path       │
│ Texture: Dirt 1  │
│ Waypoint: #3     │
├──────────────────┤
│ [Change Type ▼]  │
│ [Remove Waypoint]│
└──────────────────┘
```

**Object Selected:**
```
┌──────────────────┐
│ OBJECT           │
├──────────────────┤
│ Type: Pine Tree  │
│ Position: (5, 8) │
│ Rotation: 0°     │
│ Scale: 1.0       │
├──────────────────┤
│ [Rotate 90°]     │
│ [Scale: [====●] ]│
│ [Delete]         │
└──────────────────┘
```

---

### Phase 9: Save/Load/Export
**Goal:** Persist maps with full data

#### 9.1 Map Data Structure (Enhanced)
```typescript
interface MapData {
  // Metadata
  id: string
  name: string
  description: string
  author: string
  version: number
  createdAt: number
  updatedAt: number

  // Dimensions
  width: number
  height: number

  // Theme
  theme: MapTheme

  // Tiles
  tiles: TileType[][]
  tileVariants: number[][] // texture variation per tile

  // Path
  waypoints: Waypoint[]
  spawnPoints: SpawnPoint[]
  exitPoints: ExitPoint[]

  // Objects
  objects: MapObject[]

  // Waves
  waves: Wave[]

  // Gameplay
  startingLives: number
  startingCurrency: number
  difficulty: number // calculated

  // Flags
  isCustom: boolean
  isPublished: boolean
}
```

#### 9.2 Save Operations
- Auto-save every 30 seconds (if modified)
- Manual save (Ctrl+S)
- Save As (new map)
- Export to JSON file
- Import from JSON file

#### 9.3 Validation Before Save
- [ ] Has valid path (spawn → exit)
- [ ] Has at least 1 wave
- [ ] Has at least 5 buildable tiles
- [ ] Map name is set
- Show validation errors before allowing save

---

### Phase 10: Test Play Mode
**Goal:** Playtest the map without leaving editor

#### 10.1 Test Mode Features
- Start game with current map data
- Infinite currency mode (optional)
- Speed controls (1x, 2x, 4x, 8x)
- Skip to wave N
- Pause and inspect
- Return to editor with position

#### 10.2 Test Mode UI
```
┌───────────────────────────────────────────────────────────┐
│ TEST MODE │ Wave 3/10 │ Lives: 20 │ Currency: ∞ │ [STOP] │
└───────────────────────────────────────────────────────────┘
```

---

## File Structure

```
src/components/editor/
├── MapEditor.tsx           # Main container
├── EditorCanvas.tsx        # Three.js canvas with camera
├── EditorGrid.tsx          # Tile grid rendering
├── EditorTile.tsx          # Individual tile
├── EditorObject.tsx        # Environment object rendering
├── CameraControls.tsx      # View rotation/zoom UI
├── EditorToolbar.tsx       # Tool buttons
├── TilePalette.tsx         # Tile/object selection
├── WaveEditor.tsx          # Wave configuration panel
├── EnemySelector.tsx       # Enemy type picker
├── PropertiesPanel.tsx     # Context-sensitive properties
├── PathOverlay.tsx         # Path visualization
├── WaypointMarker.tsx      # Waypoint 3D marker
├── ValidationPanel.tsx     # Map validation feedback
└── TestModeOverlay.tsx     # Test play UI

src/stores/
├── editorStore.ts          # Editor state (enhanced)
└── editorCameraStore.ts    # Camera state (new)

src/types/
├── map.ts                  # Map types (enhanced)
├── objects.ts              # Object types (new)
└── editor.ts               # Editor-specific types (new)
```

---

## Implementation Priority

### MVP (Phase 1)
1. Camera controls (rotation, zoom)
2. Icon integration (Lucide)
3. Enhanced toolbar with keyboard shortcuts
4. Tile palette with object section
5. Basic environment objects (tree, rock)
6. Waypoint placement
7. Path visualization
8. Save/load integration

### Phase 2
1. Wave editor panel
2. Enemy configuration
3. Difficulty calculator
4. Map validation
5. Properties panel

### Phase 3
1. Theme system
2. Tile textures
3. Test play mode
4. Export/import
5. Advanced objects

---

## Technical Notes

### Camera Implementation
```typescript
// Using @react-three/drei OrbitControls
<OrbitControls
  enableRotate={true}
  enablePan={true}
  enableZoom={true}
  minZoom={30}
  maxZoom={150}
  minPolarAngle={Math.PI / 6}  // ~30°
  maxPolarAngle={Math.PI / 3}  // ~60°
  rotateSpeed={0.5}
  panSpeed={0.5}
  zoomSpeed={0.5}
/>
```

### Keyboard Shortcuts
| Key | Action |
|-----|--------|
| S | Select tool |
| P | Paint tool |
| E | Erase tool |
| L | Path tool |
| W | Waypoint tool |
| F | Fill tool |
| I | Eyedropper |
| Ctrl+S | Save |
| Ctrl+Z | Undo |
| Ctrl+Y | Redo |
| Delete | Delete selected |
| R | Rotate camera CW |
| Shift+R | Rotate camera CCW |
| +/- | Zoom in/out |
| Space | Reset view |
| F5 | Test play |

### Performance Considerations
- Instanced meshes for repeated objects
- Frustum culling (automatic in Three.js)
- Memoized tile components
- Debounced auto-save
- Lazy load wave editor panel

---

## Dependencies to Add

```json
{
  "lucide-react": "^0.400.0"
}
```

---

## Implementation Progress

### Completed (Phase 1)
- [x] Custom pixel art icon system (`src/components/ui/PixelIcon.tsx`)
  - 16x16 pixel SVG icons for all tools, tiles, objects, and UI elements
  - Tool icons: Select, Paint, Erase, Path, Waypoint, Fill
  - Tile icons: Ground, Path, Water, Blocked, Spawn, Exit
  - Object icons: Pine Tree, Oak Tree, Rock, Bush
  - UI icons: Rotate CW/CCW, Zoom In/Out, Save, Play, Undo/Redo, Back
- [x] Camera controls (`src/components/editor/CameraControls.tsx`)
  - Rotation (0°/90°/180°/270°) via R key or buttons
  - Zoom (25-120) via +/- keys or buttons
  - Reset view via Space key
  - Orthographic camera with OrbitControls
- [x] Enhanced EditorToolbar with pixel icons and keyboard shortcuts
  - S=Select, P=Paint, E=Erase, L=Path, W=Waypoint, F=Fill
  - Undo/Redo buttons with Ctrl+Z/Ctrl+Y
- [x] Enhanced TilePalette with Tiles/Objects tabs
  - Visual icons for each tile type
  - Objects tab (prepared for future)
- [x] Updated MapEditor layout
  - Top toolbar with Back, tools, map name, Test, Save buttons
  - Left: Tile palette
  - Right: Camera controls, Properties panel, Validation panel
  - Bottom: Keyboard hints status bar
- [x] EditorGrid enhancements
  - All tool modes implemented (paint, erase, path, waypoint, fill)
  - Flood fill algorithm
  - Waypoint markers (3D spheres)
  - Tile height variations by type
  - Hover effects with color lightening
  - Drag-to-paint support
  - History save on interaction

### Next Steps (Phase 2)
- [ ] Path visualization (lines between waypoints)
- [ ] Wave editor panel
- [ ] Enemy configuration
- [ ] Save/Load integration with MapStorage
- [ ] Theme system implementation
- [ ] Test play mode

---

*Document Version: 1.1*
*Last Updated: 2024-11*
