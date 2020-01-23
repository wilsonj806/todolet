import React, { FC, useState, ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';

import CheckBox from '@material-ui/core/Checkbox';

import { TodoCheckboxProps } from '../../types';

// TODO Plan out Todo updates
const IsCompletedCheckbox : FC<TodoCheckboxProps> = (props) => {
  const { reduxUpdateTodo, isCompleted } = props;
  const dispatch = useDispatch();
  // console.dir(props.curriedUpdateTodo);
  const handleChange = (event : ChangeEvent<any>) : void => {
    try {
      const updatedValue = {
        isCompleted: !isCompleted
      }
      dispatch(reduxUpdateTodo(updatedValue))
    } catch (e) {
      console.log(e);
      // dispatch(clientError())
    }
  }

  return (
    <CheckBox checked={ isCompleted } onChange={ handleChange }/>
  )
}

export default IsCompletedCheckbox;