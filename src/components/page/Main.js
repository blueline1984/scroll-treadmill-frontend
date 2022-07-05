import React, { useState, useEffect, useRef } from "react";
import { HiOutlineVolumeOff, HiOutlineVolumeUp } from "react-icons/hi";
import { AiOutlineEye, AiOutlineInfoCircle } from "react-icons/ai";
import ModeSelection from "../ModeSelection";
import mainThemeSong from "../../assets/main_theme.mp3";

import styled from "styled-components";

function Main() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(new Audio(mainThemeSong));

  const handleSound = () => {
    setIsPlaying((isPlaying) => !isPlaying);
  };

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
      audioRef.current.loop = true;
      audioRef.current.autoplay = true;
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  return (
    <>
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
          <AiOutlineEye className="logo" size={55} />
        </button>
        <button className="information">
          <AiOutlineInfoCircle size={50} color="#fff" />
        </button>
      </IconWrapper>
      <MainTitle>Scroll Treadmill</MainTitle>
      <SubTitle>Running game with mouse scroll event</SubTitle>
      <ModeWrapper>
        <ModeSelection />
      </ModeWrapper>
    </>
  );
}

const IconWrapper = styled.div`
  padding: 10px 24px;
  button {
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
    color: white;
  }
`;

const MainTitle = styled.div`
  color: white;
  margin-top: 7%;
  font-size: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SubTitle = styled.div`
  color: white;
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

export default Main;
