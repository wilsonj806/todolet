import axios from '../axios';
import { responseObj } from '../../../types/server';

const UserService: any = {};

// TODO add something to unpack Axios responses
UserService.postLogin = async (reqObj: any): Promise<any> => {
  try {
    const response : any = await axios.post('/user/login', reqObj);
    console.log(response.status);
    if (response.status !== 200) throw new Error(response.msg);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
}

export default UserService;