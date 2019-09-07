import { Dispatch } from 'redux';

import UserService from '../services/UserService';

// ----- NOTE TypeScript types(client and server)
import {
  ReduxAction,
} from '../types';
import { errorResponse } from '../../../types';


export const POST_LOGOUT_INIT = 'POST_LOGOUT_INIT'
export const POST_LOGOUT_FAIL = 'POST_LOGOUT_FAIL'
export const POST_LOGOUT_SUCCESS = 'POST_LOGOUT_SUCCESS'

// ----- NOTE Logout action creators
const requestLogout = () : ReduxAction => ({
  type: POST_LOGOUT_INIT,
})

const receiveLogoutSuccess = () : ReduxAction => ({
  type: POST_LOGOUT_SUCCESS,
})

const receiveLogoutFailure = (json : errorResponse) : ReduxAction => ({
  type: POST_LOGOUT_FAIL,
  payload: json
})

// ----- NOTE Exported Redux Thunk action
export const postLogout = () => {
  return async (dispatch : Dispatch) => {
    dispatch(requestLogout());
    try {
      const result = await UserService.postLogout();
      const { status, msg } = result;

      if (status === 'FAILURE') throw new Error(msg);
      return dispatch(receiveLogoutSuccess())
    } catch (error) {
      return dispatch(receiveLogoutFailure(error.message));
    }
  }
}