/**
 * Enemy Catalog Section
 * Displays all enemy types with tier variants and stats
 */

import { useState, useMemo, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { EnemyCategory } from "@/types/enemy";
import {
  ENEMY_DATABASE,
  getEnemiesByCategory,
  applyTier,
  getTierName,
  getTierDisplayColor,
} from "@/data/enemies";
import { EnemyMeshPreview } from "@/components/game/enemies/EnemyMesh";
import type { EnemyDefinition } from "@/types/enemy";

const CATEGORY_FILTERS = [
  { id: "all", label: "All", count: ENEMY_DATABASE.size },
  { id: EnemyCategory.Ground, label: "Ground", count: getEnemiesByCategory(EnemyCategory.Ground).length },
  { id: EnemyCategory.Flying, label: "Flying", count: getEnemiesByCategory(EnemyCategory.Flying).length },
  { id: EnemyCategory.Boss, label: "Boss", count: getEnemiesByCategory(EnemyCategory.Boss).length },
];

const TIERS = [1, 2, 3, 4, 5];

export function EnemyCatalog() {
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [selectedTier, setSelectedTier] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEnemy, setSelectedEnemy] = useState<EnemyDefinition | null>(null);

  const filteredEnemies = useMemo(() => {
    let enemies = Array.from(ENEMY_DATABASE.values());

    // Filter by category
    if (categoryFilter !== "all") {
      enemies = enemies.filter((e) => e.category === categoryFilter);
    }

    // Filter by search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      enemies = enemies.filter(
        (e) =>
          e.name.toLowerCase().includes(query) ||
          e.description.toLowerCase().includes(query) ||
          e.type.toLowerCase().includes(query)
      );
    }

    return enemies;
  }, [categoryFilter, searchQuery]);

  return (
    <div className="space-y-6">
      {/* Header with filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-pixel text-lg text-foreground mb-2">Enemies</h2>
          <p className="text-sm text-foreground-muted">
            {filteredEnemies.length} of {ENEMY_DATABASE.size} enemies
          </p>
        </div>

        <div className="flex flex-wrap gap-4">
          {/* Search */}
          <input
            type="text"
            placeholder="Search enemies..."
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
                {cat.label} ({cat.count})
              </button>
            ))}
          </div>

          {/* Tier selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-foreground-muted">Tier:</span>
            <div className="flex gap-1">
              {TIERS.map((tier) => (
                <button
                  key={tier}
                  onClick={() => setSelectedTier(tier)}
                  className={`w-7 h-7 text-xs rounded border transition-colors ${
                    selectedTier === tier
                      ? "border-foreground bg-primary text-foreground"
                      : "border-border bg-background-secondary text-foreground-muted hover:border-foreground-muted"
                  }`}
                  style={{
                    color: selectedTier === tier ? undefined : getTierDisplayColor(tier),
                  }}
                >
                  {tier}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tier info */}
      <div className="flex items-center gap-4 px-4 py-2 bg-background-secondary rounded">
        <span className="text-xs text-foreground-muted">Viewing:</span>
        <span
          className="font-pixel text-sm"
          style={{ color: getTierDisplayColor(selectedTier) }}
        >
          {getTierName(selectedTier)} (Tier {selectedTier})
        </span>
        <span className="text-2xs text-foreground-muted">
          Stats multiplied by tier scaling
        </span>
      </div>

      {/* Enemy grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredEnemies.map((enemy) => (
          <EnemyCard
            key={enemy.type}
            enemy={enemy}
            tier={selectedTier}
            onClick={() => setSelectedEnemy(enemy)}
          />
        ))}
      </div>

      {/* Empty state */}
      {filteredEnemies.length === 0 && (
        <div className="text-center py-12">
          <p className="text-foreground-muted">No enemies found matching your filters</p>
        </div>
      )}

      {/* Detail modal */}
      {selectedEnemy && (
        <EnemyDetailModal
          enemy={selectedEnemy}
          tier={selectedTier}
          onClose={() => setSelectedEnemy(null)}
        />
      )}
    </div>
  );
}

function EnemyCard({
  enemy,
  tier,
  onClick,
}: {
  enemy: EnemyDefinition;
  tier: number;
  onClick: () => void;
}) {
  const stats = applyTier(enemy.baseStats, tier);

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
            <EnemyMeshPreview definition={enemy} tier={tier} scale={0.8} />
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              autoRotate
              autoRotateSpeed={1.5}
            />
          </Suspense>
        </Canvas>

        {/* Boss badge */}
        {enemy.isBoss && (
          <div className="absolute top-2 right-2 px-2 py-0.5 bg-accent-gold text-background text-2xs font-pixel rounded">
            BOSS
          </div>
        )}

        {/* Category badge */}
        <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-background/80 text-foreground-muted text-2xs rounded capitalize">
          {enemy.category}
        </div>
      </div>

      {/* Info */}
      <div className="flex-1">
        <h3 className="font-pixel text-sm text-foreground">{enemy.name}</h3>
        <p className="text-2xs text-foreground-muted mt-1 line-clamp-2">
          {enemy.description}
        </p>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-border">
        <StatBadge label="HP" value={stats.maxHealth} />
        <StatBadge label="SPD" value={stats.speed.toFixed(1)} />
        <StatBadge label="ARM" value={stats.armor} />
      </div>
    </button>
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

function EnemyDetailModal({
  enemy,
  tier,
  onClose,
}: {
  enemy: EnemyDefinition;
  tier: number;
  onClose: () => void;
}) {
  const stats = applyTier(enemy.baseStats, tier);

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="pixel-panel max-w-2xl w-full max-h-[90vh] overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="font-pixel text-xl text-foreground">{enemy.name}</h2>
            <p className="text-sm text-foreground-muted mt-1">{enemy.description}</p>
          </div>
          <button
            onClick={onClose}
            className="text-foreground-muted hover:text-foreground p-1"
          >
            <CloseIcon />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 3D Preview */}
          <div className="h-64 bg-background-secondary rounded overflow-hidden">
            <Canvas camera={{ position: [2, 2, 2], fov: 50 }}>
              <Suspense fallback={null}>
                <ambientLight intensity={0.6} />
                <directionalLight position={[5, 10, 5]} intensity={0.8} />
                <EnemyMeshPreview definition={enemy} tier={tier} scale={1} />
                <OrbitControls enableZoom={true} enablePan={false} />
              </Suspense>
            </Canvas>
          </div>

          {/* Stats */}
          <div className="space-y-4">
            {/* Tier badge */}
            <div className="flex items-center gap-2">
              <span
                className="font-pixel text-sm px-2 py-1 rounded"
                style={{
                  backgroundColor: getTierDisplayColor(tier) + "33",
                  color: getTierDisplayColor(tier),
                }}
              >
                {getTierName(tier)} (Tier {tier})
              </span>
              {enemy.isBoss && (
                <span className="font-pixel text-sm px-2 py-1 bg-accent-gold text-background rounded">
                  BOSS
                </span>
              )}
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-3">
              <StatRow label="Health" value={stats.maxHealth} />
              <StatRow label="Speed" value={`${stats.speed.toFixed(2)} tiles/s`} />
              <StatRow label="Armor" value={stats.armor} />
              <StatRow label="Magic Resist" value={stats.magicResistance} />
              <StatRow label="Bounty" value={`${stats.bounty} gold`} />
              <StatRow label="Score" value={stats.score} />
            </div>

            {/* Special ability */}
            {enemy.specialAbility && enemy.specialAbility.type !== "none" && (
              <div className="p-3 bg-background-secondary rounded">
                <div className="text-xs text-foreground-muted uppercase mb-1">
                  Special Ability
                </div>
                <div className="text-sm text-foreground capitalize">
                  {enemy.specialAbility.type}
                </div>
                <div className="text-2xs text-foreground-muted mt-1">
                  Cooldown: {enemy.specialAbility.cooldown / 1000}s
                  {enemy.specialAbility.duration &&
                    ` | Duration: ${enemy.specialAbility.duration / 1000}s`}
                  {enemy.specialAbility.strength &&
                    ` | Strength: ${enemy.specialAbility.strength}`}
                </div>
              </div>
            )}

            {/* Metadata */}
            <div className="text-2xs text-foreground-muted space-y-1">
              <div>
                <span className="text-foreground-muted/70">Category:</span>{" "}
                <span className="capitalize">{enemy.category}</span>
              </div>
              <div>
                <span className="text-foreground-muted/70">Type ID:</span>{" "}
                <span className="font-mono">{enemy.type}</span>
              </div>
              {enemy.unlockWave && (
                <div>
                  <span className="text-foreground-muted/70">Appears from:</span>{" "}
                  Wave {enemy.unlockWave}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* All tier comparison */}
        <div className="mt-6 pt-4 border-t border-border">
          <h3 className="font-pixel text-sm text-foreground mb-3">All Tier Stats</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="text-foreground-muted text-left">
                  <th className="pb-2">Tier</th>
                  <th className="pb-2">HP</th>
                  <th className="pb-2">Speed</th>
                  <th className="pb-2">Armor</th>
                  <th className="pb-2">M.Resist</th>
                  <th className="pb-2">Bounty</th>
                </tr>
              </thead>
              <tbody>
                {[1, 2, 3, 4, 5].map((t) => {
                  const s = applyTier(enemy.baseStats, t);
                  return (
                    <tr
                      key={t}
                      className={t === tier ? "text-foreground" : "text-foreground-muted"}
                    >
                      <td className="py-1">
                        <span
                          className="inline-block w-6 text-center rounded"
                          style={{
                            backgroundColor: t === tier ? getTierDisplayColor(t) + "33" : undefined,
                            color: getTierDisplayColor(t),
                          }}
                        >
                          {t}
                        </span>
                      </td>
                      <td className="py-1 font-mono">{s.maxHealth}</td>
                      <td className="py-1 font-mono">{s.speed.toFixed(2)}</td>
                      <td className="py-1 font-mono">{s.armor}</td>
                      <td className="py-1 font-mono">{s.magicResistance}</td>
                      <td className="py-1 font-mono">{s.bounty}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatRow({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex justify-between items-center py-1.5 px-2 bg-background-secondary rounded">
      <span className="text-xs text-foreground-muted">{label}</span>
      <span className="text-sm text-foreground font-mono">{value}</span>
    </div>
  );
}

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M15 5L5 15M5 5L15 15" />
    </svg>
  );
}
