import axios from '../axios';
import { responseObj, postLoginReq } from '../../../types/server';

const UserService: any = {};

// TODO add something to unpack Axios responses
UserService.postLogin = async (reqObj: postLoginReq): Promise<any> => {
  const inputCheck = Object.values(reqObj).some(val => val === "");
  if (inputCheck === true) throw new Error('Error: execpting values for inputs')
  try {
    const response : any = await axios.post('/user/login', reqObj);
    const test = /^(4|5)/;
    const status = response.status.toString(10);
    if (test.test(status) === true) throw new Error(response.msg);
    return response.data;
  } catch (error) {
    console.dir(error);
    const { response } = error;
    const { data, status } = response;
    return Object.assign({}, { ...data, status });
  }
}

export default UserService;