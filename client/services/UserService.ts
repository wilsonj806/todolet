import axios from '../axios';
import { AxiosResponse } from 'axios';

import AxiosService from './AxiosService';
import FormService from './FormService';

import { AsyncServiceReturn } from '../types';
import { postLoginReq, postUserReq } from '../../server/types';

const endpointPrefix = '/api/user';

const { validateForm, validatePasswordFields } = FormService;
const { parseError, parseResponse } = AxiosService

const postNewUser = async (reqObj: postUserReq ): Promise<AsyncServiceReturn> => {
  try {
    // NOTE this method checks which keys are missing and throws an error that lists said missing keys
    validateForm(reqObj);
    // Checks that both password fields match
    validatePasswordFields(reqObj);

    const response : AxiosResponse<any> = await axios.post(endpointPrefix + '/register', reqObj);

    return parseResponse(response)
  } catch (error) {
    return parseError(error);
  }
}


// TODO add something to unpack Axios responses
const postLogin = async (reqObj: postLoginReq): Promise<AsyncServiceReturn> => {
  try {
    // NOTE this method checks which keys are missing and throws an error that lists said missing keys
    validateForm(reqObj);
    const response : AxiosResponse<any> = await axios.post(endpointPrefix + '/login', reqObj);
    return parseResponse(response)
  } catch (error) {
    return parseError(error);
  }
}

const postGuest = async (): Promise<AsyncServiceReturn> => {
  try {
    // NOTE this method checks which keys are missing and throws an error that lists said missing keys
    const response : AxiosResponse<any> = await axios.post(endpointPrefix + '/guest', { username: 'wasd', password: 'wasd'});
    return parseResponse(response)
  } catch (error) {
    return parseError(error);
  }
}

const postLogout =  async (): Promise<AsyncServiceReturn> => {
  try {
    const response = await axios.post(endpointPrefix + '/logout');
    const { data } = response;
    const { msg } = data;

    const test = /^(4|5)/;
    const status = response.status.toString(10);
    if (test.test(status) === true) throw new Error(msg);

    return { msg, status: 'SUCCESS'}
  } catch (error) {
    return parseError(error);
  }
}


const putUser = async (reqObj: any, userId: string) => {
  try {
    validateForm(reqObj);
    const response : AxiosResponse<any> = await axios.put(endpointPrefix + '/' + userId, reqObj)

    return parseResponse(response)
  } catch (error) {
    return parseError(error)
  }
}


const deleteUser = async (): Promise<AsyncServiceReturn> => {
  try {
    const response = await axios.delete(endpointPrefix + '/delete')
    return parseResponse(response)
  } catch (error) {
    return parseError(error)
  }
}


const UserService = {
  postLogin,
  postGuest,
  postLogout,
  postNewUser,
  deleteUser,
  putUser,
};


export default UserService;