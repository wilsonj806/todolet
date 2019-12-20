import React, { FC } from 'react';


// ----- MUI components
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';

import PriorityDisplay from '../PriorityDisplay/PriorityDisplay';
import Checkbox from './IsCompletedCheck';

import useStyles from './TodoItem.styles';

import { TodoItemProps } from '../../types';

// TODO Add preliminary checkbox
const TodoItem : FC<TodoItemProps> = (props) => {
  const classes = useStyles();
  const { todo: Todo } = props;
  const { todo, priority, id, isCompleted } = Todo;
  return (
    <ListItem classes={{
      root: classes.listItem
    }}>
      <div className={ classes.leftWrapper }>
        <Checkbox id={ id } isCompleted={ isCompleted }/>
        <Typography>
          { todo }
        </Typography>
      </div>
      <PriorityDisplay priority={ priority }/>
    </ListItem>
  )
}

export default TodoItem