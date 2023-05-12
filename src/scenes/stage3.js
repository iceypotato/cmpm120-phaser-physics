class PlatformerStage3Scene extends Phaser.Scene {

    constructor() {
        super("stage 3")
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

        this.cameras.main.setBackgroundColor(0x83E8FF)
    }

    create() {
        // this.platforms = this.physics.add.staticGroup()
        // this.platforms.create(this.gw / 2, this.gh / 2, "ground")
        
        this.ground = this.physics.add.staticSprite(this.gw / 2, this.gh - 100, "ground")
        .setImmovable(true)
        .setGravity(0)

        this.player = this.physics.add.sprite(100, 200, "player")
        .setBounce(0)
        .setInteractive()
        this.player.setDamping(true).setDrag(0.2, 1)

        this.plat1 = this.physics.add.staticSprite(this.gw - 450, this.gh - 500, "platform")

        this.plat2 = this.physics.add.staticSprite(400, 300, "platform")

        this.strawberry = this.physics.add.staticSprite(this.gw - 200, this.gh - 300, "strawberry")
        this.strawberry.setScale(2)

        this.box = this.physics.add.sprite(300, 100, "box")
        .setFriction(1)
        .setDamping(true)

        .setDrag(0.5)

        this.crystalheart = this.sound.add("get crystal heart")
    
        this.addColliders()
    }

    update() {
        this.pollControls()
    }
    
    pollControls() {

        let vel = 300

        this.wkey = this.input.keyboard.addKey("W")
        // .on("down", () => {
        //     if (this.player.body.touching.down) {
        //         this.player.setVelocityY(-900)
        //     }
        // })

        this.akey = this.input.keyboard.addKey("A")
        // .on("down", () => {
        //     this.player.setVelocityX(-vel)
        // })
        // .on("up", () => {
        //     if (this.dkey.isDown) this.player.setVelocityX(vel)
        //     else this.player.setVelocityX(0)

        // })

        this.dkey = this.input.keyboard.addKey("D")
        // .on("down", () => {
            // this.player.setVelocityX(vel)
            // if (this.player.body.touching.right) this.player.setVelocityX(vel)
        // })
        // .on("up", () => {
            // if (this.akey.isDown) this.player.setVelocityX(-vel)
            // else this.player.setVelocityX(0)
        // })

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
        })
    }

}