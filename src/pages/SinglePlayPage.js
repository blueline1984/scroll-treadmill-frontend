import Phaser from "phaser";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Modal from "../components/Modal";

import config from "../phaser/scenes/SinglePlay/config";

function GamePage() {
  const [isGameResultModalOpen, setIsGameResultModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const game = new Phaser.Game(config);

    game.events.on("gameOver", () => {
      setIsGameResultModalOpen(true);
    });

    return () => {
      game.destroy();
    };
  }, [setIsGameResultModalOpen]);

  const handleMainButtonClick = () => {
    setIsGameResultModalOpen(false);
    navigate("/");
  };

  return (
    <>
      {isGameResultModalOpen && (
        <Modal
          backgroudColor="#354259"
          message={
            <>
              <h1 style={{ color: "#fff", background: "#354259" }}>Result</h1>
              <div
                style={{
                  color: "#fff",
                  background: "#354259",
                  fontSize: "50px",
                  padding: "5%",
                }}
              >
                Game Over
              </div>
              {/* <div>Time: </div>
              <div>Speed: </div> */}
              <button
                onClick={handleMainButtonClick}
                style={{ backgroundColor: "#fff", color: "#354259" }}
              >
                Back To Main
              </button>
            </>
          }
        ></Modal>
      )}
      <div id="phaser-container"></div>
    </>
  );
}

export default GamePage;
