import Phaser from "phaser";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";

import Modal from "../components/Modal";

import { gameoverState } from "../states/modal";

import config from "../phaser/scenes/config";

function GamePage() {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();
  const setResultState = useSetRecoilState(gameoverState);
  const isGameResultModalOpen = useRecoilValue(gameoverState);
  console.log(isOpen);

  const handleOpenModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const game = new Phaser.Game(config);

    game.events.on("gameOver", () => {
      setResultState((value) => !value);
    });

    return () => {
      game.destroy();
    };
  }, [isGameResultModalOpen]);

  return (
    <>
      {isGameResultModalOpen && isOpen && (
        <Modal
          backgroudColor="#354259"
          onClose={handleOpenModal}
          closeButton={false}
          message={
            <>
              <h1 style={{ color: "white", background: "#354259" }}>Result</h1>
              <div>Time: </div>
              <div>Speed: </div>
              <button
                onClick={() => {
                  navigate("/");
                }}
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
