import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { socket } from "../utils/socket";

import styled from "styled-components";

function RoomCreation({ onClose }) {
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
    <ModalWrapper>
      <h1>Create Room</h1>
      <input
        id="title"
        type="text"
        onChange={handleInputChange}
        placeholder="Room's Title "
      />
      <button onClick={handleRoomCreation}>Create</button>
      <button onClick={onClose}>Cancle</button>
    </ModalWrapper>
  );
}

const ModalWrapper = styled.div`
  input {
    width: 70%;
    padding: 10px 20px;
    margin: 8px 0;
    box-sizing: border-box;
    border: 2px solid #fff;
    outline: none;
    font-size: 30px;
  }
  input::placeholder {
    font-size: 30px;
    vertical-align: middle;
  }
  button {
    background-color: #adcf9f;
  }
  button:hover {
    background-color: #fff;
    color: #adcf9f;
  }
`;

export default RoomCreation;
