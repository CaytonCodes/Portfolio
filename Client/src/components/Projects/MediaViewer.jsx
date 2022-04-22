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

function MediaViewer({ mediaList }) {
  const [media] = useState(mediaList);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [currentMedia, setCurrentMedia] = useState(media[currentMediaIndex]);

  const mediaChange = (index, modifier = null) => {
    console.log('MediaViewer.jsx: mediaChange()', index, modifier);
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
    console.log('new index: ', newIndex, 'i: ', currentMediaIndex, 'currentMedia: ', media[newIndex]);
  };

  useEffect(() => {
    console.log('MediaViewer.jsx: useEffect()', currentMediaIndex, media.length, currentMedia);
  }, []);

  return (
    <MediaContainer className="MediaViewer" data-index={currentMediaIndex}>
      {media.length > 0 && (
        <MediaNav mediaChange={mediaChange} direction="prev" />
      )}
      {currentMedia.type === 'image' && (
        <Image src={currentMedia.link} alt="" data-index={currentMediaIndex} />
      )}
      {media.length > 0 && (
        <MediaNav mediaChange={mediaChange} direction="next" />
      )}
    </MediaContainer>
  );
}

export default MediaViewer;
