import React, { FC } from 'react';


// ----- MUI components
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';

import PriorityDisplay from '../PriorityDisplay/PriorityDisplay';

import useStyles from './TodoItem.styles';

const TodoItem : FC<any> = (props) => {
  const classes = useStyles();
  const { todo: Todo } = props;
  const { todo, priority } = Todo;
  return (
    <ListItem classes={{
      root: classes.listItem
    }}>
      <div>
        <Typography>
          { todo }
        </Typography>
      </div>
      <PriorityDisplay priority={ priority }/>
    </ListItem>
  )
}

export default TodoItem