import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const LightboxDataTag = styled.div`
  text-align: center;
`;

function LightboxData({ project }) {
  return (
    <LightboxDataTag className="LightboxData">
      <h2>{project.title}</h2>
      <p>{project.description}</p>
      {project.categories.length > 0 && (
      <p>
        Categories:&nbsp;
        {project.categories.join(', ')}
      </p>
      )}
    </LightboxDataTag>
  );
}

export default LightboxData;
