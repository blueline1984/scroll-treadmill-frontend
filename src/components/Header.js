import React from "react";
import styled from "styled-components";

function Header({ title }) {
  const onMoveToMain = () => {
    window.location.replace("/");
  };

  return (
    <HeaderWrapper>
      <div>{title}</div>
      <div className="button_BackToMain" onClick={onMoveToMain}>
        Back To Main
      </div>
    </HeaderWrapper>
  );
}

const HeaderWrapper = styled.div`
  padding: 3% 5%;
  display: flex;
  color: #fff;
  justify-content: space-between;
  text-align: center;
  align-items: center;
  font-size: 70px;

  .button_BackToMain {
    font-size: 40px;
    cursor: pointer;
  }
  .button_BackToMain:hover {
    text-decoration: underline;
    text-decoration-thickness: 1px;
    text-underline-position: under;
  }
`;

export default Header;
