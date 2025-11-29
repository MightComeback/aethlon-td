/**
 * DevLog Context
 * Provides a way to log messages to the DevConsole from anywhere in the app
 */

import {
  createContext,
  useContext,
  useCallback,
  useState,
  useMemo,
  type ReactNode,
} from "react";

export type DevLogType = "info" | "warn" | "error" | "json";

export interface DevLogEntry {
  id: number;
  type: DevLogType;
  message: string;
  data?: unknown;
  timestamp: number;
  expanded?: boolean;
}

interface DevLogContextValue {
  logs: DevLogEntry[];
  devLog: (message: string, type?: DevLogType) => void;
  devLogJson: (label: string, data: unknown) => void;
  clearLogs: () => void;
  toggleExpand: (id: number) => void;
}

const DevLogContext = createContext<DevLogContextValue | null>(null);

let logIdCounter = 0;

export function DevLogProvider({ children }: { children: ReactNode }) {
  const [logs, setLogs] = useState<DevLogEntry[]>([]);

  const devLog = useCallback((message: string, type: DevLogType = "info") => {
    setLogs((prev) => [
      ...prev,
      {
        id: logIdCounter++,
        type,
        message,
        timestamp: Date.now(),
      },
    ]);
  }, []);

  const devLogJson = useCallback((label: string, data: unknown) => {
    setLogs((prev) => [
      ...prev,
      {
        id: logIdCounter++,
        type: "json",
        message: label,
        data,
        timestamp: Date.now(),
        expanded: false,
      },
    ]);
  }, []);

  const clearLogs = useCallback(() => {
    setLogs([]);
  }, []);

  const toggleExpand = useCallback((id: number) => {
    setLogs((prev) =>
      prev.map((log) =>
        log.id === id ? { ...log, expanded: !log.expanded } : log
      )
    );
  }, []);

  const value = useMemo(
    () => ({ logs, devLog, devLogJson, clearLogs, toggleExpand }),
    [logs, devLog, devLogJson, clearLogs, toggleExpand]
  );

  return (
    <DevLogContext.Provider value={value}>{children}</DevLogContext.Provider>
  );
}

export function useDevLog() {
  const context = useContext(DevLogContext);
  if (!context) {
    throw new Error("useDevLog must be used within a DevLogProvider");
  }
  return context;
}

// Utility hook for components that might be outside provider (returns no-op functions)
export function useDevLogSafe() {
  const context = useContext(DevLogContext);
  return (
    context ?? {
      logs: [],
      devLog: () => {},
      devLogJson: () => {},
      clearLogs: () => {},
      toggleExpand: () => {},
    }
  );
}
