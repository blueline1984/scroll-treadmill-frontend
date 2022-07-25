import React from "react";
import styled from "styled-components";

import Portal from "../Portal";

function Modal({ message, backgroundColor, informationContent }) {
  return (
    <Portal>
      <ModalOverlay>
        <ModalBody style={{ backgroundColor: `${backgroundColor}` }}>
          <ModalContent>{message}</ModalContent>
          {informationContent}
        </ModalBody>
      </ModalOverlay>
    </Portal>
  );
}

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  zindex: 1000;
`;

const ModalBody = styled.div`
  position: fixed;
  width: 1000px;
  height: 500px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 10px;
  zindex: 1000;
  border: 2px solid #fff;
`;

const ModalContent = styled.div`
  display: block;
  justify-content: center;
  padding: 0 5% 5% 5%;
  margin-left: auto;
  margin-right: auto;
  width: 40%;
  align-items: center;
  text-align: center;

  h1 {
    border-bottom: 1px solid #fff;
    border-spacing: 5px 1rem;
    margin-bottom: 7%;
    font-size: 70px;
    color: #fff;
  }

  button {
    margin: 3%;
    border: 1px solid #fff;
    padding: 10px 15px;
    width: 70%;
    font-size: 35px;
    color: #fff;
  }
`;

export default Modal;
