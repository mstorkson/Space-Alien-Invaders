# Space Alien Invaders

A classic Space Invaders-style browser game built with [Phaser 3](https://phaser.io/), featuring high-quality pixel art assets and sci-fi sound effects.

## Gameplay

Defend against waves of alien ships across 5 escalating levels. Shoot down enemy fleets before they reach you — each level introduces faster, tougher enemies until you face the final boss.

| Level | Enemy Type      | Notes                          |
|-------|-----------------|--------------------------------|
| 1     | Fighter         | Standard grid, slow pace       |
| 2     | Frigate         | Larger grid, faster fire       |
| 3     | Battlecruiser   | Faster movement                |
| 4     | Bomber          | 2 HP each, tighter formation   |
| 5     | Boss            | 40 HP, rapid fire              |

- **3 lives** — lose one each time an enemy bullet hits you
- **Score** carries over between levels
- Enemies speed up as their numbers dwindle

## Controls

| Key | Action |
|-----|--------|
| Arrow Left / Right | Move ship |
| Spacebar | Fire |

## Running the Game

Requires a local HTTP server (browsers block ES modules opened as `file://`).

```bash
python3 -m http.server 8080
```

Then open [http://localhost:8080](http://localhost:8080) in your browser.

## Project Structure

```
├── index.html                        # Entry point
├── src/
│   ├── game.js                       # Phaser config, scene list
│   └── scenes/
│       ├── TitleScene.js             # Title / start screen
│       └── GameScene.js              # Main gameplay
├── Foozle_2DS0011_Void_MainShip/     # Player ship sprites
├── Foozle_2DS0012_Void_EnemyFleet_1/ # Kla'ed enemy sprites
├── Foozle_2DS0013_Void_EnemyFleet_2/ # Nairan enemy sprites
├── Foozle_2DS0014_Void_EnemyFleet_3/ # Nautolan enemy sprites
├── Foozle_2DS0015_Void_EnvironmentPack/ # Backgrounds, planets, asteroids
├── Foozle_2DS0016_Void_PickupsPack/  # Weapon & shield pickup sprites
└── kenney_sci-fi-sounds/             # Sound effects
```

## Assets & Credits

- **Ship & enemy sprites** — [Foozle](https://foozlecc.itch.io/) — Void Main Ship, Enemy Fleets 1–3, Environment Pack, Pickups Pack
- **Sound effects** — [Kenney](https://kenney.nl/) — Sci-Fi Sounds
- **Game framework** — [Phaser 3](https://phaser.io/) v3.60.0
