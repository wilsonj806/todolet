import MockAdapter from 'axios-mock-adapter';
import axios from '../../axios';

import UserService from '../../services/UserService';


describe('A service function for logging a client in', () => {
  const mock = new MockAdapter(axios);

  afterEach(() => {
    // remove all onPost/ onGet/ etc handlers
    mock.reset();
  })

  test('it should return an obect with the user id if it succeeded', async (done) => {
    const reqObj = {
      username: 'guest',
      password: 'wasd'
    };

    const mockResponse = {
      msg: 'testing',
      data: {
        _id: 'ID here',
        username: 'guest'
      }
    };

    mock.onPost('/user/login').reply(
      200,
      mockResponse
    );

    const response = await UserService.postLogin(reqObj);
    expect(response).toStrictEqual(
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

  test('it should return an error object if it failed with a 4** error', async (done) => {
    const reqObj = {
      username: 'guest',
      password: 'your mom'
    };

    const mockResponse = {
      msg: 'testing failure',
      errors: 'mock failure'
    }
    mock.onPost('/user/login').reply(
      400,
      mockResponse
    );

    const response = await UserService.postLogin(reqObj);
    expect(response).toStrictEqual(
      expect.objectContaining({
        msg: expect.any(String),
        status: expect.any(Number),
        errors: expect.anything()
      })
    )
    done();

  })
  test('it should return an error object if it failed with a 4** error', async (done) => {
    const reqObj = {
      username: 'guest',
      password: 'your mom'
    };

    const mockResponse = {
      msg: 'testing failure',
      errors: 'mock failure'
    }
    mock.onPost('/user/login').reply(
      400,
      mockResponse
    );

    const response = await UserService.postLogin(reqObj);
    expect(response).toStrictEqual(
      expect.objectContaining({
        msg: expect.any(String),
        status: expect.any(Number),
        errors: expect.anything()
      })
    )
    done();
  })
})

export {}