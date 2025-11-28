/**
 * Structure Catalog Section
 * Displays all multi-tile structures for map building
 */

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Suspense, useState } from "react";
import { useSettingsStore } from "@/stores/settingsStore";
import { ModelUploadDialog, getStructurePrompt } from "@/components/catalog/ModelUploadDialog";
import {
  LargeHouse,
  Farmhouse,
  Barn,
  WindmillStructure,
  MarketStall,
  Inn,
  Blacksmith,
  Church,
  Bridge,
  Pier,
  StoneWall,
  Gate,
} from "@/components/editor/EditorObjects";
import {
  STRUCTURE_DEFINITIONS,
  type StructureCategory,
} from "@/data/structures/definitions";

interface StructureInfo {
  id: string;
  label: string;
  description: string;
  category: StructureCategory;
  footprint: [number, number];
  Component: React.ComponentType<{
    position: [number, number, number];
    scale?: number;
    footprint?: [number, number];
  }>;
}

const STRUCTURES: StructureInfo[] = [
  // Buildings
  {
    id: "house",
    label: "House",
    description: STRUCTURE_DEFINITIONS.house?.description ?? "Small residential building",
    category: "building",
    footprint: [2, 2],
    Component: LargeHouse,
  },
  {
    id: "farmhouse",
    label: "Farmhouse",
    description: STRUCTURE_DEFINITIONS.farmhouse?.description ?? "Large farm dwelling",
    category: "building",
    footprint: [2, 3],
    Component: Farmhouse,
  },
  {
    id: "barn",
    label: "Barn",
    description: STRUCTURE_DEFINITIONS.barn?.description ?? "Agricultural storage building",
    category: "building",
    footprint: [3, 2],
    Component: Barn,
  },
  {
    id: "windmill",
    label: "Windmill",
    description: STRUCTURE_DEFINITIONS.windmill?.description ?? "Wind-powered mill",
    category: "building",
    footprint: [2, 2],
    Component: WindmillStructure,
  },
  // Village
  {
    id: "market",
    label: "Market Stall",
    description: STRUCTURE_DEFINITIONS.market?.description ?? "Trading stall",
    category: "village",
    footprint: [2, 1],
    Component: MarketStall,
  },
  {
    id: "inn",
    label: "Inn",
    description: STRUCTURE_DEFINITIONS.inn?.description ?? "Traveler's rest",
    category: "village",
    footprint: [3, 2],
    Component: Inn,
  },
  {
    id: "blacksmith",
    label: "Blacksmith",
    description: STRUCTURE_DEFINITIONS.blacksmith?.description ?? "Weapon and tool forge",
    category: "village",
    footprint: [2, 2],
    Component: Blacksmith,
  },
  {
    id: "church",
    label: "Church",
    description: STRUCTURE_DEFINITIONS.church?.description ?? "Place of worship",
    category: "village",
    footprint: [2, 3],
    Component: Church,
  },
  // Infrastructure
  {
    id: "bridge",
    label: "Bridge",
    description: STRUCTURE_DEFINITIONS.bridge?.description ?? "Spans water crossings",
    category: "infrastructure",
    footprint: [1, 3],
    Component: Bridge,
  },
  {
    id: "pier",
    label: "Pier",
    description: STRUCTURE_DEFINITIONS.pier?.description ?? "Dock extending into water",
    category: "infrastructure",
    footprint: [2, 4],
    Component: Pier,
  },
  {
    id: "wall",
    label: "Wall Segment",
    description: STRUCTURE_DEFINITIONS.wall?.description ?? "Defensive stone wall",
    category: "infrastructure",
    footprint: [1, 1],
    Component: StoneWall,
  },
  {
    id: "gate",
    label: "Gate",
    description: STRUCTURE_DEFINITIONS.gate?.description ?? "Passage through walls",
    category: "infrastructure",
    footprint: [1, 2],
    Component: Gate,
  },
];

type CategoryFilter = "all" | StructureCategory;

const CATEGORIES: { id: CategoryFilter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "building", label: "Buildings" },
  { id: "village", label: "Village" },
  { id: "infrastructure", label: "Infrastructure" },
];

export function StructureCatalog() {
  const [filter, setFilter] = useState<CategoryFilter>("all");
  const [selectedStructure, setSelectedStructure] = useState<StructureInfo | null>(null);
  const isDebugMode = useSettingsStore((s) => s.debugMode);

  const filteredStructures =
    filter === "all"
      ? STRUCTURES
      : STRUCTURES.filter((s) => s.category === filter);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-pixel text-lg text-foreground mb-2">
            Multi-Tile Structures
          </h2>
          <p className="text-sm text-foreground-muted">
            {filteredStructures.length} of {STRUCTURES.length} structures
            spanning multiple tiles
            {isDebugMode && <span className="text-accent-gold ml-2">(Debug: Click items to upload models)</span>}
          </p>
        </div>

        {/* Category filter */}
        <div className="flex gap-1">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              className={`px-2 py-1 text-2xs rounded transition-colors ${
                filter === cat.id
                  ? "bg-primary text-foreground"
                  : "text-foreground-muted bg-background-secondary hover:bg-background-tertiary"
              }`}
            >
              {cat.label} (
              {cat.id === "all"
                ? STRUCTURES.length
                : STRUCTURES.filter((s) => s.category === cat.id).length}
              )
            </button>
          ))}
        </div>
      </div>

      {/* Grid of structures */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredStructures.map((structure) => (
          <StructureCard
            key={structure.id}
            structure={structure}
            isDebugMode={isDebugMode}
            onModelClick={() => setSelectedStructure(structure)}
          />
        ))}
      </div>

      {/* Model upload dialog */}
      {selectedStructure && isDebugMode && (
        <ModelUploadDialog
          isOpen={true}
          onClose={() => setSelectedStructure(null)}
          modelId={selectedStructure.id}
          modelName={selectedStructure.label}
          category="structures"
          prompt={getStructurePrompt(selectedStructure.id, selectedStructure.label, selectedStructure.description, selectedStructure.footprint)}
        />
      )}
    </div>
  );
}

function StructureCard({ structure, isDebugMode, onModelClick }: {
  structure: StructureInfo;
  isDebugMode: boolean;
  onModelClick: () => void;
}) {
  const [w, h] = structure.footprint;

  return (
    <div className="pixel-panel flex flex-col">
      {/* 3D Preview */}
      <div className="h-40 bg-background-secondary rounded mb-3 overflow-hidden relative">
        <Canvas camera={{ position: [3, 3, 3], fov: 50 }}>
          <Suspense fallback={null}>
            <ambientLight intensity={0.6} />
            <directionalLight position={[5, 10, 5]} intensity={0.8} />
            <structure.Component
              position={[0, 0, 0]}
              scale={1}
              footprint={structure.footprint}
            />
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              autoRotate
              autoRotateSpeed={2}
            />
          </Suspense>
        </Canvas>
        {/* Debug model button */}
        {isDebugMode && (
          <button
            onClick={onModelClick}
            className="absolute top-2 right-2 px-2 py-1 text-2xs rounded bg-accent-gold/80 hover:bg-accent-gold text-background transition-colors"
            title="Generate/Upload 3D Model"
          >
            3D
          </button>
        )}
      </div>

      {/* Info */}
      <div className="flex-1">
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-pixel text-sm text-foreground">
            {structure.label}
          </h3>
          <span className="text-2xs text-foreground-muted bg-background-secondary px-2 py-0.5 rounded capitalize">
            {structure.category}
          </span>
        </div>
        <p className="text-xs text-foreground-muted mb-2">
          {structure.description}
        </p>
        {/* Footprint indicator */}
        <div className="flex items-center gap-2">
          <span className="text-2xs text-accent-gold">
            {w}×{h} tiles
          </span>
          <div className="flex gap-0.5">
            {Array.from({ length: h }).map((_, row) => (
              <div key={row} className="flex flex-col gap-0.5">
                {Array.from({ length: w }).map((_, col) => (
                  <div
                    key={col}
                    className="w-2 h-2 bg-accent-gold/30 rounded-sm"
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
        {isDebugMode && (
          <p className="text-2xs text-foreground-muted/50 mt-1 font-mono">{structure.id}.glb</p>
        )}
      </div>
    </div>
  );
}
