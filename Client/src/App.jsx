import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const AppContainer = styled.div`
  width: 100%;
`;

function App() {
  return (
    <AppContainer className="AppContainer">
      <header className="App-header">
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </AppContainer>
  );
}

export default App;
