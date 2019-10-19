import MockAdapter from 'axios-mock-adapter';
import axios from '../../axios';

import UserService from '../UserService';

const mock = new MockAdapter(axios);

describe('A service function for updating a user', () => {
  const user = {
    userId: '111',
    username: 'guest',
    password: 'wasd',
  };

  const updateData = {
    projectFilters: [
      'tag1', 'tag2'
    ]
  }

  const updatedUser = Object.assign({}, user, updateData)

  const endpoint = '/api/user/' + user.userId;

  afterEach(() => mock.reset())


test('it should return an obect with the updated user info if it succeeded', async (done) => {

    mock.onPut(endpoint).reply(
      200,
      { data: updatedUser }
    );

    const response = await UserService.putUser(updateData, user.userId);

    expect(response).toStrictEqual({ payload:updatedUser, status: 'SUCCESS' })
    done();

  })

  test('it should return an error object if it failed with a 4** error', async (done) => {
    const reqObj = {
      username: 'guest',
      password: 'your mom'
    };

    const mockResponse = {
      msg: 'testing failure',
    }
    mock.onPut(endpoint).reply(
      400,
      mockResponse
    );

    const response = await UserService.putUser(updateData, user.userId);
    expect(response).toStrictEqual(
      expect.objectContaining({
        msg: expect.any(String),
        status: expect.any(String)
      })
    )
    done();

  })
  test('it should return an error object if it failed with a 5** error', async (done) => {
    const mockResponse = {
      msg: 'testing failure',
    }
    mock.onPut(endpoint).reply(
      500,
      mockResponse
    );

    const response = await UserService.putUser(updateData, user.userId);
    expect(response).toStrictEqual(
      expect.objectContaining({
        msg: expect.any(String),
        status: expect.any(String),
      })
    )
    done();
  })
})


describe('A service function for deleting a user', () => {
  const endpoint = '/api/user/delete';

  afterEach(() => mock.reset())

  test('it should return an obect with a status key if it succeeded', async (done) => {
    mock.onDelete(endpoint).reply(
      200,
      { msg: 'hi' }
    );

    const response = await UserService.deleteUser();

    expect(response).toStrictEqual({ status: 'SUCCESS' })
    done();
  })

  test('it should return an error object if it failed with a 5** error', async (done) => {
    const mockResponse = {
      msg: 'testing failure',
    }
    mock.onDelete(endpoint).reply(
      500,
      mockResponse
    );

    const response = await UserService.postLogout();
    expect(response).toStrictEqual(
      expect.objectContaining({
        msg: expect.any(String),
        status: expect.any(String),
      })
    )
    done();
  })

  test('it should return an error object if it failed with a 4** error', async (done) => {
    const mockResponse = {
      msg: 'testing failure',
    }
    mock.onDelete(endpoint).reply(
      400,
      mockResponse
    );

    const response = await UserService.postLogout();
    expect(response).toStrictEqual(
      expect.objectContaining({
        msg: expect.any(String),
        status: expect.any(String),
      })
    )
    done();
  })
})



export {}