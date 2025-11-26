/**
 * Effect Catalog Section
 * Displays all status effects with filtering and search
 */

import { useState, useMemo } from "react";
import { EffectCategory } from "@/types/effects";
import {
  getAllEffectDefinitions,
  getEffectsByCategory,
} from "@/data/effects";
import type { EffectDefinition } from "@/types/effects";
import { PixelIcons, type PixelIconName } from "@/components/ui/PixelIcon";

const CATEGORY_FILTERS = [
  { id: "all", label: "All" },
  { id: EffectCategory.DamageOverTime, label: "Damage Over Time" },
  { id: EffectCategory.CrowdControl, label: "Crowd Control" },
  { id: EffectCategory.StatModifier, label: "Stat Modifiers" },
  { id: EffectCategory.DeathTrigger, label: "Death Triggers" },
];

export function EffectCatalog() {
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const allEffects = getAllEffectDefinitions();

  const filteredEffects = useMemo(() => {
    let effects = allEffects;

    // Filter by category
    if (categoryFilter !== "all") {
      effects = getEffectsByCategory(categoryFilter as EffectCategory);
    }

    // Filter by search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      effects = effects.filter(
        (e) =>
          e.name.toLowerCase().includes(query) ||
          e.description.toLowerCase().includes(query) ||
          e.type.toLowerCase().includes(query)
      );
    }

    // Sort by display priority
    return effects.sort((a, b) => a.displayPriority - b.displayPriority);
  }, [categoryFilter, searchQuery, allEffects]);

  return (
    <div className="space-y-6">
      {/* Header with filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-pixel text-lg text-foreground mb-2">Status Effects</h2>
          <p className="text-sm text-foreground-muted">
            {filteredEffects.length} of {allEffects.length} effects
          </p>
        </div>

        <div className="flex flex-wrap gap-4">
          {/* Search */}
          <input
            type="text"
            placeholder="Search effects..."
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
        </div>
      </div>

      {/* Effects grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredEffects.map((effect) => (
          <EffectCard key={effect.type} effect={effect} />
        ))}
      </div>

      {/* Empty state */}
      {filteredEffects.length === 0 && (
        <div className="text-center py-12">
          <p className="text-foreground-muted">No effects found matching your filters</p>
        </div>
      )}
    </div>
  );
}

function EffectCard({ effect }: { effect: EffectDefinition }) {
  return (
    <div className="pixel-panel">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div
            className="w-10 h-10 rounded flex items-center justify-center"
            style={{ backgroundColor: effect.color + "33", color: effect.color }}
          >
            {renderEffectIcon(effect.icon, 24)}
          </div>
          <div>
            <h3 className="font-pixel text-sm text-foreground">{effect.name}</h3>
            <span
              className="text-2xs px-2 py-0.5 rounded capitalize"
              style={{ backgroundColor: getCategoryColor(effect.category) + "33" }}
            >
              {getCategoryLabel(effect.category)}
            </span>
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="text-xs text-foreground-muted mb-3">{effect.description}</p>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-2 text-2xs">
        <div className="flex justify-between">
          <span className="text-foreground-muted">Stacking:</span>
          <span className="text-foreground">{getStackingLabel(effect.stackingBehavior)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-foreground-muted">Max Stacks:</span>
          <span className="text-foreground">{effect.maxStacks}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-foreground-muted">Duration:</span>
          <span className="text-foreground">{effect.defaultDuration}s</span>
        </div>
        {effect.tickInterval > 0 && (
          <div className="flex justify-between">
            <span className="text-foreground-muted">Tick:</span>
            <span className="text-foreground">{effect.tickInterval}s</span>
          </div>
        )}
      </div>

      {/* Flags */}
      <div className="flex gap-2 mt-3 pt-3 border-t border-border flex-wrap">
        {!effect.affectsBosses && (
          <span className="text-3xs px-2 py-0.5 bg-background-secondary rounded text-foreground-muted">
            No Boss
          </span>
        )}
        {!effect.affectsFlying && (
          <span className="text-3xs px-2 py-0.5 bg-background-secondary rounded text-foreground-muted">
            No Flying
          </span>
        )}
        {effect.isDispellable && (
          <span className="text-3xs px-2 py-0.5 bg-background-secondary rounded text-foreground-muted">
            Dispellable
          </span>
        )}
      </div>
    </div>
  );
}

// Map effect icon strings to PixelIcon keys
const EFFECT_ICON_MAP: Record<string, PixelIconName> = {
  flame: "fire",
  skull: "skull",
  droplet: "water",
  acid: "water",
  snail: "snail",
  snowflake: "snowflake",
  zap: "lightning-bolt",
  anchor: "anchor",
  "broken-leg": "bone",
  mute: "mute",
  "shield-off": "shield",
  "shield-x": "shield",
  "crystal-crack": "crystal",
  target: "target",
  "sword-crack": "sword",
  crosshair: "target",
  "broken-sword": "sword",
  "crosshair-explosion": "explosion",
  virus: "virus",
  gem: "gem",
};

function renderEffectIcon(icon: string, size: number): React.ReactNode {
  const iconName = EFFECT_ICON_MAP[icon] || "target";
  const IconComponent = PixelIcons[iconName];
  if (IconComponent) {
    return <IconComponent size={size} />;
  }
  return <PixelIcons.target size={size} />;
}

function getCategoryLabel(category: EffectCategory): string {
  const labels: Record<EffectCategory, string> = {
    [EffectCategory.DamageOverTime]: "DoT",
    [EffectCategory.CrowdControl]: "CC",
    [EffectCategory.StatModifier]: "Stat Mod",
    [EffectCategory.DeathTrigger]: "Death",
    [EffectCategory.Buff]: "Buff",
    [EffectCategory.Debuff]: "Debuff",
  };
  return labels[category] || category;
}

function getCategoryColor(category: EffectCategory): string {
  const colors: Record<EffectCategory, string> = {
    [EffectCategory.DamageOverTime]: "#e53935",
    [EffectCategory.CrowdControl]: "#1e88e5",
    [EffectCategory.StatModifier]: "#fb8c00",
    [EffectCategory.DeathTrigger]: "#8e24aa",
    [EffectCategory.Buff]: "#43a047",
    [EffectCategory.Debuff]: "#f4511e",
  };
  return colors[category] || "#666666";
}

function getStackingLabel(behavior: string): string {
  const labels: Record<string, string> = {
    refresh_duration: "Refresh",
    stack_intensity: "Stack",
    highest_wins: "Highest",
    independent: "Independent",
    unique: "Unique",
  };
  return labels[behavior] || behavior;
}
