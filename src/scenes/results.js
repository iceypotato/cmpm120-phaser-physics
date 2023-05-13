class ResultsScene extends Phaser.Scene {

    constructor() {
        super("results")
    }

    init(data) {
        this.timeelapsed = data.timeelapsed
        this.nextScene = data.nextScene
        this.inst = data.inst
        this.prevScene = data.prevScene
    }

    preload() {
        this.gw = this.game.config.width
        this.gh = this.game.config.height
        this.cameras.main.setBackgroundColor(0x99D2FD)
    }

    create() {
        
        this.continue = this.add.text(this.gw / 2, this.gh - 100, "Click to continue...")
        .setOrigin(0.5, 0.5)
        .setFontFamily("Calibri")
        .setFontSize(50)
        .setColor("black")

        this.add.tween({
            targets: this.continue,
            alpha: {from: 1, to: 0},
            duration: 1000,
            yoyo: true,
            repeat: -1,
        })

        this.timertext = this.add.text(this.gw / 2, 75, "Time taken to complete task: " + this.timeelapsed + " seconds.")
        .setOrigin(0.5, 0.5)
        .setFontFamily("Calibri")
        .setFontSize(50)
        .setColor("black")

        this.insttext = this.add.text(this.gw / 2, this.gh / 2, this.inst)
        .setOrigin(0.5, 0.5)
        .setFontFamily("Calibri")
        .setFontSize(50)
        .setColor("black")
        .setWordWrapWidth(1500)

        if (this.prevScene == "start game") this.timertext.setAlpha(0)

        this.input.on("pointerdown", () => {
            this.scene.start(this.nextScene)
        })
        
    }

}