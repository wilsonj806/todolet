import thunk from 'redux-thunk';
import configureMockStore from '@jedmao/redux-mock-store';
import MockAdapter from 'axios-mock-adapter';


import {
  putUser,
  PUT_USER_INIT,
  PUT_USER_FAIL,
  PUT_USER_SUCCESS,
} from '../userUpdate.action';
import axios from '../../axios';

import { StoreShape } from '../../types/index'
import { DeepPartial } from 'redux';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const mock = new MockAdapter(axios);


const updateData = {
  projectFilters: [
    'tag1', 'tag2'
  ]
}

const user = {
  userId: '1111',
  username: 'guest',
  password: 'wasd',
}

const userFail = {
  username: 'guest',
  password: 'wasdaaa',
}

const updatedUser = Object.assign({}, user, updateData)

const initState : DeepPartial<StoreShape> = { authorizedUser: { ...user }}

const endpoint = '/user/' + user.userId;

describe('An action creator that handles async user login', () => {
  afterEach(() => {
    mock.reset()

  })

  test('it dispatches an action signifying that a User Update dispatch has been initiated', async (done) => {
    const store = mockStore(initState);
    const expectedActions = [
      { type: PUT_USER_INIT },
      // FIXME ideally don't have to put this in manually
      { type: PUT_USER_SUCCESS, payload: user,  }
    ]
    // NOTE not trying to mock what mongoose returns, that's pretty intense
    mock.onPost(endpoint).reply(
      200,
      { msg: 'hi', data: updatedUser }
    );
    await store.dispatch<any>(putUser(updateData))

    expect(store.getActions()).toStrictEqual(expectedActions);
    done()
  })

  test('it dispatches a User Update success with a response object if the action succeeded', async (done) => {
    const store = mockStore(initState);
    const expectedActions = [
      { type: PUT_USER_INIT },
      { type: PUT_USER_SUCCESS, payload: updatedUser }
    ]

    mock.onPost(endpoint).reply(
      200,
      { msg: 'hi', data: updatedUser }
    );

    await store.dispatch<any>(putUser(updateData))

    expect(store.getActions()).toStrictEqual(expectedActions);
    done()
  })

  test('it dispatches a User Update failure with a response object if the action failed', async (done) => {
    const store = mockStore(initState);
    const expectedActions = [
      { type: PUT_USER_INIT },
      { type: PUT_USER_FAIL, payload: 'hi' }
    ]

    mock.onPost(endpoint).reply(
      400,
      { msg: 'hi', error: user }
    );

    await store.dispatch<any>(putUser(updateData))
    expect(store.getActions()).toStrictEqual(expectedActions);
    done()
  })
})

export {}