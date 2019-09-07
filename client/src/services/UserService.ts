import axios from '../axios';
import { AxiosResponse } from 'axios';

import AxiosService from './AxiosService';

import { AsyncServiceReturn } from '../types';
import { postLoginReq, postUserReq } from '../../../types';



const { parseError, parseResponse } = AxiosService

const postNewUser = async (reqObj: postUserReq ): Promise<AsyncServiceReturn> => {
  try {
    // TODO make it check which keys are missing
    const inputCheck = Object.entries(reqObj).some(val => val[1] === "");
    if (inputCheck === true) throw new Error('Error: execpting values for inputs')


    const response : AxiosResponse<any> = await axios.post('/user/register', reqObj);

    return parseResponse(response)
  } catch (error) {
    return parseError(error);
  }
}


// TODO add something to unpack Axios responses
const postLogin = async (reqObj: postLoginReq): Promise<AsyncServiceReturn> => {
  const inputCheck = Object.values(reqObj).some(val => val === "");
  if (inputCheck === true) throw new Error('Error: execpting values for inputs')
  try {
    const response : AxiosResponse<any> = await axios.post('/user/login', reqObj);
    return parseResponse(response)
  } catch (error) {
    return parseError(error);
  }
}

const postLogout =  async (): Promise<AsyncServiceReturn> => {
  try {
    const response = await axios.post('/user/logout');
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

const UserService = {
  postLogin,
  postLogout,
  postNewUser
};


export default UserService;