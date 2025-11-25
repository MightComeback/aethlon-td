// ============================================================================
// Enemy Type Enums
// ============================================================================

export enum EnemyType {
  // Ground Enemies (50)
  Snail = "snail",
  Slug = "slug",
  Zombie = "zombie",
  ZombieCrawler = "zombie_crawler",
  Skeleton = "skeleton",
  SkeletonWarrior = "skeleton_warrior",
  Goblin = "goblin",
  GoblinArcher = "goblin_archer",
  Orc = "orc",
  OrcBrute = "orc_brute",
  Wolf = "wolf",
  DireWolf = "dire_wolf",
  Spider = "spider",
  GiantSpider = "giant_spider",
  Beetle = "beetle",
  ScarabBeetle = "scarab_beetle",
  Rat = "rat",
  GiantRat = "giant_rat",
  Slime = "slime",
  SlimeKing = "slime_king",
  Mushroom = "mushroom",
  MushroomGiant = "mushroom_giant",
  Golem = "golem",
  StoneGolem = "stone_golem",
  Ghost = "ghost",
  Wraith = "wraith",
  Imp = "imp",
  ImpFire = "imp_fire",
  Troll = "troll",
  TrollBridge = "troll_bridge",
  Bandit = "bandit",
  BanditLeader = "bandit_leader",
  Minotaur = "minotaur",
  Centaur = "centaur",
  Lizardman = "lizardman",
  LizardmanShaman = "lizardman_shaman",
  Scorpion = "scorpion",
  GiantScorpion = "giant_scorpion",
  Crab = "crab",
  GiantCrab = "giant_crab",
  Boar = "boar",
  WildBoar = "wild_boar",
  Bear = "bear",
  DireBear = "dire_bear",
  Werewolf = "werewolf",
  Mummy = "mummy",
  Ghoul = "ghoul",
  Vampire = "vampire",
  Ogre = "ogre",
  Cyclops = "cyclops",

  // Flying Enemies (30)
  Bat = "bat",
  GiantBat = "giant_bat",
  Raven = "raven",
  MurderCrow = "murder_crow",
  Wasp = "wasp",
  GiantWasp = "giant_wasp",
  Mosquito = "mosquito",
  BloodMosquito = "blood_mosquito",
  Harpy = "harpy",
  HarpyQueen = "harpy_queen",
  Griffin = "griffin",
  Gargoyle = "gargoyle",
  FlyingImp = "flying_imp",
  DemonFlyer = "demon_flyer",
  Pixie = "pixie",
  DarkPixie = "dark_pixie",
  Phoenix = "phoenix",
  Cockatrice = "cockatrice",
  Wyvern = "wyvern",
  WyvernPoison = "wyvern_poison",
  DragonWhelp = "dragon_whelp",
  FrostDrake = "frost_drake",
  FireDrake = "fire_drake",
  Specter = "specter",
  Banshee = "banshee",
  FlyingSkull = "flying_skull",
  GhostLantern = "ghost_lantern",
  EyeBeast = "eye_beast",
  Moth = "moth",
  DeathMoth = "death_moth",

  // Boss Enemies (20)
  SkeletonKing = "skeleton_king",
  ZombieLord = "zombie_lord",
  GoblinChief = "goblin_chief",
  OrcWarlord = "orc_warlord",
  SpiderQueen = "spider_queen",
  SlimeEmperor = "slime_emperor",
  AncientGolem = "ancient_golem",
  LichKing = "lich_king",
  VampireLord = "vampire_lord",
  WerewolfAlpha = "werewolf_alpha",
  DragonRed = "dragon_red",
  DragonBlue = "dragon_blue",
  DragonGreen = "dragon_green",
  DragonBlack = "dragon_black",
  Hydra = "hydra",
  Cerberus = "cerberus",
  Titan = "titan",
  Necromancer = "necromancer",
  DemonLord = "demon_lord",
  DeathKnight = "death_knight",
}

export enum EnemyCategory {
  Ground = "ground",
  Flying = "flying",
  Boss = "boss",
}

export enum StatusEffectType {
  // === Existing Effects ===
  Slow = "slow",
  Burn = "burn",
  Freeze = "freeze",
  Poison = "poison",
  Stun = "stun",

  // === New Damage Over Time ===
  Bleed = "bleed", // Physical DoT (stacks intensity)
  Corrode = "corrode", // Armor-ignoring DoT

  // === Armor/Defense Modifiers ===
  ArmorShred = "armor_shred", // Reduces armor by flat amount
  ArmorBreak = "armor_break", // Disables armor completely
  MagicVulnerable = "magic_vulnerable", // Reduces magic resistance

  // === Movement Effects ===
  Root = "root", // Complete movement stop
  Cripple = "cripple", // Progressive slow (gets worse over time)

  // === Death Triggers ===
  Marked = "marked", // Explodes on death
  Contagion = "contagion", // Spreads effects on death
  SoulHarvest = "soul_harvest", // Bonus currency/score on death

  // === Damage Amplification ===
  DamageAmp = "damage_amp", // Take increased damage (all sources)
  PhysicalVulnerable = "physical_vulnerable", // Take increased physical damage
  Exposed = "exposed", // Next hit deals bonus damage (consumed)

  // === Crowd Control ===
  Silence = "silence", // Disables special abilities
  Weaken = "weaken", // Reduces enemy damage
}

export enum SpecialAbilityType {
  None = "none",
  Heal = "heal",
  Shield = "shield",
  Phase = "phase",
  Split = "split",
  Regenerate = "regenerate",
  Summon = "summon",
  Armor = "armor",
  Speed = "speed",
  Resurrect = "resurrect",
}

// ============================================================================
// Tier System
// ============================================================================

export interface TierConfig {
  tier: number;
  healthMultiplier: number;
  speedMultiplier: number;
  armorMultiplier: number;
  bountyMultiplier: number;
  colorShift: number; // Grayscale shift for visual distinction
}

// ============================================================================
// Enemy Stats & Definitions
// ============================================================================

export interface EnemyStats {
  health: number;
  maxHealth: number;
  speed: number; // tiles per second
  armor: number; // damage reduction (physical)
  magicResistance: number; // damage reduction (magical)
  bounty: number; // currency on kill
  score: number; // points on kill
}

export interface SpecialAbility {
  type: SpecialAbilityType;
  cooldown: number; // ms
  duration?: number; // ms
  strength?: number; // ability-specific value
}

export interface EnemyMeshConfig {
  baseShape: "humanoid" | "quadruped" | "insect" | "blob" | "flying" | "serpent";
  scale: number;
  parts: MeshPart[];
}

export interface MeshPart {
  type: "sphere" | "box" | "cylinder" | "cone" | "dodecahedron";
  position: [number, number, number];
  rotation?: [number, number, number];
  size: number[];
  color: string; // Grayscale hex
  flatShading?: boolean;
}

export interface EnemyDefinition {
  type: EnemyType;
  name: string;
  description: string;
  category: EnemyCategory;
  baseStats: Omit<EnemyStats, "health">; // health comes from maxHealth
  specialAbility?: SpecialAbility;
  meshConfig: EnemyMeshConfig;
  isBoss: boolean;
  unlockWave?: number; // Earliest wave this enemy can appear
}

// ============================================================================
// Runtime Enemy Instance
// ============================================================================

export interface StatusEffect {
  type: StatusEffectType;
  duration: number;
  strength: number;
  source: string; // tower id that applied it
}

export interface Enemy {
  id: string;
  type: EnemyType;
  tier: number;
  position: { x: number; y: number; z: number };
  stats: EnemyStats;
  pathProgress: number; // 0-1 progress along the path
  currentWaypointIndex: number;
  statusEffects: StatusEffect[];
  isFlying: boolean;
}

// ============================================================================
// Wave Configuration
// ============================================================================

export interface WaveGroup {
  enemyType: EnemyType;
  tier: number;
  count: number;
  spawnDelay: number; // ms between spawns
  startDelay: number; // ms before this group starts
  spawnPoint?: number; // Optional specific spawn index
}

export interface WaveConfig {
  id: string;
  waveNumber: number;
  groups: WaveGroup[];
  isBossWave: boolean;
  bonusReward: number;
  difficulty: number; // Calculated from enemy composition
}

export interface MapWaveOverride {
  mapId: string;
  waves: WaveConfig[];
  replaceGlobal: boolean; // true = replace, false = merge
}

// Legacy interfaces for backward compatibility
export interface WaveEnemy {
  type: EnemyType;
  count: number;
  spawnDelay: number;
  startDelay: number;
}

export interface Wave {
  id: string;
  number: number;
  enemies: WaveEnemy[];
  isBossWave: boolean;
  bonusReward: number;
}
