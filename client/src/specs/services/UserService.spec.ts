import MockAdapter from 'axios-mock-adapter';
import axios from '../../axios';

import UserService from '../../services/UserService';


const mock = new MockAdapter(axios);
describe('A service function for registering a new user', () => {
  const endpoint = '/user/register';

  afterEach(() => {
    // remove all onPost/ onGet/ etc handlers
    mock.reset();
  })

  test('it should throw if required fields are missing', () => {
    const reqObj = {
      username: 'guest',
      password: 'wasd',
      password2: ''
    };

    const response = async () => await UserService.postLogin(reqObj)
    expect(response()).rejects.toThrow()
  })
test('it should return an obect with the user id if it succeeded', async (done) => {
    const reqObj = {
      username: 'guest',
      password: 'wasd',
      password2: 'wasd'
    };

    const mockResponse = {
      msg: 'testing',
      data: {
        userId: 'ID here',
        username: 'guest'
      }
    };
    mock.onPost(endpoint).reply(
      200,
      { payload: reqObj }
    );

    const response = await UserService.postNewUser(reqObj);

    expect(response).toStrictEqual({payload:reqObj, status: 'SUCCESS'})
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
    mock.onPost(endpoint).reply(
      400,
      mockResponse
    );

    const response = await UserService.postNewUser(reqObj);
    expect(response).toStrictEqual(
      expect.objectContaining({
        msg: expect.any(String),
        status: expect.any(String)
      })
    )
    done();

  })
  test('it should return an error object if it failed with a 5** error', async (done) => {
    const reqObj = {
      username: 'guest',
      password: 'your mom'
    };

    const mockResponse = {
      msg: 'testing failure',
    }
    mock.onPost(endpoint).reply(
      500,
      mockResponse
    );

    const response = await UserService.postNewUser(reqObj);
    expect(response).toStrictEqual(
      expect.objectContaining({
        msg: expect.any(String),
        status: expect.any(String),
      })
    )
    done();
  })

})



describe('A service function for logging a client in', () => {
  const endpoint = '/user/login'

  afterEach(() => {
    // remove all onPost/ onGet/ etc handlers
    mock.reset();
  })


  test('it should throw if required fields are missing', async (done) => {
    const reqObj = {
      username: 'guest',
      password: ''
    };
    // NOTE need to ensure that the assertion block expects a Promise rejection
    const response = async () => await UserService.postLogin(reqObj)
    expect(response()).rejects.toThrow()
    done()
  })
  test('it should return an obect with the user id if it succeeded', async (done) => {
    const reqObj = {
      username: 'guest',
      password: 'wasd'
    };

    const mockResponse = {
      msg: 'testing',
      payload: reqObj
    };

    mock.onPost(endpoint).reply(
      200,
      mockResponse
    );

    const response = await UserService.postLogin(reqObj);

    expect(response).toStrictEqual({
      ...mockResponse,
      status: 'SUCCESS'
    })
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
    mock.onPost(endpoint).reply(
      400,
      mockResponse
    );

    const response = await UserService.postLogin(reqObj);
    expect(response).toStrictEqual(
      expect.objectContaining({
        msg: expect.any(String),
        status: expect.any(String),
      })
    )
    done();

  })
  test('it should return an error object if it failed with a 5** error', async (done) => {
    const reqObj = {
      username: 'guest',
      password: 'your mom'
    };

    const mockResponse = {
      msg: 'testing failure',
    }

    mock.onPost(endpoint).reply(
      500,
      mockResponse
    );

    const response = await UserService.postLogin(reqObj);
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