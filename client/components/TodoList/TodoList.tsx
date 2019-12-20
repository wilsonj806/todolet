import React, { FC, SyntheticEvent, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'


// ----- MUI components
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import { TodoShape } from '../../types';
import TodoItem from '../TodoItem/TodoItem';


const TodoList : FC<any> = (props) => {
  const { todosList } = props;

  const TodoMap = todosList.map((todo : TodoShape, i : number) => <TodoItem key={ i } todo={ todo } index={ i }/>);

  return (
    <div style={{ margin: '2rem 1rem'}}>
      <Typography variant="h2" component="h5">Todos</Typography>
      <List>
        { TodoMap }
      </List>
    </div>
  )
}

export default TodoList;