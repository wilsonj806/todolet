import React, { FC, useState, ChangeEvent } from 'react';
import TextField from '@material-ui/core/TextField';
import { TextInputWrapperProps } from '../types';
// FIXME replace id with "name" attribute
const TextInputWrapper: FC<TextInputWrapperProps> = (props) => {
  const { type, classes, id, name, label, margin, value, reactHookFn } = props;
  const otherProps = { ...props };
  delete otherProps.reactHookFn;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    // FIXME type casting isn't working
    const target = event.currentTarget as any;
    reactHookFn(target.value)
  }

  return (
    <TextField
      id={ id }
      name={ name }
      value={ value }
      label={ label }
      margin={ margin }
      classes={ classes || undefined }
      type={ type ? type : "text" }
      onChange={ handleChange }
      { ...otherProps }
    />
  )
}

export default TextInputWrapper;