import { Dispatch } from 'redux';

import UserService from '../services/UserService';

// ----- NOTE TypeScript types(client and server)
import {
  ReduxAction,
} from '../types';
import { errorResponse } from '../../../types';


export const DELETE_USER_INIT = 'DELETE_USER_INIT'
export const DELETE_USER_FAIL = 'DELETE_USER_FAIL'
export const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS'

// ----- NOTE Logout action creators
const requestDeleteUser = () : ReduxAction => ({
  type: DELETE_USER_INIT,
})

const receiveDeleteUserSuccess = () : ReduxAction => ({
  type: DELETE_USER_SUCCESS,
})

const receiveDeleteUserFailure = (json : errorResponse) : ReduxAction => ({
  type: DELETE_USER_FAIL,
  payload: json
})

// ----- NOTE Exported Redux Thunk action
export const deleteUser = () => {
  return async (dispatch : Dispatch) => {
    dispatch(requestDeleteUser());
    try {
      const result = await UserService.deleteUser();
      const { status, msg } = result;

      if (status === 'FAILURE') throw new Error(msg);
      return dispatch(receiveDeleteUserSuccess())
    } catch (error) {
      return dispatch(receiveDeleteUserFailure(error.message));
    }
  }
}