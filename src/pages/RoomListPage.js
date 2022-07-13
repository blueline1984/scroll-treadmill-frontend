import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { socket } from "../utils/socket";

function RoomListPage() {
  const [roomLists, setRoomLists] = useState({});
  const [participantNum, setParticipantNum] = useState(0);

  const navigate = useNavigate();

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
          <div key={roomId} style={{ border: "solid 1px black" }}>
            <h2>{roomLists[roomId].roomTitle}</h2>
            <h2>
              {participantNum} / {roomLists[roomId].roomMaxNum}
            </h2>
            <button>Join Button</button>
          </div>
        ))}
      </div>
    </>
  );
}

export default RoomListPage;
