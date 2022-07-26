import Phaser from "phaser";

export default class Preloader extends Phaser.Scene {
  constructor() {
    super("preloader");
  }

  init() {
    this.width = this.scale.width;
    this.height = this.scale.height;
  }

  preload() {
    this.setLoading();

    this.loadBackgroundMusic();

    this.loadBackgroundObject();

    this.load.spritesheet("alien", `textures/alien2_spritesheet.png`, {
      frameWidth: 68,
      frameHeight: 93,
    });

    this.load.spritesheet("treadmill", "textures/treadmill_spritesheet.png", {
      frameWidth: 1800,
      frameHeight: 750,
    });

    this.load.image("me", "textures/me.png");

    this.load.on("progress", this.updateLoading, {
      loadingText: this.loadingText,
    });

    this.load.on("complete", this.completeLoading, { scene: this.scene });
  }

  setLoading() {
    this.loadingText = this.add
      .text(this.width * 0.5, this.height * 0.4, "Loading...", {
        fontSize: "200px",
        fill: "#FFFFFF",
        fontFamily: "Amatic SC",
      })
      .setOrigin(0.5);
  }

  updateLoading(percentage) {
    this.loadingText.setText(`Loading... ${percentage.toFixed(0) * 100}%`);
  }

  completeLoading() {
    this.scene.start("multi");
  }

  loadBackgroundMusic() {
    this.load.audio("ingame", "sound/racing mode_2.mp3");
  }

  loadBackgroundObject() {
    this.load.image("rocket", "textures/rocket.png");
    this.load.image("starSmall", "textures/star_small.png");
    this.load.image("starBig", "textures/star_big.png");
    this.load.image("meteorite", "textures/meteorite.png");
  }
}
