import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { socket } from "../utils/socket";
import styled from "styled-components";

function RoomListBody() {
  const [roomList, setRoomList] = useState({});
  const navigate = useNavigate();

  const handleJoinRoom = (roomId) => {
    socket.emit("joinRoom", roomId);
    navigate(`/waitingroom/${roomId}`);
  };

  useEffect(() => {
    socket.emit("getAllRooms");
    socket.on("allRoomList", (rooms) => {
      setRoomList(rooms);
    });
  }, []);

  return (
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
  );
}

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
    color: #adcf9f;
    background-color: #fff;
  }
`;

export default RoomListBody;
