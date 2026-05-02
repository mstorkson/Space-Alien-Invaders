import TitleScene from './scenes/TitleScene.js';
import GameScene  from './scenes/GameScene.js';

const config = {
    type: Phaser.AUTO,
    width: 960,
    height: 640,
    backgroundColor: '#000011',
    physics: {
        default: 'arcade',
        arcade: { gravity: { y: 0 }, debug: false }
    },
    scene: [TitleScene, GameScene]
};

new Phaser.Game(config);
