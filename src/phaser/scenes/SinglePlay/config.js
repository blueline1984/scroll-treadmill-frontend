import Phaser from "phaser";

import CharacterSelect from "./CharacterSelectScene";
import Preloader from "./Preloader";
import SinglePlay from "./SinglePlayScene";

const config = {
  title: "Scroll Treadmill",
  type: Phaser.AUTO,
  parent: "phaser-container",
  backgroundColor: "#354259",
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
  scene: [CharacterSelect, Preloader, SinglePlay],
};

export default config;
