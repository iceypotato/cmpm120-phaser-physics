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
            gravity: { y: 1000 },
            debug: true
        }
    },
    scene: [
        // StartGameScene,
        // PlatformerStage1Scene,
        // PlatformerStage2Scene,
        PlatformerStage3Scene
    ]
}

function main() {
    let phazerGame = new Phaser.Game(gamecfg)
}

main()