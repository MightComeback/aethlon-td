/**
 * Tower Merge Graph Visualization
 * Interactive SVG graph showing tower merge paths
 */

import { useState, useMemo } from "react";
import { TowerCategory } from "@/types/tower";
import type { ExtendedTowerDefinition } from "@/types/tower";
import {
  getAllTowers,
  TOWER_MERGE_GRAPH,
  getMergePathTo,
  getRarityColor,
} from "@/data/towers";
import { getElementColor, getElementName } from "@/data/elements";

interface GraphNode {
  id: string;
  x: number;
  y: number;
  tower: ExtendedTowerDefinition;
}

interface GraphEdge {
  from: string;
  to: string;
  fromPos: { x: number; y: number };
  toPos: { x: number; y: number };
}

interface TowerMergeGraphProps {
  filterCategory?: TowerCategory;
}

export function TowerMergeGraph({ filterCategory }: TowerMergeGraphProps) {
  const [selectedTower, setSelectedTower] = useState<string | null>(null);
  const [hoveredTower, setHoveredTower] = useState<string | null>(null);

  // Filter towers by category if specified
  const towers = useMemo(() => {
    const all = getAllTowers();
    return filterCategory
      ? all.filter((t) => t.category === filterCategory)
      : all;
  }, [filterCategory]);

  // Calculate node positions (tiered layout with grouping by element)
  const nodes = useMemo(() => {
    const nodeMap = new Map<string, GraphNode>();

    // Group by tier and element
    const tierGroups: Record<number, Map<string, ExtendedTowerDefinition[]>> = {
      1: new Map(),
      2: new Map(),
      3: new Map(),
    };

    towers.forEach((tower) => {
      const tier = tower.tier;
      if (!tierGroups[tier]) tierGroups[tier] = new Map();

      const elementGroup = tierGroups[tier]!.get(tower.element) || [];
      elementGroup.push(tower);
      tierGroups[tier]!.set(tower.element, elementGroup);
    });

    // Position nodes
    const spacing = { x: 200, y: 100 };
    const startX = 60;
    const startY = 60;

    Object.entries(tierGroups).forEach(([tier, elementGroups]) => {
      const tierNum = parseInt(tier);
      const columnX = startX + (tierNum - 1) * spacing.x;

      let yOffset = startY;
      elementGroups.forEach((towerGroup) => {
        towerGroup.forEach((tower) => {
          nodeMap.set(tower.id, {
            id: tower.id,
            x: columnX,
            y: yOffset,
            tower,
          });
          yOffset += spacing.y;
        });
      });
    });

    return nodeMap;
  }, [towers]);

  // Calculate edges from merge recipes
  const edges = useMemo(() => {
    const edgeList: GraphEdge[] = [];

    towers.forEach((tower) => {
      const recipe = tower.mergeRecipe;
      if (!recipe) return;

      const toNode = nodes.get(tower.id);
      if (!toNode) return;

      // Create edges from both inputs to this tower
      recipe.inputs.forEach((inputId) => {
        const fromNode = nodes.get(inputId);
        if (fromNode) {
          edgeList.push({
            from: inputId,
            to: tower.id,
            fromPos: { x: fromNode.x, y: fromNode.y },
            toPos: { x: toNode.x, y: toNode.y },
          });
        }
      });
    });

    return edgeList;
  }, [towers, nodes]);

  // Highlight connected nodes/edges
  const highlighted = useMemo(() => {
    if (!selectedTower && !hoveredTower) return { nodes: new Set<string>(), edges: new Set<string>() };

    const active = selectedTower || hoveredTower;
    const highlightedNodes = new Set<string>();
    const highlightedEdges = new Set<string>();

    highlightedNodes.add(active!);

    // Highlight merge path to this tower
    const path = getMergePathTo(active!, TOWER_MERGE_GRAPH);
    path.forEach((recipe) => {
      recipe.inputs.forEach((input) => {
        highlightedNodes.add(input);
        highlightedEdges.add(`${input}-${recipe.output}`);
      });
      highlightedNodes.add(recipe.output);
    });

    // Highlight possible outputs
    const tower = towers.find((t) => t.id === active);
    tower?.mergeOutput?.forEach((outputId) => {
      highlightedNodes.add(outputId);
      highlightedEdges.add(`${active}-${outputId}`);
    });

    return { nodes: highlightedNodes, edges: highlightedEdges };
  }, [selectedTower, hoveredTower, towers]);

  const viewBoxHeight = Math.max(...Array.from(nodes.values()).map((n) => n.y), 200) + 100;
  const viewBox = `0 0 700 ${viewBoxHeight}`;

  return (
    <div className="w-full">
      <svg viewBox={viewBox} className="w-full h-auto bg-background-secondary rounded">
        {/* Grid lines */}
        <g className="grid" opacity={0.1}>
          {[1, 2, 3].map((tier) => (
            <line
              key={tier}
              x1={60 + (tier - 1) * 200}
              y1={0}
              x2={60 + (tier - 1) * 200}
              y2={viewBoxHeight}
              stroke="#ffffff"
              strokeWidth={1}
              strokeDasharray="4,4"
            />
          ))}
        </g>

        {/* Tier labels */}
        <g className="tier-labels">
          {[
            { tier: 1, label: "TIER 1 (Base)" },
            { tier: 2, label: "TIER 2 (Merged)" },
            { tier: 3, label: "TIER 3 (Advanced)" },
          ].map(({ tier, label }) => (
            <text
              key={tier}
              x={60 + (tier - 1) * 200}
              y={30}
              textAnchor="middle"
              fontSize="12"
              fill="#888888"
              fontWeight="bold"
            >
              {label}
            </text>
          ))}
        </g>

        {/* Edges (merge connections) */}
        <g className="edges">
          {edges.map((edge, idx) => {
            const isHighlighted = highlighted.edges.has(`${edge.from}-${edge.to}`);
            const toTower = towers.find((t) => t.id === edge.to);
            const color = isHighlighted && toTower
              ? getElementColor(toTower.element)
              : "#444444";

            return (
              <g key={idx}>
                <line
                  x1={edge.fromPos.x + 50}
                  y1={edge.fromPos.y}
                  x2={edge.toPos.x - 50}
                  y2={edge.toPos.y}
                  stroke={color}
                  strokeWidth={isHighlighted ? 3 : 1}
                  strokeOpacity={isHighlighted ? 0.9 : 0.2}
                  markerEnd="url(#tower-arrow)"
                />
              </g>
            );
          })}
        </g>

        {/* Nodes (towers) */}
        <g className="nodes">
          {Array.from(nodes.values()).map((node) => {
            const isSelected = selectedTower === node.id;
            const isHovered = hoveredTower === node.id;
            const isActive = isSelected || isHovered;
            const isConnected = highlighted.nodes.has(node.id);
            const opacity = isConnected || highlighted.nodes.size === 0 ? 1 : 0.3;

            return (
              <g
                key={node.id}
                transform={`translate(${node.x}, ${node.y})`}
                className="cursor-pointer"
                onClick={() => setSelectedTower(isSelected ? null : node.id)}
                onMouseEnter={() => setHoveredTower(node.id)}
                onMouseLeave={() => setHoveredTower(null)}
                opacity={opacity}
              >
                {/* Node background */}
                <rect
                  x={-45}
                  y={-25}
                  width={90}
                  height={50}
                  rx={4}
                  fill={getElementColor(node.tower.element)}
                  opacity={0.2}
                  stroke={isActive ? "#ffffff" : getRarityColor(node.tower.rarity)}
                  strokeWidth={isActive ? 3 : 2}
                />

                {/* Tower name */}
                <text
                  x={0}
                  y={-5}
                  textAnchor="middle"
                  fontSize="10"
                  fill="#ffffff"
                  fontWeight={isActive ? "bold" : "normal"}
                >
                  {node.tower.name.substring(0, 12)}
                </text>

                {/* Stats */}
                <text x={0} y={8} textAnchor="middle" fontSize="8" fill="#aaaaaa">
                  {node.tower.baseStats.damage}dmg {node.tower.baseStats.attackSpeed.toFixed(1)}as
                </text>

                {/* Tier indicator */}
                <circle
                  cx={35}
                  cy={-15}
                  r={8}
                  fill="#222222"
                  stroke={getRarityColor(node.tower.rarity)}
                  strokeWidth={1.5}
                />
                <text x={35} y={-11} textAnchor="middle" fontSize="8" fill="#ffffff">
                  T{node.tower.tier}
                </text>
              </g>
            );
          })}
        </g>

        {/* Arrow marker */}
        <defs>
          <marker
            id="tower-arrow"
            markerWidth="8"
            markerHeight="8"
            refX="7"
            refY="4"
            orient="auto"
          >
            <path d="M0,0 L0,8 L8,4 z" fill="#444444" />
          </marker>
        </defs>
      </svg>

      {/* Selected tower info */}
      {selectedTower && (
        <div className="mt-4 p-4 bg-background-secondary rounded">
          <TowerInfo towerId={selectedTower} />
        </div>
      )}

      {/* Info text */}
      <div className="mt-2 text-center text-xs text-foreground-muted">
        Click a tower to highlight its merge path • Hover to preview
      </div>
    </div>
  );
}

function TowerInfo({ towerId }: { towerId: string }) {
  const tower = getAllTowers().find((t) => t.id === towerId);
  if (!tower) return null;

  const mergePath = getMergePathTo(towerId, TOWER_MERGE_GRAPH);

  return (
    <div className="text-sm">
      <h4 className="font-pixel text-foreground mb-2">{tower.name}</h4>
      <p className="text-foreground-muted text-xs mb-2">{tower.description}</p>

      <div className="flex gap-2 mb-2">
        <span
          className="text-xs px-2 py-1 rounded"
          style={{
            backgroundColor: getElementColor(tower.element) + "33",
            color: getElementColor(tower.element),
          }}
        >
          {getElementName(tower.element)}
        </span>
        <span className="text-xs px-2 py-1 bg-background-tertiary rounded capitalize">
          {tower.category.replace("_", " ")}
        </span>
      </div>

      {mergePath.length > 0 && (
        <div className="text-xs text-foreground-muted">
          Requires {mergePath.length} merge(s) from base towers
        </div>
      )}
    </div>
  );
}
