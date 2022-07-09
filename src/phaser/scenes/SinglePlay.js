import Phaser from "phaser";

export default class Single extends Phaser.Scene {
  constructor() {
    super("single");
  }

  init() {
    this.cursors = this.input.keyboard.createCursorKeys(); //추후 삭제 필요
  }

  create() {
    // Character Identifier
    this.me = this.add.image(0, 5, "me");

    //Character Velocity
    this.velocity = this.add.text(1000, 10, `Speed: `, {
      fontSize: 32,
      fontFamily: "roboto",
    });

    //Timer
    this.setTimer();
    this.stTime = new Date().getTime();

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
      .sprite(width * 0.5, height * 0.5, "alien")
      .setSize(50, 80)
      .setOffset(10, 10)
      .play("down-idle")
      .setGravityY(500);

    this.treadmill = this.physics.add
      .sprite(width * 0.5, height * 0.7, "treadmill")
      .setSize(1520, 100)
      .setOffset(120, 570)
      .play("treadmill-working-1");

    //Conveyor Belt
    this.treadmill.setImmovable();
    this.surfaceSpeed = new Phaser.Math.Vector2(0.5, 0);

    //Collide
    this.physics.add.collider(this.player, this.treadmill);

    //Character Max Velocity
    this.player.body.maxVelocity.x = 500;
  }

  update() {
    // Character Identifier
    this.me.x = this.player.body.position.x + 30;
    this.me.y = this.player.body.position.y - 100;

    //Time Checker
    this.nowTime = new Date().getTime();
    this.newTime = new Date(this.nowTime - this.stTime);

    function addZero(num) {
      return num < 10 ? "0" + num : "" + num;
    }

    this.timer.setText(
      `Time: ${addZero(this.newTime.getMinutes())} : ${addZero(
        this.newTime.getSeconds()
      )} : ${Math.floor(this.newTime.getMilliseconds() / 10)}`
    );

    // Show Character Velocity
    this.velocity.setText(
      `Speed: ${this.player.body.velocity.x.toFixed(1) / 10} m/s`
    );

    //Character Acceleration
    this.player.setAcceleration(0);
    this.player.setDrag(0);

    this.input.on("wheel", () => {
      this.player.body.acceleration.setToPolar(this.player.rotation, 30);
    });

    if (!this.player.body.acceleration.x) {
      this.player.body.setDrag(150);
    }

    // No wheel anmaiton stop
    if (this.player.body.velocity.x === 0) {
      this.player.play("alien-idle");
    } else {
      this.player.play("alien-walk-1", true);
    }

    //Treadmill Velocity
    if (this.treadmill.body.touching.up && this.player.body.touching.down) {
      this.player.body.position.add({ x: -2, y: 0 });
    }

    // **참고**
    // if (this.cursors.up.isDown) {
    //   this.player.body.acceleration.setToPolar(this.player.rotation, 50);
    //   // this.player.setVelocity(this.player.body.speed, 0);
    //   console.log(this.player.body.acceleration);
    // } else {
    //   //감속
    //   this.player.body.setDrag(100);
    // }
  }

  // Time Checker
  setTimer() {
    this.timer = this.add.text(100, 10, "Timer: ", {
      fontSize: 32,
      fontFamily: "roboto",
    });
  }
}
