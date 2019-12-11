import thunk from 'redux-thunk';
import configureMockStore from '@jedmao/redux-mock-store';import MockAdapter from 'axios-mock-adapter';


import {
  postNewTodo,
  POST_TODO_INIT,
  POST_TODO_FAIL,
  POST_TODO_SUCCESS,
} from '../todoAdd.action';
import axios from '../../axios';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);


const mock = new MockAdapter(axios);

describe('An action creator that handles async todo addition', () => {
  afterEach(() => mock.reset())
  const endpoint = '/api/todo'
  const mockTodo = {todo: 'hi', priority: 'High'};
  const mockSuccess = { msg: 'hi', todos: [] };
  const mockError = new Error('hi');

  test('it dispatches an action signifying that a Post Todo dispatch has been initiated', async (done) => {
    const store = mockStore({ selectedUser: {}});
    const expectedActions = [
      { type: POST_TODO_INIT },
      { type: POST_TODO_SUCCESS, payload: [],  }
    ]
    // NOTE not trying to mock what mongoose returns, that's pretty intense
    mock.onPost(endpoint).reply(
      200,
      mockSuccess
    );
    // TODO add a mock Todo object
    await store.dispatch<any>(postNewTodo(mockTodo))

    expect(store.getActions()).toStrictEqual(expectedActions);
    done()
  })

  test('it dispatches a todo success with a response object if the action succeeded', async (done) => {
    const store = mockStore({ selectedUser: {}});
    const expectedActions = [
      { type: POST_TODO_INIT },
      // TODO add the actual payload in
      { type: POST_TODO_SUCCESS, payload: [] }
    ]

    mock.onPost(endpoint).reply(
      200,
      mockSuccess
    );

    await store.dispatch<any>(postNewTodo(mockTodo))

    expect(store.getActions()).toStrictEqual(expectedActions);
    done()
  })

  test('it dispatches a todo failure with a response object if the action failed', async (done) => {
    const store = mockStore({ selectedUser: {}});
    const expectedActions = [
      { type: POST_TODO_INIT },
      { type: POST_TODO_FAIL, payload: mockError.message }
    ]

    mock.onPost(endpoint).reply(
      400,

      { errors: mockError.message }
    );

    await store.dispatch<any>(postNewTodo(mockTodo))
    expect(store.getActions()).toStrictEqual(expectedActions);
    done()
  })
})