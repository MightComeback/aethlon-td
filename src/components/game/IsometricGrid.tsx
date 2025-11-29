import { useMemo } from "react";
import { TileType, MapData } from "@/types/map";
import { PixelTileGrid } from "@/components/shared/PixelTileGrid";

interface IsometricGridProps {
  width: number;
  height: number;
  tiles?: TileType[][];
  heightmap?: number[][];
  zoom?: number;
}

export function IsometricGrid({
  width,
  height,
  tiles,
  heightmap,
  zoom = 50,
}: IsometricGridProps) {

  // Generate default tiles if none provided
  const gridTiles = useMemo(() => {
    if (tiles && tiles.length > 0) return tiles;

    // Generate default grass tiles
    const result: TileType[][] = [];
    for (let x = 0; x < width; x++) {
      result[x] = [];
      for (let z = 0; z < height; z++) {
        result[x]![z] = TileType.Ground;
      }
    }
    return result;
  }, [width, height, tiles]);

  // Generate default heightmap if none provided
  const gridHeightmap = useMemo(() => {
    if (heightmap) return heightmap;

    const result: number[][] = [];
    for (let x = 0; x < width; x++) {
      result[x] = [];
      for (let z = 0; z < height; z++) {
        result[x]![z] = 0;
      }
    }
    return result;
  }, [width, height, heightmap]);

  return (
    <group>
      <PixelTileGrid
        width={width}
        height={height}
        tiles={gridTiles}
        heightmap={gridHeightmap}
        zoom={zoom}
      />
    </group>
  );
}

// Game grid that takes full MapData
interface GameGridProps {
  mapData: MapData;
  zoom?: number;
}

export function GameGrid({ mapData, zoom = 50 }: GameGridProps) {
  // Generate empty heightmap if not provided
  const heightmap = useMemo(() => {
    if (mapData.heightmap) return mapData.heightmap;

    const result: number[][] = [];
    for (let x = 0; x < mapData.width; x++) {
      result[x] = [];
      for (let z = 0; z < mapData.height; z++) {
        result[x]![z] = 0;
      }
    }
    return result;
  }, [mapData.heightmap, mapData.width, mapData.height]);

  return (
    <PixelTileGrid
      width={mapData.width}
      height={mapData.height}
      tiles={mapData.tiles}
      heightmap={heightmap}
      zoom={zoom}
    />
  );
}
