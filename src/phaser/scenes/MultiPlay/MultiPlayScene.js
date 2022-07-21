import Phaser from "phaser";
import { socket } from "../../../utils/socket";

export default class Multi extends Phaser.Scene {
  constructor() {
    super("multi");
    this.state = {};
    this.players = {};
    this.treadmillAcceleration = -3;
  }
  init() {
    this.width = this.scale.width;
    this.height = this.scale.height;
  }

  preload() {
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
  }

  create() {
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
          const oldX = otherPlayer.x; //불필요
          const oldY = otherPlayer.y;
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

    window.addEventListener(
      "wheel",
      throttle(() => {
        this.count += 1;
        this.alien.body.acceleration.setToPolar(this.alien.rotation, 1200);
      }, 90),
      { capture: true, passive: true }
    );

    //identifier
    const { width, height } = this.scale;

    this.me = this.add.image(width * 0.5, height * 0.38, "me");
  }

  update() {
    const scene = this;

    //other player's animation
    if (scene.otherPlayers.children.entries) {
      scene.otherPlayers.children.entries.forEach((eachPlayer) => {
        eachPlayer.play("alien-walk-1", true);

        if (this.alien) {
          this.physics.add.collider(this.alien, eachPlayer);
          console.log("충돌");
        }

        /* 참고 */
        // if (eachPlayer.body.position.x !== eachPlayer.body.prev.x) {
        //   eachPlayer.play("alien-walk-1", true);
        // }
        // eachPlayer.play("alien-idle");

        // else {
        //   eachPlayer.play("alien-walk-1", true);
        // }
      });
    }

    if (this.alien) {
      //Collide Treadmill and Player
      this.physics.add.collider(this.alien, this.treadmill);

      //identifier
      this.me.x = this.alien.body.position.x + 30;
      this.me.y = this.alien.body.position.y - 100;

      //Character Acceleration setting
      this.alien.setAcceleration(0);
      this.alien.setDrag(0);
      if (!this.alien.body.acceleration.x) {
        this.alien.body.setDrag(150);
      }

      //Treadmill Velocity
      if (this.treadmill.body.touching.up && this.alien.body.touching.down) {
        this.alien.body.position.add({ x: this.treadmillAcceleration, y: 0 });
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
    scene.joined = true; //추후 삭제
    this.alien = scene.physics.add
      .sprite(playerInfo.x, playerInfo.y, "alien")
      .setOrigin(0.5, 0.5)
      .setSize(70, 80)
      .setOffset(0, 12)
      .setGravityY(500);
  }

  addOtherPlayers(scene, playerInfo) {
    scene.joined = true; //추후 삭제
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
}
