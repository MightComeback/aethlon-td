/**
 * Element Catalog Section
 * Displays all elements with their properties and merge recipes
 */

import { useState, useMemo } from "react";
import { ElementTier } from "@/types/element";
import {
  getAllElementDefinitions,
  getElementsByTier,
  getPossibleMerges,
  getRecipeForElement,
  getElementColor,
} from "@/data/elements";
import type { ElementDefinition } from "@/types/element";
import { PixelIcons, type PixelIconName, IconClose } from "@/components/ui/PixelIcon";

const TIER_FILTERS = [
  { id: "all", label: "All Tiers" },
  { id: ElementTier.Base, label: "Base (T1)" },
  { id: ElementTier.Merged2, label: "Merged (T2)" },
  { id: ElementTier.Merged3, label: "Advanced (T3)" },
];

export function ElementCatalog() {
  const [tierFilter, setTierFilter] = useState<string | number>("all");
  const [selectedElement, setSelectedElement] = useState<ElementDefinition | null>(null);

  const allElements = getAllElementDefinitions();

  const filteredElements = useMemo(() => {
    if (tierFilter === "all") return allElements;
    return getElementsByTier(tierFilter as ElementTier);
  }, [tierFilter, allElements]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-pixel text-lg text-foreground mb-2">Elements</h2>
          <p className="text-sm text-foreground-muted">
            {filteredElements.length} of {allElements.length} elements
          </p>
        </div>

        {/* Tier filter */}
        <div className="flex gap-1">
          {TIER_FILTERS.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setTierFilter(filter.id)}
              className={`px-3 py-1.5 text-xs rounded transition-colors ${
                tierFilter === filter.id
                  ? "bg-primary text-foreground"
                  : "bg-background-secondary text-foreground-muted hover:bg-background-tertiary"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Element grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredElements.map((element) => (
          <ElementCard
            key={element.id}
            element={element}
            onClick={() => setSelectedElement(element)}
            isSelected={selectedElement?.id === element.id}
          />
        ))}
      </div>

      {/* Detail panel */}
      {selectedElement && (
        <div className="pixel-panel p-6 bg-background-secondary">
          <ElementDetail
            element={selectedElement}
            onClose={() => setSelectedElement(null)}
          />
        </div>
      )}
    </div>
  );
}

function ElementCard({
  element,
  onClick,
  isSelected,
}: {
  element: ElementDefinition;
  onClick: () => void;
  isSelected: boolean;
}) {
  const recipe = getRecipeForElement(element.id);

  return (
    <button
      onClick={onClick}
      className={`pixel-panel flex flex-col text-left transition-colors ${
        isSelected ? "border-foreground-muted" : ""
      }`}
    >
      {/* Element swatch with gradient */}
      <div
        className="h-20 rounded mb-3 flex items-center justify-center"
        style={{
          background: element.secondaryColor
            ? `linear-gradient(135deg, ${element.color} 0%, ${element.secondaryColor} 100%)`
            : element.color,
        }}
      >
        {renderElementIcon(element.icon, 32)}
      </div>

      {/* Info */}
      <div className="flex-1">
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-pixel text-sm text-foreground">{element.name}</h3>
          <span className="text-2xs px-2 py-0.5 bg-background-secondary rounded">
            T{element.tier}
          </span>
        </div>
        <p className="text-xs text-foreground-muted line-clamp-2">{element.description}</p>
      </div>

      {/* Recipe */}
      {recipe && (
        <div className="mt-3 pt-3 border-t border-border text-2xs text-foreground-muted">
          <span className="text-foreground-muted/70">Recipe:</span>{" "}
          {recipe.inputs.map((input, i) => (
            <span key={i}>
              {i > 0 && " + "}
              <span style={{ color: getElementColor(input) }}>
                {input}
              </span>
            </span>
          ))}
        </div>
      )}
    </button>
  );
}

function ElementDetail({
  element,
  onClose,
}: {
  element: ElementDefinition;
  onClose: () => void;
}) {
  const possibleMerges = getPossibleMerges(element.id);
  const recipe = getRecipeForElement(element.id);

  return (
    <div>
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-pixel text-xl text-foreground">{element.name}</h3>
          <p className="text-sm text-foreground-muted mt-1">{element.description}</p>
        </div>
        <button onClick={onClose} className="text-foreground-muted hover:text-foreground">
          <IconClose size={16} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Colors */}
        <div>
          <h4 className="text-xs text-foreground-muted uppercase mb-2">Colors</h4>
          <div className="flex gap-2">
            <div className="flex-1">
              <div className="h-12 rounded" style={{ backgroundColor: element.color }} />
              <span className="text-3xs text-foreground-muted font-mono">{element.color}</span>
            </div>
            {element.secondaryColor && (
              <div className="flex-1">
                <div className="h-12 rounded" style={{ backgroundColor: element.secondaryColor }} />
                <span className="text-3xs text-foreground-muted font-mono">
                  {element.secondaryColor}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Effectiveness */}
        <div>
          <h4 className="text-xs text-foreground-muted uppercase mb-2">Effectiveness</h4>
          <div className="space-y-1 text-xs">
            {element.strongAgainst.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-green-500">Strong vs:</span>
                <span className="text-foreground">{element.strongAgainst.join(", ")}</span>
              </div>
            )}
            {element.weakAgainst.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-red-500">Weak vs:</span>
                <span className="text-foreground">{element.weakAgainst.join(", ")}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Recipe */}
      {recipe && (
        <div className="mt-4 pt-4 border-t border-border">
          <h4 className="text-xs text-foreground-muted uppercase mb-2">Created From</h4>
          <div className="flex items-center gap-2 text-sm">
            {recipe.inputs.map((input, i) => (
              <span key={i}>
                {i > 0 && <span className="text-foreground-muted">+</span>}
                <span
                  className="px-2 py-1 rounded"
                  style={{
                    backgroundColor: getElementColor(input) + "33",
                    color: getElementColor(input),
                  }}
                >
                  {input}
                </span>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Possible merges */}
      {possibleMerges.length > 0 && (
        <div className="mt-4 pt-4 border-t border-border">
          <h4 className="text-xs text-foreground-muted uppercase mb-2">
            Can Merge With ({possibleMerges.length})
          </h4>
          <div className="flex flex-wrap gap-2">
            {possibleMerges.map(({ recipe, otherInput }, idx) => (
              <div
                key={idx}
                className="text-2xs px-2 py-1 rounded bg-background-tertiary text-foreground-muted"
              >
                + {otherInput} = <span style={{ color: getElementColor(recipe.output) }}>{recipe.output}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Map element icon strings to PixelIcon keys
const ELEMENT_ICON_MAP: Record<string, PixelIconName> = {
  fire: "fire",
  water: "water",
  mountain: "mountain",
  wind: "wind",
  "lightning-bolt": "lightning-bolt",
  "cloud-steam": "cloud-rain",
  "volcano-lava": "volcano",
  plasma: "fire",
  "storm-cloud": "storm-cloud",
  snowflake: "snowflake",
  fog: "cloud-rain",
  "lightning-rain": "cloud-lightning",
  "dust-cloud": "wind",
  crystal: "crystal",
  thunder: "lightning-bolt",
  volcano: "volcano",
  inferno: "fire",
  wave: "water",
  snowstorm: "snowflake",
  earthquake: "mountain",
  "mountain-peak": "mountain",
  hurricane: "hurricane",
  tornado: "hurricane",
  supercell: "storm-cloud",
  "electric-crystal": "lightning-bolt",
  aurora: "star",
  sandstorm: "wind",
  geyser: "water",
  monsoon: "cloud-rain",
  meteor: "fire",
};

function renderElementIcon(icon: string, size: number): React.ReactNode {
  const iconName = ELEMENT_ICON_MAP[icon] || "star";
  const IconComponent = PixelIcons[iconName];
  if (IconComponent) {
    return <IconComponent size={size} />;
  }
  return <PixelIcons.star size={size} />;
}

