import Phaser from "phaser";
import { useEffect, useState } from "react";

import Modal from "../components/Modal";

import config from "../phaser/scenes/SinglePlay/config";

function GamePage() {
  const [isGameResultModalOpen, setIsGameResultModalOpen] = useState(false);

  const onMoveToMain = () => {
    setIsGameResultModalOpen(false);
    window.location.replace("/");
  };

  useEffect(() => {
    const game = new Phaser.Game(config);

    game.events.on("gameOver", () => {
      setIsGameResultModalOpen(true);
    });

    return () => {
      game.destroy(true, false);
    };
  }, [setIsGameResultModalOpen]);

  return (
    <>
      <div id="phaser-container" />
      {isGameResultModalOpen && (
        <Modal
          backgroudColor="#354259"
          message={
            <>
              <h1 style={{ color: "#fff", background: "#354259" }}>Result</h1>
              <button onClick={onMoveToMain}>Back To Main</button>
            </>
          }
        ></Modal>
      )}
    </>
  );
}

export default GamePage;
