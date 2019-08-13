import React, { FunctionComponent, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { TextInputWrapperProps } from '../types/form';

const TextInputWrapper: FunctionComponent<TextInputWrapperProps> = (props) => {
  const { type, classes, id, label, margin, value, reactHookFn } = props;
  return (
    <TextField
      id={ id }
      { ...props }
      value={ value }
      label={ label }
      margin={ margin }
      classes={ classes }
      type={ type ? type : "text" }
      onChange={ (event) => reactHookFn(event.target.value) }
    />
  )
}

export default TextInputWrapper;