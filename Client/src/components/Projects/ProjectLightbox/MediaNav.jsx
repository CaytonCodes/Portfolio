import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const MediaNavCont = styled.div`
`;

const NavIcon = styled.div`
  display: inline-block;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #fff;
  margin: 0 10px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  &:hover {
    background-color: #ddd;
  }
`;

function MediaNav({ mediaChange, direction }) {
  return (
    <MediaNavCont>
      {direction === 'prev' && (
        <NavIcon onClick={() => mediaChange(null, direction)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-chevron-left"
          >
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </NavIcon>
      )}
      {direction === 'next' && (
        <NavIcon onClick={() => mediaChange(null, direction)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-chevron-right"
          >
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </NavIcon>
      )}
    </MediaNavCont>
  );
}

export default MediaNav;
