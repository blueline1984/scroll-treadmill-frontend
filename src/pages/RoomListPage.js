import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { socket } from "../utils/socket";

import styled from "styled-components";

function RoomListPage() {
  const [joinRoom, setJoinRoom] = useState(""); //불필요
  const [roomList, setRoomList] = useState({});
  const navigate = useNavigate();

  const onMoveToMain = () => {
    window.location.replace("/");
  };

  //해당 방에 참가
  const handleJoinRoom = (roomId) => {
    if (!joinRoom) {
      socket.emit("joinRoom", roomId);
      // navigate("/multi");
      //나중에 바꾸기
      navigate(`/waitingroom/${roomId}`);
    }
  };

  //만들어진 방 정보 받기
  useEffect(() => {
    socket.emit("getAllRooms");
    socket.on("allRoomList", (rooms) => {
      setRoomList(rooms);
    });
  }, []);

  return (
    <>
      <HeaderWrapper>
        <div>Room List</div>
        <div className="button_BackToMain" onClick={onMoveToMain}>
          Back To Main
        </div>
      </HeaderWrapper>
      <BodyWrapper>
        {Object.keys(roomList).map((roomId) => (
          <div key={roomId} className="content">
            <div>{roomList[roomId].roomTitle}</div>
            <div>
              {roomList[roomId].playerNum} / {roomList[roomId].roomMaxNum}
            </div>
            {roomList[roomId].playerNum < 3 ? (
              <button onClick={() => handleJoinRoom(roomId)}>Join</button>
            ) : (
              <button>Full</button>
            )}
          </div>
        ))}
      </BodyWrapper>
    </>
  );
}

const HeaderWrapper = styled.div`
  padding: 3% 5%;
  display: flex;
  color: #fff;
  justify-content: space-between;
  text-align: center;
  align-items: center;
  font-size: 70px;

  .button_BackToMain {
    font-size: 40px;
    cursor: pointer;
  }
  .button_BackToMain:hover {
    text-decoration: underline;
    text-decoration-thickness: 1px;
    text-underline-position: under;
  }
`;

const BodyWrapper = styled.div`
  margin: 3%;
  color: #fff;

  .content {
    border: solid 1px #fff;
    margin: 0 3% 3% 3%;
  }

  div {
    display: flex;
    padding: 2%;
    font-size: 50px;
    justify-content: space-between;
    align-items: center;
  }

  button {
    font-size: 40px;
    width: 250px;
    height: 60px;
    padding: 0px 10px;
    color: #fff;
    background-color: #adcf9f;
    border-color: #fff;
    border: 1px solid #fff;
  }
  button:hover {
    color: #fff;
    backgroud-color: #adcf9f;
  }
`;

export default RoomListPage;
