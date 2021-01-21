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
    
    background-color: #1e1e1e;
    --card-background: #171717;
    --card-background-hover: #111111;
    --text-color: white;
    --text-color-fade: rgb(160, 160, 160);
    --text-color-more-fade: rgb(119, 119, 119);
    --text-color-always-white: white;
    color: var(--text-color);
    &.light {
      --card-background: #cbcbcb;
      --card-background-hover: #eae2e2;
      --text-color: black;
      --text-color-fade: rgb(82 82 82);
      --text-color-more-fade: #4b4b4b;
    }
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
