import { createGlobalStyle } from "styled-components";
import "@fontsource/amatic-sc";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    background-color: #A0BCC2;
    font-family: "Amatic SC";
  }

  button {
    cursor: pointer;
  }
`;

export default GlobalStyle;
