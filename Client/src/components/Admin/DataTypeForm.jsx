import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const DataTypeFormContainer = styled.div`
`;

const SelectInput = styled.select`
`;

const Input = styled.input`
`;

const Label = styled.label`
`;

function DataTypeForm({ dataTypeOptions, dataTypeSelected }) {
  const inputTypeOptions = ['Create', 'Update'];
  const [inputType, setInputType] = useState(inputTypeOptions[0]);
  const [dataType, setDataType] = useState(dataTypeOptions[0]);
  const [updateID, setUpdateID] = useState('');

  const submitted = useCallback((e) => {
    e.preventDefault();
    dataTypeSelected(dataType, inputType, updateID);
  }, [dataTypeSelected, dataType, inputType, updateID]);

  const inputChange = useCallback((e, stateSetter) => {
    e.preventDefault();
    stateSetter(e.target.value);
  }, []);

  useEffect(() => {
    console.log('DataTypeForm: useEffect', dataTypeOptions);
  }, []);

  return (
    <DataTypeFormContainer>
      <form onSubmit={submitted}>
        <Label htmlFor="dataType">
          Data Type
          <SelectInput value={dataType} onChange={(e) => inputChange(e, setDataType)}>
            {dataTypeOptions.map((dataTypeOption) => (
              <option key={dataTypeOption} value={dataTypeOption}>{dataTypeOption}</option>
            ))}
          </SelectInput>
        </Label>
        <Label htmlFor="inputType">
          Input Type
          <SelectInput value={inputType} onChange={(e) => inputChange(e, setInputType)}>
            {inputTypeOptions.map((inputTypeOption) => (
              <option key={inputTypeOption} value={inputTypeOption}>{inputTypeOption}</option>
            ))}
          </SelectInput>
        </Label>
        {inputType === 'Update' && (
          <Label htmlFor="updateID">
            Update ID
            <Input type="number" value={updateID} onChange={(e) => inputChange(e, setUpdateID)} />
          </Label>
        )}
        <button type="submit">Submit</button>
      </form>
    </DataTypeFormContainer>
  );
}

export default DataTypeForm;
