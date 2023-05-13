class PlatformerScene extends Phaser.Scene {

    constructor(config) {
        super(config)
    }

    preload() {
        this.gw = this.game.config.width
        this.gh = this.game.config.height
    }

    update() {
        this.pollControls()
    }

    pollControls() {
        let vel = 300

        this.wkey = this.input.keyboard.addKey("W")
        .on("down", () => {
            if (this.player.body.touching.down) {
                this.player.setVelocityY(-900)
            }
        })

        this.akey = this.input.keyboard.addKey("A")
        .on("down", () => {
            this.player.setVelocityX(-vel)
        })
        .on("up", () => {
            if (this.dkey.isDown) this.player.setVelocityX(vel)
            else this.player.setVelocityX(0)

        })
        this.dkey = this.input.keyboard.addKey("D")
        .on("down", () => {
            this.player.setVelocityX(vel)
        })
        .on("up", () => {
            if (this.akey.isDown) this.player.setVelocityX(-vel)
            else this.player.setVelocityX(0)
        })
    }
}