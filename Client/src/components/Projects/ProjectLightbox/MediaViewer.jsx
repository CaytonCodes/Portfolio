import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import MediaNav from './MediaNav';

const MediaContainer = styled.div`
  max-width: 90%;
  max-height: 90%;
  display: flex;
`;

const Image = styled.img`
  max-width: 100%;
  object-fit: contain;
`;

const VideoTag = styled.video`
  max-width: 80%;
  max-height: 80%;
  object-fit: contain;
`;

function MediaViewer({ mediaList }) {
  const [media] = useState(mediaList);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [currentMedia, setCurrentMedia] = useState(media[currentMediaIndex]);

  const mediaChange = (index, modifier = null) => {
    let newIndex = index;
    if (modifier === 'next') {
      newIndex = currentMediaIndex + 1;
      newIndex = newIndex >= media.length ? 0 : newIndex;
    } else if (modifier === 'prev') {
      newIndex = currentMediaIndex - 1;
      newIndex = newIndex < 0 ? media.length - 1 : newIndex;
    }
    setCurrentMediaIndex(newIndex);
    setCurrentMedia(media[newIndex]);
  };

  useEffect(() => {
    console.log('MediaViewer.jsx: useEffect()', currentMediaIndex, media.length, currentMedia);
  });

  return (
    <MediaContainer className="MediaViewer">
      {media.length > 1 && (
        <MediaNav mediaChange={mediaChange} direction="prev" />
      )}
      {currentMedia.type === 'image' && (
        <Image src={currentMedia.link} alt="" />
      )}
      {currentMedia.type === 'video' && (
        // eslint-disable-next-line jsx-a11y/media-has-caption
        <VideoTag
          src={currentMedia.link}
          data-index={currentMediaIndex}
          controls
        >
          Your browser does not support the video tag.
        </VideoTag>
      )}
      {currentMedia.type === 'custom' && (
        // eslint-disable-next-line react/no-danger
        <div dangerouslySetInnerHTML={{ __html: currentMedia.link }} />
      )}
      {media.length > 1 && (
        <MediaNav mediaChange={mediaChange} direction="next" />
      )}
    </MediaContainer>
  );
}

export default MediaViewer;
