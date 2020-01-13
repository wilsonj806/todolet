import React, { FC, useState } from 'react';


// ----- MUI components
import ListItem from '@material-ui/core/ListItem';
import Collapse from '@material-ui/core/Collapse';
import Typography from '@material-ui/core/Typography';

import PriorityDisplay from '../../components/PriorityDisplay/PriorityDisplay';
import Checkbox from './IsCompletedCheck';

import useStyles from './TodoItem.styles';

import { TodoItemProps } from '../../types';

import { updateTodo } from '../../actions/todoUpdate.action';

// TODO Add preliminary checkbox
const TodoItem : FC<TodoItemProps> = (props) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

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
        <Collapse in={open} timeout="auto" unmountOnExit>
          <Typography>Hello World</Typography>
        </Collapse>
      </div>
      <PriorityDisplay priority={ priority } handleEditBtnClick={ }/>
    </ListItem>
  )
}

export default TodoItem