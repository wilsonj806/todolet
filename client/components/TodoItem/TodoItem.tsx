import React, { FC } from 'react';


// ----- MUI components
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';

import PriorityDisplay from '../PriorityDisplay/PriorityDisplay';
import Checkbox from './IsCompletedCheck';

import useStyles from './TodoItem.styles';

import { TodoItemProps } from '../../types';

import { updateTodo } from '../../actions/todoUpdate.action';

// TODO Add preliminary checkbox
const TodoItem : FC<TodoItemProps> = (props) => {
  const classes = useStyles();
  const { todo: TodoObj } = props;
  const { todo, priority, _id, isCompleted } = TodoObj;
  const strikeThruStyling = isCompleted ? classes.listItemStrike : classes.listItem;
  return (
    <ListItem classes={{
      root: strikeThruStyling
    }}>
      <div className={ classes.leftWrapper }>
        <Checkbox isCompleted={ isCompleted } reduxUpdateTodo={ updateTodo(TodoObj) }/>
        <Typography>
          { todo }
        </Typography>
      </div>
      <PriorityDisplay priority={ priority }/>
    </ListItem>
  )
}

export default TodoItem