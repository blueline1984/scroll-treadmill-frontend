import React from "react";
import { useNavigate } from "react-router-dom";

import { socket } from "../utils/socket";

function RoomListPage() {
  const navigate = useNavigate();

  console.log(socket.id);

  console.log(
    socket.on("currentPlayerss", (players) => {
      console.log(players);
    })
  );

  return (
    <>
      <div>RoomListPage</div>
      <button
        onClick={() => {
          navigate("/");
        }}
      >
        Back To Main
      </button>
      <div style={{ display: "flex", border: "1px solid white" }}>
        <h1>Room title</h1>
        <p>player's number</p>
        <button>Join</button>
      </div>
    </>
  );
}

export default RoomListPage;
