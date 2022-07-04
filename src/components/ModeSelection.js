import React from "react";
import styled from "styled-components";

function ModeSelection() {
  return (
    <>
      <Wrapper>
        <div className="title">Single Mode</div>
        <button className="single">Play Single Mode</button>
      </Wrapper>
      <Wrapper>
        <div className="title">Multi Mode</div>
        <button className="multi">Play Multi Mode</button>
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
    color: white;
    font-size: 50px;
    text-align: center;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid white;
    border-spacing: 5px 1rem;
  }

  button {
    border: none;
  }
  button.single {
    color: white;
    width: 350px;
    background-color: #0f233c;
    font-size: 50px;
  }
  button.single: hover {
    color: #0f233c;
    background-color: white;
  }
  button.multi {
    color: white;
    width: 350px;
    background-color: #adcf9f;
    font-size: 50px;
  }
  button.multi: hover {
    color: #adcf9f;
    background-color: white;
  }
`;

export default ModeSelection;
