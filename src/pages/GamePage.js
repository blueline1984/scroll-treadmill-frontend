import Phaser from "phaser";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";

import Modal from "../components/Modal";

import { gameoverState } from "../states/modal";

import config from "../phaser/scenes/config";

function GamePage() {
  const navigate = useNavigate();
  const setResultState = useSetRecoilState(gameoverState); //setter
  const isGameResultModalOpen = useRecoilValue(gameoverState); //getter

  useEffect(() => {
    const game = new Phaser.Game(config);

    game.events.on("gameOver", () => {
      setResultState(true);
      console.log("die");
    });

    return () => {
      game.destroy();
    };
  }, [setResultState]);

  const handleMainButtonClick = () => {
    setResultState(false);
    navigate("/");
  };

  return (
    <>
      {isGameResultModalOpen && (
        <Modal
          backgroudColor="#354259"
          closeButton={false}
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

export default GamePage;
