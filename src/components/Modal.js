import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import styled from "styled-components";

import Portal from "../Portal";

function Modal({ message, onClose, backgroudColor, closeButton = true }) {
  return (
    <Portal>
      <ModalOverlay>
        <ModalBody style={{ backgroundColor: `${backgroudColor}` }}>
          {closeButton && (
            <MdClose
              onClick={onClose}
              style={{
                backgroundColor: `${backgroudColor}`,
                position: "relative",
                left: "95%",
                cursor: "pointer",
              }}
              size={50}
            />
          )}
          {message}
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
  background-color: rgba(0, 0, 0, 0.7);
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
  border: 2px solid white;
`;

export default Modal;
