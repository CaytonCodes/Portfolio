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
  // const [previewIndex, setPreviewIndex] = useState(0);
  const [previewMedia, setPreviewMedia] = useState(project.media[0]);

  useEffect(() => {
    if (project.hasOwnProperty('previewMedia') && project.previewMedia.hasOwnProperty('link')) {
      setPreviewMedia(project.previewMedia);
    } else {
      for (let i = 0; i < project.media.length; i++) {
        if (project.media[i].type === 'image') {
          setPreviewMedia(project.media[i]);
          break;
        }
      }
    }
  });

  const clicker = (e) => {
    console.log('click on preview', e, project);
    e.preventDefault();
    lightboxOpener(project);
  };

  return (
    <PreviewWrapper className="ProjectPreviewWrapper" >
      <PreviewBody
        className={`ProjectPreview ProjectPreview_${project.id}`}
        onClick={clicker}
      >
        {previewMedia?.type === 'image' && (
          <PreviewImage src={previewMedia.link} alt="" />
        )}
        <h5>{project.title}</h5>
      </PreviewBody>
    </PreviewWrapper>
  );
}

export default ProjectPreview;
