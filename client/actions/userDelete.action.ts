import { Dispatch } from 'redux';

import UserService from '../services/UserService';
import { enqueueSnackActionCreator } from './notifications.action'

// ----- NOTE TypeScript types(client and server)
import {
  ReduxAction,
} from '../types';
import { errorResponse } from '../../server/types';


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

const receiveDeleteUserFailure = () : ReduxAction => ({
  type: DELETE_USER_FAIL,
})

// ----- NOTE Exported Redux Thunk action
export const deleteUser = () =>
  async (dispatch : Dispatch) => {
    dispatch(requestDeleteUser());
    try {
      const result = await UserService.deleteUser();
      const { status, msg } = result;

      if (status === 'FAILURE') throw new Error(msg);
      dispatch(receiveDeleteUserSuccess())
    } catch (error) {
      dispatch(receiveDeleteUserFailure());
      dispatch(enqueueSnackActionCreator({
        message: error.message,
        options: {
          variant: 'error'
        }
      }));
    }
  }
