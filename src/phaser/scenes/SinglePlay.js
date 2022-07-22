import Phaser from "phaser";
import CountDownScene from "./CountDownScene";

export default class Single extends Phaser.Scene {
  constructor() {
    super("single");

    //initial treadmill speed
    this.treadmillAcceleration = -3;
    this.count = 0;
  }

  init(data) {
    this.selectedCharacter = data.character;
  }

  create() {
    const countDownScene = new CountDownScene(this.scene);
    this.scene.add("CountDownScene", countDownScene, true);

    //Character Velocity
    this.velocity = this.add.text(950, 30, `Speed `, {
      fontSize: "70px",
      fontFamily: "Amatic SC",
    });

    this.counter = this.add.text(1600, 30, `Mouse Scroll `, {
      fontSize: "70px",
      fontFamily: "Amatic SC",
    });

    //Timer
    this.setTimer();
    this.stTime = new Date().getTime();

    //Character Animation
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

    //Alien
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
      .setGravityY(500);

    this.treadmill = this.physics.add
      .sprite(width * 0.5, height * 0.7, "treadmill")
      .setSize(1520, 100)
      .setOffset(120, 570)
      .play("treadmill-working-1")
      .setImmovable();

    //Game over zone
    this.zone = this.add.zone(width * 0.1, height).setSize(width * 3, 100);
    this.physics.world.enable(this.zone);
    this.zone.body.setAllowGravity(false);
    this.zone.body.moves = false;

    //Game over modal
    this.physics.add.overlap(this.player, this.zone, () => {
      this.time.addEvent({
        callback: () => {
          this.game.events.emit("gameOver");
          this.scene.pause();
        },
        callbackScope: this,
        delay: 1000,
      });
    });

    //Conveyor Belt
    this.treadmill.setImmovable();
    this.surfaceSpeed = new Phaser.Math.Vector2(0.5, 0);

    //Collide Treadmill and Player
    this.physics.add.collider(this.player, this.treadmill);

    //Character Max Velocity
    this.player.body.maxVelocity.x = 500;

    //Treadmill Speed up
    this.speedTreadmill();

    const throttle = (callback, limit) => {
      let waiting = false;
      return () => {
        if (!waiting) {
          callback.apply(this, arguments);
          waiting = true;
          setTimeout(() => {
            waiting = false;
          }, limit);
        }
      };
    };

    window.addEventListener(
      "wheel",
      throttle(() => {
        this.count += 1;
        console.log(this.count);
        this.player.body.acceleration.setToPolar(this.player.rotation, 1200);
      }, 90),
      { capture: true, passive: true }
    );
  }

  update() {
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

    // Show Mouse Scroll
    this.counter.setText(`Mouse Scroll   ${this.count}`);

    // Show Character Velocity
    this.velocity.setText(
      `Speed   ${this.player.body.velocity.x.toFixed(1) / 10}`
    );

    //Character Acceleration
    this.player.setAcceleration(0);
    this.player.setDrag(0);

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
    const { width } = this.scale;
    if (this.treadmill.body.touching.up && this.player.body.touching.down) {
      this.player.body.position.add({ x: this.treadmillAcceleration, y: 0 });
    } else if (this.player.body.position.x < width * 0.15) {
      this.player.body.position.add({
        x: this.treadmillAcceleration,
        y: 0,
      });
    }
  }

  // Time Checker
  setTimer() {
    this.timer = this.add.text(250, 30, "Time ", {
      fontSize: "65px",
      fontFamily: "Amatic SC",
    });
  }

  //Treadmill Speed Setting
  speedTreadmill() {
    window.setInterval(() => {
      this.treadmillAcceleration -= 1;
    }, 5000);
  }
}
