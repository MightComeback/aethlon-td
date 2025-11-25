/**
 * Tile Catalog Section
 * Displays all tile types used for map building
 */

import { TileType } from "@/types/map";
import {
  IconTileGround,
  IconTilePath,
  IconTileWater,
  IconTileBlocked,
  IconTileSpawn,
  IconTileExit,
} from "@/components/ui/PixelIcon";

interface TileInfo {
  type: TileType;
  label: string;
  color: string;
  description: string;
  usage: string;
  Icon: React.ComponentType<{ size?: number; color?: string }>;
}

const TILES: TileInfo[] = [
  {
    type: TileType.Ground,
    label: "Ground",
    color: "#333333",
    description: "Standard buildable terrain",
    usage: "Towers can be placed on ground tiles",
    Icon: IconTileGround,
  },
  {
    type: TileType.Path,
    label: "Path",
    color: "#666666",
    description: "Enemy movement path",
    usage: "Enemies walk along path tiles from spawn to exit",
    Icon: IconTilePath,
  },
  {
    type: TileType.Water,
    label: "Water",
    color: "#1a1a1a",
    description: "Impassable water terrain",
    usage: "Blocks enemy movement and tower placement",
    Icon: IconTileWater,
  },
  {
    type: TileType.Blocked,
    label: "Blocked",
    color: "#0a0a0a",
    description: "Obstacle terrain",
    usage: "Cannot be traversed or built upon",
    Icon: IconTileBlocked,
  },
  {
    type: TileType.Spawn,
    label: "Spawn",
    color: "#ffffff",
    description: "Enemy spawn point",
    usage: "Enemies appear at spawn tiles at wave start",
    Icon: IconTileSpawn,
  },
  {
    type: TileType.Exit,
    label: "Exit",
    color: "#888888",
    description: "Enemy destination",
    usage: "Enemies reaching exit cause life loss",
    Icon: IconTileExit,
  },
];

export function TileCatalog() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="font-pixel text-lg text-foreground mb-2">Tile Types</h2>
        <p className="text-sm text-foreground-muted">
          {TILES.length} tile types available for map building
        </p>
      </div>

      {/* Grid of tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {TILES.map((tile) => (
          <TileCard key={tile.type} tile={tile} />
        ))}
      </div>
    </div>
  );
}

function TileCard({ tile }: { tile: TileInfo }) {
  return (
    <div className="pixel-panel flex gap-4">
      {/* Tile preview */}
      <div
        className="w-16 h-16 flex items-center justify-center flex-shrink-0 border border-border"
        style={{ backgroundColor: tile.color }}
      >
        <tile.Icon size={32} color={tile.color === "#ffffff" ? "#333333" : "#ffffff"} />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h3 className="font-pixel text-sm text-foreground">{tile.label}</h3>
        <p className="text-xs text-foreground-muted mt-1">{tile.description}</p>
        <p className="text-2xs text-foreground-muted/70 mt-2 italic">{tile.usage}</p>
      </div>

      {/* Color swatch */}
      <div className="flex flex-col items-end gap-1">
        <div
          className="w-6 h-6 border border-border"
          style={{ backgroundColor: tile.color }}
          title={tile.color}
        />
        <span className="text-3xs text-foreground-muted font-mono">{tile.color}</span>
      </div>
    </div>
  );
}
