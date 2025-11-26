import { Link } from "@tanstack/react-router";
import { useMemo } from "react";
import { useGameStore } from "@/stores/gameStore";
import { DevConsole } from "./DevConsole";
import { getBaseTowers } from "@/data/towers/towerDatabase";
import { getElementColor } from "@/data/elements";
import type { ExtendedTowerDefinition } from "@/types/tower";

export function GameHUD() {
  const { lives, currency, wave, maxWaves, isPaused, speed } = useGameStore();

  // Get tier-1 (base) towers from catalog
  const baseTowers = useMemo(() => getBaseTowers(), []);

  return (
    <div className="pointer-events-none absolute inset-0">
      {/* Top Bar */}
      <div className="pointer-events-auto absolute left-0 right-0 top-0 flex items-center justify-between p-4">
        {/* Left: Back button and wave info */}
        <div className="flex items-center gap-4">
          <Link to="/" className="pixel-button text-2xs">
            Menu
          </Link>
          <div className="pixel-panel flex items-center gap-4 py-2 px-4">
            <div className="flex items-center gap-2">
              <span className="text-danger font-pixel text-xs">HP</span>
              <span className="text-foreground font-bold">{lives}</span>
            </div>
            <div className="h-4 w-px bg-foreground-muted" />
            <div className="flex items-center gap-2">
              <span className="text-accent-gold font-pixel text-xs">$</span>
              <span className="text-foreground font-bold">{currency}</span>
            </div>
          </div>
        </div>

        {/* Center: Wave counter */}
        <div className="pixel-panel py-2 px-6">
          <span className="font-pixel text-xs text-foreground">
            WAVE {wave}/{maxWaves}
          </span>
        </div>

        {/* Right: Speed controls */}
        <div className="flex items-center gap-2">
          <SpeedButton value={1} current={speed} />
          <SpeedButton value={2} current={speed} />
          <SpeedButton value={3} current={speed} />
          <PauseButton isPaused={isPaused} />
        </div>
      </div>

      {/* Bottom: Tower selection panel */}
      <div className="pointer-events-auto absolute bottom-0 left-0 right-0 p-4 pb-0">
        <div className="pixel-panel mx-auto flex max-w-3xl items-center justify-center gap-2 mb-4 overflow-x-auto py-2">
          {baseTowers.map((tower) => (
            <TowerSlot
              key={tower.id}
              tower={tower}
              canAfford={currency >= tower.baseStats.cost}
            />
          ))}
        </div>
      </div>

      {/* Dev Console */}
      <DevConsole />
    </div>
  );
}

interface SpeedButtonProps {
  value: number;
  current: number;
}

function SpeedButton({ value, current }: SpeedButtonProps) {
  const setSpeed = useGameStore((s) => s.setSpeed);
  const isActive = value === current;

  return (
    <button
      onClick={() => setSpeed(value)}
      className={`pixel-button text-2xs ${
        isActive ? "bg-accent-green" : ""
      }`}
    >
      {value}x
    </button>
  );
}

interface PauseButtonProps {
  isPaused: boolean;
}

function PauseButton({ isPaused }: PauseButtonProps) {
  const togglePause = useGameStore((s) => s.togglePause);

  return (
    <button
      onClick={togglePause}
      className={`pixel-button text-2xs ${isPaused ? "bg-warning" : ""}`}
    >
      {isPaused ? "Play" : "Pause"}
    </button>
  );
}

interface TowerSlotProps {
  tower: ExtendedTowerDefinition;
  canAfford: boolean;
}

function TowerSlot({ tower, canAfford }: TowerSlotProps) {
  const elementColor = getElementColor(tower.element) ?? "#888888";

  return (
    <button
      disabled={!canAfford}
      className={`flex flex-col items-center gap-1 p-2 transition-all hover:bg-background-tertiary ${
        !canAfford ? "opacity-40 cursor-not-allowed" : "cursor-pointer"
      }`}
      title={`${tower.name}: ${tower.description}`}
    >
      <div
        className="h-10 w-10 border border-foreground-muted flex items-center justify-center"
        style={{ backgroundColor: elementColor + "33" }}
      >
        <span
          className="font-pixel text-xs font-bold"
          style={{ color: elementColor }}
        >
          {tower.element.charAt(0).toUpperCase()}
        </span>
      </div>
      <span className="text-2xs text-foreground-muted truncate max-w-[60px]">
        {tower.name}
      </span>
      <span className={`text-2xs ${canAfford ? "text-accent-gold" : "text-danger"}`}>
        ${tower.baseStats.cost}
      </span>
    </button>
  );
}
