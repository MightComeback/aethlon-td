/**
 * Element Merge Graph Visualization
 * Interactive SVG graph showing element merge tree
 */

import { useState, useMemo } from "react";
import type { Element, ElementDefinition } from "@/types/element";
import { ElementTier } from "@/types/element";
import {
  getAllElementDefinitions,
  getElementColor,
  getPossibleMerges,
  getRecipeForElement,
} from "@/data/elements";

interface GraphNode {
  id: Element;
  x: number;
  y: number;
  tier: ElementTier;
  definition: ElementDefinition;
}

interface GraphEdge {
  from: Element;
  to: Element;
  fromPos: { x: number; y: number };
  toPos: { x: number; y: number };
}

export function ElementMergeGraph() {
  const [selectedElement, setSelectedElement] = useState<Element | null>(null);
  const [hoveredElement, setHoveredElement] = useState<Element | null>(null);

  const elements = getAllElementDefinitions();

  // Calculate node positions (tiered layout)
  const nodes = useMemo(() => {
    const nodeMap = new Map<Element, GraphNode>();
    const tierGroups: Record<number, ElementDefinition[]> = { 1: [], 2: [], 3: [] };

    // Group by tier
    elements.forEach((def) => {
      tierGroups[def.tier] = tierGroups[def.tier] || [];
      tierGroups[def.tier]!.push(def);
    });

    // Position nodes in columns by tier
    const spacing = { x: 180, y: 80 };
    const startX = 50;
    const startY = 50;

    Object.entries(tierGroups).forEach(([tier, defs]) => {
      const tierNum = parseInt(tier);
      const columnX = startX + (tierNum - 1) * spacing.x;

      defs.forEach((def, index) => {
        const y = startY + index * spacing.y;
        nodeMap.set(def.id, {
          id: def.id,
          x: columnX,
          y,
          tier: def.tier,
          definition: def,
        });
      });
    });

    return nodeMap;
  }, [elements]);

  // Calculate edges (merge connections)
  const edges = useMemo(() => {
    const edgeList: GraphEdge[] = [];

    elements.forEach((element) => {
      const recipe = getRecipeForElement(element.id);
      if (!recipe) return;

      const toNode = nodes.get(element.id);
      if (!toNode) return;

      // Create edges from both inputs to this element
      recipe.inputs.forEach((input) => {
        const fromNode = nodes.get(input);
        if (fromNode) {
          edgeList.push({
            from: input,
            to: element.id,
            fromPos: { x: fromNode.x, y: fromNode.y },
            toPos: { x: toNode.x, y: toNode.y },
          });
        }
      });
    });

    return edgeList;
  }, [elements, nodes]);

  // Filter edges for highlighting
  const highlightedEdges = useMemo(() => {
    if (!selectedElement && !hoveredElement) return new Set<string>();

    const active = selectedElement || hoveredElement;
    const highlighted = new Set<string>();

    // Highlight edges connected to selected/hovered element
    edges.forEach((edge) => {
      if (edge.from === active || edge.to === active) {
        highlighted.add(`${edge.from}-${edge.to}`);
      }
    });

    // Also highlight the merge path
    const recipe = getRecipeForElement(active!);
    if (recipe) {
      recipe.inputs.forEach((input) => {
        highlighted.add(`${input}-${active}`);
      });
    }

    const merges = getPossibleMerges(active!);
    merges.forEach(({ recipe }) => {
      highlighted.add(`${active}-${recipe.output}`);
    });

    return highlighted;
  }, [selectedElement, hoveredElement, edges]);

  const viewBox = `0 0 600 ${Math.max(...Array.from(nodes.values()).map((n) => n.y)) + 100}`;

  return (
    <div className="w-full">
      <svg viewBox={viewBox} className="w-full h-auto">
        {/* Edges (connections) */}
        <g className="edges">
          {edges.map((edge, idx) => {
            const isHighlighted = highlightedEdges.has(`${edge.from}-${edge.to}`);
            const color = isHighlighted ? getElementColor(edge.to) : "#444444";

            return (
              <line
                key={idx}
                x1={edge.fromPos.x + 40}
                y1={edge.fromPos.y}
                x2={edge.toPos.x - 40}
                y2={edge.toPos.y}
                stroke={color}
                strokeWidth={isHighlighted ? 2 : 1}
                strokeOpacity={isHighlighted ? 0.8 : 0.3}
                markerEnd="url(#arrowhead)"
              />
            );
          })}
        </g>

        {/* Nodes (elements) */}
        <g className="nodes">
          {Array.from(nodes.values()).map((node) => {
            const isSelected = selectedElement === node.id;
            const isHovered = hoveredElement === node.id;
            const isActive = isSelected || isHovered;
            const isConnected = highlightedEdges.size > 0 && (
              edges.some(e => (e.from === node.id || e.to === node.id) &&
                highlightedEdges.has(`${e.from}-${e.to}`))
            );

            return (
              <g
                key={node.id}
                transform={`translate(${node.x}, ${node.y})`}
                className="cursor-pointer"
                onClick={() => setSelectedElement(isSelected ? null : node.id)}
                onMouseEnter={() => setHoveredElement(node.id)}
                onMouseLeave={() => setHoveredElement(null)}
              >
                {/* Node circle */}
                <circle
                  r={isActive ? 38 : 35}
                  fill={getElementColor(node.id)}
                  opacity={isActive || isConnected ? 1 : 0.7}
                  stroke={isActive ? "#ffffff" : isConnected ? getElementColor(node.id) : "#666666"}
                  strokeWidth={isActive ? 3 : 1}
                />

                {/* Tier badge */}
                <circle cx={22} cy={-22} r={10} fill="#222222" stroke="#666666" strokeWidth={1} />
                <text
                  x={22}
                  y={-18}
                  textAnchor="middle"
                  fontSize="10"
                  fill="#ffffff"
                  fontWeight="bold"
                >
                  T{node.tier}
                </text>

                {/* Element emoji */}
                <text x={0} y={6} textAnchor="middle" fontSize="24">
                  {getElementEmoji(node.id)}
                </text>

                {/* Element name */}
                <text
                  x={0}
                  y={50}
                  textAnchor="middle"
                  fontSize="11"
                  fill="#ffffff"
                  fontWeight={isActive ? "bold" : "normal"}
                >
                  {node.definition.name}
                </text>
              </g>
            );
          })}
        </g>

        {/* Arrow marker definition */}
        <defs>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="10"
            refX="9"
            refY="3"
            orient="auto"
            markerUnits="strokeWidth"
          >
            <path d="M0,0 L0,6 L9,3 z" fill="#444444" />
          </marker>
        </defs>
      </svg>

      {/* Legend */}
      <div className="mt-4 flex justify-center gap-6 text-xs text-foreground-muted">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-[#ff4500]" />
          <span>Fire</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-[#1e90ff]" />
          <span>Water</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-[#8b4513]" />
          <span>Earth</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-[#87ceeb]" />
          <span>Air</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-[#ffff00]" />
          <span>Lightning</span>
        </div>
      </div>

      {/* Selected element info */}
      {selectedElement && (
        <div className="mt-4 p-4 bg-background-secondary rounded">
          <ElementInfo element={selectedElement} />
        </div>
      )}
    </div>
  );
}

function ElementInfo({ element }: { element: Element }) {
  const definition = getAllElementDefinitions().find((d) => d.id === element);
  if (!definition) return null;

  const recipe = getRecipeForElement(element);
  const merges = getPossibleMerges(element);

  return (
    <div className="text-sm">
      <h4 className="font-pixel text-foreground mb-2">{definition.name}</h4>
      <p className="text-foreground-muted text-xs mb-3">{definition.description}</p>

      {recipe && (
        <div className="mb-2">
          <span className="text-foreground-muted text-xs">Created from: </span>
          {recipe.inputs.map((input, i) => (
            <span key={i}>
              {i > 0 && <span className="text-foreground-muted"> + </span>}
              <span style={{ color: getElementColor(input) }}>{input}</span>
            </span>
          ))}
        </div>
      )}

      {merges.length > 0 && (
        <div>
          <span className="text-foreground-muted text-xs">Can merge into: </span>
          <span className="text-foreground">{merges.length} combinations</span>
        </div>
      )}
    </div>
  );
}

function getElementEmoji(element: Element): string {
  const emojis: Record<string, string> = {
    fire: "🔥",
    water: "💧",
    earth: "🪨",
    air: "💨",
    lightning: "⚡",
    steam: "☁️",
    lava: "🌋",
    plasma: "⚛️",
    storm: "⛈️",
    ice: "❄️",
    mist: "🌫️",
    tempest: "🌊",
    dust: "💨",
    crystal: "💎",
    thunder: "⚡",
    volcano: "🌋",
    inferno: "🔥",
    tsunami: "🌊",
    blizzard: "🌨️",
    earthquake: "🏔️",
    mountain: "⛰️",
    hurricane: "🌀",
    cyclone: "🌀",
    supercell: "⛈️",
    discharge: "⚡",
    aurora: "🌌",
    sandstorm: "🏜️",
    geyser: "♨️",
    monsoon: "🌧️",
    meteor: "☄️",
  };
  return emojis[element] || "⭐";
}
