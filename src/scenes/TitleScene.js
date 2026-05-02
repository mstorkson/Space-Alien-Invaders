const BG_PATHS = {
    bgVoid:       "Foozle_2DS0015_Void_EnvironmentPack/Backgrounds/PNGs/Condesed/Starry background  - Layer 01 - Void.png",
    bgStars1:     "Foozle_2DS0015_Void_EnvironmentPack/Backgrounds/PNGs/Condesed/Starry background  - Layer 02 - Stars.png",
    bgStars2:     "Foozle_2DS0015_Void_EnvironmentPack/Backgrounds/PNGs/Condesed/Starry background  - Layer 03 - Stars.png",
    player:       "Foozle_2DS0011_Void_MainShip/Main Ship/Main Ship - Bases/PNGs/Main Ship - Base - Full health.png",
    engineIdle:   "Foozle_2DS0011_Void_MainShip/Main Ship/Main Ship - Engine Effects/PNGs/Main Ship - Engines - Base Engine - Idle.png",
    enemyFighter: "Foozle_2DS0012_Void_EnemyFleet_1/Kla'ed/Base/PNGs/Kla'ed - Fighter - Base.png",
};

export default class TitleScene extends Phaser.Scene {
    constructor() {
        super({ key: 'TitleScene' });
    }

    preload() {
        for (const [key, path] of Object.entries(BG_PATHS)) {
            this.load.image(key, path);
        }
    }

    create() {
        const W = this.scale.width;
        const H = this.scale.height;

        // Scrolling parallax background
        this.bgLayers = [
            this.add.tileSprite(W / 2, H / 2, W, H, 'bgVoid').setDepth(-3),
            this.add.tileSprite(W / 2, H / 2, W, H, 'bgStars1').setDepth(-2),
            this.add.tileSprite(W / 2, H / 2, W, H, 'bgStars2').setDepth(-1),
        ];
        this.bgSpeeds = [0.15, 0.4, 0.9];

        // Enemy formation decoration
        const enemyY  = H / 2 - 140;
        const spacing = 100;
        for (let i = -3; i <= 3; i++) {
            this.add.image(W / 2 + i * spacing, enemyY, 'enemyFighter')
                .setScale(1.4).setDepth(2);
        }

        // Player ship decoration
        this.add.image(W / 2, H / 2 + 130, 'player').setScale(2.2).setDepth(2);
        this.add.image(W / 2, H / 2 + 130 + 48 * 2.2 * 0.55, 'engineIdle').setScale(2.2).setDepth(1);

        // Title
        this.add.text(W / 2, H / 2 - 40, 'SPACE ALIEN INVADERS', {
            fontSize: '52px', color: '#ffffff',
            stroke: '#000066', strokeThickness: 6,
            fontFamily: 'monospace',
        }).setOrigin(0.5).setDepth(10);

        // Controls hint
        this.add.text(W / 2, H / 2 + 30, '← → / A D  to move     SPACE to shoot', {
            fontSize: '16px', color: '#888888', fontFamily: 'monospace',
        }).setOrigin(0.5).setDepth(10);

        // Blinking start prompt
        const prompt = this.add.text(W / 2, H / 2 + 78, 'PRESS SPACE TO START', {
            fontSize: '26px', color: '#ffee00', fontFamily: 'monospace',
        }).setOrigin(0.5).setDepth(10);

        this.tweens.add({
            targets: prompt, alpha: 0,
            duration: 540, yoyo: true, repeat: -1,
        });

        this.input.keyboard.once('keydown-SPACE', () => this.scene.start('GameScene'));
    }

    update() {
        this.bgLayers.forEach((layer, i) => { layer.tilePositionY -= this.bgSpeeds[i]; });
    }
}
