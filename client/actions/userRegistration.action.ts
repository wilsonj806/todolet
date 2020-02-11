import { Dispatch } from 'redux';

import UserService from '../services/UserService';
import { enqueueSnackActionCreator } from './notifications.action'

// ----- NOTE TypeScript types(client and server)
import {
  AsyncRegisterAction,
  UserStoreShape
} from '../types';
import { postUserReq, userDataResponse, errorResponse } from '../../server/types';


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

const receiveRegisterFailure = () : AsyncRegisterAction => ({
  type: POST_REGISTER_FAIL,
})

// ----- NOTE Exported Redux Thunk action
export const postNewUser = (request : postUserReq) =>
  async (dispatch : Dispatch) => {
    dispatch(requestRegister());
    try {
      const result = await UserService.postNewUser(request);
      const { status, msg } = result;

      if (status === 'FAILURE') throw new Error(msg);
      dispatch(receiveRegisterSuccess(result.payload))
    } catch (error) {
      dispatch(receiveRegisterFailure());
      dispatch(enqueueSnackActionCreator({
        message: error.message,
        options: {
          variant: 'error'
        }
      }));
    }
  }
