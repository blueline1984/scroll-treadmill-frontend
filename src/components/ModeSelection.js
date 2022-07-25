import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";
import RoomCreation from "./RoomCreation";

import styled from "styled-components";

function ModeSelection({ onBlindMode }) {
  const [isSingleOpen, setIsSingleOpen] = useState(false);
  const [isMultiOpen, setIsMultiOpen] = useState(false);
  const [isCreateRoomOpen, setIsCreateRoomOpen] = useState(false);
  const [blindColor, setBlindColor] = useState("#fff");
  const navigate = useNavigate();

  const onMoveToSingleGame = () => {
    navigate("/single");
  };

  const onMoveToRoomListPage = () => {
    navigate("/roomlist");
  };

  const openSingleModal = () => {
    setIsSingleOpen(true);
  };

  const openMultiModal = () => {
    setIsMultiOpen(true);
  };

  const openRoomCreationModal = () => {
    setIsCreateRoomOpen(true);
  };

  const closeModal = () => {
    setIsSingleOpen(false);
    setIsMultiOpen(false);
    setIsCreateRoomOpen(false);
  };

  useEffect(() => {
    if (onBlindMode === 0) {
      setBlindColor("#fff");
    } else if (onBlindMode === 1) {
      setBlindColor("#00F302");
    } else {
      setBlindColor("#F1F10E");
    }
  }, [onBlindMode]);

  return (
    <>
      {isSingleOpen && (
        <Modal
          backgroundColor="#354259"
          onClose={closeModal}
          message={
            <>
              <h1>Single Play</h1>
              <SingleButtonWrapper>
                <button onClick={onMoveToSingleGame}>Start Game</button>
                <button onClick={closeModal}>Cancle</button>
              </SingleButtonWrapper>
            </>
          }
        />
      )}
      {isMultiOpen && (
        <Modal
          backgroundColor="#ADCF9F"
          onClose={closeModal}
          message={
            <>
              <h1>Multi Play</h1>
              <MultiButtonWrapper>
                <button onClick={openRoomCreationModal}>Create A Room</button>
                <button onClick={onMoveToRoomListPage}>Room Lists</button>
                <button onClick={closeModal}>Cancle</button>
              </MultiButtonWrapper>
              {isCreateRoomOpen && (
                <Modal
                  onClose={closeModal}
                  backgroundColor="#ADCF9F"
                  message={<RoomCreation onClose={closeModal} />}
                />
              )}
            </>
          }
        />
      )}
      <ModeSelectionWrapper>
        <div
          className="title"
          style={{
            color: `${blindColor}`,
            borderBottom: `solid 1px ${blindColor}`,
          }}
        >
          Single Mode
        </div>
        <button
          className="single"
          style={{ border: `solid 1px ${blindColor}` }}
          onClick={openSingleModal}
        >
          Play Single Mode
        </button>
      </ModeSelectionWrapper>
      <ModeSelectionWrapper>
        <div
          className="title"
          style={{
            color: `${blindColor}`,
            borderBottom: `solid 1px ${blindColor}`,
          }}
        >
          Multi Mode
        </div>
        <button
          className="multi"
          style={{ border: `solid 1px ${blindColor}` }}
          onClick={openMultiModal}
        >
          Play Multi Mode
        </button>
      </ModeSelectionWrapper>
    </>
  );
}

const SingleButtonWrapper = styled.div`
  button {
    background-color: #354259;
  }
  button:hover {
    color: #354259;
    background-color: #fff;
  }
`;

const MultiButtonWrapper = styled.div`
  button {
    background-color: #adcf9f;
  }
  button:hover {
    color: #adcf9f;
    background-color: #fff;
  }
`;

const ModeSelectionWrapper = styled.div`
  padding: 5%;

  .title {
    padding: 10%;
    padding-bottom: 0px;
    margin-bottom: 10%;
    font-size: 50px;
    text-align: center;
    justify-content: center;
    align-items: center;
    border-spacing: 5px 1rem;
  }

  button {
    border: none;
    font-size: 40px;
    padding: 10px 15px;
    width: 350px;
    color: #fff;
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
