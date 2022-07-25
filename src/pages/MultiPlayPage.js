import Phaser from "phaser";
import { useEffect, useState } from "react";

import Modal from "../components/Modal";

import config from "../phaser/scenes/MultiPlay/config";

function MultiPlayPage() {
  const [isGameResultModalOpen, setIsGameResultModalOpen] = useState(false);

  useEffect(() => {
    const game = new Phaser.Game(config);

    game.events.on("gameOver", () => {
      setIsGameResultModalOpen(true);
    });

    return () => {
      game.destroy(true, false);
    };
  }, [setIsGameResultModalOpen]);

  const onMoveToMain = () => {
    setIsGameResultModalOpen(false);
    window.location.replace("/");
  };

  return (
    <>
      <div id="phaser-container" />
      {isGameResultModalOpen && (
        <Modal
          backgroudColor="#ADCF9F"
          message={
            <>
              <h1 style={{ color: "#fff", background: "#ADCF9F" }}>Result</h1>
              <button onClick={onMoveToMain}>Back To Main</button>
            </>
          }
        ></Modal>
      )}
    </>
  );
}

export default MultiPlayPage;
