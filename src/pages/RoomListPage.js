import React from "react";
import Header from "../components/Header";
import RoomListBody from "../components/RoomListPageBody";
import styled from "styled-components";

function RoomListPage() {
  return (
    <RoomListPageContainer>
      <Header title="Room List" />
      <RoomListBody />
    </RoomListPageContainer>
  );
}

const RoomListPageContainer = styled.div`
  padding: 2%;
  background-color: #adcf9f;
  height: 100vh;
`;

export default RoomListPage;
