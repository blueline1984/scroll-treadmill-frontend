import Phaser from "phaser";
import { useEffect } from "react";

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
