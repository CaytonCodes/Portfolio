import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const FormInputContainer = styled.div`
`;

const SelectInput = styled.select`
`;

const Input = styled.input`
`;

const TextArea = styled.textarea`
`;

const Label = styled.label`
`;

function FormInput({ field, val, inputUpdate }) {
  // console.log('FormInput', field, val);
  const handleChange = useCallback((e) => {
    e.preventDefault();
    const { name, value } = e.target;
    inputUpdate(name, value);
  }, [inputUpdate]);

  const handleFileChange = useCallback((e) => {
    const files = e.target.files;
    const file = e.target.files[0];
    const newVal = (val && field.attributes?.multiple) ? [...val, file] : [file];
    console.log('handleFileChange', files, val, e, field);
    console.log(newVal);
    inputUpdate(field.name, newVal);
  }, [inputUpdate]);

  const normalInput = (
    <Input
      name={field.name}
      type={field.type}
      value={val || ''}
      onChange={handleChange}
      // props spreading can be dangerous, but we are only spreading input from admins here.
      // It is up to the user to make sure the props are safe.
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...field.attributes}
    />
  );

  const fileInput = (
    <Input
      name={field.name}
      type="file"
      onChange={handleFileChange}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...field.attributes}
    />
  );

  const textAreaInput = (
    <TextArea
      name={field.name}
      value={val || ''}
      onChange={handleChange}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...field.attributes}
    />
  );

  const checkBoxInput = (
    <Input
      name={field.name}
      type={field.type}
      onChange={(e) => {
        const { name, checked } = e.target;
        inputUpdate(name, checked);
      }}
      checked={!!val}
      {...field.attributes}
    />
  );

  const selectInput = (
    <SelectInput
      name={field.name}
      value={val || ''}
      onChange={handleChange}
    >
      {Array.isArray(field.options) &&
        field.options.map(({ label, value }) => (
          <option key={label} value={value}>{label}</option>
        ))}
    </SelectInput>
  );

  return (
    <FormInputContainer
      key={field.name}
    >
      <Label htmlFor={field.name}>
        {field.isRequired ? `${field.label} *` : field.label}
        {(!field.isHidden) && (
          (field.type === 'textarea' && textAreaInput)
          || (field.type === 'select' && selectInput)
          || (field.type === 'checkbox' && checkBoxInput)
          || (field.type === 'file' && fileInput)
          || normalInput
        )}
      </Label>
    </FormInputContainer>
  );
}

export default FormInput;
