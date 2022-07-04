import React, { useState } from "react";
import { HiOutlineVolumeOff, HiOutlineVolumeUp } from "react-icons/hi";
import { AiOutlineEye } from "react-icons/ai";
import { GrCircleInformation } from "react-icons/gr";
import ModeSelection from "../ModeSelection";

import styled from "styled-components";

function Main() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <>
      {isPlaying ? (
        <button>
          <HiOutlineVolumeUp />
        </button>
      ) : (
        <button>
          <HiOutlineVolumeOff />
        </button>
      )}
      <button>
        <AiOutlineEye />
      </button>
      <button>
        <GrCircleInformation />
      </button>
      <MainTitle>Scroll Treadmill</MainTitle>
      <SubTitle>Running game with mouse scroll event</SubTitle>
      <Wrapper>
        <ModeSelection />
        <ModeSelection />
      </Wrapper>
    </>
  );
}

const MainTitle = styled.div`
  color: white;
  margin-top: 10%;
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

const Wrapper = styled.div`
  display: flex;
  padding: 10px;
`;

export default Main;
