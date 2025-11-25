# Mighty Defense

A 2.5D web-based tower defense game built with React, TanStack Start, Three.js, and SQLite.

## Tech Stack

- **Runtime**: Bun
- **Framework**: TanStack Start (React)
- **3D Rendering**: Three.js / React Three Fiber
- **State Management**: Zustand
- **Database**: sql.js (SQLite in browser)
- **Styling**: Tailwind CSS

## Project Structure

```
src/
  app/                    # TanStack Start configuration
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

## Features (Planned)

- [x] Project scaffolding
- [x] ECS architecture
- [x] Three.js 2.5D rendering
- [x] SQLite persistence
- [ ] Tower placement and upgrades
- [ ] Enemy pathfinding
- [ ] Wave system
- [ ] Map editor
- [ ] Campaign maps
- [ ] Online features

## License

MIT
