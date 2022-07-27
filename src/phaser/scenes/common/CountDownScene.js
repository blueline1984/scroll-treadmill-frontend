import Phaser from "phaser";

export default class CountDownScene extends Phaser.Scene {
  constructor(mainScene, inGameMusic) {
    super("CountDownScene");

    this.mainScene = mainScene;
    this.inGameMusic = inGameMusic;
  }

  init() {
    this.width = this.scale.width;
    this.height = this.scale.height;
  }

  preload() {
    this.loadCountDownSound();

    this.text = this.add.text(500, 500, "", {
      fontFamily: "ActionJ",
    });
  }

  create() {
    this.createCountDownSound();

    this.cameras.main.fadeIn(500, 0, 0, 0);

    this.mainScene.pause();

    this.cameras.main.setBackgroundColor("rgba(0, 0, 0, 0.5)");

    this.countDownCount = 4;

    this.interval = window.setInterval(() => {
      this.countDownCount--;

      if (this.text) {
        this.text.destroy();
      }

      if (this.countDownCount === 3) {
        this.countDownSoundThree.play();
      }
      if (this.countDownCount === 2) {
        this.countDownSoundTwo.play();
      }
      if (this.countDownCount === 1) {
        this.countDownSoundOne.play();
      }

      if (this.countDownCount === 0) {
        this.countDownSoundStart.play();
        this.text = this.add.text(
          this.width * 0.3,
          this.height * 0.4,
          "Scroll!",
          {
            fontSize: "200px",
            fontFamily: "ActionJ",
          }
        );
      } else {
        this.text = this.add.text(
          this.width * 0.45,
          this.height * 0.4,
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
      this.inGameMusic.play();
    }
  }

  loadCountDownSound() {
    this.load.audio("countdownOne", "sound/1.ogg");
    this.load.audio("countdownTwo", "sound/2.ogg");
    this.load.audio("countdownThree", "sound/3.ogg");
    this.load.audio("start", "sound/go.ogg");
  }

  createCountDownSound() {
    this.countDownSoundOne = this.sound.add("countdownOne", { loop: false });
    this.countDownSoundTwo = this.sound.add("countdownTwo", { loop: false });
    this.countDownSoundThree = this.sound.add("countdownThree", {
      loop: false,
    });
    this.countDownSoundStart = this.sound.add("start", {
      loop: false,
    });
  }
}
