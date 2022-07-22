import Phaser from "phaser";

export default class CharacterSelect extends Phaser.Scene {
  constructor() {
    super("characterSelect");
  }

  preload() {
    this.load.image("alien1", "textures/alien1.png", {
      frameWidth: 100,
      frameHeight: 100,
    });

    this.load.image("alien2", "textures/alien2.png", {
      frameWidth: 100,
      frameHeight: 100,
    });

    this.load.image("alien3", "textures/alien3.png", {
      frameWidth: 100,
      frameHeight: 100,
    });
  }

  create() {
    const { width, height } = this.scale;
    console.log(this.scale);
    this.add
      .text(width * 0.5, height * 0.1, "Character Selection", {
        fontSize: "100px",
        fontFamily: "Amatic SC",
      })
      .setOrigin(0.5);

    this.player1 = this.add
      .sprite(width * 0.3, height * 0.3, "alien1")
      .setAlpha(0.5)
      .setInteractive()
      .setScale(1.5, 1.5);

    this.player2 = this.add
      .image(width * 0.5, height * 0.3, "alien2")
      .setAlpha(0.5)
      .setInteractive()
      .setScale(1.5, 1.5);

    this.player3 = this.add
      .image(width * 0.7, height * 0.3, "alien3")
      .setAlpha(0.5)
      .setInteractive()
      .setScale(1.5, 1.5);

    this.player1.on(
      "pointerdown",
      () => {
        this.selectedKey = this.player1.texture.key;
      },
      this
    );

    this.player2.on(
      "pointerdown",
      () => {
        this.selectedKey = this.player2.texture.key;
      },
      this
    );
    this.player3.on(
      "pointerdown",
      () => {
        this.selectedKey = this.player3.texture.key;
      },
      this
    );

    //character selection hover
    this.player1.on("pointerover", () => {
      this.player1.setAlpha(1);
    });

    this.player1.on("pointerout", () => {
      this.player1.setAlpha(0.5);
    });

    this.player2.on("pointerover", () => {
      this.player2.setAlpha(1);
    });

    this.player2.on("pointerout", () => {
      this.player2.setAlpha(0.5);
    });

    this.player3.on("pointerover", () => {
      this.player3.setAlpha(1);
    });

    this.player3.on("pointerout", () => {
      this.player3.setAlpha(0.5);
    });

    this.input.on("pointerdown", this.handleContinue, this);
  }

  handleContinue() {
    if (!this.selectedKey) {
      return;
    }
    this.scene.start("preloader", { character: this.selectedKey });
  }
}
