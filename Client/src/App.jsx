import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Projects from './components/Projects/Projects';
import Admin from './components/Admin/Admin';

const AppContainer = styled.div`
  width: 100%;
`;

function App() {
  return (
    <AppContainer className="AppContainer">
      <Admin />
      <h1> Open Banner </h1>
      <h1> About </h1>
      <Projects />
    </AppContainer>
  );
}

export default App;
