import Phaser from "phaser";
import CountDownScene from "../common/CountDownScene";
import { socket } from "../../../utils/socket";
import createAlienAnimations from "../../animations/Alien";
import createTreadmillAnimations from "../../animations/Treadmill";

export default class Multi extends Phaser.Scene {
  constructor() {
    super("multi");
    this.state = {};
    this.scrollCount = 0;
    this.treadmillAcceleration = -3;
  }

  init() {
    this.width = this.scale.width;
    this.height = this.scale.height;
  }

  create() {
    this.inGameMusic = this.sound.add("ingame", { loop: true });

    const countDownScene = new CountDownScene(this.scene, this.inGameMusic);
    this.scene.add("CountDownScene", countDownScene, true);

    this.setProgressBar();

    const scene = this;

    socket.emit("start");
    socket.on("setState", (state) => {
      const { roomKey, players } = state;
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

    this.otherPlayers = this.physics.add.group();

    createAlienAnimations(this.anims);

    createTreadmillAnimations(this.anims);

    this.createTreadmill();

    this.createGameOverZone();

    this.setMouseScrollEvent();

    this.createRocket();

    this.createMeteorite();

    this.createSmallStar();

    this.createBigStar();

    socket.on("currentPlayers", (roomInfo) => {
      this.me = this.add.image(
        roomInfo.players[socket.id].x + 10,
        roomInfo.players[socket.id].y - 130,
        "me"
      );
    });

    socket.on("disconnected", (playerInfo) => {
      const { playerId, playerNum } = playerInfo;
      scene.state.playerNum = playerNum;
      scene.otherPlayers.getChildren().forEach((otherPlayer) => {
        if (playerId === otherPlayer.playerId) {
          otherPlayer.destroy();
        }
      });
    });

    socket.on("characterFell", (playerNum) => {
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
  }

  update() {
    const scene = this;

    this.updateTimer();

    this.scrollCounter.setText(`Mouse Scroll   ${this.scrollCount}`);

    if (this.alien) {
      const x = this.alien.x;
      const y = this.alien.y;

      this.velocity.setText(
        `Speed   ${this.alien.body.velocity.x.toFixed(1) / 10}`
      );

      this.physics.add.overlap(this.alien, this.zone, () => {
        this.time.addEvent({
          callback: () => {
            socket.emit("characterFall", socket.id);
          },
          callbackScope: this,
          delay: 1000,
        });
      });

      this.physics.add.collider(this.alien, this.treadmill);

      this.me.x = this.alien.x + 10;
      this.me.y = this.alien.y - 130;

      this.alien.setAcceleration(0);
      this.alien.setDrag(0);

      if (!this.alien.body.acceleration.x) {
        this.alien.body.setDrag(150);
      }

      if (this.treadmill.body.touching.up && this.alien.body.touching.down) {
        this.alien.body.position.add({ x: this.treadmillAcceleration, y: 0 });
      } else if (this.alien.body.position.x < this.width * 0.15) {
        this.alien.body.position.add({
          x: this.treadmillAcceleration,
          y: 0,
        });
      }

      if (this.alien.body.velocity.x === 0) {
        this.alien.play("alien-idle");
      } else {
        this.alien.play("alien-walk", true);
      }

      socket.emit("characterMovement", {
        x: this.alien.x,
        y: this.alien.y,
        roomKey: this.state.roomKey,
      });

      if (
        this.alien.oldPosition &&
        (x !== this.alien.oldPosition.x || y !== this.alien.oldPosition.y)
      ) {
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

    if (scene.otherPlayers.children.entries) {
      scene.otherPlayers.children.entries.forEach((eachPlayer) => {
        eachPlayer.play("alien-walk", true);
        if (this.alien) {
          this.physics.add.collider(this.alien, eachPlayer);
        }
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

  createGameOverZone() {
    this.zone = this.add
      .zone(this.width * 0.1, this.height)
      .setSize(this.width * 3, 100);
    this.physics.world.enable(this.zone);
    this.zone.body.setAllowGravity(false);
    this.zone.body.moves = false;
  }

  setMouseScrollEvent() {
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
        this.scrollCount += 1;
        this.alien.body.acceleration.setToPolar(this.alien.rotation, 1200);
      }, 90),
      { capture: true, passive: true }
    );
  }

  updateTimer() {
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

  speedTreadmill() {
    window.setInterval(() => {
      this.treadmillAcceleration -= 1;
    }, 5000);
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
