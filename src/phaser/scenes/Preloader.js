import Phaser from "phaser";

export default class Preloader extends Phaser.Scene {
  constructor() {
    super("preloader");
  }

  //Character select data transfer
  init(data) {
    this.selectedCharacter = data.character;
  }

  preload() {
    // loading;
    this.setLoading();

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
    this.load.on("progress", this.updateLoading, {
      loadingText: this.loadingText,
    });

    this.load.on("complete", this.completeLoading, { scene: this.scene });
  }

  // create() {
  //   this.countDown();
  // }

  //loading
  setLoading() {
    const { width, height } = this.scale;

    this.loadingText = this.add
      .text(width * 0.5, height * 0.4, "Loading...", {
        fontSize: "200px",
        fill: "#FFFFFF",
        fontFamily: "Amatic SC",
      })
      .setOrigin(0.5);
  }

  updateLoading(percentage) {
    this.loadingText.setText(`Loading... ${percentage.toFixed(0)}%`);
  }

  completeLoading() {
    this.scene.start("single", { character: this.selectedCharacter });
  }

  // countDown() {
  //   const { width, height } = this.scale;

  //   // this.cameras.main.fadeIn(500, 0, 0, 0);

  //   // this.cameras.main.setBackgroundColor("rgba(0, 0, 0, 0.5)");

  //   this.countDownCount = 4;

  //   this.text = this.add.text(width * 0.4, height * 0.4, "Ready", {
  //     fontSize: "150px",
  //     fontFamily: "Amatic SC",
  //   });

  //   this.interval = window.setInterval(() => {
  //     this.countDownCount--;

  //     if (this.text) {
  //       this.text.destroy();
  //     }

  //     if (this.countDownCount === 0) {
  //       this.text.destroy();
  //       this.text = this.add.text(width * 0.4, height * 0.4, "Scorll !", {
  //         fontSize: "150px",
  //         fontFamily: "Amatic SC",
  //       });
  //     } else {
  //       this.text = this.add.text(
  //         width * 0.45,
  //         height * 0.4,
  //         this.countDownCount,
  //         {
  //           fontSize: "150px",
  //           fontFamily: "Amatic SC",
  //         }
  //       );
  //     }

  //     if (this.countDownCount < 0) {
  //       window.clearInterval(this.interval);

  //       this.scene.start("single", { character: this.selectedCharacter });
  //     }
  //   }, 1000);
  // }
}
