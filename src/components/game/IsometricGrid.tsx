import { useMemo } from "react";
import { TileType } from "@/types/map";

interface IsometricGridProps {
  width: number;
  height: number;
}

export function IsometricGrid({ width, height }: IsometricGridProps) {
  const tiles = useMemo(() => {
    const result: Array<{ x: number; z: number; type: TileType }> = [];
    for (let x = 0; x < width; x++) {
      for (let z = 0; z < height; z++) {
        // Demo: create a simple path pattern
        const isPath = (x === 0 || x === width - 1 || z === Math.floor(height / 2));
        result.push({
          x: x - width / 2,
          z: z - height / 2,
          type: isPath ? TileType.Path : TileType.Ground,
        });
      }
    }
    return result;
  }, [width, height]);

  return (
    <group>
      {tiles.map((tile, index) => (
        <Tile key={index} x={tile.x} z={tile.z} type={tile.type} />
      ))}
    </group>
  );
}

interface TileProps {
  x: number;
  z: number;
  type: TileType;
}

function Tile({ x, z, type }: TileProps) {
  const color = getTileColor(type);

  return (
    <mesh position={[x, 0, z]} receiveShadow>
      <boxGeometry args={[0.95, 0.1, 0.95]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

function getTileColor(type: TileType): string {
  switch (type) {
    case TileType.Ground:
      return "#4ecca3";
    case TileType.Path:
      return "#8b7355";
    case TileType.Water:
      return "#00d9ff";
    case TileType.Blocked:
      return "#444444";
    default:
      return "#4ecca3";
  }
}
