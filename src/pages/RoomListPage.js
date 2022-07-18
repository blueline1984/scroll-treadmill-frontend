import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";

import { socket } from "../utils/socket";

import { roomlistState } from "../states/roomlist";

import styled from "styled-components";

function RoomListPage() {
  const [joinRoom, setJoinRoom] = useState("");
  const [participantNum, setParticipantNum] = useState(0);
  const [roomList, setRoomList] = useRecoilState(roomlistState);

  const navigate = useNavigate();

  //해당 방에 참가
  const handleJoinRoom = (roomId) => {
    if (!joinRoom) {
      socket.emit("joinRoom", joinRoom);
      navigate(`/waitingroom/${roomId}`);
    }
  };

  //만들어진 방 목록 받기
  useEffect(() => {
    socket.emit("getAllRooms");
    socket.on("allRoomList", (rooms) => {
      setRoomList(rooms);
      socket.emit("newRoom");
    });
  }, []);

  return (
    <>
      <HeadWrapper>
        <div>Room List</div>
        <div
          className="goToMain"
          onClick={() => {
            navigate("/");
          }}
        >
          Back To Main
        </div>
      </HeadWrapper>
      <ContentWrapper>
        {Object.keys(roomList).map((roomId) => (
          <div key={roomId} className="content">
            <div>{roomList[roomId].roomTitle}</div>
            <div>
              {participantNum} / {roomList[roomId].roomMaxNum}
            </div>
            <button onClick={() => handleJoinRoom(roomId)}>Join</button>
          </div>
        ))}
      </ContentWrapper>
    </>
  );
}

const HeadWrapper = styled.div`
  padding: 3% 5%;
  display: flex;
  color: white;
  justify-content: space-between;
  text-align: center;
  align-items: center;
  font-size: 70px;

  .goToMain {
    font-size: 40px;
    cursor: pointer;
  }
  .goToMain:hover {
    text-decoration: underline;
    text-decoration-thickness: 1px;
    text-underline-position: under;
  }
`;

const ContentWrapper = styled.div`
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
