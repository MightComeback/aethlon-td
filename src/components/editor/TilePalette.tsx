import { useState } from "react";
import { useEditorStore, type PlaceableObjectType } from "@/stores/editorStore";
import { TileType } from "@/types/map";
import {
  IconTileGround,
  IconTilePath,
  IconTileWater,
  IconTileBlocked,
  IconTileSpawn,
  IconTileExit,
  IconTreePine,
  IconTreeOak,
  IconRock,
  IconBush,
  IconGrass,
  IconFlower,
  IconTowerBase,
  IconLargeHouse,
  IconFarmhouse,
  IconBarn,
  IconWindmillStructure,
  IconMarket,
  IconInn,
  IconBlacksmith,
  IconChurch,
  IconBridge,
  IconPier,
  IconWall,
  IconGate,
} from "@/components/ui/PixelIcon";
import {
  OBJECT_METADATA,
  OBJECT_CATEGORIES,
  getObjectsByCategory,
  type EditorObjectType,
} from "@/utils/objects.utils";

// Tile configuration with icons and colors - B&W theme
const TILE_OPTIONS: Array<{
  type: TileType;
  label: string;
  color: string;
  Icon: React.ComponentType<{ size?: number; color?: string }>;
}> = [
    { type: TileType.Ground, label: "Ground", color: "#333333", Icon: IconTileGround },
    { type: TileType.Path, label: "Path", color: "#666666", Icon: IconTilePath },
    { type: TileType.Water, label: "Water", color: "#1a1a1a", Icon: IconTileWater },
    { type: TileType.Blocked, label: "Blocked", color: "#0a0a0a", Icon: IconTileBlocked },
    { type: TileType.Spawn, label: "Spawn", color: "#ffffff", Icon: IconTileSpawn },
    { type: TileType.Exit, label: "Exit", color: "#888888", Icon: IconTileExit },
  ];

// Icons for objects that have them
const OBJECT_ICONS: Partial<Record<EditorObjectType, React.ComponentType<{ size?: number; color?: string }>>> = {
  tree_pine: IconTreePine,
  tree_oak: IconTreeOak,
  rock: IconRock,
  bush: IconBush,
  grass: IconGrass,
  flower: IconFlower,
  tower_base: IconTowerBase,
  // Multi-tile structures
  large_house: IconLargeHouse,
  farmhouse: IconFarmhouse,
  barn: IconBarn,
  windmill_structure: IconWindmillStructure,
  market: IconMarket,
  inn: IconInn,
  blacksmith: IconBlacksmith,
  church: IconChurch,
  bridge: IconBridge,
  pier: IconPier,
  wall: IconWall,
  gate: IconGate,
};

// Category display names
const CATEGORY_LABELS: Record<string, string> = {
  trees: "Trees",
  terrain: "Terrain",
  plants: "Plants",
  structures: "Buildings",
  decorations: "Decor",
  multi_structures: "Large",
};

type PaletteTab = "tiles" | "objects";

export function TilePalette() {
  const {
    selectedTileType,
    setSelectedTileType,
    selectedObjectType,
    setSelectedObjectType,
    currentTool,
    setTool,
  } = useEditorStore();
  const [activeTab, setActiveTab] = useState<PaletteTab>("tiles");
  const [activeCategory, setActiveCategory] = useState<string>("trees");

  const handleTileSelect = (type: TileType) => {
    setSelectedTileType(type);
    // Auto-switch to paint tool when selecting a tile
    if (currentTool === "object_place" || currentTool === "object_remove" || currentTool === "select") {
      setTool("paint");
    }
  };

  const handleObjectSelect = (type: PlaceableObjectType) => {
    // If clicking on already selected object while in object_place mode, deselect
    if (selectedObjectType === type && currentTool === "object_place") {
      setTool("paint");
      return;
    }

    setSelectedObjectType(type);
    // Auto-switch to object_place tool when selecting an object
    if (currentTool !== "object_remove") {
      setTool("object_place");
    }
  };

  // Get objects for current category
  const categoryObjects = getObjectsByCategory(activeCategory);

  return (
    <div className="w-44 flex flex-col">
      {/* Main Tabs - Tiles / Objects */}
      <div className="grid grid-cols-2 gap-0 border-b border-border mb-2">
        <button
          onClick={() => setActiveTab("tiles")}
          className={`font-pixel text-2xs py-2 px-1 transition-colors text-center ${activeTab === "tiles"
            ? "bg-primary text-foreground"
            : "text-foreground-muted hover:bg-background-tertiary"
            }`}
        >
          Tiles
        </button>
        <button
          onClick={() => setActiveTab("objects")}
          className={`font-pixel text-2xs py-2 px-1 transition-colors text-center ${activeTab === "objects"
            ? "bg-primary text-foreground"
            : "text-foreground-muted hover:bg-background-tertiary"
            }`}
        >
          Objects
        </button>
      </div>

      {/* Content */}
      {activeTab === "tiles" ? (
        <div className="flex flex-col gap-1">
          {TILE_OPTIONS.map(({ type, label, color, Icon }) => {
            const isSelected = selectedTileType === type;
            return (
              <button
                key={type}
                onClick={() => handleTileSelect(type)}
                className={`flex items-center gap-2 p-1.5 transition-colors rounded border ${isSelected
                  ? "bg-primary border-foreground-muted"
                  : "border-transparent hover:bg-background-tertiary"
                  }`}
              >
                <div
                  className="flex items-center justify-center h-7 w-7 border border-foreground-muted/30 flex-shrink-0"
                  style={{ backgroundColor: `${color}33` }}
                >
                  <Icon size={16} color={color} />
                </div>
                <span className={`text-2xs truncate ${isSelected ? "text-foreground" : "text-foreground-muted"}`}>{label}</span>
              </button>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col gap-1">
          {/* Category sub-tabs */}
          <div className="flex flex-wrap gap-1 mb-2 pb-2 border-b border-border/50">
            {OBJECT_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-1.5 py-0.5 text-3xs rounded transition-colors ${
                  activeCategory === cat
                    ? "bg-accent-gold/20 text-accent-gold"
                    : "text-foreground-muted hover:bg-background-tertiary"
                }`}
              >
                {CATEGORY_LABELS[cat] || cat}
              </button>
            ))}
          </div>

          {/* Objects list */}
          <div className="flex flex-col gap-1 max-h-64 overflow-y-auto">
            {categoryObjects.map((type) => {
              const meta = OBJECT_METADATA[type];
              const Icon = OBJECT_ICONS[type];
              const isSelected = selectedObjectType === type && currentTool === "object_place";
              return (
                <button
                  key={type}
                  onClick={() => handleObjectSelect(type as PlaceableObjectType)}
                  className={`flex items-center gap-2 p-1.5 transition-colors rounded border ${isSelected
                    ? "bg-primary border-foreground-muted"
                    : "border-transparent hover:bg-background-tertiary"
                    }`}
                >
                  <div
                    className="flex items-center justify-center h-6 w-6 border border-foreground-muted/30 flex-shrink-0 rounded-sm"
                    style={{ backgroundColor: `${meta.color}33` }}
                  >
                    {Icon ? (
                      <Icon size={14} color={meta.color} />
                    ) : (
                      <span
                        className="text-2xs font-bold"
                        style={{ color: meta.color }}
                      >
                        {meta.label.charAt(0)}
                      </span>
                    )}
                  </div>
                  <span className={`text-2xs truncate ${isSelected ? "text-foreground" : "text-foreground-muted"}`}>
                    {meta.label}
                  </span>
                </button>
              );
            })}
          </div>

          <p className="text-3xs text-foreground-muted/50 mt-2 text-center">
            {currentTool === "object_place" ? "Click to deselect" : "Click to select"}
          </p>
        </div>
      )}

      {/* Current Selection Info */}
      <div className="mt-auto pt-3 border-t border-border">
        <div className="text-2xs text-foreground-muted">
          <span className="text-foreground-muted/50 text-3xs uppercase tracking-wide">
            {activeTab === "tiles" ? "Brush" : "Object"}
          </span>
          <div className="flex items-center gap-2 mt-1">
            {activeTab === "tiles" ? (
              <>
                <div
                  className="h-4 w-4 flex-shrink-0"
                  style={{
                    backgroundColor: TILE_OPTIONS.find((t) => t.type === selectedTileType)?.color || "#fff",
                  }}
                />
                <span className="truncate">
                  {TILE_OPTIONS.find((t) => t.type === selectedTileType)?.label}
                </span>
              </>
            ) : currentTool === "object_place" && selectedObjectType ? (
              <>
                <div
                  className="h-4 w-4 flex-shrink-0"
                  style={{
                    backgroundColor: OBJECT_METADATA[selectedObjectType as EditorObjectType]?.color || "#666",
                  }}
                />
                <span className="truncate">
                  {OBJECT_METADATA[selectedObjectType as EditorObjectType]?.label || selectedObjectType}
                </span>
              </>
            ) : (
              <span className="text-foreground-muted/50 italic">None</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
