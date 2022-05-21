import React, { useState, useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const EmbeddedAppContainer = styled.div`
`;

function AppRuner({ appID }) {
  const [html, setHtml] = useState('');
  const [appData, setAppData] = useState(null);

  useEffect(() => {
    console.log('AppRuner.jsx: appID', appID);
    // fetch(`/api/apps/${appID}`)
    //   .then((res) => res.json())
    //   .then((data) => {
    //     console.log('AppRuner.jsx: data back', data);
    //     setAppData(data);
    //     const script = document.createElement('script');
    //     script.src = data.url;
    //     script.async = true;
    //     script.defer = true;
    //     document.body.appendChild(script);
    //   })
    //   .catch((err) => console.log('AppRuner.jsx: useEffect()', err));
  }, [appID]);

  return (
    <EmbeddedAppContainer
      className="EmbeddedAppContainer"
      id={`EmbeddedAppContainer-${appID}`}
    >
      <h1> Embedded App </h1>
      {appData && (
        <div dangerouslySetInnerHTML={{ __html: appData.html }} />
      )}
    </EmbeddedAppContainer>
  );
}

export default AppRuner;
