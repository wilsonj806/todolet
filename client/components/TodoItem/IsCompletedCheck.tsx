import React, { FC, useState, ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';

import CheckBox from '@material-ui/core/Checkbox';

// TODO Plan out Todo updates
const IsCompletedCheckbox : FC<any> = (props) => {

  const handleChange = (event : ChangeEvent<any>) : void => {
    console.log('hi')
  }
  const { id, isCompleted } = props;
  return (
    <CheckBox checked={ isCompleted } disabled={ true }/>
  )
}

export default IsCompletedCheckbox;