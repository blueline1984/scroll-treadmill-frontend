import Phaser from "phaser";
import { useState, useEffect } from "react";

import Modal from "../components/Modal";

import config from "../phaser/scenes/MultiPlay/config";

function MultiPlayPage() {
  useEffect(() => {
    const game = new Phaser.Game(config);
    return () => {
      game.destroy();
    };
  }, []);

  return <div id="phaser-container">MultiPlayPage</div>;
}

export default MultiPlayPage;
