import { SetStateAction } from 'react'
import { Dispatch } from 'redux';
import TodoService from '../services/TodoService';
import { enqueueSnackActionCreator } from './notifications.action'

import {
  ReduxAction,
  TodoShape,
  StoreShape
} from '../types';
import { errorResponse } from '../../server/types';
import { receiveUserUpdateSuccess } from './userUpdate.action';

export const POST_TODO_INIT = 'POST_TODO_INIT'
export const POST_TODO_FAIL = 'POST_TODO_FAIL'
export const POST_TODO_SUCCESS = 'POST_TODO_SUCCESS'

const requestPostNewTodo = () : ReduxAction => ({
  type: POST_TODO_INIT
})

// ----- NOTE the input param is basically the entire store because we need to update the entire store with the updated User data
const receivePostNewTodoSuccess = (json : StoreShape) : ReduxAction => ({
  type: POST_TODO_SUCCESS,
  payload: json
})

const receivePostNewTodoFail = () : any => ({
  type: POST_TODO_FAIL,
})

// ----- NOTE Exported Redux Thunk action
// FIXME this only returns the TODOS and NOT the updated user
export const postNewTodo = (request : any, stateFns: SetStateAction<any>[]) =>
  async (dispatch: Dispatch) => {
    dispatch(requestPostNewTodo());
    try {
      const todos = await TodoService.postTodo(request);
      stateFns.forEach( (fn: SetStateAction<any>) => fn() );

      dispatch(receivePostNewTodoSuccess(todos))
    } catch (err) {
      dispatch(receivePostNewTodoFail())
      dispatch(enqueueSnackActionCreator({
        message: err.message,
        options: {
          variant: 'error'
        }
      }));
    }
  }


