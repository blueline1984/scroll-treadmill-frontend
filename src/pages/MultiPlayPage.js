import Phaser from "phaser";
import { useEffect, useState } from "react";

import Modal from "../components/Modal";

import config from "../phaser/scenes/MultiPlay/config";
import styled from "styled-components";

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
          color="#ADCF9F"
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
  background: #adcf9f;
  color: #fff;
  font-size: 50px;

  button {
    background: #adcf9f;
  }
`;

export default MultiPlayPage;
