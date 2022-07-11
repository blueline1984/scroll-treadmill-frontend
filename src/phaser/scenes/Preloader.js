import Phaser from "phaser";

export default class Preloader extends Phaser.Scene {
  /**
   * @param {{ character: string }} data
   */

  constructor() {
    super("preloader");
  }

  //Character select
  init(data) {
    this.selectedCharacter = data.character;
  }

  preload() {
    //loading
    // this.setLoading();

    // this.load.spritesheet(
    //   this.selectedCharacter,
    //   `textures/${this.selectedCharacter}.png`,
    //   { frameWidth: 68, frameHeight: 93 }
    // );

    this.load.spritesheet(
      "alien",
      `textures/${this.selectedCharacter}_spritesheet.png`,
      {
        frameWidth: 68,
        frameHeight: 93,
      }
    );

    this.load.spritesheet("treadmill", "textures/treadmill_spritesheet.png", {
      frameWidth: 1800,
      frameHeight: 750,
    });

    this.load.image("me", "textures/me.png");

    //loading
    this.progressBar = this.add.graphics();
    this.progressBox = this.add.graphics();
    this.progressBox.fillStyle(0x222222, 0.8);
    this.progressBox.fillRect(240, 270, 320, 50);

    // this.load.on("progress", function (value) {
    //   console.log(value);
    //   this.progressBar.clear();
    //   this.progressBar.fillStyle(0xffffff, 1);
    //   this.progressBar.fillRect(250, 280, 300 * value, 30);
    // });
    // this.load.on("progress", (value) => {
    //   console.log(value);
    // });
    // this.load.on("fileprogress", (value) => {
    //   console.log(value);
    // });
    // this.load.on("complete", (value) => {
    //   console.log(value);
    // });
  }

  create() {
    this.scene.start("single", { character: this.selectedCharacter });
    // this.countDown();
  }

  countDown() {
    const { width, height } = this.scale;

    // this.cameras.main.fadeIn(500, 0, 0, 0);

    // this.cameras.main.setBackgroundColor("rgba(0, 0, 0, 0.5)");

    this.countDownCount = 4;

    this.text = this.add.text(width * 0.4, height * 0.4, "Ready", {
      fontSize: "150px",
      fontFamily: "Amatic SC",
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
          fontFamily: "Amatic SC",
        });
      } else {
        this.text = this.add.text(
          width * 0.45,
          height * 0.4,
          this.countDownCount,
          {
            fontSize: "150px",
            fontFamily: "Amatic SC",
          }
        );
      }

      if (this.countDownCount < 0) {
        window.clearInterval(this.interval);

        this.scene.start("single");
      }
    }, 1000);
  }

  //loading
  setLoading() {
    const { width, height } = this.scale;

    this.progressContainer = this.add.graphics();
    this.progressBar = this.add.graphics();

    const loadingBar = new Phaser.Geom.Rectangle(320, 370, 400, 50);
    const loadingBarContainer = new Phaser.Geom.Rectangle(325, 375, 290, 40);

    this.progressBar.fillRectShape(loadingBar);
    this.progressBar.fillStyle(0xffffff, 1);

    this.progressContainer.fillRectShape(loadingBarContainer);
    this.progressContainer.fillStyle(354259, 1);

    this.loadingText = this.add
      .text(width * 0.5, height * 0.4, "Loading...", {
        fontSize: "200px",
        fill: "#FFFFFF",
        fontFamily: "Amatic SC",
      })
      .setOrigin(0.5);

    this.loadingText = this.add
      .text(width * 0.5, height * 0.5, "Loading...", {
        fontSize: "100px",
        fill: "#FFFFFF",
        fontFamily: "Amatic SC",
      })
      .setOrigin(0.5);
  }

  updateLoading(percentage) {
    this.progressContainer.clear();
    this.progressContainer.fillStyle(0xedf335, 1);
    this.progressContainer.fillRectShape(
      new Phaser.Geom.Rectangle(325, 375, percentage * 390, 40)
    );
    percentage = percentage * 100;
    this.loadingText.setText(`Loading... ${percentage.toFixed(0)}%`);
  }

  completeLoading() {
    this.scene.start("single");
  }
}
