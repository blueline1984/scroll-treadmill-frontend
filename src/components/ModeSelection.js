import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";
import RoomCreation from "./RoomCreation";

import styled from "styled-components";

function ModeSelection({ onBlindMode }) {
  const [isSingleOpen, setIsSingleOpen] = useState(false);
  const [isMultiOpen, setIsMultiOpen] = useState(false);
  const [isCreateRoomOpen, setIsCreateRoomOpen] = useState(false);
  const navigate = useNavigate();

  const openSingleModal = () => {
    setIsSingleOpen(true);
  };

  const openMultiModal = () => {
    setIsMultiOpen(true);
  };

  const closeModal = () => {
    setIsSingleOpen(false);
    setIsMultiOpen(false);
    setIsCreateRoomOpen(false);
  };

  const openCreateRoomModal = () => {
    setIsCreateRoomOpen(true);
  };

  const onMoveToRoomListPage = () => {
    navigate("/roomlist");
  };

  return (
    <>
      {isSingleOpen && (
        <Modal
          backgroudColor="#354259"
          onClose={closeModal}
          message={
            <>
              <h1>Single Play</h1>
              <button
                onClick={() => {
                  navigate("/game");
                }}
              >
                Easy
              </button>
              <button>Normal</button>
              <button>Hard</button>
            </>
          }
        />
      )}
      {isMultiOpen && (
        <Modal
          backgroudColor="#ADCF9F"
          onClose={closeModal}
          message={
            <>
              <h1>Multi Play</h1>
              <button onClick={openCreateRoomModal}>Create A Room</button>
              <button onClick={onMoveToRoomListPage}>Room Lists</button>
              {isCreateRoomOpen && (
                <Modal
                  onClose={closeModal}
                  backgroudColor="#ADCF9F"
                  message={<RoomCreation />}
                />
              )}
            </>
          }
        />
      )}
      <Wrapper>
        {onBlindMode === 0 && (
          <>
            <div className="title">Single Mode</div>
            <button className="single" onClick={openSingleModal}>
              Play Single Mode
            </button>
          </>
        )}
        {onBlindMode === 1 && (
          <>
            <div
              className="title"
              style={{ color: "#00F302", borderBottom: "solid 1px #00F302" }}
            >
              Single Mode
            </div>
            <button className="single" style={{ border: "solid 1px #00F302" }}>
              Play Single Mode
            </button>
          </>
        )}
        {onBlindMode === 2 && (
          <>
            <div
              className="title"
              style={{ color: "#F1F10E", borderBottom: "solid 1px #F1F10E" }}
            >
              Single Mode
            </div>
            <button className="single" style={{ border: "solid 1px #F1F10E" }}>
              Play Single Mode
            </button>
          </>
        )}
      </Wrapper>
      <Wrapper>
        {onBlindMode === 0 && (
          <>
            <div className="title">Multi Mode</div>
            <button className="multi" onClick={openMultiModal}>
              Play Multi Mode
            </button>
          </>
        )}
        {onBlindMode === 1 && (
          <>
            <div
              className="title"
              style={{ color: "#00F302", borderBottom: "solid 1px #00F302" }}
            >
              Multi Mode
            </div>
            <button className="multi" style={{ border: "solid 1px #00F302" }}>
              Play Multi Mode
            </button>
          </>
        )}
        {onBlindMode === 2 && (
          <>
            <div
              className="title"
              style={{ color: "#F1F10E", borderBottom: "solid 1px #F1F10E" }}
            >
              Multi Mode
            </div>
            <button className="multi" style={{ border: "solid 1px #F1F10E" }}>
              Play Multi Mode
            </button>
          </>
        )}
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  padding: 5%;

  .title {
    padding: 10%;
    padding-bottom: 0px;
    margin-bottom: 10%;
    color: #fff;
    font-size: 50px;
    text-align: center;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid #fff;
    border-spacing: 5px 1rem;
  }

  button {
    border: none;
    color: #fff;
    font-size: 40px;
    padding: 10px 15px;
    width: 350px;
  }
  button.single {
    background-color: #0f233c;
  }
  button.single: hover {
    color: #0f233c;
    background-color: #fff;
  }
  button.multi {
    background-color: #adcf9f;
  }
  button.multi: hover {
    color: #adcf9f;
    background-color: #fff;
  }
`;

export default ModeSelection;
