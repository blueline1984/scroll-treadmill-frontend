import Phaser from "phaser";
import { useEffect, useState } from "react";

import Modal from "../components/Modal";

import config from "../phaser/scenes/SinglePlay/config";
import styled from "styled-components";

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
            <ResultModalWrapper>
              <h1>Result</h1>
              <div>Game Over!</div>
              <button onClick={onMoveToMain}>Back To Main</button>
            </ResultModalWrapper>
          }
        ></Modal>
      )}
    </>
  );
}

const ResultModalWrapper = styled.div`
  background: #354259;
  color: #fff;
  font-size: 50px;

  button {
    background: #354259;
  }
`;

export default GamePage;
