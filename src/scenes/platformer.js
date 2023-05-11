class PlatformerScene extends Phaser.Scene {

    constructor() {
        super("platformer")
    }
    
    preload() {
        this.gw = this.game.config.width
        this.gh = this.game.config.height

        this.cameras.main.setBackgroundColor(0xffffff)
    }

    create() {
        let ground = this.add.rectangle(this.gw / 2, this.gh - 0, this.gw, 200, 0x804d00)

        // let platform1 = this.physics.add.(this.gw - 100, this.gh / 2,)

        // this.physics.add.

        
    }

}