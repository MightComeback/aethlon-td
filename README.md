# Aethlon

A 2.5D web-based tower defense game built with React, TanStack Start, Three.js, and SQLite.

## Tech Stack

| Category | Technology | Documentation |
|----------|------------|---------------|
| **Runtime** | Bun | [bun.sh/docs](https://bun.sh/docs) |
| **Framework** | TanStack Start (React 19) | [tanstack.com/start](https://tanstack.com/start/latest) |
| **Routing** | TanStack Router | [tanstack.com/router](https://tanstack.com/router/latest) |
| **3D Rendering** | Three.js | [threejs.org/docs](https://threejs.org/docs/) |
| **React 3D** | React Three Fiber | [r3f.docs.pmnd.rs](https://r3f.docs.pmnd.rs/) |
| **3D Helpers** | Drei | [drei.docs.pmnd.rs](https://drei.docs.pmnd.rs/) |
| **State Management** | Zustand | [zustand.docs.pmnd.rs](https://zustand.docs.pmnd.rs/) |
| **Immutable State** | Immer | [immerjs.github.io/immer](https://immerjs.github.io/immer/) |
| **Database** | sql.js (SQLite) | [sql-js.github.io/sql.js](https://sql-js.github.io/sql.js/) |
| **IndexedDB** | idb | [github.com/jakearchibald/idb](https://github.com/jakearchibald/idb) |
| **Styling** | Tailwind CSS v4 | [tailwindcss.com/docs](https://tailwindcss.com/docs) |
| **UI Components** | Radix UI | [radix-ui.com/primitives](https://www.radix-ui.com/primitives) |
| **Validation** | Zod | [zod.dev](https://zod.dev/) |
| **Build Tool** | Vite | [vite.dev/guide](https://vite.dev/guide/) |

### Dependencies Overview

**Core Framework**
- [React 19](https://react.dev/) - UI library with concurrent features
- [TanStack Start](https://tanstack.com/start/latest) - Full-stack React framework
- [TanStack Router](https://tanstack.com/router/latest) - Type-safe file-based routing

**3D Graphics**
- [Three.js](https://threejs.org/) - WebGL 3D library
- [React Three Fiber](https://r3f.docs.pmnd.rs/) - React renderer for Three.js
- [@react-three/drei](https://drei.docs.pmnd.rs/) - Useful helpers for R3F

**State & Data**
- [Zustand](https://zustand.docs.pmnd.rs/) - Lightweight state management
- [Immer](https://immerjs.github.io/immer/) - Immutable state with mutable syntax
- [Zod](https://zod.dev/) - TypeScript-first schema validation

**Persistence**
- [sql.js](https://sql-js.github.io/sql.js/) - SQLite compiled to WebAssembly
- [idb](https://github.com/jakearchibald/idb) - IndexedDB with Promises

**UI & Styling**
- [Tailwind CSS v4](https://tailwindcss.com/docs) - Utility-first CSS framework
- [Radix UI](https://www.radix-ui.com/primitives) - Unstyled accessible components
- [class-variance-authority](https://cva.style/docs) - Variant styling utilities
- [tailwind-merge](https://github.com/dcastil/tailwind-merge) - Merge Tailwind classes
- [clsx](https://github.com/lukeed/clsx) - Conditional class names

**Development**
- [Vite](https://vite.dev/) - Next-gen build tool
- [TypeScript](https://www.typescriptlang.org/docs/) - Type-safe JavaScript

## Project Structure

```
src/
  routes/                 # File-based routing
  components/
    ui/                   # Base UI components
    game/                 # Game rendering components
    editor/               # Map editor components
  game/
    core/                 # ECS architecture (Entity, Component, System)
    components/           # Game components (Transform, Health, etc.)
    systems/              # Game systems (Movement, Combat, etc.)
    entities/             # Entity factories
    rendering/            # Three.js rendering
  services/
    database/             # SQLite integration
    storage/              # Save/load services
  stores/                 # Zustand state stores
  types/                  # TypeScript definitions
  utils/                  # Utility functions
  constants/              # Game constants
```

## Getting Started

```bash
# Install dependencies
bun install

# Start development server
bun run dev

# Build for production
bun run build

# Start production server
bun run start
```

## Documentation

- [Game Design Document](./docs/GDD.txt) - Full game design specification
- [Execution Plan](./docs/EXECUTION_PLAN.txt) - Development roadmap and tasks

## Architecture

The game uses an Entity-Component-System (ECS) architecture:

- **Entities**: Unique identifiers with attached components
- **Components**: Pure data containers (Transform, Health, Attack, etc.)
- **Systems**: Logic that operates on entities with specific components

This architecture enables:
- Composition over inheritance
- Easy extensibility
- Efficient batch processing
- Loose coupling between game elements

## Features

- [x] Project scaffolding
- [x] ECS architecture
- [x] Three.js 2.5D rendering
- [x] SQLite persistence
- [x] Map editor
  - [x] Tile painting (ground, path, water, blocked, spawn, exit)
  - [x] Heightmap editing (raise/lower terrain)
  - [x] Object placement (trees, rocks, bushes, flowers, tower spots)
  - [x] Waypoint system for enemy paths
  - [x] Camera controls (rotate, pan, zoom)
  - [x] Undo/redo history
  - [x] Virtual cursor with object preview
- [ ] Tower placement and upgrades
- [ ] Enemy pathfinding
- [ ] Wave system
- [ ] Campaign maps
- [ ] Online features

## License

MIT
