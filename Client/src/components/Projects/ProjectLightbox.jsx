import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import MediaViewer from './MediaViewer';

const LightboxContainer = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  min-width: 90vw;
  min-height: 90vh;
  background-color: rgba(124, 124, 124, 0.9);
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  align-items: center;
  align-content: center;
  `;

const LightboxData = styled.div`
  text-align: center;
  `;

function ProjectLightbox({ project, callback }) {
  const [lightBoxID] = useState(`ProjectLightBox${project.id}`);

  const isOpenRef = useRef(false);

  const closeout = () => {
    // eslint-disable-next-line no-use-before-define
    document.removeEventListener('click', clicked);
    callback(null);
  };

  const clicked = (e) => {
    // console.log('click', lightBoxID, isOpenRef, project);
    e.preventDefault();
    if (!isOpenRef.current) {
      isOpenRef.current = true;
      return;
    }
    const lightBox = document.getElementById(lightBoxID);
    if (lightBox && lightBox.contains(e.target)) {
      return;
    }
    closeout();
  };

  useEffect(() => {
    document.addEventListener('click', clicked);
  });

  return (
    <div className="ProjectLightbox" id={lightBoxID}>
      <LightboxContainer className="ProjectLightbox-container">
        {project.media.length > 0 && <MediaViewer mediaList={project.media} />}
        <LightboxData className="ProjectLightbox-item">
          <h2>{project.title}</h2>
          <p>{project.description}</p>
          {project.categories.length > 0 && (
          <p>
            Categories:&nbsp;
            {project.categories.join(', ')}
          </p>
          )}
        </LightboxData>
      </LightboxContainer>
    </div>
  );
}

export default ProjectLightbox;
