import thunk from 'redux-thunk';
import configureMockStore from '@jedmao/redux-mock-store';import MockAdapter from 'axios-mock-adapter';


import {
  postNewUser,
  POST_REGISTER_INIT,
  POST_REGISTER_FAIL,
  POST_REGISTER_SUCCESS,
} from '../userRegistration.action';
import axios from '../../axios';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
// Replace with Rosiejs factories
const user = {
  username: 'guest',
  password: 'wasd',
  password2: 'wasd',
  email: 'guest@guest.com'
}

const mock = new MockAdapter(axios);

describe('An action creator that handles async user registration', () => {
  afterEach(() => mock.reset())
  const endpoint = '/api/user/register'

  it('dispatches an action signifying that a Registration dispatch has been initiated', async (done) => {
    const store = mockStore({ selectedUser: {}});
    const expectedActions = [
      { type: POST_REGISTER_INIT },
      // FIXME ideally don't have to put this in manually
      { type: POST_REGISTER_SUCCESS, payload: user,  }
    ]
    // NOTE not trying to mock what mongoose returns, that's pretty intense
    mock.onPost(endpoint).reply(
      200,
      { msg: 'hi', data: user }
    );
    await store.dispatch<any>(postNewUser(user))

    expect(store.getActions()).toStrictEqual(expectedActions);
    done()
  })

  it('dispatches a registration success with a response object if the action succeeded', async (done) => {
    const store = mockStore({ selectedUser: {}});
    const expectedActions = [
      { type: POST_REGISTER_INIT },
      { type: POST_REGISTER_SUCCESS, payload: user }
    ]

    mock.onPost(endpoint).reply(
      200,
      { msg: 'hi', data: user }
    );

    await store.dispatch<any>(postNewUser(user))

    expect(store.getActions()).toStrictEqual(expectedActions);
    done()
  })

  it('dispatches a registration failure with a response object if the action failed', async (done) => {
    const store = mockStore({ selectedUser: {}});
    const expectedActions = [
      { type: POST_REGISTER_INIT },
      { type: POST_REGISTER_FAIL, payload: 'hi' }
    ]

    mock.onPost(endpoint).reply(
      400,
      { msg: 'hi', error: user }
    );

    await store.dispatch<any>(postNewUser(user))
    expect(store.getActions()).toStrictEqual(expectedActions);
    done()
  })
})