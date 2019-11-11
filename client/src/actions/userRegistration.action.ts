import { Dispatch } from 'redux';

import UserService from '../services/UserService';

// ----- NOTE TypeScript types(client and server)
import {
  AsyncRegisterAction,
  UserStoreShape
} from '../types';
import { postUserReq, userDataResponse, errorResponse } from '../../../server/types';


// ----- NOTE Exported Action types
export const POST_REGISTER_INIT = 'POST_REGISTER_INIT'
export const POST_REGISTER_FAIL = 'POST_REGISTER_FAIL'
export const POST_REGISTER_SUCCESS = 'POST_REGISTER_SUCCESS'


// ----- NOTE Registration action creators
const requestRegister = () : AsyncRegisterAction => ({
  type: POST_REGISTER_INIT,
})

const receiveRegisterSuccess = (json : userDataResponse) : AsyncRegisterAction => ({
  type: POST_REGISTER_SUCCESS,
  payload: json
})

const receiveRegisterFailure = (json : errorResponse) : AsyncRegisterAction => ({
  type: POST_REGISTER_FAIL,
  payload: json
})

// ----- NOTE Exported Redux Thunk action
export const postNewUser = (request : postUserReq) => {
  return async (dispatch : Dispatch) => {
    dispatch(requestRegister());
    try {
      const result = await UserService.postNewUser(request);
      const { status, msg } = result;

      if (status === 'FAILURE') throw new Error(msg);
      return dispatch(receiveRegisterSuccess(result.payload))
    } catch (error) {
      return dispatch(receiveRegisterFailure(error.message));
    }
  }
}