/**
 * App Initialization Hook
 * Initializes database and loads profile on app start
 */

import { useEffect, useState } from "react";
import { db } from "@/services/database";
import { useProfileStore } from "@/stores/profileStore";

export function useAppInit() {
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadProfile = useProfileStore((s) => s.loadProfile);
  const isProfileLoaded = useProfileStore((s) => s.isLoaded);

  useEffect(() => {
    async function init() {
      try {
        // Initialize database
        await db.initialize();

        // Load commander profile
        await loadProfile();

        setIsReady(true);
      } catch (err) {
        console.error("App initialization failed:", err);
        setError(err instanceof Error ? err.message : "Failed to initialize");
      }
    }

    init();
  }, [loadProfile]);

  return { isReady: isReady && isProfileLoaded, error };
}
