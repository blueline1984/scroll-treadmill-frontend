import Phaser from "phaser";
import CountDownScene from "../CountDownScene";
import createAlienAnimations from "../../animations/Alien";
import createTreadmillAnimations from "../../animations/Treadmill";

export default class Single extends Phaser.Scene {
  constructor() {
    super("single");
    this.treadmillAcceleration = -3;
    this.scrollCount = 0;
  }

  init(data) {
    this.width = this.scale.width;
    this.height = this.scale.height;
    this.selectedCharacter = data.character;
  }

  create() {
    this.inGameMusic = this.sound.add("ingame", { loop: true });

    const countDownScene = new CountDownScene(this.scene, this.inGameMusic);

    this.scene.add("CountDownScene", countDownScene, true);

    createTreadmillAnimations(this.anims);

    createAlienAnimations(this.anims);

    this.setProgressBar();

    this.createAlien();

    this.createTreadmill();

    this.setGameOver();

    this.physics.add.collider(this.player, this.treadmill);

    this.setMouseScrollEvent();

    this.createRocket();

    this.createMeteorite();

    this.createSmallStar();

    this.createBigStar();
  }

  update() {
    this.updateTimer();

    this.velocity.setText(
      `Speed   ${this.player.body.velocity.x.toFixed(1) / 10}`
    );

    this.scrollCounter.setText(`Mouse Scroll   ${this.scrollCount}`);

    this.player.setAcceleration(0);
    this.player.setDrag(0);

    if (!this.player.body.acceleration.x) {
      this.player.body.setDrag(50);
    }

    if (this.player.body.velocity.x === 0) {
      this.player.play("alien-idle");
    } else {
      this.player.play("alien-walk", true);
    }

    if (this.treadmill.body.touching.up && this.player.body.touching.down) {
      this.player.body.position.add({ x: this.treadmillAcceleration, y: 0 });
    } else if (this.player.body.position.x < this.width * 0.15) {
      this.player.body.position.add({
        x: this.treadmillAcceleration,
        y: 0,
      });
    }

    this.updateRocket();

    this.updateMeteorite();

    this.updateSmallStar();

    this.updateBigStar();
  }

  setProgressBar() {
    this.stTime = new Date().getTime();

    this.timer = this.add.text(250, 30, "Time ", {
      fontSize: "65px",
      fontFamily: "Amatic SC",
    });

    this.velocity = this.add.text(950, 30, `Speed `, {
      fontSize: "70px",
      fontFamily: "Amatic SC",
    });

    this.scrollCounter = this.add.text(1600, 30, `Mouse Scroll `, {
      fontSize: "70px",
      fontFamily: "Amatic SC",
    });
  }

  setGameOver() {
    this.zone = this.add
      .zone(this.width * 0.1, this.height)
      .setSize(this.width * 3, 100);
    this.physics.world.enable(this.zone);
    this.zone.body.setAllowGravity(false);
    this.zone.body.moves = false;
    this.physics.add.overlap(this.player, this.zone, () => {
      this.time.addEvent({
        callback: () => {
          this.game.events.emit("gameOver");
          this.scene.pause();
          this.inGameMusic.pause();
        },
        callbackScope: this,
        delay: 1000,
      });
    });
  }

  createAlien() {
    this.player = this.physics.add
      .sprite(this.width * 0.5, this.height * 0.5, "alien")
      .setSize(50, 80)
      .setOffset(10, 10)
      .setGravityY(500);

    this.player.body.maxVelocity.x = 1000;
  }

  createTreadmill() {
    this.treadmill = this.physics.add
      .sprite(this.width * 0.5, this.height * 0.7, "treadmill")
      .setSize(1520, 100)
      .setOffset(120, 570)
      .play("treadmill-working")
      .setImmovable();

    this.surfaceSpeed = new Phaser.Math.Vector2(0.5, 0);

    window.setInterval(() => {
      this.treadmillAcceleration -= 0.5;
    }, 10000);
  }

  setMouseScrollEvent() {
    const throttle = (callbackFn, limit) => {
      let waiting = false;
      return () => {
        if (!waiting) {
          callbackFn.apply(this, arguments);
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
        this.scrollCount += 1;
        this.player.body.acceleration.setToPolar(this.player.rotation, 1200);
      }, 90),
      { capture: true, passive: true }
    );
  }

  updateTimer() {
    function addZero(num) {
      return num < 10 ? "0" + num : "" + num;
    }

    this.nowTime = new Date().getTime();
    this.newTime = new Date(this.nowTime - this.stTime);

    this.timer.setText(
      `Time   ${addZero(this.newTime.getMinutes())} : ${addZero(
        this.newTime.getSeconds()
      )} : ${Math.floor(this.newTime.getMilliseconds() / 10)}`
    );
  }

  createRocket() {
    this.rocketGroup = this.add.group({
      defaultKey: "rocket",
      maxSize: 5,
      visible: false,
      active: false,
    });

    this.time.addEvent({
      delay: 10000,
      loop: true,
      callback: () => {
        this.rocketPosition = Math.floor(Math.random() * 3);
        this.rocketGroup
          .get(2200, [125, 360, 595][this.rocketPosition])
          .setActive(true)
          .setVisible(true);
      },
    });
  }

  createMeteorite() {
    this.meteoriteGroup = this.add.group({
      defaultKey: "meteorite",
      maxSize: 10,
      visible: false,
      active: false,
    });

    this.time.addEvent({
      delay: 5000,
      loop: true,
      callback: () => {
        this.meteoritePosition = Math.floor(Math.random() * 10);
        this.meteoriteGroup
          .get(
            2200,
            [98, 125, 285, 444, 653, 875, 1038][this.meteoritePosition]
          )
          .setActive(true)
          .setVisible(true);
      },
    });
  }

  createSmallStar() {
    this.starGroup = this.add.group({
      defaultKey: "starSmall",
      maxSize: 15,
      visible: false,
      active: false,
    });

    this.time.addEvent({
      delay: 2000,
      loop: true,
      callback: () => {
        this.starPosition = Math.floor(Math.random() * 5);
        this.starGroup
          .get(2200, [125, 210, 360, 595, 1000][this.starPosition])
          .setActive(true)
          .setVisible(true);
      },
    });
  }

  createBigStar() {
    this.bigStarGroup = this.add.group({
      defaultKey: "starBig",
      maxSize: 15,
      visible: false,
      active: false,
    });

    this.time.addEvent({
      delay: 4000,
      loop: true,
      callback: () => {
        this.bigStarPosition = Math.floor(Math.random() * 5);
        this.bigStarGroup
          .get(2200, [80, 110, 460, 705, 843][this.bigStarPosition])
          .setActive(true)
          .setVisible(true);
      },
    });
  }

  updateRocket() {
    this.rocketGroup.incX(-4);
    this.rocketGroup.getChildren().forEach((rocket) => {
      if (rocket.active && rocket.x < -10) {
        this.rocketGroup.killAndHide(rocket);
      }
    });
  }

  updateMeteorite() {
    this.meteoriteGroup.incX(-3);
    this.meteoriteGroup.getChildren().forEach((meteorite) => {
      if (meteorite.active && meteorite.x < -10) {
        this.meteoriteGroup.killAndHide(meteorite);
      }
    });
  }

  updateSmallStar() {
    this.starGroup.incX(-7);
    this.starGroup.getChildren().forEach((star) => {
      if (star.active && star.x < -10) {
        this.starGroup.killAndHide(star);
      }
    });
  }

  updateBigStar() {
    this.bigStarGroup.incX(-6);
    this.bigStarGroup.getChildren().forEach((star) => {
      if (star.active && star.x < -10) {
        this.bigStarGroup.killAndHide(star);
      }
    });
  }
}
