import { Dispatch } from 'redux';

import UserService from '../services/UserService';

// ----- NOTE TypeScript types(client and server)
import {
  AsyncLoginAction,
} from '../types';
import { postLoginReq, userDataResponse, errorResponse } from '../../../types';


export const POST_LOGIN_INIT = 'POST_LOGIN_INIT'
export const POST_LOGIN_FAIL = 'POST_LOGIN_FAIL'
export const POST_LOGIN_SUCCESS = 'POST_LOGIN_SUCCESS'


// ----- NOTE Login action creators
const requestLogin = () : AsyncLoginAction => ({
  type: POST_LOGIN_INIT,
})

const receiveLoginSuccess = (json : userDataResponse) : AsyncLoginAction => ({
  type: POST_LOGIN_SUCCESS,
  payload: json
})

const receiveLoginFailure = (json : errorResponse) : AsyncLoginAction => ({
  type: POST_LOGIN_FAIL,
  payload: json
})

// ----- NOTE Exported Redux Thunk action
export const postLogin = (request : postLoginReq) => {
  return async (dispatch : Dispatch) => {
    dispatch(requestLogin());
    try {
      const result = await UserService.postLogin(request);
      const { status, msg } = result;

      if (status === 'FAILURE') throw new Error(msg);
      return dispatch(receiveLoginSuccess(result.payload))
    } catch (error) {
      return dispatch(receiveLoginFailure(error.message));
    }
  }
}