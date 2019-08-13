import React, { FunctionComponent, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { TextInputWrapperProps } from '../types/form';

const TextInputWrapper: FunctionComponent<TextInputWrapperProps> = (props) => {
  const { type, classes, id, label, margin, value, reactHookFn } = props;

  return (
    <TextField
      id={ id }
      type={ type }
      value={ value }
      label={ label }
      margin={ margin }
      classes={ classes }
      onChange={ (event) => reactHookFn(event.target.value) }
    />
  )
}

export default TextInputWrapper;