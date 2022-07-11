import Phaser from "phaser";

import CharacterSelect from "./CharacterSelect";
import Preloader from "./Preloader";
import SinglePlay from "./SinglePlay";
import GameOver from "./GameOverScene";

const config = {
  title: "Scroll Treadmill",
  type: Phaser.AUTO,
  parent: "phaser-container",
  backgroundColor: "#354259",
  scale: {
    mode: Phaser.Scale.FIT,
    // autoCenter: Phaser.Scale.CENTER_BOTH,
    // mode: Phaser.Scale.ScaleModes.NONE,
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
  autoFocus: true, //조사 필요
  scene: [CharacterSelect, Preloader, SinglePlay],
};

export default config;
