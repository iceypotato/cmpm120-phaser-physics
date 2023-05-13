class StartGameScene extends Phaser.Scene {

    constructor() {
        super("start game")
    }
    
    preload() {
        this.gamew = this.game.config.width
        this.gameh = this.game.config.height
        this.cameras.main.setBackgroundColor(0)
    }

    create() {
        let fullscreenKey = this.input.keyboard.addKey("F")
        fullscreenKey.on("down", function() {
            if (this.scale.isFullscreen) {
                this.scale.stopFullscreen();
            }
            else {
                this.scale.startFullscreen();
            }
        }, this)

        let click = this.add.text(this.gamew / 2, this.gameh / 2, "Click anywhere to start")
        click.setFontFamily("Comic Sans MS")
        click.setAlign("center")
        click.setFontSize(100)
        click.setOrigin(0.5, 0.5)
        let scenedata = {
            timeelapsed: this.timeelapsed,
            nextScene: "stage1",
            inst: "Press A and D to move left and right respectively.",
            prevScene: "start game",
        }
        this.input.on(Phaser.Input.Events.POINTER_DOWN, () => {this.scene.start("results", scenedata)})
    }

}