/**
 * Object Catalog Section
 * Displays all placeable objects for map decoration
 */

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Suspense } from "react";
import {
  PineTree,
  OakTree,
  Rock,
  Bush,
  GrassTuft,
  Flower,
  TowerBase,
} from "@/components/editor/EditorObjects";

interface ObjectInfo {
  id: string;
  label: string;
  description: string;
  category: "vegetation" | "terrain" | "structure";
  Component: React.ComponentType<{ position: [number, number, number]; scale?: number }>;
}

const OBJECTS: ObjectInfo[] = [
  {
    id: "tree_pine",
    label: "Pine Tree",
    description: "Tall coniferous tree with triangular shape",
    category: "vegetation",
    Component: PineTree,
  },
  {
    id: "tree_oak",
    label: "Oak Tree",
    description: "Broad deciduous tree with rounded canopy",
    category: "vegetation",
    Component: OakTree,
  },
  {
    id: "rock",
    label: "Rock",
    description: "Natural boulder formation",
    category: "terrain",
    Component: Rock,
  },
  {
    id: "bush",
    label: "Bush",
    description: "Low shrub vegetation",
    category: "vegetation",
    Component: Bush,
  },
  {
    id: "grass",
    label: "Grass Tuft",
    description: "Small grass patch decoration",
    category: "vegetation",
    Component: GrassTuft,
  },
  {
    id: "flower",
    label: "Flower",
    description: "Decorative flowering plant",
    category: "vegetation",
    Component: Flower,
  },
  {
    id: "tower_base",
    label: "Tower Base",
    description: "Platform for tower placement",
    category: "structure",
    Component: TowerBase,
  },
];

const CATEGORIES = [
  { id: "all", label: "All" },
  { id: "vegetation", label: "Vegetation" },
  { id: "terrain", label: "Terrain" },
  { id: "structure", label: "Structures" },
];

export function ObjectCatalog() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-pixel text-lg text-foreground mb-2">Map Objects</h2>
          <p className="text-sm text-foreground-muted">
            {OBJECTS.length} placeable objects for map decoration
          </p>
        </div>

        {/* Category filter - simplified display */}
        <div className="flex gap-2">
          {CATEGORIES.map((cat) => (
            <span
              key={cat.id}
              className="px-2 py-1 text-2xs text-foreground-muted bg-background-secondary rounded"
            >
              {cat.label} ({cat.id === "all" ? OBJECTS.length : OBJECTS.filter((o) => o.category === cat.id).length})
            </span>
          ))}
        </div>
      </div>

      {/* Grid of objects */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {OBJECTS.map((obj) => (
          <ObjectCard key={obj.id} object={obj} />
        ))}
      </div>
    </div>
  );
}

function ObjectCard({ object }: { object: ObjectInfo }) {
  return (
    <div className="pixel-panel flex flex-col">
      {/* 3D Preview */}
      <div className="h-32 bg-background-secondary rounded mb-3 overflow-hidden">
        <Canvas camera={{ position: [2, 2, 2], fov: 50 }}>
          <Suspense fallback={null}>
            <ambientLight intensity={0.6} />
            <directionalLight position={[5, 10, 5]} intensity={0.8} />
            <object.Component position={[0, 0, 0]} scale={1.5} />
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              autoRotate
              autoRotateSpeed={2}
            />
          </Suspense>
        </Canvas>
      </div>

      {/* Info */}
      <div className="flex-1">
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-pixel text-sm text-foreground">{object.label}</h3>
          <span className="text-2xs text-foreground-muted bg-background-secondary px-2 py-0.5 rounded capitalize">
            {object.category}
          </span>
        </div>
        <p className="text-xs text-foreground-muted">{object.description}</p>
      </div>
    </div>
  );
}
