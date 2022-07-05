import React from "react";
import styled from "styled-components";

function ModeSelection({ onBlindMode }) {
  console.log("onBlindMode", onBlindMode);
  return (
    <>
      <Wrapper>
        {onBlindMode === 0 && (
          <>
            <div className="title">Single Mode</div>
            <button className="single">Play Single Mode</button>
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
            <button className="multi">Play Multi Mode</button>
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
    color: white;
    font-size: 40px;
    padding: 10px 15px;
    width: 350px;
  }
  button.single {
    background-color: #0f233c;
  }
  button.single: hover {
    color: #0f233c;
    background-color: white;
  }
  button.multi {
    background-color: #adcf9f;
  }
  button.multi: hover {
    color: #adcf9f;
    background-color: white;
  }
`;

export default ModeSelection;
