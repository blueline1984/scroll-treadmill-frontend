import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { socket } from "../utils/socket";
import WaitingRoomPageBody from "../components/WaitingRoomPageBody";
import Header from "../components/Header";
import styled from "styled-components";

function WaitingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    socket.on("readyCompleted", (players) => {
      if (
        players[Object.keys(players)[0]].isReady &&
        players[Object.keys(players)[1]].isReady &&
        players[Object.keys(players)[2]].isReady
      ) {
        navigate("/multi");
      }
    });
  }, []);

  return (
    <WaitingRoomPageContainer>
      <Header title="Waiting Room" />
      <WaitingRoomPageBody />
    </WaitingRoomPageContainer>
  );
}

const WaitingRoomPageContainer = styled.div`
  padding: 2%;
  background-color: #adcf9f;
  height: 100vh;
`;

export default WaitingPage;
