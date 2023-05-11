let gamecfg = {
    type: Phaser.AUTO,
    width: 1920,
    height: 1080,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 100 },
            debug: true
        }
    },
    physics: "arcade",
    scene: [
        StartGameScene,
        PlatformerScene
    ]
}

function main() {
    let phazerGame = new Phaser.Game(gamecfg)
}

main()