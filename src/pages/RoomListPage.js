import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

import { socket } from "../utils/socket";

function RoomListPage() {
  const [joinRoom, setJoinRoom] = useState("");
  const [roomLists, setRoomLists] = useState({});
  const [participantNum, setParticipantNum] = useState(0);

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
    socket.on("roomList", (list) => {
      setRoomLists(list);
    });
  }, [roomLists]);

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
        {Object.keys(roomLists).map((roomId) => (
          <li key={roomId} style={{ border: "solid 1px black" }}>
            <p>{roomLists[roomId].roomTitle}</p>
            <p>
              {participantNum} / {roomLists[roomId].roomMaxNum}
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
