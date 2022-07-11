import Phaser from "phaser";
import { useEffect } from "react";
import config from "../phaser/scenes/config";

function GamePage() {
  useEffect(() => {
    const game = new Phaser.Game(config);

    return () => {
      game.destroy(true, true);
    };
  }, []);

  return (
    <>
      <div id="phaser-container"></div>
    </>
  );
}

export default GamePage;
