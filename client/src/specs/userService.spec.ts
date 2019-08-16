import MockAdapter from 'axios-mock-adapter';
import axios from '../axios';

import UserService from '../services/UserService';


describe('A service function for logging a client in', () => {
  const mock = new MockAdapter(axios);

  afterEach(() => {
    // remove all onPost/ onGet/ etc handlers
    mock.restore();
  })

  test('it should return an obect with the user id if it succeeded', async (done) => {
    const reqObj = {
      username: 'guest',
      password: 'wasd'
    };
    mock.onPost('/user/login').reply(
      200,
      {
        msg: 'testing',
        data: {
          _id: 'ID here',
          username: 'guest'
        }
    });

    const response = await UserService.postLogin(reqObj);

    expect(response).toBe(
      expect.objectContaining({
        msg: expect.any(String),
        data: expect.objectContaining({
          _id: expect.any(String),
          username: expect.any(String)
        })
      })
    )
    done();

  })

  test('it should return an error object if it failed', async (done) => {
    const reqObj = {
      username: 'guest',
      password: 'your mom'
    };
    mock.onPost('/user/login').reply(
      400,
      {
        msg: 'testing failure',
        errors: 'mock failure'
    });

    const response = await UserService.postLogin(reqObj);

    expect(response).toBe(
      expect.objectContaining({
        msg: expect.any(String),
        errors: expect.anything()
      })
    )
    done();
  })
})

export {}