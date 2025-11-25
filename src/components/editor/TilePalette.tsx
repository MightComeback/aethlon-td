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
} from "@/components/ui/PixelIcon";

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

// Environment objects - B&W theme
const OBJECT_OPTIONS: Array<{
  type: PlaceableObjectType;
  label: string;
  color: string;
  Icon: React.ComponentType<{ size?: number; color?: string }>;
}> = [
  { type: "tree_pine", label: "Pine Tree", color: "#888888", Icon: IconTreePine },
  { type: "tree_oak", label: "Oak Tree", color: "#555555", Icon: IconTreeOak },
  { type: "rock", label: "Rock", color: "#888888", Icon: IconRock },
  { type: "bush", label: "Bush", color: "#555555", Icon: IconBush },
  { type: "grass", label: "Grass", color: "#888888", Icon: IconGrass },
  { type: "flower", label: "Flower", color: "#cccccc", Icon: IconFlower },
  { type: "tower_base", label: "Tower Spot", color: "#444444", Icon: IconTowerBase },
];

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

  return (
    <div className="pixel-panel w-36 flex flex-col">
      {/* Tabs - using grid for equal width */}
      <div className="grid grid-cols-2 gap-0 border-b border-border mb-3 -mx-4 -mt-4">
        <button
          onClick={() => setActiveTab("tiles")}
          className={`font-pixel text-2xs py-2 px-1 transition-colors text-center ${
            activeTab === "tiles"
              ? "bg-primary text-foreground"
              : "text-foreground-muted hover:bg-background-tertiary"
          }`}
        >
          Tiles
        </button>
        <button
          onClick={() => setActiveTab("objects")}
          className={`font-pixel text-2xs py-2 px-1 transition-colors text-center ${
            activeTab === "objects"
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
                className={`flex items-center gap-2 p-1.5 transition-colors rounded border ${
                  isSelected
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
          {OBJECT_OPTIONS.map(({ type, label, color, Icon }) => {
            const isSelected = selectedObjectType === type && currentTool === "object_place";
            return (
              <button
                key={type}
                onClick={() => handleObjectSelect(type)}
                className={`flex items-center gap-2 p-1.5 transition-colors rounded border ${
                  isSelected
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
          <p className="text-3xs text-foreground-muted/50 mt-3 text-center">
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
            ) : currentTool === "object_place" ? (
              <>
                <div
                  className="h-4 w-4 flex-shrink-0"
                  style={{
                    backgroundColor: OBJECT_OPTIONS.find((o) => o.type === selectedObjectType)?.color || "#666",
                  }}
                />
                <span className="truncate">
                  {OBJECT_OPTIONS.find((o) => o.type === selectedObjectType)?.label}
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
