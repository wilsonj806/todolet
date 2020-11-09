import { SetStateAction } from 'react'
import { Dispatch } from 'redux';
import TodoService from '../services/TodoService';
import { enqueueSnackActionCreator } from './notifications.action'

import { receiveUserUpdateSuccess } from './userUpdate.action';

import {
  ReduxAction,
  TodoShape,
  StoreShape,
} from '../types';
import { errorResponse } from '../../server/types';

export const DELETE_TODO_INIT = 'DELETE_TODO_INIT'
export const DELETE_TODO_FAIL = 'DELETE_TODO_FAIL'
export const DELETE_TODO_SUCCESS = 'DELETE_TODO_SUCCESS'

const requestDeleteTodo = () : ReduxAction => ({
  type: DELETE_TODO_INIT
})

// ----- NOTE the input param is basically the entire store because we need to update the entire store with the updated User data
const receiveDeleteTodoSuccess = (json : TodoShape) : ReduxAction => ({
  type: DELETE_TODO_SUCCESS,
  payload: json
})

const receiveDeleteTodoFail = () : any => ({
  type: DELETE_TODO_FAIL,
})

export const deleteTodo = (todoId: string) =>
  async (dispatch: any) => {
    try {
      dispatch(requestDeleteTodo());
      // TodoService also fetches the updated user so we need to update our state with both
      const todos = await TodoService.deleteTodo(todoId);

      dispatch(receiveDeleteTodoSuccess(todos));
    } catch(e) {
      dispatch(receiveDeleteTodoFail())
      dispatch(enqueueSnackActionCreator({
        message: e.message,
        options: {
          variant: 'error'
        }
      }));
    }
  }
