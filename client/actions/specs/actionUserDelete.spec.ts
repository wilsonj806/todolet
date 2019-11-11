import thunk from 'redux-thunk';
import configureMockStore from '@jedmao/redux-mock-store';
import MockAdapter from 'axios-mock-adapter';


import {
  deleteUser,
  DELETE_USER_INIT,
  DELETE_USER_FAIL,
  DELETE_USER_SUCCESS,
} from '../userDelete.action';
import axios from '../../axios';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const mock = new MockAdapter(axios);

const endpoint = '/api/user/delete';

describe('An action creator that handles async user delete', () => {
  afterEach(() => mock.reset())

  test('it dispatches an action signifying that a Delete User dispatch has been initiated', async (done) => {
    const store = mockStore({ selectedUser: {}});
    const expectedActions = [
      { type: DELETE_USER_INIT },
      // FIXME ideally don't have to put this in manually
      { type: DELETE_USER_SUCCESS }
    ]
    // NOTE not trying to mock what mongoose returns, that's pretty intense
    mock.onDelete(endpoint).reply(
      200,
      { msg: 'hi' }
    );
    await store.dispatch<any>(deleteUser())

    expect(store.getActions()).toStrictEqual(expectedActions);
    done()
  })

  test('it dispatches a Delete User success with a response object if the action succeeded', async (done) => {
    const store = mockStore({ selectedUser: {}});
    const expectedActions = [
      { type: DELETE_USER_INIT },
      { type: DELETE_USER_SUCCESS }
    ]

    mock.onDelete(endpoint).reply(
      200,
      { msg: 'hi' }
    );

    await store.dispatch<any>(deleteUser())

    expect(store.getActions()).toStrictEqual(expectedActions);
    done()
  })

  test('it dispatches a Delete user failure with a response object if the action failed', async (done) => {
    const store = mockStore({ selectedUser: {}});
    const expectedActions = [
      { type: DELETE_USER_INIT },
      { type: DELETE_USER_FAIL, payload: 'hi' }
    ]

    mock.onDelete(endpoint).reply(
      400,
      { msg: 'hi' }
    );

    await store.dispatch<any>(deleteUser())
    expect(store.getActions()).toStrictEqual(expectedActions);
    done()
  })
})

export {}