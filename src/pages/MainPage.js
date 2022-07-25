import React, { useState, useEffect, useRef } from "react";
import { HiOutlineVolumeOff, HiOutlineVolumeUp } from "react-icons/hi";
import { AiOutlineEye, AiOutlineInfoCircle } from "react-icons/ai";
import mainThemeSong from "../assets/main_theme.mp3";
import ModeSelection from "../components/ModeSelection";
import Modal from "../components/Modal";
import styled from "styled-components";

function MainPage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [onBlindMode, setOnBlindMode] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const backgroundSoundRef = useRef(new Audio(mainThemeSong));

  const handleSound = () => {
    setIsPlaying((isPlaying) => !isPlaying);
  };

  const handleBlindMode = () => {
    setOnBlindMode((onBlindMode + 1) % 3);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (isPlaying) {
      backgroundSoundRef.current.play();
      backgroundSoundRef.current.loop = true;
    } else {
      backgroundSoundRef.current.pause();
    }
  }, [isPlaying]);

  return (
    <>
      {isOpen && (
        <Modal
          onClose={closeModal}
          backgroundColor="#A0BCC2"
          message={
            <InformationModalWrapper>
              <h1>about</h1>
            </InformationModalWrapper>
          }
          informationContent={
            <InformationModalWrapper>
              <p className="information">
                This game is made for optimizing mouse scroll event in
                JavaScript.....
              </p>
              <button onClick={closeModal}>Close</button>
            </InformationModalWrapper>
          }
        />
      )}
      <IconWrapper>
        {isPlaying ? (
          <button className="sound">
            <HiOutlineVolumeUp size={60} color="#fff" onClick={handleSound} />
          </button>
        ) : (
          <button className="sound" onClick={handleSound}>
            <HiOutlineVolumeOff size={60} color="#fff" />
          </button>
        )}
        <button className="eye">
          <AiOutlineEye className="logo" size={55} onClick={handleBlindMode} />
        </button>
        <button className="information" onClick={openModal}>
          <AiOutlineInfoCircle size={50} color="#fff" />
        </button>
      </IconWrapper>
      <MainTitle>Scroll Treadmill</MainTitle>
      <SubTitle>Running game with mouse scroll event</SubTitle>
      <GameModeWrapper>
        <ModeSelection onBlindMode={onBlindMode} />
      </GameModeWrapper>
    </>
  );
}

const IconWrapper = styled.div`
  padding: 10px 24px;

  button {
    background-color: #a0bcc2;
    border: none;
    position: absolute;
    left: 95%;
  }
  button.sound {
    top: 5%;
  }
  button.eye {
    top: 11%;
  }
  button.information {
    top: 17%;
  }

  .logo {
    color: #fff;
  }
`;

const MainTitle = styled.div`
  color: #fff;
  margin-top: 7%;
  font-size: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SubTitle = styled.div`
  color: #fff;
  margin-top: 0;
  font-size: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const GameModeWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 5%;
`;

const InformationModalWrapper = styled.div`
  display: block;
  justify-content: center;
  padding: 0 5% 5% 5%;
  margin-left: auto;
  margin-right: auto;
  align-items: center;
  text-align: center;

  h1 {
    margin-top: 0;
  }

  p {
    color: #fff;
    font-size: 40px;
    padding: 0 5%;
    margin: 0;
  }

  button {
    background-color: #a0bcc2;
    margin: 10%;
    padding: 10px 15px;
    width: 30%;
    color: #fff;
    font-size: 35px;
    border: 1px solid #fff;
  }
  button:hover {
    background-color: #fff;
    color: #a0bcc2;
  }
`;

export default MainPage;
