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
    //위치 변경
    if (isPlaying) {
      backgroundSoundRef.current.play();
      backgroundSoundRef.current.loop = true;
      backgroundSoundRef.current.autoplay = true;
    } else {
      backgroundSoundRef.current.pause();
    }
  }, [isPlaying]);

  return (
    <>
      {isOpen && (
        <Modal
          onClose={closeModal}
          backgroudColor="#A0BCC2"
          message={
            <InformationWrapper>
              <h1>about</h1>
            </InformationWrapper>
          }
          informationContent={
            <InformationWrapper>
              <p className="information">
                This game is made for optimizing mouse scroll event in
                JavaScript.....
              </p>
            </InformationWrapper>
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
      <ModeWrapper>
        <ModeSelection onBlindMode={onBlindMode} />
      </ModeWrapper>
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

const ModeWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 5%;
`;

const InformationWrapper = styled.div`
  h1 {
    margin-top: 0;
  }

  p {
    color: white;
    font-size: 40px;
    padding: 0 5%;
    margin: 0;
  }
`;

export default MainPage;
