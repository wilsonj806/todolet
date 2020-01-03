import { Dispatch } from 'redux';

import UserService from '../services/UserService';

// ----- NOTE TypeScript types(client and server)
import {
  AsyncUserUpdateAction,
  UserStoreShape,
} from '../types';
import { postUserReq, userDataResponse, errorResponse } from '../../server/types';


// ----- NOTE Exported Action types
export const PUT_USER_INIT = 'PUT_USER_INIT';
export const PUT_USER_FAIL = 'PUT_USER_FAIL';
export const PUT_USER_SUCCESS = 'PUT_USER_SUCCESS';


// ----- NOTE Registration action creators
const requestUserUpdate = () : AsyncUserUpdateAction => ({
  type: PUT_USER_INIT,
})

export const receiveUserUpdateSuccess = (json: userDataResponse): AsyncUserUpdateAction => ({
  type: PUT_USER_SUCCESS,
  payload: json,
});

const receiveUserUpdateFailure = (json: errorResponse): AsyncUserUpdateAction => ({
  type: PUT_USER_FAIL,
  payload: json,
});

// ----- NOTE Exported Redux Thunk action
export const putUser= (request: any, userId: string): any => {
  return async (dispatch: Dispatch): Promise<void> => {
    dispatch(requestUserUpdate());
    try {
      const result = await UserService.putUser(request, userId);

      const { status } = result;

      if (status === 'FAILURE') {
        const { msg } = result;
        throw new Error(msg);
      }
      dispatch(receiveUserUpdateSuccess(result.payload));
    } catch (error) {
      dispatch(receiveUserUpdateFailure(error.message));
    }
  };
};
