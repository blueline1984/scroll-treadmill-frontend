import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { socket } from "../utils/socket";
import readyClickSound from "../assets/ready_click.ogg";
import styled from "styled-components";

function WaitingPage() {
  const [players, setPlayers] = useState({});
  const [imageIndex, setImageIndex] = useState(0);
  const [isReady, setIsReady] = useState(false);

  const clickAudioRef = useRef(new Audio(readyClickSound));
  const imageArray = ["alien1", "alien2", "alien3"];
  const imageLength = imageArray.length;

  const navigate = useNavigate();

  const handleReady = () => {
    setIsReady(true);
    socket.emit("ready", socket.id, imageArray[imageIndex]);
    socket.emit("characterSelect", imageArray[imageIndex], socket.id);
    clickAudioRef.current.play();
    clickAudioRef.current.loop = false;
  };

  const handleCancle = () => {
    setIsReady(false);
  };

  const handlePrevCharacterImage = () => {
    setImageIndex(imageIndex === 0 ? imageLength - 1 : imageIndex - 1);
  };

  const handleNextCharacterImage = () => {
    setImageIndex(imageIndex === imageLength - 1 ? 0 : imageIndex + 1);
  };

  useEffect(() => {
    socket.on("welcome", () => {
      socket.emit("getAllPlayers");
      socket.on("players", (players) => {
        setPlayers(players);
      });
    });

    socket.on("readyCompleted", (players) => {
      if (
        players[Object.keys(players)[0]].isReady &&
        players[Object.keys(players)[1]].isReady &&
        players[Object.keys(players)[2]].isReady
      ) {
        navigate("/multi");
      }
    });
  }, []);

  return (
    <>
      {Object.keys(players).map((playerId) => (
        <ListWrapper key={playerId}>
          <div className="characterSelector">
            <button onClick={handlePrevCharacterImage}>{`<`}</button>
            <img
              src={`/textures/${imageArray[imageIndex]}.png`}
              alt="Character Image"
            />
            <button onClick={handleNextCharacterImage}>{`>`}</button>
          </div>
          <div>{players[playerId].name}</div>
          {socket.id === playerId ? (
            isReady ? (
              <button className="button_cancle" onClick={handleCancle}>
                Cancle
              </button>
            ) : (
              <button className="button_ready" onClick={handleReady}>
                Ready
              </button>
            )
          ) : null}
        </ListWrapper>
      ))}
    </>
  );
}

const ListWrapper = styled.div`
  display: flex;
  padding: 3% 5%;
  margin: 3%;
  justify-content: space-between;
  border: solid 1px #fff;
  font-size: 70px;
  color: #fff;
  align-items: center;

  .characterSelector button {
    vertical-align: 50%;
    background-color: transparent;
    border: none;
    color: #fff;
    font-size: 30px;
    width: 50px;
  }

  .button_ready {
    font-size: 40px;
    width: 250px;
    height: 60px;
    padding: 0px 10px;
    color: #fff;
    background-color: #adcf9f;
    border-color: #fff;
    border: 1px solid #fff;
  }
  .button_ready:hover {
    color: #adcf9f;
    background-color: #fff;
  }

  .button_cancle {
    font-size: 40px;
    width: 250px;
    height: 60px;
    padding: 0px 10px;
    color: #adcf9f;
    background-color: #fff;
    border-color: #fff;
    border: 1px solid #fff;
  }
  .button_cancle:hover {
    color: #fff;
    background-color: #adcf9f;
  }
`;

export default WaitingPage;
