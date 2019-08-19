import React, { FunctionComponent, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { TextInputWrapperProps } from '../types/form';

const TextInputWrapper: FunctionComponent<TextInputWrapperProps> = (props) => {
  const { type, classes, id, label, margin, value, reactHookFn } = props;
  const otherProps = { ...props };
  delete otherProps.reactHookFn;

  return (
    <TextField
      id={ id }
      value={ value }
      label={ label }
      margin={ margin }
      classes={ classes }
      type={ type ? type : "text" }
      onChange={ (event) => reactHookFn(event.target.value) }
      { ...otherProps }
    />
  )
}

export default TextInputWrapper;