import { Dispatch } from 'redux';

import UserService from '../services/UserService';
import { enqueueSnackActionCreator } from './notifications.action'


// ----- NOTE TypeScript types(client and server)
import {
  AsyncLoginAction,
} from '../types';
import { postLoginReq, userDataResponse, errorResponse } from '../../server/types';


const POST_LOGIN_INIT = 'POST_LOGIN_INIT'
const POST_LOGIN_FAIL = 'POST_LOGIN_FAIL'
const POST_LOGIN_SUCCESS = 'POST_LOGIN_SUCCESS'


// ----- NOTE Login action creators
const requestLogin = () : AsyncLoginAction => ({
  type: POST_LOGIN_INIT,
})

const receiveLoginSuccess = (json : userDataResponse) : AsyncLoginAction => ({
  type: POST_LOGIN_SUCCESS,
  payload: json
})

const receiveLoginFailure = () : AsyncLoginAction => ({
  type: POST_LOGIN_FAIL,
})

const postGuestLogin = () => {
  return async (dispatch : Dispatch) => {
    dispatch(requestLogin());
    try {
      const result = await UserService.postGuest();
      const { status, msg } = result;

      if (status === 'FAILURE') throw new Error(msg);
      dispatch(receiveLoginSuccess(result.payload))
    } catch (error) {
      dispatch(receiveLoginFailure());
      dispatch(enqueueSnackActionCreator({
        message: error.message,
        options: {
          variant: 'error'
        }
      }));
    }
  }
}

// ----- NOTE Exported Redux Thunk action
const postLogin = (request : postLoginReq) => {
  return async (dispatch : Dispatch) => {
    dispatch(requestLogin());
    try {
      const result = await UserService.postLogin(request);
      const { status, msg } = result;

      if (status === 'FAILURE') throw new Error(msg);
      dispatch(receiveLoginSuccess(result.payload))
    } catch (error) {
      dispatch(receiveLoginFailure());
      dispatch(enqueueSnackActionCreator({
        message: error.message,
        options: {
          variant: 'error'
        }
      }));
    }
  }
}

export {
  POST_LOGIN_INIT, POST_LOGIN_FAIL,POST_LOGIN_SUCCESS,
  postLogin,
  postGuestLogin
}