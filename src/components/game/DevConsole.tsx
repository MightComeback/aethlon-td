/**
 * Dev Console
 * A collapsible console for development commands
 * Toggle with ` (backtick) key
 */

import { useState, useEffect, useRef, useCallback } from "react";
import { useGameStore } from "@/stores/gameStore";
import { useWeatherStore } from "@/stores/weatherStore";
import { WeatherType } from "@/types/weather";
import { GameState } from "@/types/game";

interface ConsoleEntry {
  id: number;
  type: "input" | "output" | "error";
  text: string;
}

interface DevCommand {
  name: string;
  aliases?: string[];
  description: string;
  usage?: string;
  execute: (args: string[]) => string;
}

// Build command registry
function createCommands(): DevCommand[] {
  return [
    {
      name: "help",
      aliases: ["?", "commands"],
      description: "List all available commands",
      execute: () => {
        const commands = createCommands();
        return commands
          .map((c) => {
            const aliasStr = c.aliases?.length
              ? ` (${c.aliases.join(", ")})`
              : "";
            return `${c.name}${aliasStr}: ${c.description}`;
          })
          .join("\n");
      },
    },
    {
      name: "startwave",
      aliases: ["sw", "wave"],
      description: "Start the next wave",
      usage: "startwave",
      execute: () => {
        const state = useGameStore.getState();
        if (state.gameState === GameState.Victory) {
          return "Game already won!";
        }
        if (state.gameState === GameState.Defeat) {
          return "Game over. Reset to continue.";
        }
        state.nextWave();
        return `Wave ${useGameStore.getState().wave} started`;
      },
    },
    {
      name: "stopwave",
      aliases: ["stop"],
      description: "Stop current wave (resets wave counter)",
      execute: () => {
        const state = useGameStore.getState();
        state.setGameState(GameState.Ready);
        return "Wave stopped. Ready state.";
      },
    },
    {
      name: "weather",
      aliases: ["w"],
      description: "Change weather type",
      usage: "weather <sunny|rainy|heavyrain|thunderstorm|snowy> [immediate]",
      execute: (args) => {
        const typeArg = args[0]?.toLowerCase();
        const immediate = args[1] === "immediate" || args[1] === "true";

        const weatherMap: Record<string, WeatherType> = {
          sunny: WeatherType.Sunny,
          rainy: WeatherType.Rainy,
          heavyrain: WeatherType.HeavyRain,
          heavy_rain: WeatherType.HeavyRain,
          thunderstorm: WeatherType.Thunderstorm,
          storm: WeatherType.Thunderstorm,
          snowy: WeatherType.Snowy,
          snow: WeatherType.Snowy,
        };

        if (!typeArg) {
          return `Usage: weather <type>\nValid: ${Object.keys(weatherMap).join(", ")}`;
        }

        const type = weatherMap[typeArg];
        if (!type) {
          return `Unknown weather: ${typeArg}\nValid: ${Object.keys(weatherMap).join(", ")}`;
        }

        useWeatherStore.getState().setWeather(type, immediate);
        return `Weather ${immediate ? "set to" : "transitioning to"} ${type}`;
      },
    },
    {
      name: "lightning",
      aliases: ["bolt", "strike"],
      description: "Trigger lightning strike (thunderstorm only)",
      execute: () => {
        const ws = useWeatherStore.getState();
        if (ws.current !== WeatherType.Thunderstorm) {
          return "Lightning only available in thunderstorm weather";
        }
        ws.triggerLightning();
        return "Lightning strike triggered";
      },
    },
    {
      name: "money",
      aliases: ["gold", "currency", "give"],
      description: "Add currency",
      usage: "money <amount>",
      execute: (args) => {
        const amount = parseInt(args[0] ?? "100");
        if (isNaN(amount)) return "Invalid amount";
        useGameStore.getState().addCurrency(amount);
        return `Added $${amount} (total: $${useGameStore.getState().currency})`;
      },
    },
    {
      name: "setmoney",
      description: "Set currency to exact amount",
      usage: "setmoney <amount>",
      execute: (args) => {
        const amount = parseInt(args[0] ?? "1000");
        if (isNaN(amount)) return "Invalid amount";
        const state = useGameStore.getState();
        // Reset to 0 then add
        state.addCurrency(-state.currency + amount);
        return `Currency set to $${amount}`;
      },
    },
    {
      name: "speed",
      aliases: ["spd"],
      description: "Set game speed (1-3)",
      usage: "speed <1|2|3>",
      execute: (args) => {
        const speed = parseInt(args[0] ?? "1");
        if (speed < 1 || speed > 3) return "Speed must be 1, 2, or 3";
        useGameStore.getState().setSpeed(speed);
        return `Game speed set to ${speed}x`;
      },
    },
    {
      name: "pause",
      description: "Pause the game",
      execute: () => {
        const state = useGameStore.getState();
        if (state.isPaused) {
          return "Already paused";
        }
        state.togglePause();
        return "Game paused";
      },
    },
    {
      name: "resume",
      aliases: ["unpause"],
      description: "Resume the game",
      execute: () => {
        const state = useGameStore.getState();
        if (!state.isPaused) {
          return "Not paused";
        }
        state.togglePause();
        return "Game resumed";
      },
    },
    {
      name: "lives",
      aliases: ["hp", "health"],
      description: "Set lives",
      usage: "lives <amount>",
      execute: (args) => {
        const amount = parseInt(args[0] ?? "20");
        if (isNaN(amount) || amount < 0) return "Invalid amount";
        const state = useGameStore.getState();
        // Calculate difference and apply
        const diff = state.lives - amount;
        if (diff > 0) {
          state.loseLife(diff);
        } else {
          // Can't add lives with current API, so we'd need to extend gameStore
          // For now, just report
          return `Cannot add lives (current: ${state.lives})`;
        }
        return `Lives set to ${useGameStore.getState().lives}`;
      },
    },
    {
      name: "kill",
      aliases: ["killall"],
      description: "Kill all enemies",
      execute: () => {
        const state = useGameStore.getState();
        const count = state.enemies.length;
        // Remove all enemies
        state.enemies.forEach((e) => state.removeEnemy(e.id));
        return `Killed ${count} enemies`;
      },
    },
    {
      name: "status",
      aliases: ["info", "state"],
      description: "Show current game status",
      execute: () => {
        const gs = useGameStore.getState();
        const ws = useWeatherStore.getState();
        return [
          `State: ${gs.gameState}`,
          `Wave: ${gs.wave}/${gs.maxWaves}`,
          `Lives: ${gs.lives}/${gs.maxLives}`,
          `Currency: $${gs.currency}`,
          `Speed: ${gs.speed}x`,
          `Paused: ${gs.isPaused}`,
          `Weather: ${ws.current}`,
          `Towers: ${gs.towers.length}`,
          `Enemies: ${gs.enemies.length}`,
        ].join("\n");
      },
    },
    {
      name: "reset",
      description: "Reset the game",
      execute: () => {
        useGameStore.getState().resetGame();
        useWeatherStore.getState().reset();
        return "Game reset";
      },
    },
    {
      name: "clear",
      aliases: ["cls"],
      description: "Clear console history",
      execute: () => {
        return "__CLEAR__";
      },
    },
  ];
}

export function DevConsole() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<ConsoleEntry[]>([]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const entryIdRef = useRef(0);

  // Toggle with backtick key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "`" || e.key === "~") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const addEntry = useCallback(
    (type: ConsoleEntry["type"], text: string) => {
      setHistory((prev) => [
        ...prev,
        { id: entryIdRef.current++, type, text },
      ]);
    },
    []
  );

  const executeCommand = useCallback(
    (commandStr: string) => {
      const trimmed = commandStr.trim();
      if (!trimmed) return;

      // Add to input history
      addEntry("input", `> ${trimmed}`);

      // Add to command history
      setCommandHistory((prev) => [...prev, trimmed]);
      setHistoryIndex(-1);

      // Parse command
      const parts = trimmed.split(/\s+/);
      const cmdName = parts[0]?.toLowerCase() ?? "";
      const args = parts.slice(1);

      // Find matching command
      const commands = createCommands();
      const cmd = commands.find(
        (c) => c.name === cmdName || c.aliases?.includes(cmdName)
      );

      if (!cmd) {
        addEntry("error", `Unknown command: ${cmdName}. Type 'help' for list.`);
        return;
      }

      try {
        const result = cmd.execute(args);
        if (result === "__CLEAR__") {
          setHistory([]);
        } else {
          addEntry("output", result);
        }
      } catch (e) {
        addEntry("error", `Error: ${String(e)}`);
      }
    },
    [addEntry]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        executeCommand(input);
        setInput("");
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        if (commandHistory.length > 0) {
          const newIndex =
            historyIndex < commandHistory.length - 1
              ? historyIndex + 1
              : historyIndex;
          setHistoryIndex(newIndex);
          setInput(commandHistory[commandHistory.length - 1 - newIndex] ?? "");
        }
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        if (historyIndex > 0) {
          const newIndex = historyIndex - 1;
          setHistoryIndex(newIndex);
          setInput(commandHistory[commandHistory.length - 1 - newIndex] ?? "");
        } else if (historyIndex === 0) {
          setHistoryIndex(-1);
          setInput("");
        }
      } else if (e.key === "Escape") {
        setIsOpen(false);
      }
    },
    [input, commandHistory, historyIndex, executeCommand]
  );

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="pointer-events-auto absolute bottom-20 right-4 z-50 pixel-button text-2xs opacity-50 hover:opacity-100"
        title="Open Dev Console (`)"
      >
        DEV
      </button>
    );
  }

  return (
    <div className="pointer-events-auto absolute inset-x-0 bottom-0 z-50 flex flex-col bg-background-secondary border-t border-foreground-muted">
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-1 border-b border-foreground-muted bg-background">
        <span className="font-pixel text-2xs text-foreground">DEV CONSOLE</span>
        <button
          onClick={() => setIsOpen(false)}
          className="text-foreground-muted hover:text-foreground text-xs px-2"
        >
          [X]
        </button>
      </div>

      {/* History */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-auto p-2 font-mono text-xs max-h-40"
      >
        {history.map((entry) => (
          <div
            key={entry.id}
            className={`whitespace-pre-wrap ${
              entry.type === "input"
                ? "text-foreground-muted"
                : entry.type === "error"
                  ? "text-danger"
                  : "text-accent-green"
            }`}
          >
            {entry.text}
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="flex items-center px-2 py-1 border-t border-foreground-muted">
        <span className="text-accent-green font-mono text-xs mr-1">&gt;</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type command... (help for list)"
          className="flex-1 bg-transparent text-foreground font-mono text-xs outline-none placeholder:text-foreground-muted"
        />
      </div>
    </div>
  );
}
