import React, { useState, useEffect, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import FormList from './FormList';

const EntryFormContainer = styled.div`
`;

function EntryForm({ dataType, fields, data, submitData }) {
  const [relevantFields, setRelevantFields] = useState(fields[dataType].fields);
  const [relevantData, setRelevantData] = useState(data[dataType]);
  const dataRef = useRef();
  dataRef.current = relevantData;

  const submitted = useCallback((e) => {
    e.preventDefault();
    submitData(data);
  }, [data, submitData]);

  const dataChange = useCallback((name, value) => {
    // console.log('dataChange', name, value);
    setRelevantData({ ...dataRef.current, [name]: value });
  }, []);

  useEffect(() => {
    if (relevantFields.length === 0) {
      console.log('setting up entry form relevant fields and data');
      setRelevantFields(fields.documents[dataType].fields);
      setRelevantData(data.documents[dataType]);
    }
  }, []);

  return (
    <EntryFormContainer>
      <form onSubmit={submitted}>
        <FormList
          fieldsObj={relevantFields}
          dataObj={relevantData}
          inputUpdate={dataChange}
        />
        <input type="submit" value="Submit" />
      </form>
    </EntryFormContainer>
  );
}

export default EntryForm;
