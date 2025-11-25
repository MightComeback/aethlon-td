type UpdateCallback = (deltaTime: number) => void;

/**
 * GameLoop - Fixed timestep game loop with interpolation support.
 */
export class GameLoop {
  private updateCallback: UpdateCallback;
  private renderCallback?: () => void;

  private running = false;
  private paused = false;
  private speed = 1;

  // Timing
  private lastTime = 0;
  private accumulator = 0;
  private readonly fixedDeltaTime = 1 / 60; // 60 updates per second
  private readonly maxDeltaTime = 0.25; // Prevent spiral of death

  // Stats
  private frameCount = 0;
  private fpsLastTime = 0;
  private currentFPS = 0;

  // RAF handle
  private rafHandle: number | null = null;

  constructor(updateCallback: UpdateCallback, renderCallback?: () => void) {
    this.updateCallback = updateCallback;
    this.renderCallback = renderCallback;
  }

  /**
   * Start the game loop
   */
  start(): void {
    if (this.running) return;

    this.running = true;
    this.lastTime = performance.now() / 1000;
    this.fpsLastTime = this.lastTime;
    this.accumulator = 0;

    this.tick();
  }

  /**
   * Stop the game loop
   */
  stop(): void {
    this.running = false;
    if (this.rafHandle !== null) {
      cancelAnimationFrame(this.rafHandle);
      this.rafHandle = null;
    }
  }

  /**
   * Pause the game loop (still runs, but update is not called)
   */
  pause(): void {
    this.paused = true;
  }

  /**
   * Resume the game loop
   */
  resume(): void {
    if (this.paused) {
      this.paused = false;
      this.lastTime = performance.now() / 1000;
      this.accumulator = 0;
    }
  }

  /**
   * Set game speed multiplier
   */
  setSpeed(speed: number): void {
    this.speed = Math.max(0.1, Math.min(10, speed));
  }

  /**
   * Get current speed
   */
  getSpeed(): number {
    return this.speed;
  }

  /**
   * Get current FPS
   */
  getFPS(): number {
    return this.currentFPS;
  }

  /**
   * Check if running
   */
  isRunning(): boolean {
    return this.running;
  }

  /**
   * Check if paused
   */
  isPaused(): boolean {
    return this.paused;
  }

  /**
   * Main loop tick
   */
  private tick = (): void => {
    if (!this.running) return;

    const currentTime = performance.now() / 1000;
    let deltaTime = currentTime - this.lastTime;
    this.lastTime = currentTime;

    // Clamp delta time to prevent spiral of death
    if (deltaTime > this.maxDeltaTime) {
      deltaTime = this.maxDeltaTime;
    }

    // FPS calculation
    this.frameCount++;
    if (currentTime - this.fpsLastTime >= 1) {
      this.currentFPS = this.frameCount;
      this.frameCount = 0;
      this.fpsLastTime = currentTime;
    }

    // Fixed timestep updates (only when not paused)
    if (!this.paused) {
      this.accumulator += deltaTime * this.speed;

      while (this.accumulator >= this.fixedDeltaTime) {
        this.updateCallback(this.fixedDeltaTime);
        this.accumulator -= this.fixedDeltaTime;
      }
    }

    // Render (always runs for smooth visuals)
    if (this.renderCallback) {
      this.renderCallback();
    }

    // Schedule next frame
    this.rafHandle = requestAnimationFrame(this.tick);
  };
}
