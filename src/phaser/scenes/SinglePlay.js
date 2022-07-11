import Phaser from "phaser";
import CountDownScene from "./CountDownScene";

export default class Single extends Phaser.Scene {
  constructor() {
    super("single");

    //initial treadmill speed
    this.treadmillAcceleration = -10;
  }

  init(data) {
    this.selectedCharacter = data.character;
  }

  create() {
    const countDownScene = new CountDownScene(this.scene);
    this.scene.add("CountDownScene", countDownScene, true);

    // Character Identifier
    this.me = this.add.image(0, 5, "me");

    //Character Velocity
    this.velocity = this.add.text(900, 30, `Speed `, {
      fontSize: "70px",
      fontFamily: "Amatic SC",
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
      .play("treadmill-working-1")
      .setImmovable();

    //Game over zone
    this.zone = this.add.zone(width * 0.1, height * 1).setSize(800, 100);
    this.physics.world.enable(this.zone);
    this.zone.body.setAllowGravity(false);
    this.zone.body.moves = false;
    this.physics.add.overlap(this.player, this.zone, () => {
      this.scene.launch("gameOver");
    });

    this.playerBounds = this.player.getBounds();
    this.zoneBounds = this.zone.getBounds();

    this.playerVerticalLine = this.playerBounds.getLineB();
    this.zoneHorizontalLine = this.zoneBounds.getLineC(); //Bottom Line

    //Conveyor Belt
    this.treadmill.setImmovable();
    this.surfaceSpeed = new Phaser.Math.Vector2(0.5, 0);

    //Collide Treadmill and Player
    this.physics.add.collider(this.player, this.treadmill);

    //Character Max Velocity
    this.player.body.maxVelocity.x = 500;

    //Treadmill Speed up
    this.speedTreadmill();
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
      `Time   ${addZero(this.newTime.getMinutes())} : ${addZero(
        this.newTime.getSeconds()
      )} : ${Math.floor(this.newTime.getMilliseconds() / 10)}`
    );

    // Show Character Velocity
    this.velocity.setText(
      `Speed   ${this.player.body.velocity.x.toFixed(1) / 10}`
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
    // console.log(this.player.body.touching.)
    if (this.treadmill.body.touching.up && this.player.body.touching.down) {
      this.player.body.position.add({ x: this.treadmillAcceleration, y: 0 });
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
    this.timer = this.add.text(50, 30, "Time ", {
      fontSize: "65px",
      fontFamily: "Amatic SC",
    });
  }

  //Treadmill Speed up 추후 변경해야함
  speedTreadmill() {
    window.setInterval(() => {
      this.treadmillAcceleration -= 1;
    }, 5000);
  }

  showGameOver() {
    this.physics.pause();
    this.scene.start("gameOver");
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

        this.scene.start("single", { character: this.selectedCharacter });
      }
    }, 1000);
  }
}
