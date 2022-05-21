import React, { useState, useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import MediaViewer from './MediaViewer';
import RunAppButton from './RunAppButton';
import LightboxData from './LightboxData';
import AppRunner from './AppRunner';

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

function ProjectLightbox({ project, callback }) {
  const projectID = project ? project.id : null;
  const [lightBoxID] = useState(`ProjectLightBox_${projectID}`);
  const [appMode, setAppMode] = useState(false);
  const [mediaList, setMediaList] = useState(project ? project.media : []);

  const isOpenRef = useRef(false);

  const log = () => {
    console.log('project lightbox: appMode', appMode ? 'on' : 'off', ' - project', project, mediaList);
  };

  const openApp = useCallback((open = true) => {
    console.log('Going app mode', open);
    setAppMode(open);
  }, []);

  const clicked = useCallback((e) => {
    e.preventDefault();
    if (!isOpenRef.current) {
      isOpenRef.current = true;
      return;
    }
    const lightBox = document.getElementById(lightBoxID);
    if (lightBox && lightBox.contains(e.target)) {
      return;
    }
    callback(null);
  }, [lightBoxID, callback]);

  useEffect(() => {
    log();
    if (project) {
      document.addEventListener('click', clicked);
      if (mediaList.length === 0 && project.previewMedia) {
        setMediaList([project.previewMedia]);
      }
    }
    return () => {
      document.removeEventListener('click', clicked);
      isOpenRef.current = false;
      setAppMode(false);
    };
  }, [project, mediaList.length, clicked]);

  return (
    <div className="ProjectLightbox" id={lightBoxID}>
      {project && (
        <LightboxContainer className="ProjectLightbox-container">
          {!appMode ? (
            <div>
              {mediaList.length > 0 && <MediaViewer mediaList={mediaList} />}
              <LightboxData project={project} />
            </div>
          ) : (
            <AppRunner appID={project.appID} />
          )}
          {project.appID && (
            <RunAppButton openApp={openApp} toRun={!appMode} />
          )}
        </LightboxContainer>
      )}
    </div>
  );
}

export default ProjectLightbox;
