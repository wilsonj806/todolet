import axios from '../axios';

import { AxiosResponse } from 'axios';


import AxiosService from './AxiosService';
import FormService from './FormService';

import { postTodoReq } from '../../server/types'

const { validateForm } = FormService;
const { parseError, parseResponse } = AxiosService


const endpointPrefix = '/api/todo';

// TODO unify JSON response so it complies with JSON API specs

const postTodo = async (reqObj: postTodoReq) => {
  // validate input
  try {
    validateForm<postTodoReq>(reqObj);
    const response : AxiosResponse<any> = await axios.post(endpointPrefix, reqObj);

    if (response.data.msg) {
      throw new Error(response.data.msg)
    }

    return response.data.todos;
  } catch (error) {
    throw new Error( error )
  }
}

const getTodos = async () => {
  try {
    const response : AxiosResponse<any> = await axios.get(endpointPrefix);
    console.log(response);
    if (response.data.msg) {
      throw new Error(response.data.msg)
    }

    return response.data.todos;
  } catch (error) {
    throw new Error( error )
  }
}

const TodoService = {
  postTodo,
  getTodos
}

export default TodoService;