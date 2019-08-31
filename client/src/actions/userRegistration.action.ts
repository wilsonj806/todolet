import { Dispatch } from 'redux';
import axios from '../axios';

import {
  ReduxAction,
  AsyncRegisterAction,
  AsyncLoginAction,
  AsyncLogOutAction,
  AsyncPatchAction,
  UserStoreShape
} from '../types';
import { postUserReq, userDataResponse, errorResponse } from '../../../types';


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
      const result = await axios.post('/user/register')
      return dispatch(receiveRegisterSuccess(result))
    } catch (error) {
      return dispatch(receiveRegisterFailure(error));
    }
  }
}