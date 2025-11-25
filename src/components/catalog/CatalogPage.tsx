/**
 * Catalog Page
 *
 * A browsable catalog of all game assets including:
 * - Tiles: Ground types for map building
 * - Objects: Placeable decorations and structures
 * - Enemies: All enemy types with tier variants
 *
 * ## Extending the Catalog
 *
 * To add new catalog sections:
 * 1. Create a new section component in src/components/catalog/sections/
 * 2. Add the section to CATALOG_SECTIONS below
 * 3. Export from src/components/catalog/index.ts
 *
 * ## Future sections to consider:
 * - Towers: All tower types and upgrades
 * - Abilities: Player abilities and spells
 * - Maps: Playable maps preview
 * - Achievements: Unlockable achievements
 * - Lore: Story and world building
 */

import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { TileCatalog } from "./sections/TileCatalog";
import { ObjectCatalog } from "./sections/ObjectCatalog";
import { EffectCatalog } from "./sections/EffectCatalog";
import { ElementCatalog } from "./sections/ElementCatalog";
import { EnemyCatalog } from "./sections/EnemyCatalog";
import { TowerCatalog } from "./sections/TowerCatalog";

/**
 * Catalog section configuration
 * Add new sections here to extend the catalog
 */
interface CatalogSection {
  id: string;
  label: string;
  component: React.ComponentType;
  description: string;
}

const CATALOG_SECTIONS: CatalogSection[] = [
  {
    id: "tiles",
    label: "Tiles",
    component: TileCatalog,
    description: "Ground types for building maps",
  },
  {
    id: "objects",
    label: "Objects",
    component: ObjectCatalog,
    description: "Decorations and structures",
  },
  {
    id: "effects",
    label: "Effects",
    component: EffectCatalog,
    description: "Status effects and debuffs",
  },
  {
    id: "elements",
    label: "Elements",
    component: ElementCatalog,
    description: "Elemental system with merge tree",
  },
  {
    id: "enemies",
    label: "Enemies",
    component: EnemyCatalog,
    description: "All enemy types and variants",
  },
  {
    id: "towers",
    label: "Towers",
    component: TowerCatalog,
    description: "Defense towers with merge paths",
  },
  // Future sections:
  // { id: "abilities", label: "Abilities", component: AbilityCatalog, description: "Player abilities" },
];

export function CatalogPage() {
  const [activeSection, setActiveSection] = useState(CATALOG_SECTIONS[0]!.id);

  const ActiveComponent =
    CATALOG_SECTIONS.find((s) => s.id === activeSection)?.component ??
    TileCatalog;

  return (
    <div className="flex h-full w-full flex-col bg-background">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-border px-6 py-4">
        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="text-foreground-muted hover:text-foreground transition-colors"
          >
            <BackIcon />
          </Link>
          <h1 className="font-pixel text-2xl text-accent-gold">Catalog</h1>
        </div>

        {/* Section tabs */}
        <nav className="flex gap-1">
          {CATALOG_SECTIONS.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`px-4 py-2 font-pixel text-xs transition-colors rounded ${
                activeSection === section.id
                  ? "bg-primary text-foreground"
                  : "text-foreground-muted hover:bg-background-tertiary hover:text-foreground"
              }`}
              title={section.description}
            >
              {section.label}
            </button>
          ))}
        </nav>

        {/* Placeholder for search/filter (future) */}
        <div className="w-32" />
      </header>

      {/* Content */}
      <main className="flex-1 overflow-auto p-6">
        <ActiveComponent />
      </main>

      {/* Footer */}
      <footer className="border-t border-border px-6 py-3">
        <p className="text-xs text-foreground-muted text-center">
          {CATALOG_SECTIONS.find((s) => s.id === activeSection)?.description}
        </p>
      </footer>
    </div>
  );
}

function BackIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M15 10H5M5 10L10 5M5 10L10 15" />
    </svg>
  );
}
