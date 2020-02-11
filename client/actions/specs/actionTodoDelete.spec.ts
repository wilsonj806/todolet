import thunk from 'redux-thunk';
import configureMockStore from '@jedmao/redux-mock-store';import MockAdapter from 'axios-mock-adapter';


import {
  deleteTodo,
  DELETE_TODO_INIT,
  DELETE_TODO_FAIL,
  DELETE_TODO_SUCCESS,
} from '../todoDelete.action';
import { PUT_USER_SUCCESS } from '../userUpdate.action';
import { ENQUEUE_SNACKBAR } from '../notifications.action';

import axios from '../../axios';
import { PriorityTypes } from '../../types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);


const mock = new MockAdapter(axios);

describe('An action creator that handles async todo updates', () => {
  afterEach(() => mock.reset())
  const todoId = '111'
  const endpoint = '/api/todo/' + todoId
  const initUser = {
    username: 'guest',
    userId: 'aaaaa',
    todos: [todoId]
  }

  const updatedUser = {...initUser, todos: []}

  const mockUpdate = {
    todos: [],
    authorizedUser: updatedUser
  };
  const mockError = new Error('hi');

  it('dispatches an action signifying that an Update Todo dispatch has been initiated', async (done) => {
    done()
  })

  it('dispatches a todo success with a response object if the action succeeded', async (done) => {
    const store = mockStore({ selectedUser: {}});
    const expectedActions = [
      { type: DELETE_TODO_INIT },
      // TODO add the actual payload in
      { type: DELETE_TODO_SUCCESS, payload: [] },
      { type: PUT_USER_SUCCESS, payload: updatedUser }
    ]

    mock.onDelete(endpoint).reply(
      200,
      mockUpdate
    );

    await store.dispatch<any>(deleteTodo(todoId))

    expect(store.getActions()).toStrictEqual(expectedActions);
    done()
  })

  it('dispatches a todo failure with a response object if the action failed', async (done) => {
    const store = mockStore({ selectedUser: {}});
    const expectedActions = [
      { type: DELETE_TODO_INIT },
      { type: DELETE_TODO_FAIL },
      { type: ENQUEUE_SNACKBAR, payload: { }}
    ]

    mock.onDelete(endpoint).reply(
      400,
      { errors: mockError.message }
    );

    await store.dispatch<any>(deleteTodo(todoId))
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