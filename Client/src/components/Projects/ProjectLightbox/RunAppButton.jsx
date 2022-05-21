import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const RunAppButtonTag = styled.button`
  background-color: #4CAF50;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
`;

function RunAppButton({ openApp, toRun }) {
  console.log('RunAppButton', toRun);
  const clicker = useCallback((e) => {
    e.preventDefault();
    openApp(toRun);
  }, [openApp, toRun]);

  return (
    <RunAppButtonTag onClick={clicker}>
      {toRun ? 'Run ' : 'Close '}
      App
    </RunAppButtonTag>
  );
}

export default RunAppButton;
