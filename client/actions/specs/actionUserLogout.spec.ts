import thunk from 'redux-thunk';
import configureMockStore from '@jedmao/redux-mock-store';
import MockAdapter from 'axios-mock-adapter';


import {
  postLogout,
  POST_LOGOUT_INIT,
  POST_LOGOUT_FAIL,
  POST_LOGOUT_SUCCESS,
} from '../userLogout.action';
import { ENQUEUE_SNACKBAR } from '../notifications.action';

import axios from '../../axios';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const mock = new MockAdapter(axios);

const endpoint = '/api/user/logout';

describe('An action creator that handles async user logout', () => {
  afterEach(() => mock.reset())

  it('dispatches an action signifying that a Logout dispatch has been initiated', async (done) => {
    const store = mockStore({ selectedUser: {}});
    const expectedActions = [
      { type: POST_LOGOUT_INIT },
      // FIXME ideally don't have to put this in manually
      { type: POST_LOGOUT_SUCCESS }
    ]
    // NOTE not trying to mock what mongoose returns, that's pretty intense
    mock.onPost(endpoint).reply(
      200,
      { msg: 'hi' }
    );
    await store.dispatch<any>(postLogout())

    expect(store.getActions()).toStrictEqual(expectedActions);
    done()
  })

  it('dispatches a Logout success with a response object if the action succeeded', async (done) => {
    const store = mockStore({ selectedUser: {}});
    const expectedActions = [
      { type: POST_LOGOUT_INIT },
      { type: POST_LOGOUT_SUCCESS }
    ]

    mock.onPost(endpoint).reply(
      200,
      { msg: 'hi' }
    );

    await store.dispatch<any>(postLogout())

    expect(store.getActions()).toStrictEqual(expectedActions);
    done()
  })

  it('dispatches a Logout failure with a response object if the action failed', async (done) => {
    const store = mockStore({ selectedUser: {}});
    const expectedActions = [
      { type: POST_LOGOUT_INIT },
      { type: POST_LOGOUT_FAIL },
      { type: ENQUEUE_SNACKBAR, payload: { }}
    ]

    mock.onPost(endpoint).reply(
      400,
      { msg: 'hi' }
    );

    await store.dispatch<any>(postLogout())
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