import Phaser from "phaser";
import Single from "./SinglePlay";

const config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER,
  },
  parent: "phaser-container",
  backgroundColor: "#354259",
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: true,
    },
  },
  scene: [Single],
};

export default config;
