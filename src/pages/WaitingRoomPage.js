import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { socket } from "../utils/socket";
import styled from "styled-components";
import readyClickSound from "../assets/ready_click.ogg";

function WaitingPage() {
  const [players, setPlayers] = useState({});
  const ImageArray = ["alien1", "alien2", "alien3"];
  const [imageIndex, setImageIndex] = useState(0);
  const [selectedCharacter, setSelectedCharacter] = useState("alien1");
  const [isReady, setIsReady] = useState(false);
  const [isNotReady, setIsNotReady] = useState(false);
  const ImageLength = ImageArray.length;
  const clickAudioRef = useRef(new Audio(readyClickSound));

  const { roomId } = useParams();
  const navigate = useNavigate();

  const handleReady = () => {
    setIsReady(true);
    setIsNotReady(false);
    socket.emit("ready", socket.id, ImageArray[imageIndex]);
    socket.emit("characterSelect", ImageArray[imageIndex], socket.id);
    clickAudioRef.current.play();
    clickAudioRef.current.loop = false;
  };

  const handleCancle = () => {
    setIsReady(false);
    setIsNotReady(true);
  };

  //이름 변경
  const handlePrevCharacterImage = () => {
    setImageIndex(imageIndex === 0 ? ImageLength - 1 : imageIndex - 1);
  };

  //이름 변경
  const handleNextCharacterImage = () => {
    setImageIndex(imageIndex === ImageLength - 1 ? 0 : imageIndex + 1);
  };

  useEffect(() => {
    //data 수정
    socket.on("welcome", (data) => {
      alert(data);
      socket.emit("getAllPlayers");
      socket.on("players", (players) => {
        setPlayers(players);
      });
    });

    socket.on("readyCompleted", (data) => {
      if (
        data[Object.keys(data)[0]].isReady &&
        data[Object.keys(data)[1]].isReady &&
        data[Object.keys(data)[2]].isReady
      ) {
        navigate("/multi");
      }
    });
  }, []);

  return (
    <>
      <h1>This is Room: {roomId}</h1>
      {Object.keys(players).map((playerId) => (
        <ListWrapper key={playerId}>
          <div className="characterSelector">
            <button onClick={handlePrevCharacterImage}>{`<`}</button>
            <img
              src={`/textures/${ImageArray[imageIndex]}.png`}
              alt="Character 01"
            />
            <button onClick={handleNextCharacterImage}>{`>`}</button>
          </div>
          <div>{players[playerId].name}</div>
          {socket.id === playerId ? (
            isReady ? (
              <button className="cancleBtn" onClick={handleCancle}>
                Cancle
              </button>
            ) : (
              <button className="readyBtn" onClick={handleReady}>
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
  border: solid 1px white;
  font-size: 70px;
  color: white;
  align-items: center;

  .characterSelector button {
    vertical-align: 50%;
    background-color: transparent;
    border: none;
    color: white;
    font-size: 30px;
    width: 50px;
  }

  .readyBtn {
    font-size: 40px;
    width: 250px;
    height: 60px;
    padding: 0px 10px;
    color: #fff;
    background-color: #adcf9f;
    border-color: #fff;
    border: 1px solid #fff;
  }
  .readyBtn:hover {
    color: #adcf9f;
    background-color: #fff;
  }

  .cancleBtn {
    font-size: 40px;
    width: 250px;
    height: 60px;
    padding: 0px 10px;
    color: #adcf9f;
    background-color: #fff;
    border-color: #fff;
    border: 1px solid #fff;
  }
  .cancleBtn:hover {
    color: #fff;
    background-color: #adcf9f;
  }
`;

export default WaitingPage;
