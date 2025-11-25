import { useMemo, useState } from "react";
import { ThreeEvent } from "@react-three/fiber";
import { useEditorStore } from "@/stores/editorStore";
import { TileType } from "@/types/map";

export function EditorGrid() {
  const { width, height, tiles, setTile, selectedTileType } = useEditorStore();
  const [hoveredTile, setHoveredTile] = useState<{ x: number; z: number } | null>(null);

  const gridTiles = useMemo(() => {
    const result: Array<{ x: number; z: number; key: string }> = [];
    for (let x = 0; x < width; x++) {
      for (let z = 0; z < height; z++) {
        result.push({
          x: x - width / 2,
          z: z - height / 2,
          key: `${x},${z}`,
        });
      }
    }
    return result;
  }, [width, height]);

  const handleTileClick = (x: number, z: number) => {
    const gridX = Math.floor(x + width / 2);
    const gridZ = Math.floor(z + height / 2);
    setTile(gridX, gridZ, selectedTileType);
  };

  return (
    <group rotation={[-Math.PI / 6, Math.PI / 4, 0]}>
      {/* Grid helper lines */}
      <gridHelper args={[Math.max(width, height), Math.max(width, height), "#333", "#222"]} />

      {/* Tiles */}
      {gridTiles.map(({ x, z, key }) => {
        const gridX = Math.floor(x + width / 2);
        const gridZ = Math.floor(z + height / 2);
        const tileType = tiles[gridX]?.[gridZ] ?? TileType.Ground;
        const isHovered = hoveredTile?.x === x && hoveredTile?.z === z;

        return (
          <EditorTile
            key={key}
            x={x}
            z={z}
            type={tileType}
            isHovered={isHovered}
            onClick={() => handleTileClick(x, z)}
            onPointerEnter={() => setHoveredTile({ x, z })}
            onPointerLeave={() => setHoveredTile(null)}
          />
        );
      })}
    </group>
  );
}

interface EditorTileProps {
  x: number;
  z: number;
  type: TileType;
  isHovered: boolean;
  onClick: () => void;
  onPointerEnter: () => void;
  onPointerLeave: () => void;
}

function EditorTile({
  x,
  z,
  type,
  isHovered,
  onClick,
  onPointerEnter,
  onPointerLeave,
}: EditorTileProps) {
  const color = getTileColor(type, isHovered);

  return (
    <mesh
      position={[x, 0, z]}
      onClick={(e: ThreeEvent<MouseEvent>) => {
        e.stopPropagation();
        onClick();
      }}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
    >
      <boxGeometry args={[0.95, 0.1, 0.95]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

function getTileColor(type: TileType, isHovered: boolean): string {
  const baseColors: Record<TileType, string> = {
    [TileType.Ground]: "#4ecca3",
    [TileType.Path]: "#8b7355",
    [TileType.Water]: "#00d9ff",
    [TileType.Blocked]: "#444444",
    [TileType.Spawn]: "#e94560",
    [TileType.Exit]: "#ffd700",
  };

  const color = baseColors[type] || "#4ecca3";

  if (isHovered) {
    return "#ffffff";
  }

  return color;
}
