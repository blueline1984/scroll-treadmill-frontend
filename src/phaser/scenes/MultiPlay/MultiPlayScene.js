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

  preload() {
    //loading
    // this.setLoading();

    //Alien
    this.load.spritesheet("alien", `textures/alien2_spritesheet.png`, {
      frameWidth: 68,
      frameHeight: 93,
    });

    //Treadmill
    this.load.spritesheet("treadmill", "textures/treadmill_spritesheet.png", {
      frameWidth: 1800,
      frameHeight: 750,
    });

    //Chracter identifier
    this.load.image("me", "textures/me.png");

    //loading
    // this.load.on("progress", this.updateLoading, {
    //   loadingText: this.loadingText,
    // });

    // this.load.on("complete", this.completeLoading, { scene: this.scene });
  }

  create() {
    //count down scene
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
          },
          callbackScope: this,
          delay: 1000,
        });
      }
    });
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
        console.log("!");
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
      this.treadmillAcceleration -= 1;
    }, 5000);
  }

  setTimer() {
    this.timer = this.add.text(250, 30, "Time ", {
      fontSize: "65px",
      fontFamily: "Amatic SC",
    });
  }

  setLoading() {
    const { width, height } = this.scale;

    this.loadingText = this.add
      .text(width * 0.5, height * 0.4, "Loading...", {
        fontSize: "200px",
        fill: "#FFFFFF",
        fontFamily: "Amatic SC",
      })
      .setOrigin(0.5);
  }

  updateLoading(percentage) {
    this.loadingText.setText(`Loading... ${percentage.toFixed(0) * 100}%`);
  }

  completeLoading() {
    this.scene.start("multi");
  }
}
