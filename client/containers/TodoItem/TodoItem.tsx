import React, { FC, useState } from 'react';
import { useDispatch } from 'react-redux';

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
import { deleteTodo } from '../../actions/todoDelete.action';

const TodoItem : FC<TodoItemProps> = (props) => {
  // ----- Redux related
  const dispatch = useDispatch();
  // ----- Local State
  const [open, setOpen] = useState(false);

  // ----- Styling
  const classes = useStyles();
  const { todo: TodoObj } = props;
  const { todo, priority, _id, isCompleted } = TodoObj;

  const itemStyling = open ?
    classes.listItemExpand :
    isCompleted ?
      classes.listItemStrike : classes.listItem;

  const handleEditBtnClick = (): void => setOpen(!open);
  const handleDeleteBtnClick = (): void => dispatch(deleteTodo(_id))

  // FIXME Buttons aren't super accessible
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
        <PriorityDisplay
          priority={ priority }
          handleEditBtnClick={ handleEditBtnClick }
          handleDeleteBtnClick={ handleDeleteBtnClick }
        />
      </div>
      <Collapse in={open} timeout="auto" unmountOnExit classes={{ entered: classes.collapse }}>
        <SubmitBar
          isUpdateBar={ true }
          todo={ TodoObj }
          reduxUpdateTodo={ updateTodo(TodoObj) }
        />
      </Collapse>
    </ListItem>
  )
}

export default TodoItem