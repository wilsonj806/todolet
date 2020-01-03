import MockAdapter from 'axios-mock-adapter';
import axios from '../../axios';

import TodoService from '../TodoService';

const { postTodo, getTodos } = TodoService;

const mock = new MockAdapter(axios);
const initUser = {
  username: 'guest',
  userId: 'aaaaa',
  todos: []
}

describe('A method for posting a new todo', () => {
  const endpoint = '/api/todo';
  const mockReq = {
    todo: 'hi',
    priority: 'Low'
  }


  afterEach(() => mock.reset())


  it('should call axios', () => {
    const spy = jest.spyOn(axios, 'post')
    postTodo(mockReq)
    expect(spy).toHaveBeenCalled()
  })

  it('should return the data included in the todos property', async (done) => {
    const mockData = {
      todos: [
        {todo: 'mock data'}
      ],
      authorizedUser: { ...initUser }
    }
    const assert = [
      mockData.todos,
      mockData.authorizedUser
    ]

    mock.onPost(endpoint)
      .reply(
        200,
        mockData
      )

    const res = await postTodo(mockReq)
    expect(res).toStrictEqual(assert);
    done()
  })

  it.skip('should return an error if the request fails', async (done) => {
    const mockResponse = {
      errors: 'testing failure',
    }
    const mockError = new Error(mockResponse.errors);

    mock.onPost(endpoint).reply(
      400,
      mockResponse
    );

    // const response = await postTodo(mockReq);
    await expect(() => postTodo(mockReq))
      .resolves
      .toThrow(mockError)
    done();
  })
})


describe('A method for getting all todos', () => {
  const endpoint = '/api/todo';
  afterEach(() => mock.reset())


  it('should call axios', () => {
    const spy = jest.spyOn(axios, 'get')
    getTodos()
    expect(spy).toHaveBeenCalled()
  })

  it('should return the data included in the todos property', async (done) => {
    const mockData = {
      todos: [{todo: 'mock data'}],
      authorizedUser: {...initUser}
    }
    const assert = [
      mockData.todos,
      mockData.authorizedUser
    ]

    mock.onGet(endpoint)
      .reply(
        200,
        mockData
      )

    const res = await getTodos()
    expect(res).toStrictEqual(assert);
    done()
  })

  it.skip('should return an error if the request fails', async (done) => {
    const mockResponse = {
      errors: 'testing failure',
    }
    mock.onGet(endpoint).reply(
      400,
      mockResponse
    );

    const response = await getTodos();
    expect(response).toBeFalsy()
    done();
  })
})