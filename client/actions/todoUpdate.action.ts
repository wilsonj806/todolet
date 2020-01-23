import { SetStateAction } from 'react'
import { Dispatch } from 'redux';
import TodoService from '../services/TodoService';

import {
  ReduxAction,
  TodoShape,
  StoreShape
} from '../types';
import { errorResponse } from '../../server/types';

export const PUT_TODO_INIT = 'PUT_TODO_INIT'
export const PUT_TODO_FAIL = 'PUT_TODO_FAIL'
export const PUT_TODO_SUCCESS = 'PUT_TODO_SUCCESS'

const requestPutTodo = () : ReduxAction => ({
  type: PUT_TODO_INIT
})

// ----- NOTE the input param is basically the entire store because we need to update the entire store with the updated User data
const receivePutTodoSuccess = (json : TodoShape) : ReduxAction => ({
  type: PUT_TODO_SUCCESS,
  payload: json
})

const receivePutTodoFail = (err : any) : any => ({
  type: PUT_TODO_FAIL,
  payload: err
})

export const updateTodo = (todo: TodoShape) =>
  <T extends { [key in keyof TodoShape] ?: any }>(updatedValue: T) =>
    async (dispatch: any) => {
      try {
        dispatch(requestPutTodo());
        const updatedTodo = await TodoService.updateTodo(todo, updatedValue)
        dispatch(receivePutTodoSuccess(updatedTodo));
      } catch(e) {
        dispatch(receivePutTodoFail(e))
      }
    }


/**
 * End result at the reducer end
 */

// const reducer = (state, action) => {
//   switch(action.type) {
//     case 'UPDATE_TODO_SUCCESS':
//       const { payload: todo } = action;
//       const copy = [...state];
//       copy[todo.userIndex] = todo;
//       return copy;
//   }
// }