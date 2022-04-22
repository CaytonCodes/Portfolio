import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const PreviewWrapper = styled.div`
  flex: 1 1 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PreviewBody = styled.div`
  width: fit-content;
  text-align: center;
  border: 1px solid #ccc;
`;

const PreviewImage = styled.img`
  width: 200px;
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
`;

function ProjectPreview({project, lightboxOpener}) {
  useEffect(() => {
    console.log('ProjectPreview.jsx: useEffect()');
  }, []);

  const clicker = (e) => {
    e.preventDefault();
    lightboxOpener(project);
  };

  return (
    <PreviewWrapper className="ProjectPreviewWrapper" >
      <PreviewBody
        className={`ProjectPreview ${project.id}`}
        onClick={clicker}
      >
        {project.media[0]?.type === 'image' && (
          <PreviewImage src={project.media[0].link} alt="" />
        )}
        <h5>{project.title}</h5>
      </PreviewBody>
    </PreviewWrapper>
  );
}

export default ProjectPreview;
