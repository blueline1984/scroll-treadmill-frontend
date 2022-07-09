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
    const { width, height } = this.scale;

    // this.cameras.main.fadeIn(500, 0, 0, 0);

    // this.cameras.main.setBackgroundColor("rgba(0, 0, 0, 0.5)");

    this.countDownCount = 4;

    this.text = this.add.text(width * 0.4, height * 0.4, "Ready", {
      fontSize: "150px",
      fontFamily: "MainFont",
    });

    this.interval = window.setInterval(() => {
      this.countDownCount--;

      if (this.text) {
        this.text.destroy();
      }

      if (this.countDownCount === 0) {
        this.text.destroy();
        this.text = this.add.text(width * 0.4, height * 0.4, "Scorll !", {
          fontSize: "150px",
          fontFamily: "MainFont",
        });
      } else {
        this.text = this.add.text(
          width * 0.45,
          height * 0.4,
          this.countDownCount,
          {
            fontSize: "150px",
            fontFamily: "MainFont",
          }
        );
      }

      if (this.countDownCount < 0) {
        window.clearInterval(this.interval);

        this.scene.start("single");
      }
    }, 1000);
  }
}
