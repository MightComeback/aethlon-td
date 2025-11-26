/**
 * Tower Catalog Section
 * Displays all towers with 3D previews
 */

import { useState, useMemo, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { TowerCategory } from "@/types/tower";
import {
  getAllTowers,
  getTowersByCategory,
  getTowersByTier,
  searchTowers,
  getRarityColor,
} from "@/data/towers";
import { TowerMeshPreview } from "@/components/game/towers";
import type { ExtendedTowerDefinition } from "@/types/tower";
import { IconClose } from "@/components/ui/PixelIcon";
import { BaseElement } from "@/types/element";

const CATEGORY_FILTERS = [
  { id: "all", label: "All" },
  { id: TowerCategory.Damage, label: "Damage" },
  { id: TowerCategory.MagicDamage, label: "Magic" },
  { id: TowerCategory.PhysicalDamage, label: "Physical" },
  { id: TowerCategory.Buff, label: "Buff" },
  { id: TowerCategory.Debuff, label: "Debuff" },
];

const TIER_FILTERS = [
  { id: "all", label: "All Tiers" },
  { id: 1, label: "Tier 1" },
  { id: 2, label: "Tier 2" },
  { id: 3, label: "Tier 3" },
];

export function TowerCatalog() {
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [tierFilter, setTierFilter] = useState<string | number>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTower, setSelectedTower] = useState<ExtendedTowerDefinition | null>(null);

  const filteredTowers = useMemo(() => {
    let towers = getAllTowers();

    // Filter by category
    if (categoryFilter !== "all") {
      towers = getTowersByCategory(categoryFilter as TowerCategory);
    }

    // Filter by tier
    if (tierFilter !== "all") {
      towers = getTowersByTier(tierFilter as 1 | 2 | 3);
    }

    // Filter by search
    if (searchQuery) {
      towers = searchTowers(searchQuery);
      if (categoryFilter !== "all") {
        towers = towers.filter((t) => t.category === categoryFilter);
      }
      if (tierFilter !== "all") {
        towers = towers.filter((t) => t.tier === tierFilter);
      }
    }

    return towers;
  }, [categoryFilter, tierFilter, searchQuery]);

  return (
    <div className="space-y-6">
      {/* Header with filters */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-pixel text-lg text-foreground mb-2">Towers</h2>
            <p className="text-sm text-foreground-muted">
              {filteredTowers.length} of {getAllTowers().length} towers
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-4">
          {/* Search */}
          <input
            type="text"
            placeholder="Search towers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-3 py-1.5 bg-background-secondary border border-border rounded text-sm text-foreground placeholder:text-foreground-muted/50 w-48"
          />

          {/* Category filter */}
          <div className="flex gap-1">
            {CATEGORY_FILTERS.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCategoryFilter(cat.id)}
                className={`px-3 py-1.5 text-xs rounded transition-colors ${
                  categoryFilter === cat.id
                    ? "bg-primary text-foreground"
                    : "bg-background-secondary text-foreground-muted hover:bg-background-tertiary"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Tier filter */}
          <div className="flex gap-1">
            {TIER_FILTERS.map((tier) => (
              <button
                key={tier.id}
                onClick={() => setTierFilter(tier.id)}
                className={`px-3 py-1.5 text-xs rounded transition-colors ${
                  tierFilter === tier.id
                    ? "bg-primary text-foreground"
                    : "bg-background-secondary text-foreground-muted hover:bg-background-tertiary"
                }`}
              >
                {tier.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tower grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredTowers.map((tower) => (
          <TowerCard
            key={tower.id}
            tower={tower}
            onClick={() => setSelectedTower(tower)}
          />
        ))}
      </div>

      {/* Empty state */}
      {filteredTowers.length === 0 && (
        <div className="text-center py-12">
          <p className="text-foreground-muted">No towers found matching your filters</p>
        </div>
      )}

      {/* Detail modal */}
      {selectedTower && (
        <TowerDetailModal tower={selectedTower} onClose={() => setSelectedTower(null)} />
      )}
    </div>
  );
}

function TowerCard({
  tower,
  onClick,
}: {
  tower: ExtendedTowerDefinition;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="pixel-panel flex flex-col text-left hover:border-foreground-muted transition-colors"
    >
      {/* 3D Preview */}
      <div className="h-28 bg-background-secondary rounded mb-3 overflow-hidden relative">
        <Canvas camera={{ position: [1.5, 1.5, 1.5], fov: 50 }}>
          <Suspense fallback={null}>
            <ambientLight intensity={0.6} />
            <directionalLight position={[5, 10, 5]} intensity={0.8} />
            <TowerMeshPreview definition={tower} scale={0.8} />
            <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={1.5} />
          </Suspense>
        </Canvas>

        {/* Tier badge */}
        <div className="absolute top-2 left-2 px-2 py-0.5 bg-background/80 text-foreground text-2xs rounded">
          T{tower.tier}
        </div>

        {/* Rarity badge */}
        <div
          className="absolute top-2 right-2 px-2 py-0.5 text-background text-2xs font-pixel rounded"
          style={{ backgroundColor: getRarityColor(tower.rarity) }}
        >
          {tower.rarity}
        </div>
      </div>

      {/* Info */}
      <div className="flex-1">
        <h3 className="font-pixel text-sm text-foreground">{tower.name}</h3>
        <div className="flex gap-2 mt-1">
          <span className="text-2xs px-2 py-0.5 bg-background-secondary rounded capitalize">
            {tower.category}
          </span>
          {tower.tier === 1 && (
            <span className="text-2xs px-2 py-0.5 bg-accent-gold/20 text-accent-gold rounded">
              {getT1PassiveName(tower.element as BaseElement)}
            </span>
          )}
        </div>
        <p className="text-2xs text-foreground-muted mt-2 line-clamp-2">{tower.description}</p>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-border">
        <StatBadge label="DMG" value={tower.baseStats.damage} />
        <StatBadge label="AS" value={tower.baseStats.attackSpeed.toFixed(1)} />
        <StatBadge label="RNG" value={tower.baseStats.range.toFixed(1)} />
      </div>
    </button>
  );
}

function TowerDetailModal({
  tower,
  onClose,
}: {
  tower: ExtendedTowerDefinition;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div
        className="pixel-panel max-w-4xl w-full max-h-[90vh] overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="font-pixel text-xl text-foreground">{tower.name}</h2>
            <p className="text-sm text-foreground-muted mt-1">{tower.description}</p>
          </div>
          <button onClick={onClose} className="text-foreground-muted hover:text-foreground p-1">
            <IconClose size={16} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 3D Preview */}
          <div className="h-64 bg-background-secondary rounded overflow-hidden">
            <Canvas camera={{ position: [2, 2, 2], fov: 50 }}>
              <Suspense fallback={null}>
                <ambientLight intensity={0.6} />
                <directionalLight position={[5, 10, 5]} intensity={0.8} />
                <TowerMeshPreview definition={tower} scale={1} />
                <OrbitControls enableZoom={true} enablePan={false} />
              </Suspense>
            </Canvas>
          </div>

          {/* Stats */}
          <div className="space-y-4">
            {/* Badges */}
            <div className="flex gap-2 flex-wrap">
              <span className="px-2 py-1 bg-background-tertiary rounded text-sm">
                Tier {tower.tier}
              </span>
              <span
                className="px-2 py-1 rounded text-sm text-background"
                style={{ backgroundColor: getRarityColor(tower.rarity) }}
              >
                {tower.rarity}
              </span>
              <span className="px-2 py-1 bg-background-tertiary rounded text-sm capitalize">
                {tower.category}
              </span>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <StatRow label="Damage" value={tower.baseStats.damage} />
              <StatRow label="Attack Speed" value={`${tower.baseStats.attackSpeed.toFixed(2)}/s`} />
              <StatRow label="Range" value={`${tower.baseStats.range.toFixed(1)} tiles`} />
              <StatRow label="Cost" value={`${tower.baseStats.cost} gold`} />
              <StatRow label="Health" value={tower.baseStats.health} />
              <StatRow label="Armor" value={tower.baseStats.armor} />
              {tower.baseStats.magicPen > 0 && <StatRow label="Magic Pen" value={tower.baseStats.magicPen} />}
              {tower.baseStats.armorPen > 0 && <StatRow label="Armor Pen" value={tower.baseStats.armorPen} />}
            </div>

            {/* Ability */}
            {tower.ability && (
              <div className="p-3 bg-background-secondary rounded">
                <div className="text-xs text-foreground-muted uppercase mb-1">Active Ability</div>
                <div className="text-sm text-foreground">{tower.ability.name}</div>
                <div className="text-2xs text-foreground-muted mt-1">{tower.ability.description}</div>
                <div className="text-2xs text-foreground-muted mt-1">
                  Cooldown: {tower.ability.cooldown / 1000}s
                </div>
              </div>
            )}

            {/* Status Effect */}
            {tower.statusEffect && (
              <div className="p-3 bg-background-secondary rounded">
                <div className="text-xs text-foreground-muted uppercase mb-1">Applies</div>
                <div className="text-sm text-foreground capitalize">{tower.statusEffect.type}</div>
                <div className="text-2xs text-foreground-muted mt-1">
                  Chance: {(tower.statusEffect.chance * 100).toFixed(0)}% | Duration:{" "}
                  {tower.statusEffect.duration}s
                </div>
              </div>
            )}

            {/* Buff */}
            {tower.buff && (
              <div className="p-3 bg-background-secondary rounded">
                <div className="text-xs text-foreground-muted uppercase mb-1">Buff Aura</div>
                <div className="text-sm text-foreground capitalize">{tower.buff.type.replace("_", " ")}</div>
                <div className="text-2xs text-foreground-muted mt-1">
                  Radius: {tower.buff.radius} tiles | Strength: +{(tower.buff.strength * 100).toFixed(0)}%
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatBadge({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="text-center">
      <div className="text-3xs text-foreground-muted uppercase">{label}</div>
      <div className="text-xs text-foreground font-mono">{value}</div>
    </div>
  );
}

function StatRow({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex justify-between py-1 px-2 bg-background-secondary rounded">
      <span className="text-foreground-muted">{label}</span>
      <span className="text-foreground font-mono">{value}</span>
    </div>
  );
}

function getT1PassiveName(element: BaseElement): string {
  const passives = {
    [BaseElement.Fire]: "Crit",
    [BaseElement.Water]: "Pierce",
    [BaseElement.Earth]: "Splash",
    [BaseElement.Air]: "Speed",
    [BaseElement.Lightning]: "Range",
  };
  return passives[element] || "Passive";
}
