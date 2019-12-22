import { postLoginReq, postUserReq } from '../../server/types';
import { AsyncServiceReturn, ServiceSuccessObject, ServiceFailObject } from '../types';
import { AxiosResponse } from 'axios';

const parseResponse = (response : AxiosResponse<any>) : ServiceSuccessObject => {
  const { data, status } = response;
  // NOTE Rename data to payload as a conversion from "server data" to "client data"
  const { msg } = data;

  const test = /^(4|5)/;
  const statusStr = status.toString(10);
  if (test.test(statusStr) === true) {
    // TODO check if there's an array of errors
    throw new Error(msg)
  }
  return data.data ? { payload: data.data, status: 'SUCCESS' } : { status: 'SUCCESS' }
}

const parseError = (error : any) : ServiceFailObject => ({ msg: error.message, status: 'FAILURE' })

const AxiosService = {
  parseResponse,
  parseError
};


export default AxiosService;