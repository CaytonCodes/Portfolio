/* eslint-disable no-param-reassign */
import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import FormInput from './FormInput';

const FormListContainer = styled.div`
`;

const SubFieldListContainer = styled.div`
`;

function FormList({
  fieldsObj, dataObj, inputUpdate, noTitle = false
}) {
  console.log('FormList', fieldsObj, dataObj);
  const subDocUpdate = useCallback((fieldName, fieldData, subName, subValue) => {
    const updatedSubField = { ...fieldData, [subName]: subValue };
    inputUpdate(fieldName, updatedSubField);
  }, [inputUpdate]);

  const subdocInput = useCallback((field, fieldData) => (
    <SubFieldListContainer key={field.name}>
      <div>{!noTitle && field.label}</div>
      <FormList
        fieldsObj={field.subFields}
        dataObj={fieldData}
        inputUpdate={
          (subName, subValue) => subDocUpdate(field.name, fieldData, subName, subValue)
        }
        key={field.name}
      />
    </SubFieldListContainer>
  ), [noTitle, subDocUpdate]);

  const repeatableUpdate = useCallback((subValue, fieldName, index, fieldData) => {
    fieldData[index] = subValue;
    inputUpdate(fieldName, fieldData);
  }, [inputUpdate]);

  const repeatableDataCheck = useCallback((repeatableData) => {
    if (!repeatableData) { repeatableData = []; }
    if (!Array.isArray(repeatableData)) { repeatableData = [repeatableData]; }
    // eslint-disable-next-line react/prop-types
    if (repeatableData.length === 0) { repeatableData.push(''); }
    return repeatableData;
  }, []);

  const repeatableInput = useCallback((field, fieldData) => {
    fieldData = repeatableDataCheck(fieldData);
    if (!Array.isArray(field.default) || field.default.length === 0) {
      field.default = [fieldData[0]];
    }
    return (
      <SubFieldListContainer key={field.name}>
        <div>{field.label}</div>
        {fieldData.map((data, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <div key={field.name + index}>
            <FormList
              fieldsObj={{ [field.name]: { ...field, isRepeatable: false } }}
              dataObj={{ [field.name]: data }}
              inputUpdate={
                (_subName, subValue) => repeatableUpdate(subValue, field.name, index, fieldData)
              }
              noTitle
              // eslint-disable-next-line react/no-array-index-key
              key={field.name + index}
            />
            {index > 0 && (
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  fieldData.splice(index, 1);
                  inputUpdate(field.name, fieldData);
                }}
              >
                Remove
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            fieldData.push(field.default[0]);
            inputUpdate(field.name, fieldData);
          }}
        >
          Add
        </button>
      </SubFieldListContainer>
    );
  }, [inputUpdate, repeatableDataCheck, repeatableUpdate]);

  const normalInput = useCallback((field, val) => (
    <FormInput
      field={field}
      val={val}
      inputUpdate={inputUpdate}
      key={field.name}
    />
  ), [inputUpdate]);

  const checkDependency = useCallback((field, _dataObj) => {
    if (field.dependsOn) {
      const { name, value } = field.dependsOn;
      if (_dataObj[name] !== value) {
        return false;
      }
    }
    return true;
  }, []);

  return (
    <FormListContainer>
      {Object.values(fieldsObj).map((field) => (
        field.dependsOn && !checkDependency(field, dataObj) ? null : (
          (field.isRepeatable && repeatableInput(field, dataObj[field.name]))
          || (Object.keys(field.subFields).length > 0 && subdocInput(field, dataObj[field.name]))
          || normalInput(field, dataObj[field.name])
        )))}
    </FormListContainer>
  );
}

export default FormList;
