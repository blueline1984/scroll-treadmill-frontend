import Phaser from "phaser";
import CountDownScene from "../CountDownScene";
import { socket } from "../../../utils/socket";

export default class Multi extends Phaser.Scene {
  constructor() {
    super("multi");
    this.state = {};
    this.treadmillAcceleration = -3;
    this.count = 0;
  }

  init() {
    this.width = this.scale.width;
    this.height = this.scale.height;
  }

  create() {
    //audio
    this.inGameMusic = this.sound.add("ingame", { loop: true });

    //count down scene
    const countDownScene = new CountDownScene(this.secene, this.inGameMusic);
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

    const scene = this;

    //Joined Room - setState
    socket.emit("start");
    socket.on("setState", (state) => {
      const { roomKey, players } = state;

      // State
      this.state.players = players;
      this.state.roomKey = roomKey;
    });

    socket.on("currentPlayers", (currentPlayers) => {
      const { players } = currentPlayers;
      Object.keys(players).forEach((id) => {
        if (players[id].playerId === socket.id) {
          this.addPlayer(scene, players[id]);
        } else {
          this.addOtherPlayers(scene, players[id]);
        }
      });
    });

    socket.on("newPlayer", (player) => {
      const { playerInfo } = player;
      this.addOtherPlayers(scene, playerInfo);
    });

    socket.on("characterMoved", (playerInfo) => {
      this.otherPlayers.getChildren().forEach((otherPlayer) => {
        if (playerInfo.playerId === otherPlayer.playerId) {
          otherPlayer.setPosition(playerInfo.x, playerInfo.y);
        }
      });
    });

    //create other players group
    this.otherPlayers = this.physics.add.group();

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

    //mouse wheel event
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

    //Game over zone
    const { width, height } = this.scale;
    this.zone = this.add.zone(width * 0.1, height).setSize(width * 3, 100);
    this.physics.world.enable(this.zone);
    this.zone.body.setAllowGravity(false);
    this.zone.body.moves = false;

    //mouse scroll event handler
    window.addEventListener(
      "wheel",
      throttle(() => {
        this.count += 1;
        this.alien.body.acceleration.setToPolar(this.alien.rotation, 1200);
      }, 90),
      { capture: true, passive: true }
    );

    //identifier
    socket.on("currentPlayers", (data) => {
      this.me = this.add.image(
        data.players[socket.id].x + 10,
        data.players[socket.id].y - 130,
        "me"
      );
    });

    //disconnet
    socket.on("disconnected", (playerInfo) => {
      const { playerId, playerNum } = playerInfo;
      scene.state.playerNum = playerNum;
      scene.otherPlayers.getChildren().forEach((otherPlayer) => {
        if (playerId === otherPlayer.playerId) {
          otherPlayer.destroy();
        }
      });
    });

    socket.on("characterFalled", (playerNum) => {
      if (!playerNum) {
        this.time.addEvent({
          callback: () => {
            this.game.events.emit("gameOver");
            this.scene.pause();
            this.inGameMusic.pause();
          },
          callbackScope: this,
          delay: 1000,
        });
      }
    });

    this.createRocket();
    this.createMeteorite();
    this.createSmallStar();
    this.createBigStar();
  }

  update() {
    //Game over modal
    if (this.alien) {
      this.physics.add.overlap(this.alien, this.zone, () => {
        this.time.addEvent({
          callback: () => {
            socket.emit("characterFall", socket.id);
          },
          callbackScope: this,
          delay: 1000,
        });
      });
    }

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
    if (this.alien) {
      this.velocity.setText(
        `Speed   ${this.alien.body.velocity.x.toFixed(1) / 10}`
      );
    }

    const scene = this;

    //other player's animation
    if (scene.otherPlayers.children.entries) {
      scene.otherPlayers.children.entries.forEach((eachPlayer) => {
        eachPlayer.play("alien-walk-1", true);

        //collision
        if (this.alien) {
          this.physics.add.collider(this.alien, eachPlayer);
        }
      });
    }

    if (this.alien) {
      //Collide Treadmill and Player
      this.physics.add.collider(this.alien, this.treadmill);

      //identifier
      this.me.x = this.alien.x + 10;
      this.me.y = this.alien.y - 130;

      //Character Acceleration setting
      this.alien.setAcceleration(0);
      this.alien.setDrag(0);

      if (!this.alien.body.acceleration.x) {
        this.alien.body.setDrag(150);
      }

      //Treadmill Velocity
      const { width } = this.scale;
      if (this.treadmill.body.touching.up && this.alien.body.touching.down) {
        this.alien.body.position.add({ x: this.treadmillAcceleration, y: 0 });
      } else if (this.alien.body.position.x < width * 0.15) {
        this.alien.body.position.add({
          x: this.treadmillAcceleration,
          y: 0,
        });
      }

      //My character animation
      if (this.alien.body.velocity.x === 0) {
        this.alien.play("alien-idle");
      } else {
        this.alien.play("alien-walk-1", true);
      }

      socket.emit("characterMovement", {
        x: this.alien.x,
        y: this.alien.y,
        roomKey: this.state.roomKey,
      });
    }

    if (this.alien) {
      const x = this.alien.x;
      const y = this.alien.y;

      if (
        this.alien.oldPosition &&
        (x !== this.alien.oldPosition.x || y !== this.alien.oldPosition.y)
      ) {
        this.moving = true;

        socket.emit("characterMovement", {
          x: this.alien.x,
          y: this.alien.y,
          roomKey: this.state.roomKey,
        });
      }
      this.alien.oldPosition = {
        x: this.alien.x,
        y: this.alien.y,
        rotation: this.alien.rotation,
      };
    }

    this.updateRocket();
    this.updateMeteorite();
    this.updateSmallStar();
    this.updateBigStar();
  }

  addPlayer(scene, playerInfo) {
    this.alien = scene.physics.add
      .sprite(playerInfo.x, playerInfo.y, "alien")
      .setOrigin(0.5, 0.5)
      .setSize(70, 80)
      .setOffset(0, 12)
      .setGravityY(500);
  }

  addOtherPlayers(scene, playerInfo) {
    this.otherPlayer = scene.physics.add
      .sprite(playerInfo.x + 40, playerInfo.y + 40, "alien")
      .setOrigin(0.5, 0.5)
      .setSize(70, 80)
      .setOffset(0, 12)
      .setGravityY(500);
    this.otherPlayer.playerId = playerInfo.playerId;
    scene.otherPlayers.add(this.otherPlayer);
  }

  //Treadmill Speed Setting
  speedTreadmill() {
    window.setInterval(() => {
      this.treadmillAcceleration -= 0.5;
    }, 5000);
  }

  setTimer() {
    this.timer = this.add.text(250, 30, "Time ", {
      fontSize: "65px",
      fontFamily: "Amatic SC",
    });
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

  updateRocket() {
    this.rocketGroup.incX(-4);
    this.rocketGroup.getChildren().forEach((rocket) => {
      if (rocket.active && rocket.x < -10) {
        this.rocketGroup.killAndHide(rocket);
      }
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

  updateMeteorite() {
    this.meteoriteGroup.incX(-3);
    this.meteoriteGroup.getChildren().forEach((meteorite) => {
      if (meteorite.active && meteorite.x < -10) {
        this.meteoriteGroup.killAndHide(meteorite);
      }
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

  updateSmallStar() {
    this.starGroup.incX(-7);
    this.starGroup.getChildren().forEach((star) => {
      if (star.active && star.x < -10) {
        this.starGroup.killAndHide(star);
      }
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

  updateBigStar() {
    this.bigStarGroup.incX(-6);
    this.bigStarGroup.getChildren().forEach((star) => {
      if (star.active && star.x < -10) {
        this.bigStarGroup.killAndHide(star);
      }
    });
  }
}
