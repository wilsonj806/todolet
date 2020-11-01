import { Dispatch } from 'redux';
import TodoService from '../services/TodoService';
import { enqueueSnackActionCreator } from './notifications.action'


import {
  ReduxAction, TodoShape,
} from '../types';
import { errorResponse } from '../../server/types';
import { receiveUserUpdateSuccess } from './userUpdate.action';

import { INIT_USER_STATE } from '../store/reducers/root.reducer';

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

const receiveTodosFail = () : any => ({
  type: GET_TODOS_FAIL,
})

// ----- NOTE Exported Redux Thunk action
// TODO FIXME make this have a bool input indicating if it's an update or not?
export const getAllTodos = () =>
  async (dispatch: Dispatch) => {
    dispatch(requestTodos());
    try {
      const [ todos ] = await TodoService.getTodos();
      dispatch(receiveTodosSuccess(todos))
    } catch (err) {
      dispatch(receiveTodosFail())
      dispatch(enqueueSnackActionCreator({
        message: err.message,
        options: {
          variant: 'error'
        }
      }));
    }
  }

