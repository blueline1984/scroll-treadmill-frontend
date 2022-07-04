import React from "react";
import styled from "styled-components";

function ModeSelection() {
  return (
    <Wrapper>
      <div className="title">Title</div>
      <button>Play Single Mode</button>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 10%;

  .title {
    color: white;
  }

  button {
    color: blue;
  }
`;

export default ModeSelection;
