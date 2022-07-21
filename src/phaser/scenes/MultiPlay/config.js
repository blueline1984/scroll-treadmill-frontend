import Phaser from "phaser";
import Preloader from "phaser";
import MultiPlayScene from "./MultiPlayScene";
import WaitingRoom from "./WaitingRoom";

const config = {
  title: "Scroll Treadmill",
  type: Phaser.AUTO,
  parent: "phaser-container",
  backgroundColor: "#ADCF9F",
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: window.innerWidth,
    height: window.innerHeight,
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: true,
    },
  },
  scene: [MultiPlayScene, WaitingRoom],
};

export default config;
