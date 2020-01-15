import React, { FC, useState } from 'react';


// ----- MUI components
import ListItem from '@material-ui/core/ListItem';
import Collapse from '@material-ui/core/Collapse';
import Typography from '@material-ui/core/Typography';

import PriorityDisplay from '../../components/PriorityDisplay/PriorityDisplay';
import SubmitBar from '../../layouts/MainLayout/SubmitBar'
import Checkbox from './IsCompletedCheck';

import useStyles from './TodoItem.styles';

import { TodoItemProps } from '../../types';

import { updateTodo } from '../../actions/todoUpdate.action';

const TodoItem : FC<TodoItemProps> = (props) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const { todo: TodoObj } = props;
  const { todo, priority, _id, isCompleted } = TodoObj;

  const itemStyling = open ?
    classes.listItemExpand :
    isCompleted ?
      classes.listItemStrike : classes.listItem;

  const handleEditBtnClick = (): void => setOpen(!open);

  return (
    <ListItem classes={{
      root: itemStyling
    }}>
      <div className={ classes.todoWrapper }>
        <div className={ classes.checkBoxWrapper }>
          <Checkbox isCompleted={ isCompleted } reduxUpdateTodo={ updateTodo(TodoObj) }/>
          <Typography>
            { todo }
          </Typography>
        </div>
        <PriorityDisplay priority={ priority } handleEditBtnClick={ handleEditBtnClick }/>
      </div>
      <Collapse in={open} timeout="auto" unmountOnExit classes={{ entered: classes.collapse }}>
        <SubmitBar isUpdateBar={ true }/>
      </Collapse>
    </ListItem>
  )
}

export default TodoItem