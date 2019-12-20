import React, { FC, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'

// ---- MUI Components
import Typography from '@material-ui/core/Typography';

import SubmitBar from './SubmitBar';
import TodoList from '../../components/TodoList/TodoList';
import { StoreShape } from '../../types';

import { getAllTodos } from '../../actions/todoGetAll.action';
/**
 * Need:
 * - A SubmitBar
 * - a list entry with the ability to see todos
 *  - later: ability to update todo
 *
 */

const MainLayout : FC<any> = (props) => {
  const todosList = useSelector<StoreShape, any>((state) => state.todosList);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllTodos());
  }, [])

  return (
    <div style={{ margin: '0rem 1rem'}}>
      <Typography variant="h2" component="h5">Todos</Typography>
      <SubmitBar/>
      <TodoList todosList={ todosList }/>
    </div>
  )
}

export default MainLayout