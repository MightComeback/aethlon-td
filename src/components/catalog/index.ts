/**
 * Catalog Components
 *
 * The catalog system displays all game assets in a browsable interface.
 *
 * ## Current Sections
 * - TileCatalog: Map tile types (ground, path, water, etc.)
 * - ObjectCatalog: Placeable decorations and structures
 * - EnemyCatalog: All 100 enemies with tier variants
 *
 * ## Adding New Sections
 *
 * 1. Create a new component in `sections/` directory:
 *    ```tsx
 *    // sections/TowerCatalog.tsx
 *    export function TowerCatalog() {
 *      return <div>...</div>;
 *    }
 *    ```
 *
 * 2. Add to CATALOG_SECTIONS in CatalogPage.tsx:
 *    ```tsx
 *    {
 *      id: "towers",
 *      label: "Towers",
 *      component: TowerCatalog,
 *      description: "Defense towers and upgrades",
 *    }
 *    ```
 *
 * 3. Export from this index file
 *
 * ## Future Sections to Implement
 * - TowerCatalog: All tower types, upgrade paths, stats
 * - AbilityCatalog: Player abilities and spells
 * - MapCatalog: Playable maps with previews
 * - AchievementCatalog: Unlockable achievements
 * - LoreCatalog: Story entries and world building
 * - StatusEffectCatalog: Buffs, debuffs, and effects
 */

export { CatalogPage } from "./CatalogPage";
export { TileCatalog } from "./sections/TileCatalog";
export { ObjectCatalog } from "./sections/ObjectCatalog";
export { EnemyCatalog } from "./sections/EnemyCatalog";
