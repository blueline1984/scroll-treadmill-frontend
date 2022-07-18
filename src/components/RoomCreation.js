import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { socket } from "../utils/socket";

function RoomCreation() {
  const [roomTitle, setRoomTitle] = useState("");

  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setRoomTitle(event.target.value);
  };

  const handleRoomCreation = () => {
    if (roomTitle.length === 0) {
      alert("Please,Insert Room Title");
    } else {
      socket.emit("createRoom", roomTitle);
      navigate("/roomlist");
    }
  };

  return (
    <>
      <h1>Create Room</h1>
      <label htmlFor="title">Room's Title : </label>
      <input id="title" type="text" onChange={handleInputChange} />
      <button onClick={handleRoomCreation}>Create</button>
    </>
  );
}

export default RoomCreation;
