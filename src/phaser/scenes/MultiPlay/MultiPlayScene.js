import Phaser from "phaser";
import { socket } from "../../../utils/socket";

export default class Multi extends Phaser.Scene {
  init() {
    this.width = this.scale.width;
    this.height = this.scale.height;
  }

  preload() {
    //Alien
    this.load.spritesheet("alien", `textures/alien1_spritesheet.png`, {
      frameWidth: 68,
      frameHeight: 93,
    });

    //Treadmill
    this.load.spritesheet("treadmill", "textures/treadmill_spritesheet.png", {
      frameWidth: 1800,
      frameHeight: 750,
    });
  }

  create() {
    socket.emit("newPlayer");
    socket.on("newPlayer", (data) => console.log("newPlayer", data));
    socket.on("allplayers", (data) => console.log("allplayers", data));

    //Alien - animation
    this.anims.create({
      key: "alien-idle",
      frames: [
        {
          key: "alien",
          frame: 0,
        },
      ],
    });

    this.anims.create({
      key: "alien-walk-1",
      frames: this.anims.generateFrameNumbers("alien", {
        start: 0,
        end: 1,
      }),
      frameRate: 10,
      repeat: -1,
    });

    socket.on("newPlayer", (player) => {
      this.player = this.physics.add
        .sprite(player.x, player.y, "alien")
        .setSize(50, 80)
        .setOffset(10, 10)
        .setGravityY(500);

      //Collide Treadmill and Player
      this.physics.add.collider(this.player, this.treadmill);
    });

    //Treadmill - animation
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

    //Conveyor Belt
    this.treadmill.setImmovable();
    this.surfaceSpeed = new Phaser.Math.Vector2(0.5, 0);
  }

  update() {}
}
