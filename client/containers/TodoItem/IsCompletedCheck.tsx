import React, { FC, useState, ChangeEvent } from "react";
import { useDispatch } from "react-redux";

import CheckBox from "@material-ui/core/Checkbox";

import { TodoCheckboxProps } from "../../types";

// TODO Plan out Todo updates
const IsCompletedCheckbox: FC<TodoCheckboxProps> = (props) => {
  const { reduxUpdateTodo, is_completed } = props;
  const dispatch = useDispatch();
  // console.dir(props.curriedUpdateTodo);
  const handleChange = (event: ChangeEvent<any>): void => {
    try {
      const updatedValue = {
        is_completed: !is_completed,
      };
      dispatch(reduxUpdateTodo(updatedValue));
    } catch (e) {
      console.log(e);
      // dispatch(clientError())
    }
  };

  return <CheckBox checked={is_completed} onChange={handleChange} />;
};

export default IsCompletedCheckbox;
