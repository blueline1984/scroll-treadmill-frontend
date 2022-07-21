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
      game.destroy(true, true);
    };
  }, []);

  const handleMainButtonClick = () => {
    setIsGameResultModalOpen(false);
    window.location.replace("/");
  };

  return (
    <>
      {isGameResultModalOpen && (
        <Modal
          backgroudColor="#354259"
          message={
            <>
              <h1 style={{ color: "white", background: "#354259" }}>Result</h1>
              <div>Time: </div>
              <div>Speed: </div>
              <button onClick={handleMainButtonClick}>Back To Main</button>
            </>
          }
        ></Modal>
      )}
      <div id="phaser-container"></div>
    </>
  );
}

export default MultiPlayPage;
