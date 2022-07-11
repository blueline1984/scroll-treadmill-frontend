import { createGlobalStyle } from "styled-components";
import ActionJ from "../assets/font/actionj.ttf";

const GlobalStyle = createGlobalStyle`
  * {
    background-color: #A0BCC2;
    font-family: "Amatic SC" , cursive;

    @font-face {
      font-family: ActionJ;
      src: url(${ActionJ})
    }
  }

  body {
    margin: 0;
    padding: 0;
  }

  button {
    cursor: pointer;
  }
`;

export default GlobalStyle;
