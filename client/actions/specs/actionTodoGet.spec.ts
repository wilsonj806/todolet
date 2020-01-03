import thunk from 'redux-thunk';
import configureMockStore from '@jedmao/redux-mock-store';import MockAdapter from 'axios-mock-adapter';


import {
  getAllTodos,
  GET_TODOS_INIT,
  GET_TODOS_FAIL,
  GET_TODOS_SUCCESS,
} from '../todoGetAll.action';
import axios from '../../axios';
import { PUT_USER_SUCCESS } from '../userUpdate.action';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);


const mock = new MockAdapter(axios);

describe('An action creator that handles async todo addition', () => {
  afterEach(() => mock.reset())
  const endpoint = '/api/todo'
  const initUser = {
    username: 'guest',
    userId: 'aaaaa',
    todos: []
  }
  const mockSuccess = { msg: 'hi', todos: [], authorizedUser: initUser };
  const mockError = new Error('hi');

  test('it dispatches an action signifying that a Post Todo dispatch has been initiated', async (done) => {
    const store = mockStore({ selectedUser: {}});
    const expectedActions = [
      { type: GET_TODOS_INIT },
      { type: GET_TODOS_SUCCESS, payload: [],  },
      { type: PUT_USER_SUCCESS, payload: initUser }
    ]
    // NOTE not trying to mock what mongoose returns, that's pretty intense
    mock.onGet(endpoint).reply(
      200,
      mockSuccess
    );
    // TODO add a mock Todo object
    await store.dispatch<any>(getAllTodos())

    expect(store.getActions()).toStrictEqual(expectedActions);
    done()
  })

  test('it dispatches a todo success with a response object if the action succeeded', async (done) => {
    const store = mockStore({ selectedUser: {}});
    const expectedActions = [
      { type: GET_TODOS_INIT },
      // TODO add the actual payload in
      { type: GET_TODOS_SUCCESS, payload: [] },
      { type: PUT_USER_SUCCESS, payload: initUser }
    ]

    mock.onGet(endpoint).reply(
      200,
      mockSuccess
    );

    await store.dispatch<any>(getAllTodos())

    expect(store.getActions()).toStrictEqual(expectedActions);
    done()
  })

  test('it dispatches a todo failure with a response object if the action failed', async (done) => {
    const store = mockStore({ selectedUser: {}});
    const expectedActions = [
      { type: GET_TODOS_INIT },
      { type: GET_TODOS_FAIL, payload: mockError.message }
    ]

    mock.onGet(endpoint).reply(
      400,

      { errors: mockError.message }
    );

    await store.dispatch<any>(getAllTodos())
    expect(store.getActions()).toStrictEqual(expectedActions);
    done()
  })
})