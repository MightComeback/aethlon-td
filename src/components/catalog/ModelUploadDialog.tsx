/**
 * Model Upload Dialog
 * Shows AI generation prompt and upload functionality for 3D models
 */

import { useState } from "react";
import { useModelUpload, type ModelCategory } from "@/hooks/useModelUpload";

interface ModelUploadDialogProps {
  isOpen: boolean;
  onClose: () => void;
  modelId: string;
  modelName: string;
  category: ModelCategory;
  prompt: string;
}

// Style guide prefix for all prompts
const STYLE_PREFIX = `3D pixel art voxel-style model. Blocky, cubic forms like Minecraft or Crossy Road. Sharp edges, flat colors with minimal gradients. Visible "pixels" as small cubes. No smooth surfaces - everything is stepped/blocky. Retro 16-bit game aesthetic. Simple color palette, strong silhouette. Y-up orientation, centered at origin.`;

export function ModelUploadDialog({
  isOpen,
  onClose,
  modelId,
  modelName,
  category,
  prompt,
}: ModelUploadDialogProps) {
  const [copied, setCopied] = useState(false);
  const { uploadModel, hasModel } = useModelUpload({ category });

  if (!isOpen) return null;

  const fullPrompt = `${STYLE_PREFIX}\n\n${prompt}`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(fullPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleUpload = () => {
    uploadModel(modelId);
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="pixel-panel max-w-2xl w-full max-h-[80vh] overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="font-pixel text-lg text-foreground">{modelName}</h2>
            <p className="text-xs text-foreground-muted mt-1 font-mono">
              {category}/{modelId}.glb
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-foreground-muted hover:text-foreground p-1"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Prompt section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-foreground-muted uppercase tracking-wide">
              AI Generation Prompt
            </span>
            <button
              onClick={handleCopy}
              className={`px-3 py-1 text-xs rounded transition-colors ${
                copied
                  ? "bg-green-600 text-white"
                  : "bg-accent-gold/80 hover:bg-accent-gold text-background"
              }`}
            >
              {copied ? "Copied!" : "Copy Prompt"}
            </button>
          </div>

          <div className="bg-background-secondary rounded p-4 text-sm text-foreground leading-relaxed whitespace-pre-wrap font-mono">
            {fullPrompt}
          </div>
        </div>

        {/* Upload section */}
        <div className="mt-6 pt-4 border-t border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-foreground">Upload Generated Model</p>
              <p className="text-xs text-foreground-muted mt-1">
                After generating, download as GLB and upload here
              </p>
            </div>
            <button
              onClick={handleUpload}
              className={`px-4 py-2 text-sm rounded transition-colors ${
                hasModel(modelId)
                  ? "bg-green-600 text-white"
                  : "bg-primary hover:bg-primary/80 text-foreground"
              }`}
            >
              {hasModel(modelId) ? "✓ Uploaded" : "Upload GLB"}
            </button>
          </div>
        </div>

        {/* Tips */}
        <div className="mt-4 p-3 bg-background-tertiary rounded text-xs text-foreground-muted">
          <p className="font-semibold text-foreground mb-1">Tips:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Use Meshy AI, Tripo3D, or similar text-to-3D tools</li>
            <li>Export as GLB format (binary GLTF)</li>
            <li>Keep polygon count under 5000 for performance</li>
            <li>Model should be ~1 unit tall for characters, ~1.5 for towers</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M15 5L5 15M5 5L15 15" />
    </svg>
  );
}

// ============================================================================
// PROMPT GENERATORS
// ============================================================================

/**
 * Generate prompt for map objects
 */
export function getObjectPrompt(id: string, name: string, description: string): string {
  const prompts: Record<string, string> = {
    // Trees
    tree_pine: `Voxel pine tree. Blocky brown trunk (2x2 cubes). Triangular green foliage made of stacked cube layers, getting smaller toward top. 3-4 tiers. Height: 1.5 units.`,
    tree_oak: `Voxel oak tree. Thick blocky brown trunk. Large cubic green canopy - irregular blob shape made of cubes. Some branch blocks visible. Height: 1.5 units.`,
    tree_birch: `Voxel birch tree. White blocky trunk with black pixel marks. Light green cubic leaf clusters. Thin elegant shape. Height: 1.4 units.`,
    tree_willow: `Voxel willow tree. Brown blocky trunk. Hanging green cube chains for drooping branches. Sad tree silhouette. Height: 1.5 units.`,
    tree_dead: `Voxel dead tree. Grey-brown blocky trunk. Bare angular branches reaching up like claws. No leaves. Spooky. Height: 1.3 units.`,
    tree_pine_snow: `Voxel snow pine. Same as pine but with white cube snow on top of each green tier. Winter version. Height: 1.5 units.`,

    // Rocks
    rock: `Voxel boulder. Irregular grey cube cluster. Some darker grey cubes for depth. Green cube moss patches. Size: 0.4 units.`,
    ice_crystal: `Voxel ice crystal. Angular light blue/cyan cube spikes pointing up. Translucent look with white highlights. Magical. Size: 0.5 units.`,
    volcanic_rock: `Voxel volcanic rock. Dark grey/black cubes with orange/red glowing cubes in cracks. Hot dangerous look. Size: 0.4 units.`,

    // Vegetation
    bush: `Voxel bush. Round cluster of green cubes. Some pink/yellow flower cubes on top. Simple sphere-ish shape. Size: 0.3 units.`,
    grass: `Voxel grass tuft. Few tall green cube columns of varying height. Simple ground decoration. Size: 0.15 units.`,
    flower: `Voxel flower. Green stem (1 cube wide), leaves, colorful flower cube on top (red/pink/yellow). Size: 0.2 units.`,
    sunflower: `Voxel sunflower. Tall green cube stem. Large yellow cube flower head with brown center cubes. Height: 0.5 units.`,
    cactus: `Voxel cactus. Green cube column with 1-2 arm branches. Classic saguaro shape in blocks. Height: 0.4 units.`,
    mushroom: `Voxel mushroom. White cube stem. Red cube cap with white spot cubes. Toadstool style. Size: 0.2 units.`,
    cattail: `Voxel cattail. Tall green cube reeds with brown cube tops. Swamp plant. Height: 0.4 units.`,
    lily_pad: `Voxel lily pad. Flat green cube disc. Pink/white flower cubes on top. Floats on water. Size: 0.3 units.`,

    // Single-tile Structures
    tower_base: `Voxel tower platform. Grey cube cobblestones in circular pattern. Raised edge. Some green moss cubes. Size: 0.8 units.`,
    fence: `Voxel fence. Brown cube posts and rails. Simple wooden fence segment. Width: 1 unit.`,
    house: `Voxel cottage. Grey cube foundation, brown cube walls, darker roof cubes. Window hole, door. Tiny house. Size: 0.8 units.`,
    well: `Voxel well. Grey cube circular wall. Brown cube roof frame. Bucket on rope. Size: 0.5 units.`,
    windmill: `Voxel windmill. Stone/wood cube base. Four blade sails at top made of flat cube panels. Height: 1 unit.`,
    cabin: `Voxel log cabin. Horizontal brown cube logs stacked. Roof cubes, chimney cubes. Small porch. Size: 0.8 units.`,
    tent: `Voxel tent. Triangular shape from tan/beige cubes. Pole structure. Camping tent. Size: 0.5 units.`,
    igloo: `Voxel igloo. White/light blue cubes in dome shape. Entrance tunnel. Arctic shelter. Size: 0.5 units.`,
    obelisk: `Voxel obelisk. Tall grey cube pillar, tapers at top. Ancient monument. Height: 0.8 units.`,

    // Decorations
    hay_bale: `Voxel hay bale. Golden yellow cubes in cylinder shape. Brown rope cubes. Farm item. Size: 0.3 units.`,
    log: `Voxel log. Brown cube cylinder lying down. Darker end circles. Forest floor. Length: 0.5 units.`,
    stump: `Voxel stump. Short brown cube cylinder. Tan top with ring pattern cubes. Size: 0.25 units.`,
    grave: `Voxel gravestone. Grey cube rectangle, rounded top. Stands upright. Spooky decor. Height: 0.4 units.`,
    lantern: `Voxel lantern post. Brown/iron cube pole. Yellow/orange light cube in glass box at top. Height: 0.6 units.`,
    snowman: `Voxel snowman. Three white cube spheres stacked. Black cube eyes/buttons. Orange carrot nose cube. Height: 0.5 units.`,
    pottery: `Voxel pot. Orange-brown cubes in vase shape. Clay pot decoration. Size: 0.25 units.`,
    bones: `Voxel bones. White cube bone shapes scattered. Maybe skull. Size: 0.3 units.`,
    skull: `Voxel skull. White cubes forming skull shape. Eye holes. Spooky marker. Size: 0.15 units.`,
    fire_pit: `Voxel campfire. Grey cube stone ring. Orange/red/yellow flame cubes in center. Brown log cubes. Size: 0.4 units.`,
    snow_pile: `Voxel snow pile. White cubes heaped up. Irregular mound shape. Size: 0.3 units.`,
  };

  return prompts[id] || `${name}: ${description}. Voxel-style game asset.`;
}

/**
 * Generate prompt for structures
 */
export function getStructurePrompt(id: string, name: string, description: string, footprint: [number, number]): string {
  const [w, h] = footprint;
  const prompts: Record<string, string> = {
    house: `Voxel medieval house. Two-story blocky building. Brown cube walls, grey cube roof. Window holes, door hole. Chimney cubes. Footprint: ${w}x${h} tiles. Height: 1.5 units.`,
    farmhouse: `Voxel farmhouse. Long blocky building. White cube walls, brown roof cubes. Attached barn section. Footprint: ${w}x${h} tiles. Height: 1.3 units.`,
    barn: `Voxel barn. Red cube walls, white trim cubes. High peaked roof. Large door opening. Hay loft. Footprint: ${w}x${h} tiles. Height: 1.4 units.`,
    windmill: `Voxel windmill. Stone cube tower base. Four flat cube blade sails at top. Door, windows. Footprint: ${w}x${h} tiles. Height: 2 units.`,
    market: `Voxel market stall. Brown cube counter. Striped awning cubes above. Goods displayed. Footprint: ${w}x${h} tiles. Height: 0.8 units.`,
    inn: `Voxel inn. Two-story blocky building. Sign cubes hanging. Warm yellow window cubes. Chimney. Footprint: ${w}x${h} tiles. Height: 1.5 units.`,
    blacksmith: `Voxel blacksmith. Grey cube stone walls. Open front. Orange forge glow cubes. Anvil. Smoke cubes. Footprint: ${w}x${h} tiles. Height: 1.2 units.`,
    church: `Voxel church. Grey cube stone building. Tall steeple tower. Arched door. Bell at top. Footprint: ${w}x${h} tiles. Height: 2 units.`,
    bridge: `Voxel bridge. Grey cube arch spanning gap. Flat top surface. Side railings. Footprint: ${w}x${h} tiles. Height: 0.5 units.`,
    pier: `Voxel dock. Brown cube planks on posts extending over water. Crate cubes, rope. Footprint: ${w}x${h} tiles. Height: 0.3 units.`,
    wall: `Voxel defensive wall. Grey cube stone blocks stacked. Crenellated top pattern. Footprint: ${w}x${h} tiles. Height: 0.8 units.`,
    gate: `Voxel gate. Stone cube archway. Brown cube wooden doors. Defensive entrance. Footprint: ${w}x${h} tiles. Height: 1 unit.`,
  };

  return prompts[id] || `${name}: ${description}. Voxel structure spanning ${w}x${h} tiles.`;
}

/**
 * Generate prompt for enemies
 */
export function getEnemyPrompt(type: string, name: string, description: string, category: string, isBoss: boolean): string {
  const sizeHint = isBoss ? "Boss size: 1.2-1.5 units tall." : "Size: 0.5-0.8 units tall.";
  const categoryHint = category === "flying" ? "Flying - hovers above ground, has wings." : "Ground-based.";

  const prompts: Record<string, string> = {
    // Ground enemies
    snail: `Voxel snail. Grey-green cube body. Brown spiral shell cubes on back. Two eye stalk cubes. ${sizeHint}`,
    slug: `Voxel slug. Purple-grey elongated cube body. Two antenna cubes. No shell. ${sizeHint}`,
    zombie: `Voxel zombie. Green-grey skin cubes. Brown tattered cloth cubes. Arms outstretched. Blocky humanoid. ${sizeHint}`,
    zombie_crawler: `Voxel crawler zombie. Same as zombie but on all fours. Horizontal pose. ${sizeHint}`,
    skeleton: `Voxel skeleton. White bone cubes forming humanoid. Empty eye holes. Simple sword/shield cubes. ${sizeHint}`,
    skeleton_warrior: `Voxel skeleton warrior. White bones with grey armor cubes. Shield with pattern. ${sizeHint}`,
    goblin: `Voxel goblin. Small green cube body. Large pointed ear cubes. Brown cloth cubes. Club. ${sizeHint}`,
    goblin_archer: `Voxel goblin archer. Same as goblin with bow cubes. Quiver on back. ${sizeHint}`,
    orc: `Voxel orc. Large green muscular cube body. Tusks. Brown armor cubes. Axe. ${sizeHint}`,
    orc_brute: `Voxel orc brute. Even larger green cube body. Heavy armor. Huge weapon. ${sizeHint}`,
    wolf: `Voxel wolf. Grey cube body on four legs. Pointy ears, snout. Tail. ${sizeHint}`,
    dire_wolf: `Voxel dire wolf. Larger grey wolf. Red eye cubes. Scarred. ${sizeHint}`,
    spider: `Voxel spider. Black cube body. Eight cube legs. Multiple red eye cubes. ${sizeHint}`,
    giant_spider: `Voxel giant spider. Larger black spider. Purple markings. ${sizeHint}`,
    beetle: `Voxel beetle. Dark shell cubes. Six legs. Pincer cubes. ${sizeHint}`,
    scarab_beetle: `Voxel scarab. Gold/green shiny shell cubes. Egyptian style. ${sizeHint}`,
    rat: `Voxel rat. Brown cube body. Long tail. Red eyes. Big teeth cubes. ${sizeHint}`,
    giant_rat: `Voxel giant rat. Larger brown rat. Mangy patches. ${sizeHint}`,
    slime: `Voxel slime. Green/blue translucent cube blob. Simple face. Bouncy shape. ${sizeHint}`,
    slime_king: `Voxel slime king. Huge slime blob. Gold crown cubes on top. ${sizeHint}`,
    mushroom: `Voxel mushroom creature. White stem cubes, red cap with white spots. Has legs. Face on cap. ${sizeHint}`,
    mushroom_giant: `Voxel giant mushroom. Towering fungus creature. Spore cubes floating. ${sizeHint}`,
    golem: `Voxel golem. Grey boulder cubes stacked into humanoid. Glowing rune cube on chest. ${sizeHint}`,
    stone_golem: `Voxel stone golem. Refined grey stone cubes. Ancient rune patterns. ${sizeHint}`,
    ghost: `Voxel ghost. White/blue translucent cubes. Floating, no legs. Sad face. ${sizeHint}`,
    wraith: `Voxel wraith. Black robe cubes. Hood. Glowing eye cubes. Skeletal hands. ${sizeHint}`,
    imp: `Voxel imp. Small red cube body. Horn cubes, wing cubes, tail. ${sizeHint}`,
    imp_fire: `Voxel fire imp. Red/orange imp with flame cubes around it. ${sizeHint}`,
    troll: `Voxel troll. Large grey-green cube body. Long arms, small head. ${sizeHint}`,
    troll_bridge: `Voxel bridge troll. Same troll with crude cloth cubes. ${sizeHint}`,
    bandit: `Voxel bandit. Human cube figure. Dark hood, mask. Dagger cubes. ${sizeHint}`,
    bandit_leader: `Voxel bandit leader. Fancier outfit cubes. Dual weapons. ${sizeHint}`,
    minotaur: `Voxel minotaur. Brown cube body. Bull head cubes with horns. Axe. ${sizeHint}`,
    centaur: `Voxel centaur. Human torso cubes on horse body cubes. Bow. ${sizeHint}`,
    lizardman: `Voxel lizardman. Green scale cubes. Tail, snout. Spear. ${sizeHint}`,
    lizardman_shaman: `Voxel lizardman shaman. Same with staff, feather cubes. ${sizeHint}`,
    scorpion: `Voxel scorpion. Brown segmented cubes. Pincer claws. Curved tail stinger. ${sizeHint}`,
    giant_scorpion: `Voxel giant scorpion. Larger version. Armored shell. ${sizeHint}`,
    crab: `Voxel crab. Red shell cubes. Large claw cubes. Six legs. ${sizeHint}`,
    giant_crab: `Voxel giant crab. Massive shell and claws. ${sizeHint}`,
    boar: `Voxel boar. Brown cube body. Tusk cubes. Four legs. ${sizeHint}`,
    wild_boar: `Voxel wild boar. Larger, angrier. Charging pose. ${sizeHint}`,
    bear: `Voxel bear. Brown cube body. Four legs or standing. ${sizeHint}`,
    dire_bear: `Voxel dire bear. Massive brown bear. Scars. ${sizeHint}`,
    werewolf: `Voxel werewolf. Grey-brown wolf humanoid cubes. Standing. Claws, fangs. ${sizeHint}`,
    mummy: `Voxel mummy. Tan bandage cubes wrapped around body. Glowing eyes. ${sizeHint}`,
    ghoul: `Voxel ghoul. Grey-green undead. Crouching. Sharp claw cubes. ${sizeHint}`,
    vampire: `Voxel vampire. Pale cube figure. Black cape cubes. Red eyes. Fangs. ${sizeHint}`,
    ogre: `Voxel ogre. Large fat green cubes. Club. Single cloth. ${sizeHint}`,
    cyclops: `Voxel cyclops. Huge humanoid. Single large eye cube in center. ${sizeHint}`,

    // Flying enemies
    bat: `Voxel bat. Brown/black cube body. Wing cubes spread. Red eyes. ${categoryHint} ${sizeHint}`,
    giant_bat: `Voxel giant bat. Larger wingspan. More menacing. ${categoryHint} ${sizeHint}`,
    raven: `Voxel raven. Black cube bird. Sharp beak. ${categoryHint} ${sizeHint}`,
    murder_crow: `Voxel demon crow. Black with red eyes. Larger. ${categoryHint} ${sizeHint}`,
    wasp: `Voxel wasp. Yellow-black striped cubes. Wings. Stinger. ${categoryHint} ${sizeHint}`,
    giant_wasp: `Voxel giant wasp. Massive version. ${categoryHint} ${sizeHint}`,
    mosquito: `Voxel mosquito. Thin cube body. Long proboscis cube. Wings. ${categoryHint} ${sizeHint}`,
    blood_mosquito: `Voxel blood mosquito. Red swollen body. ${categoryHint} ${sizeHint}`,
    harpy: `Voxel harpy. Human torso cubes, bird wing/leg cubes. Feathers. ${categoryHint} ${sizeHint}`,
    harpy_queen: `Voxel harpy queen. Fancier feather cubes. Crown. ${categoryHint} ${sizeHint}`,
    griffin: `Voxel griffin. Eagle head cubes, lion body cubes. Wings. ${categoryHint} ${sizeHint}`,
    gargoyle: `Voxel gargoyle. Grey stone cubes. Bat wings, horns. ${categoryHint} ${sizeHint}`,
    flying_imp: `Voxel flying imp. Red imp cubes with wings spread in flight. ${categoryHint} ${sizeHint}`,
    demon_flyer: `Voxel demon flyer. Larger demon cubes. Wings, horns, tail. ${categoryHint} ${sizeHint}`,
    pixie: `Voxel pixie. Tiny humanoid cubes. Insect wing cubes. Glowing. ${categoryHint} ${sizeHint}`,
    dark_pixie: `Voxel dark pixie. Purple/black coloring. Evil. ${categoryHint} ${sizeHint}`,
    phoenix: `Voxel phoenix. Orange-red-yellow flame bird cubes. Trailing fire. ${categoryHint} ${sizeHint}`,
    cockatrice: `Voxel cockatrice. Rooster head, dragon wings, snake tail. ${categoryHint} ${sizeHint}`,
    wyvern: `Voxel wyvern. Two legs, two wings. Long neck. Tail barb. ${categoryHint} ${sizeHint}`,
    wyvern_poison: `Voxel poison wyvern. Green coloring. Dripping. ${categoryHint} ${sizeHint}`,
    dragon_whelp: `Voxel baby dragon. Small cute dragon cubes. Wings. ${categoryHint} ${sizeHint}`,
    frost_drake: `Voxel frost drake. Blue-white ice dragon cubes. ${categoryHint} ${sizeHint}`,
    fire_drake: `Voxel fire drake. Red-orange flame dragon cubes. ${categoryHint} ${sizeHint}`,
    specter: `Voxel specter. Very translucent white cubes. Barely there. ${categoryHint} ${sizeHint}`,
    banshee: `Voxel banshee. White female ghost cubes. Screaming. ${categoryHint} ${sizeHint}`,
    flying_skull: `Voxel flying skull. White skull cubes. Flame cubes around it. ${categoryHint} ${sizeHint}`,
    ghost_lantern: `Voxel ghost lantern. Lantern cubes with ghost inside. ${categoryHint} ${sizeHint}`,
    eye_beast: `Voxel eye beast. Giant eyeball cube. Tentacle cubes. Beholder. ${categoryHint} ${sizeHint}`,
    moth: `Voxel moth. Fuzzy cube body. Large patterned wing cubes. ${categoryHint} ${sizeHint}`,
    death_moth: `Voxel death moth. Skull pattern on wings. ${categoryHint} ${sizeHint}`,

    // Bosses
    skeleton_king: `Voxel skeleton king. White bones, gold crown cubes, cape. Giant sword. ${sizeHint}`,
    zombie_lord: `Voxel zombie lord. Larger armored zombie. Crown. ${sizeHint}`,
    goblin_chief: `Voxel goblin chief. Larger goblin. Headdress cubes. ${sizeHint}`,
    orc_warlord: `Voxel orc warlord. Massive armored orc. Skull trophies. ${sizeHint}`,
    spider_queen: `Voxel spider queen. Huge spider. Egg sac cubes. Web crown. ${sizeHint}`,
    slime_emperor: `Voxel slime emperor. Gigantic slime. Multiple crowns. ${sizeHint}`,
    ancient_golem: `Voxel ancient golem. Massive stone. Runes everywhere. ${sizeHint}`,
    lich_king: `Voxel lich king. Skeleton in robes. Crown, staff. ${sizeHint}`,
    vampire_lord: `Voxel vampire lord. Elegant vampire. Cape, throne. ${sizeHint}`,
    werewolf_alpha: `Voxel werewolf alpha. Largest werewolf. Scars. ${sizeHint}`,
    dragon_red: `Voxel red dragon. Full dragon. Crimson cubes. Fire breath. Large wings.`,
    dragon_blue: `Voxel blue dragon. Storm dragon cubes. Lightning. Large wings.`,
    dragon_green: `Voxel green dragon. Forest dragon cubes. Poison. Large wings.`,
    dragon_black: `Voxel black dragon. Shadow dragon cubes. Acid. Large wings.`,
    hydra: `Voxel hydra. Serpent body. 3-5 dragon head cubes.`,
    cerberus: `Voxel cerberus. Three-headed dog cubes. Flames. Massive.`,
    titan: `Voxel titan. Mountain-sized humanoid cubes. Ancient elemental.`,
    necromancer: `Voxel necromancer. Skeleton in robes. Bone staff. Magic cubes.`,
    demon_lord: `Voxel demon lord. Massive red demon. Wings, horns. Flame sword.`,
    death_knight: `Voxel death knight. Black armor cubes. Cursed sword. Undead horse optional.`,
  };

  return prompts[type] || `${name}: ${description}. Voxel enemy. ${categoryHint} ${sizeHint}`;
}

/**
 * Generate prompt for towers
 */
export function getTowerPrompt(_id: string, name: string, description: string, element: string, tier: number): string {
  const tierHint = tier === 1
    ? "Simple base, few details. Height: 1.2 units."
    : tier === 2
      ? "More elaborate, multiple sections. Height: 1.5 units."
      : "Epic, complex, impressive. Height: 1.8 units.";

  // Element-specific voxel prompts
  const elementPrompts: Record<string, Record<number, string>> = {
    fire: {
      1: `Voxel fire tower. Red-orange cube base. Stone grey pedestal cubes. Flame cubes flickering on top. Simple brazier shape.`,
      2: `Voxel fire tower. Red brick cubes stacked. Orange-yellow flame cubes at top. Ember particles. Chimney design.`,
      3: `Voxel inferno tower. Dark red obsidian cubes. Multiple flame cube jets. Lava cubes flowing down sides. Volcanic.`,
    },
    water: {
      1: `Voxel water tower. Blue-grey stone cubes. Cyan water cube fountain on top. Simple pillar shape.`,
      2: `Voxel water tower. Light blue crystal cubes. Water cubes cascading down tiers. Shell decorations.`,
      3: `Voxel tidal tower. Deep blue cubes. Swirling water cube vortex. Coral and pearl cube accents. Majestic.`,
    },
    earth: {
      1: `Voxel earth tower. Brown-grey stone cubes stacked. Green moss cubes. Simple rock formation.`,
      2: `Voxel earth tower. Boulder cubes in ring formation. Crystal cubes emerging. Dirt and root cubes.`,
      3: `Voxel mountain tower. Massive grey stone cubes. Gold ore cubes visible. Ancient rune cubes. Mighty.`,
    },
    air: {
      1: `Voxel air tower. White marble cubes. Light blue wind swirl cubes. Simple column design.`,
      2: `Voxel air tower. Floating white cube segments. Cloud cubes between layers. Ethereal gaps.`,
      3: `Voxel tempest tower. Swirling white-blue cubes. Tornado cube effect. Lightning cubes crackling. Dramatic.`,
    },
    lightning: {
      1: `Voxel lightning tower. Grey metal cubes. Yellow lightning rod cubes on top. Simple conductor.`,
      2: `Voxel lightning tower. Blue-grey steel cubes. Multiple arc cubes between coils. Tesla design.`,
      3: `Voxel storm spire. Dark purple cubes. Electric blue bolt cubes arcing. Crystal capacitor cubes. Powerful.`,
    },
    lava: {
      1: `Voxel lava tower. Black basalt cubes. Orange molten cubes in cracks. Steaming.`,
      2: `Voxel lava tower. Obsidian cubes with lava cube veins. Magma pool at base. Rock formations.`,
      3: `Voxel eruption tower. Volcanic black cubes. Bright orange lava cube streams. Smoke cubes. Destructive.`,
    },
    ice: {
      1: `Voxel ice tower. Light blue ice cubes. White frost cubes. Simple frozen pillar.`,
      2: `Voxel ice tower. Cyan crystal cubes. Icicle cubes hanging. Snow cube pile at base. Cold mist.`,
      3: `Voxel glacier tower. Deep blue ancient ice cubes. Frozen spike cubes. Snowflake patterns. Majestic frozen.`,
    },
    storm: {
      1: `Voxel storm tower. Dark grey cloud cubes. Purple lightning cubes. Simple storm cloud shape.`,
      2: `Voxel storm tower. Swirling grey cubes. Multiple bolt cubes. Rain cube effects. Thunderous.`,
      3: `Voxel supercell tower. Black-purple cloud cubes. Intense lightning web cubes. Tornado funnel base. Apocalyptic.`,
    },
    magma: {
      1: `Voxel magma tower. Brown rock cubes. Yellow-orange electric veins. Heated stone.`,
      2: `Voxel magma tower. Bronze metal cubes. Earth and lightning merged. Glowing seams.`,
      3: `Voxel tectonic tower. Amber crystal cubes. Electric magma core cube. Earth power made manifest.`,
    },
    plasma: {
      1: `Voxel plasma tower. White-hot core cubes. Orange corona cubes. Simple fusion design.`,
      2: `Voxel plasma tower. Intense white center. Swirling fire-air cubes. Energy rings.`,
      3: `Voxel solar tower. Brilliant white cubes. Sun-like plasma cubes. Heat distortion effect. Blinding power.`,
    },
    volcano: {
      1: `Voxel volcano tower. Black-red cube mountain. Lava cube at top. Mini volcano shape.`,
      2: `Voxel volcano tower. Layered volcanic cubes. Multiple lava vents. Ash cloud cubes.`,
      3: `Voxel supervolcano tower. Massive eruption cubes. Pyroclastic cube flows. Devastating molten fury.`,
    },
    glacier: {
      1: `Voxel glacier tower. Pale blue ancient ice cubes. Simple frozen monument.`,
      2: `Voxel glacier tower. Deep blue ice cubes. Frozen wave cubes. Time-frozen water.`,
      3: `Voxel eternal frost tower. Arctic blue cubes. Ice age monument cubes. Absolute zero cold radiating.`,
    },
    hurricane: {
      1: `Voxel hurricane tower. Grey swirling cubes. Wind cube vortex. Simple cyclone.`,
      2: `Voxel hurricane tower. Dark grey rotating cubes. Eye of storm hollow. Violent winds visualized.`,
      3: `Voxel category-5 tower. Massive spiral cube structure. Lightning within clouds. Devastating storm.`,
    },
    mountain: {
      1: `Voxel mountain tower. Grey granite cubes. Simple peak shape. Stable foundation.`,
      2: `Voxel mountain tower. Layered stone cubes. Crystal cave cubes visible. Ancient formation.`,
      3: `Voxel titan tower. Massive mountain cubes. Gold veins. Emerald cubes. Living mountain presence.`,
    },
    supercell: {
      1: `Voxel supercell tower. Storm cloud cubes with electric cubes. Intense weather system.`,
      2: `Voxel supercell tower. Multi-layered storm cubes. Multiple lightning bolt cubes. Rotating updraft.`,
      3: `Voxel apocalypse tower. Ultimate storm cube formation. Constant lightning. Reality-bending weather.`,
    },
  };

  const elementKey = element.toLowerCase();
  const tierPrompts = elementPrompts[elementKey];

  if (tierPrompts && tierPrompts[tier]) {
    return `${tierPrompts[tier]} ${tierHint}`;
  }

  // Fallback for any elements not specifically defined
  return `Voxel ${name} tower. ${description} ${element} element cubes. ${tierHint} Tower defense asset.`;
}
