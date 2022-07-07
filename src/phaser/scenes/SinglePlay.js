import Phaser from "phaser";

export default class Single extends Phaser.Scene {
  constructor() {
    super("single");
  }

  init() {}

  preload() {
    this.load.spritesheet("alien", "textures/alienBeige_spritesheet.png", {
      frameWidth: 68,
      frameHeight: 93,
    });
    this.load.spritesheet("treadmill", "textures/treadmill_spritesheet.png", {
      frameWidth: 1800,
      frameHeight: 750,
    });
  }

  create() {
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

    const { width, height } = this.scale;
    this.player = this.physics.add
      .sprite(width * 0.5, height * 0.1, "alien")
      .setSize(50, 80)
      .setOffset(10, 10)
      .setScale(1.5)
      .play("down-idle")
      .setGravityY(30000); //중력

    this.treadmill = this.physics.add
      .sprite(width * 0.5, height * 0.7, "treadmill")
      .setSize(1520, 100)
      .setOffset(120, 570)
      .setScale(1.2)
      .play("treadmill-working-1");

    this.treadmill.setImmovable();
    this.surfaceSpeed = new Phaser.Math.Vector2(0.5, 0); //불필요할듯?
    this.physics.add.collider(this.player, this.treadmill); //충돌 발생
  }

  update() {
    const speed = 500;

    this.input.on("wheel", () => {
      this.player.setVelocity(speed, 0);
    });

    if (this.player.body.velocity.x === 0) {
      this.player.play("alien-idle");
    } else {
      this.player.play("alien-walk-1", true);
    }

    this.player.setVelocity(0, 0);

    if (this.treadmill.body.touching.up && this.player.body.touching.down) {
      this.player.body.position.add({ x: -3, y: 0 });
    }
  }
}
