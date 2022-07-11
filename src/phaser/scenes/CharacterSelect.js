import Phaser from "phaser";

export default class CharacterSelect extends Phaser.Scene {
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
    this.add.text(500, 100, "Character Selection", {
      fontSize: "100px",
      fontFamily: "Amatic SC",
    });
    this.player1 = this.add.image(100, 300, "alien1");
    this.player2 = this.add.image(300, 300, "alien2");
    this.player3 = this.add.image(500, 300, "alien3");

    this.player1.setInteractive();
    this.player2.setInteractive();
    this.player3.setInteractive();

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

    this.input.on("pointerdown", this.handleContinue, this);
  }

  handleContinue() {
    if (!this.selectedKey) {
      return;
    }
    this.scene.start("preloader", { character: this.selectedKey });
  }
}
