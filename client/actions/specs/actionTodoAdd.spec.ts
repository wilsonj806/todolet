import thunk from 'redux-thunk';
import configureMockStore from '@jedmao/redux-mock-store';import MockAdapter from 'axios-mock-adapter';


import {
  postNewTodo,
  POST_TODO_INIT,
  POST_TODO_FAIL,
  POST_TODO_SUCCESS,
} from '../todoAdd.action';
import { PUT_USER_SUCCESS } from '../userUpdate.action';
import { ENQUEUE_SNACKBAR } from '../notifications.action';
import axios from '../../axios';

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

  const mockTodo = {todo: 'hi', priority: 'High'};
  const mockSuccess = { msg: 'hi', todos: [], authorizedUser: initUser };
  const mockError = new Error('hi');
  const mockCallbackArr = [
    jest.fn(),
    jest.fn(),
  ]

  it('dispatches an action signifying that a Post Todo dispatch has been initiated', async (done) => {
    const store = mockStore({ selectedUser: {}});
    const expectedActions = [
      { type: POST_TODO_INIT },
      { type: POST_TODO_SUCCESS, payload: [],  },
      { type: PUT_USER_SUCCESS, payload: initUser },
    ]
    // NOTE not trying to mock what mongoose returns, that's pretty intense
    mock.onPost(endpoint).reply(
      200,
      mockSuccess
    );
    // TODO add a mock Todo object
    await store.dispatch<any>(postNewTodo(mockTodo, mockCallbackArr))

    expect(store.getActions()).toStrictEqual(expectedActions);
    done()
  })

  it('dispatches a todo success with a response object if the action succeeded', async (done) => {
    const store = mockStore({ selectedUser: {}});
    const expectedActions = [
      { type: POST_TODO_INIT },
      // TODO add the actual payload in
      { type: POST_TODO_SUCCESS, payload: [] },
      { type: PUT_USER_SUCCESS, payload: initUser },
    ]

    mock.onPost(endpoint).reply(
      200,
      mockSuccess
    );

    await store.dispatch<any>(postNewTodo(mockTodo, mockCallbackArr))

    expect(store.getActions()).toStrictEqual(expectedActions);
    done()
  })

  it('dispatches a todo failure with a response object if the action failed', async (done) => {
    const store = mockStore({ selectedUser: {}});
    const expectedActions = [
      { type: POST_TODO_INIT },
      { type: POST_TODO_FAIL },
      { type: ENQUEUE_SNACKBAR, payload: { }}
    ]

    mock.onPost(endpoint).reply(
      400,

      { errors: mockError.message }
    );

    await store.dispatch<any>(postNewTodo(mockTodo, mockCallbackArr))

    const actions = store.getActions();
    expect(store.getActions().length).toBe(3);
    expect(actions[expectedActions.length - 1]).toStrictEqual(
      expect.objectContaining({
        type: expect.stringMatching(ENQUEUE_SNACKBAR),
        payload: expect.anything()
      })
    )
    done()
  })
})