import { TileType } from "@/types/map";

// Height unit for elevation (each level = this many units)
export const ELEVATION_UNIT = 0.3;

export function getTileBaseHeight(type: TileType): number {
  switch (type) {
    case TileType.Water:
      return 0.05; // Water is lower
    case TileType.Blocked:
      return 0.3; // Blocked is higher
    case TileType.Spawn:
    case TileType.Exit:
      return 0.15; // Special tiles slightly raised
    default:
      return 0.1;
  }
}
