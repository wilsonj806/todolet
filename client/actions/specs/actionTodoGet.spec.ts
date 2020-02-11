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
import { ENQUEUE_SNACKBAR } from '../notifications.action';

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
  const updatedUser = {...initUser, todos: ['hh'] };
  const mockSuccess = { msg: 'hi', todos: ['hh'], authorizedUser: updatedUser };
  const mockError = new Error('hi');

  it('dispatches an action signifying that a Post Todo dispatch has been initiated', async (done) => {
    const store = mockStore<any>({ selectedUser: initUser });
    const expectedActions = [
      { type: GET_TODOS_INIT },
      { type: GET_TODOS_SUCCESS, payload: ['hh'],  },
      { type: PUT_USER_SUCCESS, payload: updatedUser }
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

  it('dispatches a todo success with a response object if the action succeeded', async (done) => {
    const store = mockStore<any>({ selectedUser: initUser });
    const expectedActions = [
      { type: GET_TODOS_INIT },
      // TODO add the actual payload in
      { type: GET_TODOS_SUCCESS, payload: ['hh'] },
      { type: PUT_USER_SUCCESS, payload: updatedUser }
    ]

    mock.onGet(endpoint).reply(
      200,
      mockSuccess
    );

    await store.dispatch<any>(getAllTodos())

    expect(store.getActions()).toStrictEqual(expectedActions);
    done()
  })

  it('dispatches a todo failure with a response object if the action failed', async (done) => {
    const store = mockStore<any>({ selectedUser: initUser });
    const expectedActions = [
      { type: GET_TODOS_INIT },
      { type: GET_TODOS_FAIL },
      { type: ENQUEUE_SNACKBAR, payload: { }}
    ]

    mock.onGet(endpoint).reply(
      400,

      { errors: mockError.message }
    );

    await store.dispatch<any>(getAllTodos())
    const actions = store.getActions();
    expect(actions.length).toBe(3);
    expect(actions[expectedActions.length - 1]).toStrictEqual(
      expect.objectContaining({
        type: expect.stringMatching(ENQUEUE_SNACKBAR),
        payload: expect.anything()
      })
    )
    done()
  })
})