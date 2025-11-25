export enum EnemyType {
  Grunt = "grunt",
  Runner = "runner",
  Tank = "tank",
  Swarm = "swarm",
  Healer = "healer",
  ShieldBearer = "shield_bearer",
  Phaser = "phaser",
  Splitter = "splitter",
  Boss = "boss",
}

export interface EnemyStats {
  health: number;
  maxHealth: number;
  speed: number; // tiles per second
  armor: number; // damage reduction (physical)
  magicResistance: number; // damage reduction (magical)
  bounty: number; // currency on kill
  score: number; // points on kill
}

export interface EnemyDefinition {
  type: EnemyType;
  name: string;
  description: string;
  baseStats: EnemyStats;
  specialAbility?: string;
  isBoss: boolean;
}

export interface Enemy {
  id: string;
  type: EnemyType;
  position: { x: number; y: number };
  stats: EnemyStats;
  pathProgress: number; // 0-1 progress along the path
  currentWaypointIndex: number;
  statusEffects: StatusEffect[];
}

export interface StatusEffect {
  type: StatusEffectType;
  duration: number;
  strength: number;
  source: string; // tower id that applied it
}

export enum StatusEffectType {
  Slow = "slow",
  Burn = "burn",
  Freeze = "freeze",
  Poison = "poison",
  Stun = "stun",
}

export interface WaveEnemy {
  type: EnemyType;
  count: number;
  spawnDelay: number; // delay between each enemy in this group
  startDelay: number; // delay before this group starts spawning
}

export interface Wave {
  id: string;
  number: number;
  enemies: WaveEnemy[];
  isBossWave: boolean;
  bonusReward: number;
}
