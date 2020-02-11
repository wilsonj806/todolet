import { Dispatch } from 'redux';

import UserService from '../services/UserService';
import { enqueueSnackActionCreator } from './notifications.action'


// ----- NOTE TypeScript types(client and server)
import {
  AsyncLoginAction,
} from '../types';
import { postLoginReq, userDataResponse, errorResponse } from '../../server/types';


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

const receiveLoginFailure = () : AsyncLoginAction => ({
  type: POST_LOGIN_FAIL,
})

// ----- NOTE Exported Redux Thunk action
export const postLogin = (request : postLoginReq) =>
  async (dispatch : Dispatch) => {
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
