// ── Tuning constants ────────────────────────────────────────────────────────
const PLAYER_SPEED       = 300;   // px/s
const PLAYER_SCALE       = 1.5;
const BULLET_SPEED       = 500;   // px/s upward
const FIRE_COOLDOWN      = 300;   // ms between player shots
const ENEMY_BULLET_SPEED = 220;   // px/s downward
const ENEMY_FIRE_DELAY   = 2000;  // ms between enemy shots
const ENEMY_SCALE        = 1.2;
const GRID_COLS          = 7;
const GRID_ROWS          = 3;
const GRID_SPACING_X     = 120;   // px between enemy centres (horizontal)
const GRID_SPACING_Y     = 95;    // px between enemy centres (vertical)
const GRID_START_Y       = 90;    // y of first enemy row
const GRID_BASE_SPEED    = 40;    // px/s horizontal (grows as enemies die)
const GRID_STEP_DOWN     = 18;    // px the grid drops each time it hits a wall
const WALL_MARGIN        = 36;    // px buffer from left/right screen edge

// ── Per-level configuration ──────────────────────────────────────────────────
const LEVELS = {
    1: { enemyKey: 'enemyFighter',       cols: 7, rows: 3, baseSpeed: 40,  fireDelay: 2000, enemyScale: 1.2  },
    2: { enemyKey: 'enemyFrigate',       cols: 7, rows: 4, baseSpeed: 65,  fireDelay: 1300, enemyScale: 1.1  },
    3: { enemyKey: 'enemyBattlecruiser', cols: 7, rows: 4, baseSpeed: 80,  fireDelay: 1000, enemyScale: 0.75 },
    4: { enemyKey: 'enemyBomber',        cols: 4, rows: 4, baseSpeed: 60,  fireDelay:  650, enemyScale: 1.8,  stepDown: 12, enemyHp: 2, spacingX: 160, spacingY: 115 },
    5: { enemyKey: 'enemyBattlecruiser', cols: 1, rows: 1, baseSpeed: 130, fireDelay:  220, enemyScale: 3.0,  stepDown:  0, enemyHp: 40, isBoss: true, startY: 210 },
};
const MAX_LEVEL = 5;

// ── Asset paths (relative to project root) ──────────────────────────────────
const PATHS = {
    bgVoid:        "Foozle_2DS0015_Void_EnvironmentPack/Backgrounds/PNGs/Condesed/Starry background  - Layer 01 - Void.png",
    bgStars1:      "Foozle_2DS0015_Void_EnvironmentPack/Backgrounds/PNGs/Condesed/Starry background  - Layer 02 - Stars.png",
    bgStars2:      "Foozle_2DS0015_Void_EnvironmentPack/Backgrounds/PNGs/Condesed/Starry background  - Layer 03 - Stars.png",
    player:        "Foozle_2DS0011_Void_MainShip/Main Ship/Main Ship - Bases/PNGs/Main Ship - Base - Full health.png",
    engineIdle:    "Foozle_2DS0011_Void_MainShip/Main Ship/Main Ship - Engine Effects/PNGs/Main Ship - Engines - Base Engine - Idle.png",
    bulletPlayer:  "Foozle_2DS0011_Void_MainShip/Main ship weapons/PNGs/Main ship weapon - Projectile - Auto cannon bullet.png",
    enemyFighter:       "Foozle_2DS0012_Void_EnemyFleet_1/Kla'ed/Base/PNGs/Kla'ed - Fighter - Base.png",
    enemyFrigate:       "Foozle_2DS0012_Void_EnemyFleet_1/Kla'ed/Base/PNGs/Kla'ed - Frigate - Base.png",
    enemyBattlecruiser: "Foozle_2DS0012_Void_EnemyFleet_1/Kla'ed/Base/PNGs/Kla'ed - Battlecruiser - Base.png",
    enemyBomber:        "Foozle_2DS0012_Void_EnemyFleet_1/Kla'ed/Base/PNGs/Kla'ed - Bomber - Base.png",
    enemyDreadnought:   "Foozle_2DS0012_Void_EnemyFleet_1/Kla'ed/Base/PNGs/Kla'ed - Dreadnought - Base.png",
    bulletEnemy:   "Foozle_2DS0012_Void_EnemyFleet_1/Kla'ed/Projectiles/PNGs/Kla'ed - Bullet.png",
};

// ── Scene ────────────────────────────────────────────────────────────────────
export default class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
    }

    // ── Lifecycle ─────────────────────────────────────────────────────────────

    preload() {
        for (const [key, path] of Object.entries(PATHS)) {
            this.load.image(key, path);
        }

        // SFX
        this.load.audio('sfxShootPlayer', 'kenney_sci-fi-sounds/Audio/laserSmall_000.ogg');
        this.load.audio('sfxShootEnemy',  'kenney_sci-fi-sounds/Audio/laserSmall_003.ogg');
        for (let i = 0; i <= 4; i++) {
            this.load.audio(`sfxExplode${i}`, `kenney_sci-fi-sounds/Audio/explosionCrunch_00${i}.ogg`);
        }
        this.load.audio('sfxHit',       'kenney_sci-fi-sounds/Audio/impactMetal_000.ogg');
        this.load.audio('sfxLevelClear','kenney_sci-fi-sounds/Audio/spaceEngine_000.ogg');
        this.load.audio('sfxGameOver',  'kenney_sci-fi-sounds/Audio/lowFrequency_explosion_000.ogg');
    }

    create() {
        const W = this.scale.width;
        const H = this.scale.height;

        const data = this.scene.settings.data || {};
        this.currentLevel = data.level || 1;
        this.lvl          = LEVELS[this.currentLevel];

        // State — initialised before helpers so HUD can read them
        this.lives        = data.lives  !== undefined ? data.lives  : 3;
        this.score        = data.score  !== undefined ? data.score  : 0;
        this.gameOver     = false;
        this.levelClear   = false;
        this.victoryMode  = false;
        this.invincible   = false;
        this.fireCooldown = 0;

        this.createBackground(W, H);
        this.createPlayer(W, H);
        this.createBulletGroups();
        this.createEnemyGrid();
        this.createInput();
        this.createEnemyFireTimer();
        this.createHUD(W);
    }

    update(_time, delta) {
        this.cullBullets();

        if (this.victoryMode) {
            const offsetY = this.player.displayHeight * 0.55;
            this.engineOverlay.setPosition(this.player.x, this.player.y + offsetY);
            return;
        }

        if (this.gameOver || this.levelClear) return;

        this.scrollBackground();
        this.movePlayer();
        this.handleShooting(delta);
        this.updateEnemyGrid(delta);
        this.checkBulletEnemyCollisions();
        this.checkBulletPlayerCollision();
        this.checkEndConditions();
    }

    // ── Setup helpers ─────────────────────────────────────────────────────────


    createBackground(W, H) {
        this.bgLayers = [
            this.add.tileSprite(W / 2, H / 2, W, H, 'bgVoid').setDepth(-3),
            this.add.tileSprite(W / 2, H / 2, W, H, 'bgStars1').setDepth(-2),
            this.add.tileSprite(W / 2, H / 2, W, H, 'bgStars2').setDepth(-1),
        ];
        this.bgSpeeds = [0.15, 0.4, 0.9];
    }

    createPlayer(W, H) {
        this.player = this.physics.add.sprite(W / 2, H - 70, 'player')
            .setScale(PLAYER_SCALE)
            .setCollideWorldBounds(true)
            .setDepth(2);

        // Shrink physics body slightly inside the visual sprite
        this.player.body.setSize(
            this.player.width * 0.7,
            this.player.height * 0.7
        );

        this.engineOverlay = this.add.image(this.player.x, this.player.y, 'engineIdle')
            .setScale(PLAYER_SCALE)
            .setDepth(1);
    }

    createBulletGroups() {
        this.playerBullets = this.physics.add.group();
        this.enemyBullets  = this.physics.add.group();
    }

    createEnemyGrid() {
        this.enemies = this.add.group();

        const { cols, rows, enemyKey, enemyScale } = this.lvl;
        const enemyHp   = this.lvl.enemyHp  || 1;
        const spacingX  = this.lvl.spacingX  || GRID_SPACING_X;
        const spacingY  = this.lvl.spacingY  || GRID_SPACING_Y;
        const startY    = this.lvl.startY    || GRID_START_Y;
        const gridWidth = (cols - 1) * spacingX;
        const startX    = (this.scale.width - gridWidth) / 2;

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const x = startX + col * spacingX;
                const y = startY + row * spacingY;
                const enemy = this.add.sprite(x, y, enemyKey).setScale(enemyScale).setDepth(0);
                enemy.hp    = enemyHp;
                enemy.maxHp = enemyHp;
                this.enemies.add(enemy);
            }
        }

        this.gridDir      = 1;             // 1 = right, -1 = left
        this.initialCount = this.enemies.getLength();
    }

    createInput() {
        this.cursors  = this.input.keyboard.createCursorKeys();
        this.wasd     = this.input.keyboard.addKeys('A,D');
        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    createEnemyFireTimer() {
        this.enemyFireTimer = this.time.addEvent({
            delay: this.lvl.fireDelay,
            callback: this.shootEnemyBullet,
            callbackScope: this,
            loop: true,
        });
    }

    createHUD(W) {
        this.livesText = this.add.text(16, 16, 'Lives: ' + this.lives, {
            fontSize: '20px', color: '#ffffff', fontFamily: 'monospace'
        }).setDepth(10);

        this.scoreText = this.add.text(W - 16, 16, 'Score: ' + this.score, {
            fontSize: '20px', color: '#ffffff', fontFamily: 'monospace'
        }).setOrigin(1, 0).setDepth(10);

        this.add.text(W / 2, 16, 'Level ' + this.currentLevel, {
            fontSize: '20px', color: '#aaaaff', fontFamily: 'monospace'
        }).setOrigin(0.5, 0).setDepth(10);

        if (this.lvl.isBoss) {
            const barW = 400;
            const barX = W / 2;
            const barY = 52;
            this.add.text(barX, barY - 10, 'BOSS', {
                fontSize: '13px', color: '#ff4444', fontFamily: 'monospace'
            }).setOrigin(0.5, 1).setDepth(15);
            this.add.rectangle(barX, barY, barW, 12, 0x440000).setDepth(14);
            this.bossHpFill = this.add.rectangle(barX - barW / 2, barY, barW, 12, 0x00ff44)
                .setOrigin(0, 0.5).setDepth(15);
            this.bossHpMaxW = barW;
        }
    }

    // ── Update helpers ────────────────────────────────────────────────────────

    scrollBackground() {
        this.bgLayers.forEach((layer, i) => {
            layer.tilePositionY -= this.bgSpeeds[i];
        });
    }

    movePlayer() {
        const left  = this.cursors.left.isDown  || this.wasd.A.isDown;
        const right = this.cursors.right.isDown || this.wasd.D.isDown;

        if (left)       this.player.setVelocityX(-PLAYER_SPEED);
        else if (right) this.player.setVelocityX(PLAYER_SPEED);
        else            this.player.setVelocityX(0);

        // Engine glow sits below the ship centre
        const offsetY = this.player.displayHeight * 0.55;
        this.engineOverlay.setPosition(this.player.x, this.player.y + offsetY);
    }

    handleShooting(delta) {
        this.fireCooldown -= delta;
        if (this.spaceKey.isDown && this.fireCooldown <= 0) {
            this.fireCooldown = FIRE_COOLDOWN;
            const bullet = this.playerBullets.create(
                this.player.x,
                this.player.y - this.player.displayHeight / 2,
                'bulletPlayer'
            );
            bullet.body.allowGravity = false;
            bullet.setVelocityY(-BULLET_SPEED);
            bullet.setDepth(3);
            this.sfx('sfxShootPlayer', 0.5);
        }
    }

    shootEnemyBullet() {
        if (this.gameOver || this.levelClear) return;
        const alive = this.enemies.getChildren().filter(e => e.active);
        if (alive.length === 0) return;

        const shooter = Phaser.Utils.Array.GetRandom(alive);
        const bullet  = this.enemyBullets.create(
            shooter.x,
            shooter.y + shooter.displayHeight / 2,
            'bulletEnemy'
        );
        bullet.body.allowGravity = false;
        bullet.setVelocityY(ENEMY_BULLET_SPEED);
        bullet.setDepth(3);
        this.sfx('sfxShootEnemy', 0.35);
    }

    updateEnemyGrid(delta) {
        const alive = this.enemies.getChildren().filter(e => e.active);
        if (alive.length === 0) return;

        // Grid speeds up as enemies are cleared (classic Space Invaders feel)
        const killRatio = (this.initialCount - alive.length) / this.initialCount;
        const speed = this.lvl.baseSpeed * (1 + killRatio * 2);
        const dx    = speed * this.gridDir * (delta / 1000);

        // Find the left and right edges of the grid
        let minX = Infinity, maxX = -Infinity;
        for (const e of alive) {
            const hw = e.displayWidth / 2;
            if (e.x - hw < minX) minX = e.x - hw;
            if (e.x + hw > maxX) maxX = e.x + hw;
        }

        const hitRight = this.gridDir > 0 && (maxX + dx) >= this.scale.width - WALL_MARGIN;
        const hitLeft  = this.gridDir < 0 && (minX + dx) <= WALL_MARGIN;

        if (hitRight || hitLeft) {
            this.gridDir *= -1;
            const stepDown = this.lvl.stepDown ?? GRID_STEP_DOWN;
            for (const e of alive) e.y += stepDown;
        } else {
            for (const e of alive) e.x += dx;
        }
    }

    // Manual bounds check: playerBullets (physics) vs enemies (plain sprites)
    checkBulletEnemyCollisions() {
        const bullets = this.playerBullets.getChildren().slice();
        const alive   = this.enemies.getChildren().slice();

        for (const bullet of bullets) {
            if (!bullet.active) continue;
            const br = bullet.getBounds();
            for (const enemy of alive) {
                if (!enemy.active) continue;
                if (Phaser.Geom.Intersects.RectangleToRectangle(br, enemy.getBounds())) {
                    bullet.destroy();
                    enemy.hp--;
                    if (enemy.hp <= 0) {
                        enemy.destroy();
                        this.score += 10;
                        this.scoreText.setText('Score: ' + this.score);
                        this.sfxExplode();
                    } else {
                        const pct = enemy.hp / enemy.maxHp;
                        if (pct <= 0.3)      enemy.setTint(0xff2200);
                        else if (pct <= 0.6) enemy.setTint(0xff7700);
                        else                 enemy.setTint(0xff4444);
                        this.updateBossHp(enemy.hp, enemy.maxHp);
                        this.cameras.main.shake(80, 0.006);
                        this.sfx('sfxHit', 0.5);
                    }
                    break; // one enemy per bullet
                }
            }
        }
    }

    checkBulletPlayerCollision() {
        if (this.invincible) return;
        const pb = this.player.getBounds();
        for (const bullet of this.enemyBullets.getChildren().slice()) {
            if (!bullet.active) continue;
            if (!Phaser.Geom.Intersects.RectangleToRectangle(bullet.getBounds(), pb)) continue;

            bullet.destroy();
            this.invincible = true;
            this.lives--;
            this.livesText.setText('Lives: ' + this.lives);
            this.sfx('sfxHit', 0.7);
            this.showHitEffect(this.player.x, this.player.y);

            if (this.lives <= 0) {
                this.triggerGameOver();
                return;
            }

            this.tweens.add({
                targets: [this.player, this.engineOverlay],
                alpha: 0.25,
                duration: 100,
                ease: 'Linear',
                yoyo: true,
                repeat: 4,
                onComplete: () => {
                    this.player.setAlpha(1);
                    this.engineOverlay.setAlpha(1);
                    this.invincible = false;
                }
            });
            return;
        }
    }

    cullBullets() {
        const H = this.scale.height;
        this.playerBullets.getChildren().forEach(b => { if (b.y < -20) b.destroy(); });
        this.enemyBullets.getChildren().forEach(b => { if (b.y > H + 20) b.destroy(); });
    }

    checkEndConditions() {
        const alive = this.enemies.getChildren().filter(e => e.active);

        if (alive.length === 0) {
            this.showLevelClear();
            return;
        }

        // Lose if any enemy reaches the player's row
        const dangerY = this.player.y - this.player.displayHeight;
        for (const e of alive) {
            if (e.y >= dangerY) {
                this.triggerGameOver();
                return;
            }
        }
    }

    // ── End states ────────────────────────────────────────────────────────────

    showLevelClear() {
        if (this.levelClear) return;
        this.levelClear = true;
        this.enemyFireTimer.remove();
        this.playerBullets.clear(true, true);
        this.enemyBullets.clear(true, true);
        this.sfx('sfxLevelClear', 0.8);

        const next = this.currentLevel + 1;
        if (next > MAX_LEVEL) {
            this.triggerVictory();
        } else {
            this.showOverlay(`LEVEL ${this.currentLevel} CLEAR!`, '#00ff88', '#003322',
                `Press R for Level ${next}`,
                () => this.scene.restart({ level: next, score: this.score, lives: this.lives }));
        }
    }

    triggerVictory() {
        this.player.setVelocityX(0);
        this.time.delayedCall(300, () => {
            this.victoryMode = true;
            this.player.setCollideWorldBounds(false);
            this.player.setVelocityY(-1000);
            this.time.delayedCall(900, () => {
                this.victoryMode = false;
                this.showOverlay('YOU WIN!', '#ffdd00', '#332200',
                    'Press R to play again',
                    () => this.scene.restart({ level: 1 }));
            });
        });
    }

    triggerGameOver() {
        if (this.gameOver) return;
        this.gameOver = true;
        this.enemyFireTimer.remove();
        this.playerBullets.clear(true, true);
        this.enemyBullets.clear(true, true);
        this.player.setVelocityX(0);
        this.sfx('sfxGameOver', 0.9);
        this.showOverlay('GAME OVER', '#ff4444', '#330000',
            'Press R to restart',
            () => this.scene.restart({ level: 1 }));
    }

    updateBossHp(hp, maxHp) {
        if (!this.bossHpFill) return;
        const pct   = hp / maxHp;
        const color = pct > 0.6 ? 0x00ff44 : pct > 0.3 ? 0xffaa00 : 0xff2200;
        this.bossHpFill.width = this.bossHpMaxW * pct;
        this.bossHpFill.setFillStyle(color);
    }

    // ── Visual effects ────────────────────────────────────────────────────────

    showHitEffect(_x, _y) {
        this.cameras.main.shake(250, 0.012);
    }

    // ── Sound helpers ─────────────────────────────────────────────────────────

    sfx(key, volume = 0.6) {
        this.sound.play(key, { volume });
    }

    sfxExplode() {
        const i = Phaser.Math.Between(0, 4);
        this.sfx(`sfxExplode${i}`, 0.6);
    }

    showOverlay(title, colour, strokeColour, prompt, onR) {
        const cx = this.scale.width / 2;
        const cy = this.scale.height / 2;

        this.add.text(cx, cy - 44, title, {
            fontSize: '56px', color: colour,
            stroke: strokeColour, strokeThickness: 4,
            fontFamily: 'monospace'
        }).setOrigin(0.5).setDepth(20);

        this.add.text(cx, cy + 24, `Score: ${this.score}     ${prompt}`, {
            fontSize: '22px', color: '#aaaaaa', fontFamily: 'monospace'
        }).setOrigin(0.5).setDepth(20);

        this.input.keyboard.once('keydown-R', onR);
    }
}
