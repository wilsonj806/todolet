import axios from '../axios';

import { AxiosResponse } from 'axios';


import AxiosService from './AxiosService';
import FormService from './FormService';

import { postTodoReq } from '../../server/types'
import { TodoShape, PriorityTypes } from '../types';

const { validateForm } = FormService;
const { parseError, parseResponse } = AxiosService


const endpointPrefix = '/api/todo';

// TODO unify JSON response so it complies with JSON API specs
// TODO Fix *any* typecasting

const postTodo = async (reqObj: postTodoReq) => {
  // validate input
  try {
    validateForm<postTodoReq>(reqObj);
    const response : AxiosResponse<any> | any = await axios.post(endpointPrefix, reqObj);
    if (response.data.errors) {
      throw new Error(response.data.errors)
    }
    const { todos, authorizedUser } = response.data;
    return [ todos, authorizedUser ];
  } catch (error) {
    throw error
  }
}

const getTodos = async () => {
  try {
    const response : AxiosResponse<any> | any = await axios.get(endpointPrefix);
    // console.log(response);
    if (response.data.errors) {
      throw new Error(response.data.errors)
    }
    const { todos, authorizedUser } = response.data;
    return [ todos, authorizedUser ];
  } catch (error) {
    throw error
  }
}
/**
 * Update todo flow:
 * - User actions:
 *  - click on the checkbox
 *  - checkbox triggers a click handler
 *  - click handler builds the input params for updating a todo(need current todo and the updated fields)
 *  - it'd look like: handleClick = (todo, todosList) => (event) => dispatch(updateTodo(todo)(updatedValue))
 *  - where updatedValue gets constructed on the fly and todo is an input for composability
 *  - the action gets triggered and then calls whatever it needs to call for it to work
 *  - the backend updates the Todo and triggers a UI action
 *  - UI finds the index of the updated Todo and creates a new Array with the updated Todo to replace the now stale Todo list
 *
 */
// NOTE this function doesn't need to be curried as it's not intended to be composed
const updateTodo = async <T extends { [key in keyof TodoShape] ?: any },>(todo : TodoShape, updatedValue: T) => {
  try {
    const uri = endpointPrefix + '/' + todo._id;
    const reqObj = {
      originalTodo: todo,
      updatedValue: updatedValue
    };

    const response : AxiosResponse<any> | any = await axios.put(uri, reqObj);
    if (response.data.errors) {
      throw new Error(response.data.errors)
    }

    const { updatedTodo }: { updatedTodo: TodoShape } = response.data;
    return updatedTodo;
  } catch (error) {
    throw error;
  }
}

const deleteTodo = async (todoId: string) => {
  try {
    const uri = endpointPrefix + '/' + todoId;
    const response : AxiosResponse<any> | any = await axios.delete(uri);
    if (response.data.errors) {
      throw new Error(response.data.errors)
    }

    const { todos, authorizedUser } = response.data;
    return [ todos, authorizedUser ];
  } catch (error) {
    throw error;
  }
}
const TodoService = {
  postTodo,
  getTodos,
  updateTodo,
  deleteTodo
}

export default TodoService;