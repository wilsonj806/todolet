import React, { FC, useState, ChangeEvent, SyntheticEvent } from 'react';

import { useDispatch } from 'react-redux'

import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl';

import { useTheme } from '@material-ui/core/styles';
import useStyles from './SubmitBar.styles';


import TextInputWrapper from "../../containers/TextInputWrapper";

import { postNewTodo } from '../../actions/todoAdd.action';
import { updateTodo } from '../../actions/todoUpdate.action';

import { SubmitBarProps } from '../../types';
/**
 * Submit bar
 * - needs a Select Element
 * - needs a Submit Button Element
 * - needs to be wrapped with a Form Element
 * - needs to make a POST request on submit
 *
 */

const SubmitBar: FC<SubmitBarProps> = (props) => {
  const { isUpdateBar, todo: Todo, reduxUpdateTodo } = props;
  // Redux state
  const dispatch = useDispatch();

  // Styling
  const classes = useStyles();

  // Local State
  const [ todo, setTodo ] = useState('');
  const [ priority, setPriority ] = useState('');
  const [ error, setError ] = useState('')

  // Event Handlers
  // Type casting not working as expected but handleSelect is only for the select element
  const handleSelect = (event: ChangeEvent<any>) => {
    setPriority(event.target.value)
  }
  // TODO figure out how to retool this to allow for update Todo

  const handlePostTodoSubmit = async (event: SyntheticEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const request = {
      todo,
      priority
    };
    try {
      dispatch(postNewTodo(request, [setTodo, setPriority]))
    } catch (error) {
      setError(error)
    }
  }

  const BtnText = isUpdateBar ? 'Update Todo' : 'Add Todo';

  // TODO fix the Select so it uses the unified Input component
  return (
    <div>
      <form id="todo-submit" className={ classes.form }>
        <TextInputWrapper
          id="todo"
          label="New Todo"
          name="todo"
          value={ todo }
          classes={{ root: classes.textInput }}
          reactHookFn={ setTodo }
        />
        <FormControl>
          <InputLabel
            htmlFor="priority"
            id="label--priority"
          >
            Select Priority
          </InputLabel>
          <Select
            labelId="label--priority"
            id="select--priority"
            name="priority"
            value={ priority }
            classes={{ root: classes.select }}
            onChange={ handleSelect }
          >
            <MenuItem value="">Select a priority</MenuItem>
            <MenuItem value="Low">Low</MenuItem>
            <MenuItem value="Medium">Medium</MenuItem>
            <MenuItem value="High">High</MenuItem>
          </Select>
        </FormControl>
        <Button
          type="submit"
          color="primary"
          variant="contained"
          classes={{ root: classes.button }}
          onClick={ handlePostTodoSubmit }
        >
          { BtnText }
        </Button>
      </form>
    </div>
  )
}

export default SubmitBar;