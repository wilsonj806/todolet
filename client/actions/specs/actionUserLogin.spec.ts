import thunk from 'redux-thunk';
import configureMockStore from '@jedmao/redux-mock-store';
import MockAdapter from 'axios-mock-adapter';


import {
  postLogin,
  POST_LOGIN_INIT,
  POST_LOGIN_FAIL,
  POST_LOGIN_SUCCESS,
} from '../userLogin.action';
import { ENQUEUE_SNACKBAR } from '../notifications.action';

import axios from '../../axios';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const mock = new MockAdapter(axios);

const user = {
  username: 'guest',
  password: 'wasd',
}

const userFail = {
  username: 'guest',
  password: 'wasdaaa',
}

const endpoint = '/api/user/login';

describe('An action creator that handles async user login', () => {
  afterEach(() => mock.reset())

  it('dispatches an action signifying that a Login dispatch has been initiated', async (done) => {
    const store = mockStore({ selectedUser: {}});
    const expectedActions = [
      { type: POST_LOGIN_INIT },
      // FIXME ideally don't have to put this in manually
      { type: POST_LOGIN_SUCCESS, payload: user,  }
    ]
    // NOTE not trying to mock what mongoose returns, that's pretty intense
    mock.onPost(endpoint).reply(
      200,
      { msg: 'hi', data: user }
    );
    await store.dispatch<any>(postLogin(user))

    expect(store.getActions()).toStrictEqual(expectedActions);
    done()
  })

  it('dispatches a Login success with a response object if the action succeeded', async (done) => {
    const store = mockStore({ selectedUser: {}});
    const expectedActions = [
      { type: POST_LOGIN_INIT },
      { type: POST_LOGIN_SUCCESS, payload: user }
    ]

    mock.onPost(endpoint).reply(
      200,
      { msg: 'hi', data: user }
    );

    await store.dispatch<any>(postLogin(user))

    expect(store.getActions()).toStrictEqual(expectedActions);
    done()
  })

  it('dispatches a Login failure with a response object if the action failed', async (done) => {
    const store = mockStore({ selectedUser: {}});
    const expectedActions = [
      { type: POST_LOGIN_INIT },
      { type: POST_LOGIN_FAIL },
      { type: ENQUEUE_SNACKBAR, payload: { }}
    ]

    mock.onPost(endpoint).reply(
      400,
      { msg: 'hi', error: user }
    );

    await store.dispatch<any>(postLogin(user))
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

export {}