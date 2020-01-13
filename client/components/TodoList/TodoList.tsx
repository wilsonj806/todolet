import React, { FC, SyntheticEvent, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'


// ----- MUI components
import List from '@material-ui/core/List';
import { TodoShape } from '../../types';
import TodoItem from '../../containers/TodoItem/TodoItem';


const TodoList : FC<any> = (props) => {
  const { todosList } = props;

  const TodoMap = todosList.map((todo : TodoShape, i : number) => <TodoItem key={ i } todo={ todo } index={ i }/>);

  return (
    <div>
      <List>
        { TodoMap }
      </List>
    </div>
  )
}

export default TodoList;