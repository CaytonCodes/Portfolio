import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { getDataFieldsReq, getPostData } from '../requests';
import DataTypeForm from './DataTypeForm';
import EntryForm from './EntryForm';

const AdminContainer = styled.div`
`;

function Admin() {
  // Phases: 0. User specifies input type and data type.
  //         1. Form is presented. User provides appropriate data.
  //         2. Data is validated and previewed.s
  //         3. Data is submitted to the server.
  const [currentPhase, setCurrentPhase] = useState(0);
  const [dataTypeOptions, setDataTypeOptions] = useState([]);
  const [dataType, setDataType] = useState();
  const [inputType, setInputType] = useState();
  const [updateID, setUpdateID] = useState();
  const [data, setData] = useState();
  const [fields, setFields] = useState();

  const changeInputType = useCallback((dataType, inputType, updateID = null) => {
    setDataType(dataType);
    setInputType(inputType);
    if (updateID) {
      setUpdateID(updateID);
    }
  }, []);

  const changePhase = useCallback((phase) => {
    setCurrentPhase(phase);
  }, []);

  const dataTypeSelected = useCallback((newDataType, newInputType, newUpdateID = null) => {
    changeInputType(newDataType, newInputType, newUpdateID);
    changePhase(1);
  }, [changeInputType, changePhase]);

  const getDataFields = useCallback(() => {
    getDataFieldsReq((dataBack) => {
      if (dataBack.success) {
        console.log('getDataFields: success', dataBack);
        const { docObj, dataObj } = dataBack.json;
        const dataTypes = Object.keys(docObj);
        setFields(docObj);
        setDataTypeOptions(dataTypes);
        setData(dataObj);
      }
    });
  }, []);

  const getUpdateData = useCallback(() => {
    if (dataType && updateID) {
      const params = {
        dataType,
        updateID,
      };
      getPostData((dataObj) => {
        if (dataObj.success) {
          const dataBack = dataObj.json;
          setData(dataBack);
        }
      }, params);
    }
  }, [dataType, updateID]);

  const submitData = useCallback((enteredData) => {
    console.log('submitData:', enteredData);
    setData(enteredData);
    changePhase(2);
  }, [changePhase]);

  useEffect(() => {
    console.log('Admin: useEffect', currentPhase, dataType, inputType, updateID);
    if (!fields) { getDataFields(); }
    if (currentPhase === 0) {
      if (dataType && inputType) {
        dataTypeSelected(dataType, inputType, updateID);
      }
    }
    if (currentPhase === 1) {
      if (!data && updateID) {
        getUpdateData(updateID);
      }
    }
  }, [currentPhase, dataTypeOptions]);

  return (
    <AdminContainer className="AdminContainer">
      <h1> Admin </h1>
      {currentPhase === 0 && dataTypeOptions.length > 0 && (
        <DataTypeForm
          dataTypeOptions={dataTypeOptions}
          dataTypeSelected={dataTypeSelected}
        />
      )}
      {currentPhase === 1 && (
        <EntryForm
          dataType={dataType}
          fields={fields}
          data={data}
          submitData={submitData}
        />
      )}
    </AdminContainer>
  );
}

export default Admin;
