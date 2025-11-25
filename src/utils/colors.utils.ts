import { TileType } from "@/types/map";

export function lightenColor(hex: string, amount: number): string {
  const num = parseInt(hex.slice(1), 16);
  const r = Math.min(255, Math.floor((num >> 16) + (255 - (num >> 16)) * amount));
  const g = Math.min(255, Math.floor(((num >> 8) & 0x00ff) + (255 - ((num >> 8) & 0x00ff)) * amount));
  const b = Math.min(255, Math.floor((num & 0x0000ff) + (255 - (num & 0x0000ff)) * amount));
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
}

export function floodFill(
  startX: number,
  startY: number,
  tiles: TileType[][],
  fillType: TileType,
  setTile: (x: number, y: number, type: TileType) => void,
  width: number,
  height: number
) {
  const targetType = tiles[startX]?.[startY];
  if (targetType === undefined || targetType === fillType) return;

  const stack: Array<[number, number]> = [[startX, startY]];
  const visited = new Set<string>();

  while (stack.length > 0) {
    const [x, y] = stack.pop()!;
    const key = `${x},${y}`;

    if (visited.has(key)) continue;
    if (x < 0 || x >= width || y < 0 || y >= height) continue;
    if (tiles[x]?.[y] !== targetType) continue;

    visited.add(key);
    setTile(x, y, fillType);

    stack.push([x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]);
  }
}

export function getTileColor(type: TileType, isHovered: boolean): string {
  // Black and white color scheme
  const baseColors: Record<TileType, string> = {
    [TileType.Ground]: "#333333",
    [TileType.Path]: "#666666",
    [TileType.Water]: "#1a1a1a",
    [TileType.Blocked]: "#0a0a0a",
    [TileType.Spawn]: "#ffffff",
    [TileType.Exit]: "#888888",
  };

  const color = baseColors[type] || "#333333";

  if (isHovered) {
    // Lighten the color when hovered
    return lightenColor(color, 0.3);
  }

  return color;
}




