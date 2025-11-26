/**
 * Object Catalog Section
 * Displays all placeable objects for map decoration
 */

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Suspense, useState } from "react";
import {
  // Trees
  PineTree,
  OakTree,
  BirchTree,
  WillowTree,
  DeadTree,
  PineTreeSnow,
  // Rocks & Terrain
  Rock,
  IceCrystal,
  VolcanicRock,
  // Plants & Vegetation
  Bush,
  GrassTuft,
  Flower,
  Sunflower,
  Cactus,
  Mushroom,
  Cattail,
  // Single-tile Structures
  TowerBase,
  Fence,
  House,
  Well,
  Windmill,
  Cabin,
  Tent,
  Igloo,
  Obelisk,
  // Decorations
  HayBale,
  Log,
  Stump,
  Grave,
  Lantern,
  Snowman,
  Pottery,
  Bones,
  Skull,
  FirePit,
  SnowPile,
  LilyPad,
} from "@/components/editor/EditorObjects";

interface ObjectInfo {
  id: string;
  label: string;
  description: string;
  category: "trees" | "rocks" | "vegetation" | "structures" | "decorations";
  Component: React.ComponentType<{ position: [number, number, number]; scale?: number }>;
}

const OBJECTS: ObjectInfo[] = [
  // Trees
  {
    id: "tree_pine",
    label: "Pine Tree",
    description: "Tall coniferous tree with triangular shape",
    category: "trees",
    Component: PineTree,
  },
  {
    id: "tree_oak",
    label: "Oak Tree",
    description: "Broad deciduous tree with rounded canopy",
    category: "trees",
    Component: OakTree,
  },
  {
    id: "tree_birch",
    label: "Birch Tree",
    description: "White-barked tree with sparse foliage",
    category: "trees",
    Component: BirchTree,
  },
  {
    id: "tree_willow",
    label: "Willow Tree",
    description: "Tree with drooping branches",
    category: "trees",
    Component: WillowTree,
  },
  {
    id: "tree_dead",
    label: "Dead Tree",
    description: "Bare tree with no leaves",
    category: "trees",
    Component: DeadTree,
  },
  {
    id: "tree_pine_snow",
    label: "Snow Pine",
    description: "Pine tree covered in snow",
    category: "trees",
    Component: PineTreeSnow,
  },
  // Rocks & Terrain
  {
    id: "rock",
    label: "Rock",
    description: "Natural boulder formation",
    category: "rocks",
    Component: Rock,
  },
  {
    id: "ice_crystal",
    label: "Ice Crystal",
    description: "Translucent ice formation",
    category: "rocks",
    Component: IceCrystal,
  },
  {
    id: "volcanic_rock",
    label: "Volcanic Rock",
    description: "Dark rock with glowing lava spots",
    category: "rocks",
    Component: VolcanicRock,
  },
  // Vegetation
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
    id: "sunflower",
    label: "Sunflower",
    description: "Tall yellow flower",
    category: "vegetation",
    Component: Sunflower,
  },
  {
    id: "cactus",
    label: "Cactus",
    description: "Desert plant with arms",
    category: "vegetation",
    Component: Cactus,
  },
  {
    id: "mushroom",
    label: "Mushroom",
    description: "Forest fungus with spotted cap",
    category: "vegetation",
    Component: Mushroom,
  },
  {
    id: "cattail",
    label: "Cattail",
    description: "Swamp plant with brown tops",
    category: "vegetation",
    Component: Cattail,
  },
  {
    id: "lily_pad",
    label: "Lily Pad",
    description: "Floating water plant with flower",
    category: "vegetation",
    Component: LilyPad,
  },
  // Single-tile Structures
  {
    id: "tower_base",
    label: "Tower Base",
    description: "Platform for tower placement",
    category: "structures",
    Component: TowerBase,
  },
  {
    id: "fence",
    label: "Fence",
    description: "Wooden fence segment",
    category: "structures",
    Component: Fence,
  },
  {
    id: "house",
    label: "Cottage",
    description: "Small residential building",
    category: "structures",
    Component: House,
  },
  {
    id: "well",
    label: "Well",
    description: "Stone well with roof",
    category: "structures",
    Component: Well,
  },
  {
    id: "windmill",
    label: "Windmill",
    description: "Wind-powered mill",
    category: "structures",
    Component: Windmill,
  },
  {
    id: "cabin",
    label: "Cabin",
    description: "Forest log cabin",
    category: "structures",
    Component: Cabin,
  },
  {
    id: "tent",
    label: "Tent",
    description: "Canvas tent",
    category: "structures",
    Component: Tent,
  },
  {
    id: "igloo",
    label: "Igloo",
    description: "Ice dome shelter",
    category: "structures",
    Component: Igloo,
  },
  {
    id: "obelisk",
    label: "Obelisk",
    description: "Ancient stone monument",
    category: "structures",
    Component: Obelisk,
  },
  // Decorations
  {
    id: "hay_bale",
    label: "Hay Bale",
    description: "Rolled hay for farms",
    category: "decorations",
    Component: HayBale,
  },
  {
    id: "log",
    label: "Log",
    description: "Fallen tree log",
    category: "decorations",
    Component: Log,
  },
  {
    id: "stump",
    label: "Stump",
    description: "Cut tree stump",
    category: "decorations",
    Component: Stump,
  },
  {
    id: "grave",
    label: "Grave",
    description: "Cemetery headstone",
    category: "decorations",
    Component: Grave,
  },
  {
    id: "lantern",
    label: "Lantern",
    description: "Decorative light post",
    category: "decorations",
    Component: Lantern,
  },
  {
    id: "snowman",
    label: "Snowman",
    description: "Winter snow sculpture",
    category: "decorations",
    Component: Snowman,
  },
  {
    id: "pottery",
    label: "Pottery",
    description: "Clay pot decoration",
    category: "decorations",
    Component: Pottery,
  },
  {
    id: "bones",
    label: "Bones",
    description: "Scattered bone remains",
    category: "decorations",
    Component: Bones,
  },
  {
    id: "skull",
    label: "Skull",
    description: "Skull decoration",
    category: "decorations",
    Component: Skull,
  },
  {
    id: "fire_pit",
    label: "Fire Pit",
    description: "Campfire with stones",
    category: "decorations",
    Component: FirePit,
  },
  {
    id: "snow_pile",
    label: "Snow Pile",
    description: "Mound of snow",
    category: "decorations",
    Component: SnowPile,
  },
];

type CategoryFilter = "all" | ObjectInfo["category"];

const CATEGORIES: { id: CategoryFilter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "trees", label: "Trees" },
  { id: "rocks", label: "Rocks" },
  { id: "vegetation", label: "Vegetation" },
  { id: "structures", label: "Structures" },
  { id: "decorations", label: "Decorations" },
];

export function ObjectCatalog() {
  const [filter, setFilter] = useState<CategoryFilter>("all");

  const filteredObjects = filter === "all"
    ? OBJECTS
    : OBJECTS.filter((o) => o.category === filter);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-pixel text-lg text-foreground mb-2">Map Objects</h2>
          <p className="text-sm text-foreground-muted">
            {filteredObjects.length} of {OBJECTS.length} placeable objects
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
              {cat.label} ({cat.id === "all" ? OBJECTS.length : OBJECTS.filter((o) => o.category === cat.id).length})
            </button>
          ))}
        </div>
      </div>

      {/* Grid of objects */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredObjects.map((obj) => (
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
