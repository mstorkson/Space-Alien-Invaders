# Space Alien Invaders — Game Spec

## Overview

A classic Space Invaders-style shooter built in Phaser 3. The player defends against three alien factions across three levels of increasing difficulty. Enemies march in a grid, descending toward the player. The player starts with a single weapon and upgrades via pickups dropped by defeated enemies.

---

## Tech Stack

- **Engine**: Phaser 3 (JavaScript)
- **Asset format**: PNG spritesheets
- **Target**: Browser (desktop)
- **Resolution**: 960 × 640

---

## Core Mechanics

| Mechanic | Detail |
|---|---|
| Player movement | Left / right only (arrow keys or A/D) |
| Player shooting | Spacebar — fires upward |
| Enemy movement | Grid marches left/right, steps down one row each time it hits a wall |
| Enemy shooting | Random enemies in the grid fire downward on a timer |
| Lives | Player has 3 lives; losing all → Game Over |
| Health / damage | Player sprite changes to show damage state (4 states) |
| Scoring | Fighter: 10pts, Frigate/Bomber: 20pts, Dreadnought/Battlecruiser: 30pts |
| Weapon pickups | Dropped by random enemies; collected by flying into them |
| Weapon tiers | Auto Cannon → Big Space Gun → Rockets → Zapper |
| Shield pickup | Temporary front shield on collision |
| Win condition | Clear all enemies on Level 3 |
| Lose condition | Enemies reach the bottom row OR player loses all 3 lives |

---

## Levels

| Level | Faction | Enemy rows | New challenge |
|---|---|---|---|
| 1 | Kla'ed | Fighter / Frigate / Battlecruiser | Intro pace, slow bullets |
| 2 | Nairan | Fighter / Bomber / Dreadnought | Faster grid, Bolt + Ray projectiles |
| 3 | Nautolan | Fighter / Frigate / Dreadnought | Fastest grid, Wave + Spinning Bullet projectiles |

---

## Asset Inventory

All paths are relative to the project root.

### Player Ship

| Asset | Role | File |
|---|---|---|
| Full health | Player base sprite | [Foozle_2DS0011_Void_MainShip/Main Ship/Main Ship - Bases/PNGs/Main Ship - Base - Full health.png](../Foozle_2DS0011_Void_MainShip/Main%20Ship/Main%20Ship%20-%20Bases/PNGs/Main%20Ship%20-%20Base%20-%20Full%20health.png) |
| Slight damage | Player 1 hit | [Foozle_2DS0011_Void_MainShip/Main Ship/Main Ship - Bases/PNGs/Main Ship - Base - Slight damage.png](../Foozle_2DS0011_Void_MainShip/Main%20Ship/Main%20Ship%20-%20Bases/PNGs/Main%20Ship%20-%20Base%20-%20Slight%20damage.png) |
| Damaged | Player 2 hits | [Foozle_2DS0011_Void_MainShip/Main Ship/Main Ship - Bases/PNGs/Main Ship - Base - Damaged.png](../Foozle_2DS0011_Void_MainShip/Main%20Ship/Main%20Ship%20-%20Bases/PNGs/Main%20Ship%20-%20Base%20-%20Damaged.png) |
| Very damaged | Player 3 hits (last life) | [Foozle_2DS0011_Void_MainShip/Main Ship/Main Ship - Bases/PNGs/Main Ship - Base - Very damaged.png](../Foozle_2DS0011_Void_MainShip/Main%20Ship/Main%20Ship%20-%20Bases/PNGs/Main%20Ship%20-%20Base%20-%20Very%20damaged.png) |
| Engine idle | Engine overlay (idle) | [Foozle_2DS0011_Void_MainShip/Main Ship/Main Ship - Engine Effects/PNGs/Main Ship - Engines - Base Engine - Idle.png](../Foozle_2DS0011_Void_MainShip/Main%20Ship/Main%20Ship%20-%20Engine%20Effects/PNGs/Main%20Ship%20-%20Engines%20-%20Base%20Engine%20-%20Idle.png) |
| Engine powering | Engine overlay (moving) | [Foozle_2DS0011_Void_MainShip/Main Ship/Main Ship - Engine Effects/PNGs/Main Ship - Engines - Base Engine - Powering.png](../Foozle_2DS0011_Void_MainShip/Main%20Ship/Main%20Ship%20-%20Engine%20Effects/PNGs/Main%20Ship%20-%20Engines%20-%20Base%20Engine%20-%20Powering.png) |
| Engine spritesheet | Engine animation frames | [Foozle_2DS0011_Void_MainShip/Main Ship/Main Ship - Engine Effects/PNGs/Main Ship - Engines - Base Engine - Spritesheet.png](../Foozle_2DS0011_Void_MainShip/Main%20Ship/Main%20Ship%20-%20Engine%20Effects/PNGs/Main%20Ship%20-%20Engines%20-%20Base%20Engine%20-%20Spritesheet.png) |
| Front shield | Shield overlay (pickup) | [Foozle_2DS0011_Void_MainShip/Main Ship/Main Ship - Shields/PNGs/Main Ship - Shields - Front Shield.png](../Foozle_2DS0011_Void_MainShip/Main%20Ship/Main%20Ship%20-%20Shields/PNGs/Main%20Ship%20-%20Shields%20-%20Front%20Shield.png) |
| Invincibility shield | Shield overlay (rare pickup) | [Foozle_2DS0011_Void_MainShip/Main Ship/Main Ship - Shields/PNGs/Main Ship - Shields - Invincibility Shield.png](../Foozle_2DS0011_Void_MainShip/Main%20Ship/Main%20Ship%20-%20Shields/PNGs/Main%20Ship%20-%20Shields%20-%20Invincibility%20Shield.png) |

### Player Weapons (mounted overlays)

| Asset | Role | File |
|---|---|---|
| Auto Cannon | Weapon tier 1 (default) | [Foozle_2DS0011_Void_MainShip/Main Ship/Main Ship - Weapons/PNGs/Main Ship - Weapons - Auto Cannon.png](../Foozle_2DS0011_Void_MainShip/Main%20Ship/Main%20Ship%20-%20Weapons/PNGs/Main%20Ship%20-%20Weapons%20-%20Auto%20Cannon.png) |
| Big Space Gun | Weapon tier 2 | [Foozle_2DS0011_Void_MainShip/Main Ship/Main Ship - Weapons/PNGs/Main Ship - Weapons - Big Space Gun.png](../Foozle_2DS0011_Void_MainShip/Main%20Ship/Main%20Ship%20-%20Weapons/PNGs/Main%20Ship%20-%20Weapons%20-%20Big%20Space%20Gun.png) |
| Rockets | Weapon tier 3 | [Foozle_2DS0011_Void_MainShip/Main Ship/Main Ship - Weapons/PNGs/Main Ship - Weapons - Rockets.png](../Foozle_2DS0011_Void_MainShip/Main%20Ship/Main%20Ship%20-%20Weapons/PNGs/Main%20Ship%20-%20Weapons%20-%20Rockets.png) |
| Zapper | Weapon tier 4 | [Foozle_2DS0011_Void_MainShip/Main Ship/Main Ship - Weapons/PNGs/Main Ship - Weapons - Zapper.png](../Foozle_2DS0011_Void_MainShip/Main%20Ship/Main%20Ship%20-%20Weapons/PNGs/Main%20Ship%20-%20Weapons%20-%20Zapper.png) |

### Player Projectiles

| Asset | Weapon tier | File |
|---|---|---|
| Auto cannon bullet | Tier 1 | [Foozle_2DS0011_Void_MainShip/Main ship weapons/PNGs/Main ship weapon - Projectile - Auto cannon bullet.png](../Foozle_2DS0011_Void_MainShip/Main%20ship%20weapons/PNGs/Main%20ship%20weapon%20-%20Projectile%20-%20Auto%20cannon%20bullet.png) |
| Big Space Gun blast | Tier 2 | [Foozle_2DS0011_Void_MainShip/Main ship weapons/PNGs/Main ship weapon - Projectile - Big Space Gun.png](../Foozle_2DS0011_Void_MainShip/Main%20ship%20weapons/PNGs/Main%20ship%20weapon%20-%20Projectile%20-%20Big%20Space%20Gun.png) |
| Rocket | Tier 3 | [Foozle_2DS0011_Void_MainShip/Main ship weapons/PNGs/Main ship weapon - Projectile - Rocket.png](../Foozle_2DS0011_Void_MainShip/Main%20ship%20weapons/PNGs/Main%20ship%20weapon%20-%20Projectile%20-%20Rocket.png) |
| Zapper bolt | Tier 4 | [Foozle_2DS0011_Void_MainShip/Main ship weapons/PNGs/Main ship weapon - Projectile - Zapper.png](../Foozle_2DS0011_Void_MainShip/Main%20ship%20weapons/PNGs/Main%20ship%20weapon%20-%20Projectile%20-%20Zapper.png) |

---

### Level 1 — Kla'ed Fleet

**Grid layout (3 rows × 10 columns):**

| Row | Ship | Points | File |
|---|---|---|---|
| Front (row 1) | Fighter | 10 | [Foozle_2DS0012_Void_EnemyFleet_1/Kla'ed/Base/PNGs/Kla'ed - Fighter - Base.png](../Foozle_2DS0012_Void_EnemyFleet_1/Kla'ed/Base/PNGs/Kla'ed%20-%20Fighter%20-%20Base.png) |
| Middle (row 2) | Frigate | 20 | [Foozle_2DS0012_Void_EnemyFleet_1/Kla'ed/Base/PNGs/Kla'ed - Frigate - Base.png](../Foozle_2DS0012_Void_EnemyFleet_1/Kla'ed/Base/PNGs/Kla'ed%20-%20Frigate%20-%20Base.png) |
| Back (row 3) | Battlecruiser | 30 | [Foozle_2DS0012_Void_EnemyFleet_1/Kla'ed/Base/PNGs/Kla'ed - Battlecruiser - Base.png](../Foozle_2DS0012_Void_EnemyFleet_1/Kla'ed/Base/PNGs/Kla'ed%20-%20Battlecruiser%20-%20Base.png) |

**Destruction animations:**

| Ship | File |
|---|---|
| Fighter | [Foozle_2DS0012_Void_EnemyFleet_1/Kla'ed/Destruction/PNGs/Kla'ed - Fighter - Destruction.png](../Foozle_2DS0012_Void_EnemyFleet_1/Kla'ed/Destruction/PNGs/Kla'ed%20-%20Fighter%20-%20Destruction.png) |
| Frigate | [Foozle_2DS0012_Void_EnemyFleet_1/Kla'ed/Destruction/PNGs/Kla'ed - Frigate - Destruction.png](../Foozle_2DS0012_Void_EnemyFleet_1/Kla'ed/Destruction/PNGs/Kla'ed%20-%20Frigate%20-%20Destruction.png) |
| Battlecruiser | [Foozle_2DS0012_Void_EnemyFleet_1/Kla'ed/Destruction/PNGs/Kla'ed - Battlecruiser - Destruction.png](../Foozle_2DS0012_Void_EnemyFleet_1/Kla'ed/Destruction/PNGs/Kla'ed%20-%20Battlecruiser%20-%20Destruction.png) |

**Enemy projectiles:**

| Projectile | File |
|---|---|
| Bullet | [Foozle_2DS0012_Void_EnemyFleet_1/Kla'ed/Projectiles/PNGs/Kla'ed - Bullet.png](../Foozle_2DS0012_Void_EnemyFleet_1/Kla'ed/Projectiles/PNGs/Kla'ed%20-%20Bullet.png) |
| Big Bullet | [Foozle_2DS0012_Void_EnemyFleet_1/Kla'ed/Projectiles/PNGs/Kla'ed - Big Bullet.png](../Foozle_2DS0012_Void_EnemyFleet_1/Kla'ed/Projectiles/PNGs/Kla'ed%20-%20Big%20Bullet.png) |

---

### Level 2 — Nairan Fleet

**Grid layout (3 rows × 10 columns):**

| Row | Ship | Points | File |
|---|---|---|---|
| Front (row 1) | Fighter | 10 | [Foozle_2DS0013_Void_EnemyFleet_2/Nairan/Designs - Base/PNGs/Nairan - Fighter - Base.png](../Foozle_2DS0013_Void_EnemyFleet_2/Nairan/Designs%20-%20Base/PNGs/Nairan%20-%20Fighter%20-%20Base.png) |
| Middle (row 2) | Bomber | 20 | [Foozle_2DS0013_Void_EnemyFleet_2/Nairan/Designs - Base/PNGs/Nairan - Bomber - Base.png](../Foozle_2DS0013_Void_EnemyFleet_2/Nairan/Designs%20-%20Base/PNGs/Nairan%20-%20Bomber%20-%20Base.png) |
| Back (row 3) | Dreadnought | 30 | [Foozle_2DS0013_Void_EnemyFleet_2/Nairan/Designs - Base/PNGs/Nairan - Dreadnought - Base.png](../Foozle_2DS0013_Void_EnemyFleet_2/Nairan/Designs%20-%20Base/PNGs/Nairan%20-%20Dreadnought%20-%20Base.png) |

**Destruction animations:**

| Ship | File |
|---|---|
| Fighter | [Foozle_2DS0013_Void_EnemyFleet_2/Nairan/Destruction/PNGs/Nairan - Fighter -  Destruction.png](../Foozle_2DS0013_Void_EnemyFleet_2/Nairan/Destruction/PNGs/Nairan%20-%20Fighter%20-%20%20Destruction.png) |
| Bomber | [Foozle_2DS0013_Void_EnemyFleet_2/Nairan/Destruction/PNGs/Nairan - Bomber -  Destruction.png](../Foozle_2DS0013_Void_EnemyFleet_2/Nairan/Destruction/PNGs/Nairan%20-%20Bomber%20-%20%20Destruction.png) |
| Dreadnought | [Foozle_2DS0013_Void_EnemyFleet_2/Nairan/Destruction/PNGs/Nairan - Dreadnought -  Destruction.png](../Foozle_2DS0013_Void_EnemyFleet_2/Nairan/Destruction/PNGs/Nairan%20-%20Dreadnought%20-%20%20Destruction.png) |

**Enemy projectiles:**

| Projectile | File |
|---|---|
| Bolt | [Foozle_2DS0013_Void_EnemyFleet_2/Nairan/Weapon Effects - Projectiles/PNGs/Nairan - Bolt.png](../Foozle_2DS0013_Void_EnemyFleet_2/Nairan/Weapon%20Effects%20-%20Projectiles/PNGs/Nairan%20-%20Bolt.png) |
| Ray | [Foozle_2DS0013_Void_EnemyFleet_2/Nairan/Weapon Effects - Projectiles/PNGs/Nairan - Ray.png](../Foozle_2DS0013_Void_EnemyFleet_2/Nairan/Weapon%20Effects%20-%20Projectiles/PNGs/Nairan%20-%20Ray.png) |

---

### Level 3 — Nautolan Fleet

**Grid layout (3 rows × 10 columns):**

| Row | Ship | Points | File |
|---|---|---|---|
| Front (row 1) | Fighter | 10 | [Foozle_2DS0014_Void_EnemyFleet_3/Nautolan/Designs - Base/PNGs/Nautolan Ship - Fighter - Base.png](../Foozle_2DS0014_Void_EnemyFleet_3/Nautolan/Designs%20-%20Base/PNGs/Nautolan%20Ship%20-%20Fighter%20-%20Base.png) |
| Middle (row 2) | Frigate | 20 | [Foozle_2DS0014_Void_EnemyFleet_3/Nautolan/Designs - Base/PNGs/Nautolan Ship - Frigate - Base.png](../Foozle_2DS0014_Void_EnemyFleet_3/Nautolan/Designs%20-%20Base/PNGs/Nautolan%20Ship%20-%20Frigate%20-%20Base.png) |
| Back (row 3) | Dreadnought | 30 | [Foozle_2DS0014_Void_EnemyFleet_3/Nautolan/Designs - Base/PNGs/Nautolan Ship - Dreadnought - Base.png](../Foozle_2DS0014_Void_EnemyFleet_3/Nautolan/Designs%20-%20Base/PNGs/Nautolan%20Ship%20-%20Dreadnought%20-%20Base.png) |

**Destruction animations:**

| Ship | File |
|---|---|
| Fighter | [Foozle_2DS0014_Void_EnemyFleet_3/Nautolan/Destruction/PNGs/Nautolan Ship - Fighter.png](../Foozle_2DS0014_Void_EnemyFleet_3/Nautolan/Destruction/PNGs/Nautolan%20Ship%20-%20Fighter.png) |
| Frigate | [Foozle_2DS0014_Void_EnemyFleet_3/Nautolan/Destruction/PNGs/Nautolan Ship - Frigate.png](../Foozle_2DS0014_Void_EnemyFleet_3/Nautolan/Destruction/PNGs/Nautolan%20Ship%20-%20Frigate.png) |
| Dreadnought | [Foozle_2DS0014_Void_EnemyFleet_3/Nautolan/Destruction/PNGs/Nautolan Ship - Dreadnought.png](../Foozle_2DS0014_Void_EnemyFleet_3/Nautolan/Destruction/PNGs/Nautolan%20Ship%20-%20Dreadnought.png) |

**Enemy projectiles:**

| Projectile | File |
|---|---|
| Bullet | [Foozle_2DS0014_Void_EnemyFleet_3/Nautolan/Weapon Effects - Projectiles/PNGs/Nautolan - Bullet.png](../Foozle_2DS0014_Void_EnemyFleet_3/Nautolan/Weapon%20Effects%20-%20Projectiles/PNGs/Nautolan%20-%20Bullet.png) |
| Wave | [Foozle_2DS0014_Void_EnemyFleet_3/Nautolan/Weapon Effects - Projectiles/PNGs/Nautolan - Wave.png](../Foozle_2DS0014_Void_EnemyFleet_3/Nautolan/Weapon%20Effects%20-%20Projectiles/PNGs/Nautolan%20-%20Wave.png) |
| Spinning Bullet | [Foozle_2DS0014_Void_EnemyFleet_3/Nautolan/Weapon Effects - Projectiles/PNGs/Nautolan - Spinning Bullet.png](../Foozle_2DS0014_Void_EnemyFleet_3/Nautolan/Weapon%20Effects%20-%20Projectiles/PNGs/Nautolan%20-%20Spinning%20Bullet.png) |

---

### Environment

| Asset | Role | File |
|---|---|---|
| Background void | Base layer (static) | [Foozle_2DS0015_Void_EnvironmentPack/Backgrounds/PNGs/Condesed/Starry background  - Layer 01 - Void.png](../Foozle_2DS0015_Void_EnvironmentPack/Backgrounds/PNGs/Condesed/Starry%20background%20%20-%20Layer%2001%20-%20Void.png) |
| Stars layer 1 | Parallax mid layer | [Foozle_2DS0015_Void_EnvironmentPack/Backgrounds/PNGs/Condesed/Starry background  - Layer 02 - Stars.png](../Foozle_2DS0015_Void_EnvironmentPack/Backgrounds/PNGs/Condesed/Starry%20background%20%20-%20Layer%2002%20-%20Stars.png) |
| Stars layer 2 | Parallax front layer | [Foozle_2DS0015_Void_EnvironmentPack/Backgrounds/PNGs/Condesed/Starry background  - Layer 03 - Stars.png](../Foozle_2DS0015_Void_EnvironmentPack/Backgrounds/PNGs/Condesed/Starry%20background%20%20-%20Layer%2003%20-%20Stars.png) |
| Asteroid base | Hazard sprite | [Foozle_2DS0015_Void_EnvironmentPack/Asteroids/PNGs/Asteroid 01 - Base.png](../Foozle_2DS0015_Void_EnvironmentPack/Asteroids/PNGs/Asteroid%2001%20-%20Base.png) |
| Asteroid explode | Hazard destruction | [Foozle_2DS0015_Void_EnvironmentPack/Asteroids/PNGs/Asteroid 01 - Explode.png](../Foozle_2DS0015_Void_EnvironmentPack/Asteroids/PNGs/Asteroid%2001%20-%20Explode.png) |
| Earth-like planet | Level 3 backdrop | [Foozle_2DS0015_Void_EnvironmentPack/Planets/PNGs/Earth-Like planet.png](../Foozle_2DS0015_Void_EnvironmentPack/Planets/PNGs/Earth-Like%20planet.png) |

---

### Pickups

| Asset | Role | File |
|---|---|---|
| Auto Cannon pickup | Weapon tier 1 drop | [Foozle_2DS0016_Void_PickupsPack/Weapons/PNGs/Pickup Icon - Weapons - Auto Cannons.png](../Foozle_2DS0016_Void_PickupsPack/Weapons/PNGs/Pickup%20Icon%20-%20Weapons%20-%20Auto%20Cannons.png) |
| Big Space Gun pickup | Weapon tier 2 drop | [Foozle_2DS0016_Void_PickupsPack/Weapons/PNGs/Pickup Icon - Weapons - Big Space Gun 2000.png](../Foozle_2DS0016_Void_PickupsPack/Weapons/PNGs/Pickup%20Icon%20-%20Weapons%20-%20Big%20Space%20Gun%202000.png) |
| Rocket pickup | Weapon tier 3 drop | [Foozle_2DS0016_Void_PickupsPack/Weapons/PNGs/Pickup Icon - Weapons - Rocket.png](../Foozle_2DS0016_Void_PickupsPack/Weapons/PNGs/Pickup%20Icon%20-%20Weapons%20-%20Rocket.png) |
| Zapper pickup | Weapon tier 4 drop | [Foozle_2DS0016_Void_PickupsPack/Weapons/PNGs/Pickup Icon - Weapons - Zapper.png](../Foozle_2DS0016_Void_PickupsPack/Weapons/PNGs/Pickup%20Icon%20-%20Weapons%20-%20Zapper.png) |
| Front Shield pickup | Shield drop | [Foozle_2DS0016_Void_PickupsPack/Shield Generators/PNGs/Pickup Icon - Shield Generator - Front Shield.png](../Foozle_2DS0016_Void_PickupsPack/Shield%20Generators/PNGs/Pickup%20Icon%20-%20Shield%20Generator%20-%20Front%20Shield.png) |
| Invincibility Shield pickup | Rare shield drop | [Foozle_2DS0016_Void_PickupsPack/Shield Generators/PNGs/Pickup Icon - Shield Generator - Invincibility Shield.png](../Foozle_2DS0016_Void_PickupsPack/Shield%20Generators/PNGs/Pickup%20Icon%20-%20Shield%20Generator%20-%20Invincibility%20Shield.png) |

---

## Milestones

Each milestone produces a playable build.

---

### Milestone 1 — Playable Core

**Goal:** A playable skeleton with Level 1 enemies and the core game loop.

**Deliverables:**
- Phaser 3 project scaffolded (`index.html`, `game.js`, `scenes/`)
- Parallax starfield background (3 layers, slow scroll)
- Player ship renders (full health sprite + engine effect overlay)
- Player moves left/right (arrow keys / A/D), constrained to screen
- Player fires Auto Cannon (spacebar, fire rate limited)
- Auto cannon bullet travels upward, destroyed on screen exit
- Kla'ed Fighter grid spawns (3 rows × 10 columns, Fighters only for now)
- Grid marches left/right; steps down one row on wall collision
- Bullet-enemy collision → enemy destroyed (no animation yet)
- Enemy bullet-player collision → player loses a life; respawns
- 3 lives displayed (top-left)
- Score displayed (top-right)
- Win state: all enemies cleared → "Level Clear" text
- Lose state: enemies reach bottom row OR lives = 0 → "Game Over" text
- Restart on keypress from either end state

**Assets used:** Player base (full health), engine idle, auto cannon bullet, Kla'ed Fighter base, background layers 1–3

---

### Milestone 2 — Full Level 1 + Game Loop

**Goal:** Level 1 complete with all enemy types, animations, shooting, and damage states.

**Deliverables:**
- Full 3-row Kla'ed grid: Fighter (row 1), Frigate (row 2), Battlecruiser (row 3)
- Each row uses correct sprite and point value
- Enemies fire Kla'ed Bullet downward on a random timer (one enemy at a time from the bottom of each column)
- Battlecruisers fire Kla'ed Big Bullet (slower, wider)
- Destruction spritesheet animation plays when an enemy is hit, then enemy removed
- Player damage states: sprite updates to Slight Damage → Damaged → Very Damaged as lives decrease
- Engine overlay switches to Powering sprite while moving
- Level clear transitions to a "Level 2" title card, then loads Level 2 (Nairan) — Level 2 grid can be placeholder Kla'ed assets for now
- Game Over screen shows final score + restart prompt

**Assets used:** All Kla'ed base sprites, Kla'ed destruction spritesheets, Kla'ed Bullet, Kla'ed Big Bullet, all player base damage states, engine powering sprite

---

### Milestone 3 — Levels 2 & 3

**Goal:** All three levels fully playable with correct factions, projectiles, and difficulty scaling.

**Deliverables:**
- Level 2: Nairan grid (Fighter / Bomber / Dreadnought) with Bolt + Ray projectiles
- Level 3: Nautolan grid (Fighter / Frigate / Dreadnought) with Bullet + Wave + Spinning Bullet projectiles
- Each level's destruction animations wired up
- Difficulty scaling per level:
  - Level 1: grid speed 80px/s, fire interval 2.5s
  - Level 2: grid speed 110px/s, fire interval 2.0s
  - Level 3: grid speed 140px/s, fire interval 1.5s
- Grid speeds up as enemies are eliminated (classic Space Invaders behaviour)
- Earth-like planet visible in background on Level 3
- Victory screen after Level 3 clears: shows total score, "You Win", restart prompt

**Assets used:** All Nairan sprites + projectiles, all Nautolan sprites + projectiles, Earth-like planet

---

### Milestone 4 — Pickups + Polish

**Goal:** Weapon upgrade system, shields, main menu, and final polish pass.

**Deliverables:**
- Weapon pickups drop from a random killed enemy (~20% drop chance)
- Pickup falls downward slowly; collected on player overlap
- Weapon tier progression: Auto Cannon → Big Space Gun → Rockets → Zapper
  - Each tier: faster projectile, higher damage (enemies take 1 hit regardless, but visual differs)
  - Weapon mount overlay on player ship updates to match current weapon tier
- Shield pickup drops at ~10% chance (Front Shield) and ~2% chance (Invincibility Shield)
  - Front Shield: absorbs the next 1 hit, shield overlay displays on ship
  - Invincibility Shield: 5 seconds of invincibility, invincibility shield overlay displays
- Main menu scene: game title, "Press Space to Start"
- HUD polish: lives displayed as ship icons, score formatted with commas
- Weapon indicator in HUD (current weapon name/icon)

**Assets used:** All pickup icons, weapon mount overlays (Big Space Gun / Rockets / Zapper), shield overlays (Front Shield / Invincibility Shield)

---

### Milestone 5 — Sound

**Goal:** Full SFX pass using Kenney Sci-Fi Sounds (CC0).

**Deliverables:**
- All game events wired to SFX (see table below)
- Randomise between variant files (e.g. `_000`–`_004`) on each trigger to avoid repetition
- SFX volume balanced so lasers don't overpower explosions

**Assets used:** See Sound Assets section below.

---

## Sound Assets

All files are in `kenney_sci-fi-sounds/Audio/`. Each sound category has variants `_000`–`_004` (or fewer) — pick one at random per trigger.

| Game Event | File(s) | Notes |
|---|---|---|
| Player fires — Auto Cannon | [laserSmall_000.ogg](../kenney_sci-fi-sounds/Audio/laserSmall_000.ogg) … `_004` | Quick, light shot |
| Player fires — Big Space Gun | [laserLarge_000.ogg](../kenney_sci-fi-sounds/Audio/laserLarge_000.ogg) … `_004` | Heavy, punchy |
| Player fires — Rockets | [thrusterFire_000.ogg](../kenney_sci-fi-sounds/Audio/thrusterFire_000.ogg) … `_004` | Rocket whoosh |
| Player fires — Zapper | [laserRetro_000.ogg](../kenney_sci-fi-sounds/Audio/laserRetro_000.ogg) … `_004` | Retro zap |
| Enemy fires (any) | [laserSmall_001.ogg](../kenney_sci-fi-sounds/Audio/laserSmall_001.ogg) | Use a different variant from player shot |
| Small enemy destroyed (Fighter) | [explosionCrunch_000.ogg](../kenney_sci-fi-sounds/Audio/explosionCrunch_000.ogg) … `_004` | Short crunch |
| Medium enemy destroyed (Frigate / Bomber) | [explosionCrunch_002.ogg](../kenney_sci-fi-sounds/Audio/explosionCrunch_002.ogg) … `_004` | Slightly longer |
| Large enemy destroyed (Dreadnought / Battlecruiser) | [lowFrequency_explosion_000.ogg](../kenney_sci-fi-sounds/Audio/lowFrequency_explosion_000.ogg) … `_001` | Deep boom |
| Player hit (shield absorbs) | [forceField_000.ogg](../kenney_sci-fi-sounds/Audio/forceField_000.ogg) … `_004` | Shield deflect |
| Player hit (takes damage) | [impactMetal_000.ogg](../kenney_sci-fi-sounds/Audio/impactMetal_000.ogg) … `_004` | Hull impact |
| Weapon pickup collected | [computerNoise_000.ogg](../kenney_sci-fi-sounds/Audio/computerNoise_000.ogg) … `_003` | UI beep |
| Shield pickup collected | [forceField_001.ogg](../kenney_sci-fi-sounds/Audio/forceField_001.ogg) | Shield power-up |
| Level clear | [spaceEngine_000.ogg](../kenney_sci-fi-sounds/Audio/spaceEngine_000.ogg) | Satisfying whoosh |
| Game over | [lowFrequency_explosion_001.ogg](../kenney_sci-fi-sounds/Audio/lowFrequency_explosion_001.ogg) | Final boom |

---

## Out of Scope

- Background music (no music tracks in this pack)
- Mobile / touch controls
- Local high score persistence
- Difficulty select
- Enemy engine animations (spritesheets available but not required for v1)
