import { Dispatch } from 'redux';
import TodoService from '../services/TodoService';

import {
  ReduxAction,
} from '../types';
import { errorResponse } from '../../server/types';
import { receiveUserUpdateSuccess } from './userUpdate.action';

export const GET_TODOS_INIT = 'GET_TODOS_INIT'
export const GET_TODOS_FAIL = 'GET_TODOS_FAIL'
export const GET_TODOS_SUCCESS = 'GET_TODOS_SUCCESS'

const requestTodos = () : ReduxAction => ({
  type: GET_TODOS_INIT
})

// TODO type the JSON param
const receiveTodosSuccess = (json : unknown) : ReduxAction => ({
  type: GET_TODOS_SUCCESS,
  payload: json
})

const receiveTodosFail = (err : any) : any => ({
  type: GET_TODOS_FAIL,
  payload: err
})

// ----- NOTE Exported Redux Thunk action
export const getAllTodos = () =>
  async (dispatch: Dispatch) => {
    dispatch(requestTodos());
    try {
      const [ todos, authorizedUser ] = await TodoService.getTodos();
      // dispatch(receiveTodosSuccess(res))
      dispatch(receiveTodosSuccess(todos))
      dispatch(receiveUserUpdateSuccess(authorizedUser))
    } catch (err) {
      dispatch(receiveTodosFail(err.message))
    }
  }

