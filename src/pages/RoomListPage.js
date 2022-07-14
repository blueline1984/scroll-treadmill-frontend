import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";

import { socket } from "../utils/socket";

import { roomlistState } from "../states/roomlist";

function RoomListPage() {
  const [joinRoom, setJoinRoom] = useState("");
  const [participantNum, setParticipantNum] = useState(0);
  const [roomListRecoil, setRoomListRecoil] = useRecoilState(roomlistState);

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
    socket.on("roomList", (rooms) => {
      console.log("방 목록받기");
      setRoomListRecoil(rooms);
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
        {Object.keys(roomListRecoil).map((roomId) => (
          <li key={roomId} style={{ border: "solid 1px black" }}>
            <p>{roomListRecoil[roomId].roomTitle}</p>
            <p>
              {participantNum} / {roomListRecoil[roomId].roomMaxNum}
            </p>
            {/* <Link to={`/waitingroom/${roomId}`}>button</Link> */}
            <button onClick={() => handleJoinRoom(roomId)}>Join Button</button>
          </li>
        ))}
      </div>
    </>
  );
}

export default RoomListPage;
