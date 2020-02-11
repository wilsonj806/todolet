import { Dispatch } from 'redux';

import UserService from '../services/UserService';

// ----- NOTE TypeScript types(client and server)
import {
  ReduxAction,
} from '../types';
import { errorResponse } from '../../server/types';
import { enqueueSnackActionCreator } from './notifications.action';


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

const receiveLogoutFailure = () : ReduxAction => ({
  type: POST_LOGOUT_FAIL,
})

// ----- NOTE Exported Redux Thunk action
export const postLogout = () =>
  async (dispatch : Dispatch) => {
    dispatch(requestLogout());
    try {
      const result = await UserService.postLogout();
      const { status, msg } = result;

      if (status === 'FAILURE') throw new Error(msg);
      dispatch(receiveLogoutSuccess())
    } catch (error) {
      dispatch(receiveLogoutFailure());
      dispatch(enqueueSnackActionCreator({
        message: error.message,
        options: {
          variant: 'error'
        }
      }))
    }
  }
