import { SetStateAction } from 'react'
import { Dispatch } from 'redux';
import TodoService from '../services/TodoService';

import {
  ReduxAction,
  TodoShape
} from '../types';
import { errorResponse } from '../../server/types';

export const POST_TODO_INIT = 'POST_TODO_INIT'
export const POST_TODO_FAIL = 'POST_TODO_FAIL'
export const POST_TODO_SUCCESS = 'POST_TODO_SUCCESS'

const requestPostNewTodo = () : ReduxAction => ({
  type: POST_TODO_INIT
})

// TODO type the JSON param
const receivePostNewTodoSuccess = (json : Array<TodoShape>) : ReduxAction => ({
  type: POST_TODO_SUCCESS,
  payload: json
})

const receivePostNewTodoFail = (err : any) : any => ({
  type: POST_TODO_FAIL,
  payload: err
})

// ----- NOTE Exported Redux Thunk action
export const postNewTodo = (request : any, stateFns: SetStateAction<any>[]) => {
  return async (dispatch: Dispatch) => {
    dispatch(requestPostNewTodo());
    try {
      const res = await TodoService.postTodo(request);
      stateFns.forEach( (fn: SetStateAction<any>) => fn('') );
      dispatch(receivePostNewTodoSuccess(res))
    } catch (err) {
      dispatch(receivePostNewTodoFail(err.message))
    }
  }
}
