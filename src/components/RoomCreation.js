import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { socket } from "../utils/socket";

import { roomlistState } from "../states/roomlist";

function RoomCreation() {
  const [roomTitle, setRoomTitle] = useState("");
  const roomListRecoil = useRecoilValue(roomlistState);
  console.log("여기에요", roomListRecoil);

  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setRoomTitle(event.target.value);
  };

  const handleRoomCreation = () => {
    if (roomTitle.length === 0) {
      alert("Please,Insert Room Title");
    } else {
      socket.emit("makeRoom", roomTitle);
      navigate("/main");
    }
  };

  return (
    <>
      <h1>Create Room</h1>
      <label htmlFor="title"> Room's Title : </label>
      <input id="title" type="text" onChange={handleInputChange} />
      <button onClick={handleRoomCreation}>Create</button>
    </>
  );
}

export default RoomCreation;
