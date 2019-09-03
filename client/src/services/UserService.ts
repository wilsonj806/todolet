import axios from '../axios';
import { responseObj, postLoginReq, postUserReq } from '../../../types';

const UserService: any = {};

UserService.postNewUser = async (reqObj: postUserReq ): Promise<any> => {
  try {
    // TODO make it check which keys are missing
    const inputCheck = Object.entries(reqObj).some(val => val[1] === "");
    if (inputCheck === true) throw new Error('Error: execpting values for inputs')


    const response : any = await axios.post('/user/register', reqObj);
    const { data } = response;

    const test = /^(4|5)/;
    const status = response.status.toString(10);
    if (test.test(status) === true) {
      // TODO check if there's an array of errors
      throw new Error(data.msg)
    }

    const { payload: userData } = data;
    return { payload: userData, status: 'SUCCESS' };
  } catch (error) {
    return { msg: error.message, status: 'FAILURE' };
  }
}


// TODO add something to unpack Axios responses
UserService.postLogin = async (reqObj: postLoginReq): Promise<any> => {
  const inputCheck = Object.values(reqObj).some(val => val === "");
  if (inputCheck === true) throw new Error('Error: execpting values for inputs')
  try {
    const response : any = await axios.post('/user/login', reqObj);
    const { data } = response;
    const test = /^(4|5)/;
    const status = response.status.toString(10);
    if (test.test(status) === true) throw new Error(response.msg);
    return { ...data, status: 'SUCCESS' };
  } catch (error) {
    return { msg: error.message, status: 'FAILURE' };
  }
}

export default UserService;