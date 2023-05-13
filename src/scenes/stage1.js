class PlatformerStage1Scene extends Phaser.Scene {

    constructor() {
        super("stage1")
    }
    
    preload() {
        this.gw = this.game.config.width
        this.gh = this.game.config.height

        this.load.path = "./assets/"

        this.load.image("ground", "ground.png")
        this.load.image("player", "player.png")
        this.load.image("platform", "platform.png")
        this.load.image("strawberry", "strawberry.png")

        this.load.audio("get crystal heart", "crystal heart get.wav")


        this.timeelapsed = 0


        this.cameras.main.setBackgroundColor(0x83E8FF)
    }

    create() {
        // this.platforms = this.physics.add.staticGroup()
        // this.platforms.create(this.gw / 2, this.gh / 2, "ground")
        this.time.addEvent({
            delay: 1000,
            repeat: -1,
            callback: () => {
                this.timeelapsed++
            },
        })

        this.strawberrysleft = 2
        
        this.ground = this.physics.add.staticSprite(this.gw / 2, this.gh - 90, "ground")
        .setImmovable(true)
        .setGravity(0)

        this.player = this.physics.add.sprite(this.gw / 2, this.gh - 300, "player")
        .setBounce(0)
        .setInteractive()
        .setDamping(true)
        .setDrag(0.2, 1)

        // this.plat1 = this.physics.add.staticSprite(this.gw - 450, this.gh - 500, "platform")

        // this.plat2 = this.physics.add.staticSprite(400, 300, "platform")

        this.strawberry = this.physics.add.staticSprite(100, this.gh - 300, "strawberry")
        .setScale(2)

        this.strawberry2 = this.physics.add.staticSprite(this.gw - 100, this.gh - 300, "strawberry")
        .setScale(2)

        this.crystalheart = this.sound.add("get crystal heart")

        this.addColliders()
    }
    
    pollControls() {
        let vel = 300

        this.akey = this.input.keyboard.addKey("A")
        this.dkey = this.input.keyboard.addKey("D")

        if (this.akey.isDown) {
            this.player.setVelocityX(-vel)
        }
        if (this.dkey.isDown) {
            this.player.setVelocityX(vel)
        }

    }

    addColliders() {
        this.player.setCollideWorldBounds(true);
        this.physics.add.collider(this.ground, this.player)
        // this.physics.add.collider(this.plat1, this.player)
        // this.physics.add.collider(this.plat2, this.player)
        this.physics.add.overlap(this.strawberry, this.player, () => {
            // this.crystalheart.play()
            this.strawberry.destroy()
            this.strawberrysleft--
        })

        this.physics.add.overlap(this.strawberry2, this.player, () => {
            // this.crystalheart.play()
            this.strawberry2.destroy()
            this.strawberrysleft--
        })
    }

    update() {
        this.pollControls()
        if (this.strawberrysleft == 0) {
            this.scene.sleep(this)
            let scenedata = {
                timeelapsed: this.timeelapsed,
                nextScene: "stage2",
                inst: "Press A and D to move left and right respectively. Press W to jump.\nUse these new movement options to jump on the platforms and collect the strawberry."
            }
            this.scene.launch("results", scenedata)
        }
    }

}