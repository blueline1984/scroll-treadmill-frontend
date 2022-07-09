import Phaser from "phaser";

export default class Preloader extends Phaser.Scene {
  constructor() {
    super("preloader");
  }

  preload() {
    this.load.spritesheet("alien", "textures/alienBeige_spritesheet.png", {
      frameWidth: 68,
      frameHeight: 93,
    });

    this.load.spritesheet("treadmill", "textures/treadmill_spritesheet.png", {
      frameWidth: 1800,
      frameHeight: 750,
    });

    this.load.image("me", "textures/me.png");
  }

  create() {
    this.scene.start("single");
  }
}
