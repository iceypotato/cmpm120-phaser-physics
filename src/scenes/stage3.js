class PlatformerStage3Scene extends Phaser.Scene {

    constructor() {
        super("stage3")
    }
    
    preload() {
        this.gw = this.game.config.width
        this.gh = this.game.config.height

        this.load.path = "./assets/"

        this.load.image("ground", "ground.png")
        this.load.image("player", "player.png")
        this.load.image("platform", "platform.png")
        this.load.image("strawberry", "strawberry.png")
        this.load.image("box", "box.png")

        this.load.audio("get crystal heart", "crystal heart get.wav")

        this.timeelapsed = 0

        this.cameras.main.setBackgroundColor(0x83E8FF)
    }

    create() {

        this.time.addEvent({
            delay: 1000,
            repeat: -1,
            callback: () => {
                this.timeelapsed++
            },
        })
        
        this.ground = this.physics.add.staticSprite(this.gw / 2, this.gh - 90, "ground")
        .setImmovable(true)
        .setGravity(0)

        this.player = this.physics.add.sprite(100, 200, "player")
        .setBounce(0)
        .setInteractive()
        .setDamping(true)
        .setDrag(0.2, 1)

        this.plat1 = this.physics.add.staticSprite(this.gw - 450, this.gh - 500, "platform")

        this.plat2 = this.physics.add.staticSprite(400, 300, "platform")

        this.strawberry = this.physics.add.staticSprite(this.gw - 200, this.gh - 300, "strawberry")
        this.strawberry.setScale(2)

        this.box = this.physics.add.sprite(300, 100, "box")
        .setFriction(1)
        .setDamping(true)

        .setDrag(0.5)

        this.crystalheart = this.sound.add("get crystal heart")

        this.restart = this.add.text(this.gw - 10, 10, "Press R to restart if the crate gets stuck")
        .setFontSize(20).setFontFamily("Calibri").setColor("black").setOrigin(1, 0)

        this.input.keyboard.on("keydown-R", () => {
            this.scene.restart()
        })
    
        this.addColliders()
    }

    update() {
        this.pollControls()
    }
    
    pollControls() {

        let vel = 300

        this.wkey = this.input.keyboard.addKey("W")
        this.akey = this.input.keyboard.addKey("A")
        this.dkey = this.input.keyboard.addKey("D")

        if (this.akey.isDown) {
            this.player.setVelocityX(-vel)
        }
        if (this.dkey.isDown) {
            this.player.setVelocityX(vel)
        }
        if (this.wkey.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-900)
        }

    }
    

    addColliders() {
        this.player.setCollideWorldBounds(true)
        this.box.setCollideWorldBounds(true)

        this.physics.add.collider(this.ground, this.player)
        this.physics.add.collider(this.plat1, this.player)
        this.physics.add.collider(this.plat2, this.player)
        this.physics.add.collider(this.box, this.ground)
        this.physics.add.collider(this.box, this.plat1)
        this.physics.add.collider(this.box, this.plat2)
        this.physics.add.collider(this.box, this.player)
        this.physics.add.collider(this.box, this.strawberry)

        this.physics.add.overlap(this.strawberry, this.box, () => {
            // this.crystalheart.play()
            this.strawberry.destroy()
            this.scene.sleep(this)
            let scenedata = {
                timeelapsed: this.timeelapsed,
                nextScene: "start game",
                inst: "You completed all tasks."
            }
            this.scene.launch("results", scenedata)
        })
    }

}