import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";

import { socket } from "../utils/socket";

import { roomlistState } from "../states/roomlist";

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
      <h1>RoomListPage</h1>
      <button
        onClick={() => {
          navigate("/");
        }}
      >
        Back To Main
      </button>
      <div>
        {Object.keys(roomList).map((roomId) => (
          <div key={roomId} style={{ border: "solid 1px black" }}>
            <p>{roomList[roomId].roomTitle}</p>
            <p>
              {participantNum} / {roomList[roomId].roomMaxNum}
            </p>
            <button onClick={() => handleJoinRoom(roomId)}>Join Button</button>
          </div>
        ))}
      </div>
    </>
  );
}

export default RoomListPage;
