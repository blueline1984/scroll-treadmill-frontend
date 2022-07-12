import Phaser from "phaser";

export default class CountDownScene extends Phaser.Scene {
  constructor(mainScene) {
    super("CountDownScene");

    this.mainScene = mainScene;
  }

  preload() {
    this.text = this.add.text(500, 500, "", {
      fontFamily: "ActionJ", //임의 생성
    });
  }

  create() {
    const { width, height } = this.scale;
    this.cameras.main.fadeIn(500, 0, 0, 0);

    this.mainScene.pause();

    this.cameras.main.setBackgroundColor("rgba(0, 0, 0, 0.5)");

    this.countDownCount = 4;

    this.interval = window.setInterval(() => {
      this.countDownCount--;

      if (this.text) {
        this.text.destroy();
      }

      if (this.countDownCount === 0) {
        this.text = this.add.text(width * 0.4, height * 0.4, "Scroll!", {
          fontSize: "200px",
          fontFamily: "ActionJ",
        });
      } else {
        this.text = this.add.text(
          width * 0.5,
          height * 0.4,
          this.countDownCount,
          {
            fontSize: "200px",
            fontFamily: "ActionJ",
          }
        );
      }
    }, 1000);
  }

  update() {
    if (this.countDownCount < 0) {
      window.clearInterval(this.interval);

      this.text.destroy();
      this.scene.remove();

      this.mainScene.resume();
    }
  }
}
