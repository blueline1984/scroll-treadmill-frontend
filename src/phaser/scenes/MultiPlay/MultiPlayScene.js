import Phaser from "phaser";
import { socket } from "../../../utils/socket";

export default class Multi extends Phaser.Scene {
  init() {
    this.width = this.scale.width;
    this.height = this.scale.height;
  }

  preload() {
    this.load.spritesheet("treadmill", "textures/treadmill_spritesheet.png", {
      frameWidth: 1800,
      frameHeight: 750,
    });

    socket.on("newPlayer", (data) => {
      console.log(data.id, data.x, data.y);
    });
  }

  create() {
    socket.emit("newPlayer");
    socket.on("newPlayer", (data) =>
      console.log("newPlayer", data.id, data.x, data.y)
    );
    socket.on("allplayers", (data) => console.log("allplayers", data));

    //Treadmill
    this.anims.create({
      key: "treadmill-working",
      frames: [
        {
          key: "treadmill",
          frame: 0,
        },
      ],
    });

    this.anims.create({
      key: "treadmill-working-1",
      frames: this.anims.generateFrameNumbers("treadmill", {
        start: 0,
        end: 3,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.treadmill = this.physics.add
      .sprite(this.width * 0.5, this.height * 0.7, "treadmill")
      .setSize(1520, 100)
      .setOffset(120, 570)
      .play("treadmill-working-1")
      .setImmovable();
  }

  update() {}
}
