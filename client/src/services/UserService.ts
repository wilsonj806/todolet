import axios from '../axios';
import { postLoginReq, postUserReq } from '../../../types';
import { AsyncServiceReturn } from '../types';
import { AxiosResponse } from 'axios';

const UserService: any = {};

UserService.postNewUser = async (reqObj: postUserReq ): Promise<AsyncServiceReturn> => {
  try {
    // TODO make it check which keys are missing
    const inputCheck = Object.entries(reqObj).some(val => val[1] === "");
    if (inputCheck === true) throw new Error('Error: execpting values for inputs')


    const response : AxiosResponse<any> = await axios.post('/user/register', reqObj);
    const { data } = response;
    const { data: payload, msg } = data;

    const test = /^(4|5)/;
    const status = response.status.toString(10);
    if (test.test(status) === true) {
      // TODO check if there's an array of errors
      throw new Error(msg)
    }

    return { payload, status: 'SUCCESS' };
  } catch (error) {
    return { msg: error.message, status: 'FAILURE' };
  }
}


// TODO add something to unpack Axios responses
UserService.postLogin = async (reqObj: postLoginReq): Promise<AsyncServiceReturn> => {
  const inputCheck = Object.values(reqObj).some(val => val === "");
  if (inputCheck === true) throw new Error('Error: execpting values for inputs')
  try {
    const response : AxiosResponse<any> = await axios.post('/user/login', reqObj);
    const { data } = response;
    const { data: payload, msg } = data;

    const test = /^(4|5)/;
    const status = response.status.toString(10);
    if (test.test(status) === true) throw new Error(msg);

    return { payload, status: 'SUCCESS' };
  } catch (error) {
    return { msg: error.message, status: 'FAILURE' };
  }
}

export default UserService;