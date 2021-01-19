import React from "react";
import Master from "../components/Master";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=IBM+Plex+Mono:400,400i,500,500i|IBM+Plex+Sans:400,400i,500,500i');
  html {
    height: 100%;
    width: 100%;
  }
  body {
    margin: 0;
    padding: 0;
    font-family: 'Plex Sans', sans-serif;
    height: 100%;
    width: 100%;
    color: #D4D4D4;
    background-color: #1e1e1e;
  }

  * {
    box-sizing: border-box;
    font-family: inherit;
  }

`;

const App = () => {
  return (
    <>
      <GlobalStyle />
      <Master />
    </>
  );
};

export default App;
