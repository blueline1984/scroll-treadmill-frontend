import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { socket } from "../utils/socket";

function RoomCreation() {
  const [roomTitle, setRoomTitle] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setRoomTitle(event.target.value);
  };

  const handleRoomCreation = (event) => {
    event.preventDefault();
    socket.emit("makeRoom", roomTitle);
    navigate("/roomlist");
  };

  return (
    <>
      <h1>Create Room</h1>
      <form id="room">
        <label htmlFor="title">Room's Title :</label>
        <input type="text" id="title" onChange={handleInputChange} />
        <label htmlFor="player">Players :</label>
        <select id="cars" name="player" form="room">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
        <button onClick={handleRoomCreation}>방만들기</button>
      </form>
    </>
  );
}

export default RoomCreation;
