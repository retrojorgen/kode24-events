import React, { Component } from 'react';
import Master from '../components/Master';
import { injectGlobal } from 'styled-components';

injectGlobal`
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

`

class App extends Component {
  render() {
    return (
      <Master />
    );
  }
}

export default App;
