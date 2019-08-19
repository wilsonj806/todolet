/**
 * ANCHOR Unit Tests for User Registration middleware
 * =============================================================
 * - It's all blackbox testing, mostly tries to stub dependent modules
 * - All test suites check to make sure error responses are consistent!
 * - Test suites for:
 *   - checkFormError()
 *   - findUserWithUsername()
 *   - encryptPass()
 *   - postNewUser()
 *
 * NOTE Both unit tests and integration tests will need to be included
 * =============================================================
 *  - unit tests should make sure the function gives the same output everytime and makes whatever calls needed
 *  - integration tests should verify that the database is being called and stuff like that
 *
 * TODO
 * =============================================================
 *  - test to make sure that the postNewUser() middleware function sends back a response with user data
 *
 */
import bcrypt from 'bcryptjs';
import { requestMock, responseMock } from './mocks/mockReqRes';
import User from '../models/user';

import {
  postNewUser,
  findUserWithUsername,
  encryptPass,
} from '../routes/middleware/userRegistrationMiddleware';


/**
 * ANCHOR Unit tests
 * =============================================================
 *
 */


describe('A middleware function to query the database to see if there\'s a matching username', () => {
  let res;
  const next = jest.fn();
  const regex = /^(Error\:)/;

  beforeAll(() => {
    res = responseMock();
  });


  test('it should call the next middleware function if there\'s no matching user',
    async (done) => {
      const req = requestMock({}, {
        username: 'guest',
      });

      jest.spyOn(User, 'find').mockImplementation(() => ([] as any));

      await findUserWithUsername(req, res, next);

      expect(next).toHaveBeenCalled();
      done();
  });

  // FIXME make this test more comprehensive/ make it fail if the error message doesn't say there was a matching user
  test('it should return an error response with JSON if there is a matching user',
    async (done) => {
      const regex = /username:(?=.*\bexists\b)(?=.*\balready\b)/i
      const req = requestMock({}, {
        username: 'guest',
      });

      jest.spyOn(User, 'find').mockImplementation(() => ([{username: 'guest'}] as any));

      await findUserWithUsername(req, res, next);


      // const existTest = existsRegex.test(res.mockJson.msg);
      // const userTest = userRegex.test(res.mockJson.msg);
      // const regexTest = existTest && userTest;
      const regexTest = regex.test(res.mockJson.msg);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalled();
      expect(regexTest).toBe(true);
      done();
  });

  test('it should return a response with JSON if there is a database error',
    async (done) => {
      const req = requestMock({}, {
        username: 'guest',
      });

      jest.spyOn(console, 'error').mockImplementation(() => null);
      jest.spyOn(User, 'find').mockImplementation(() => {
        throw new Error('Database Error')
      });

      await findUserWithUsername(req, res, next);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          msg: expect.any(String),
        })
      );
      done();
  });

  test('it should send a response starting with "Error":', async (done) => {
    const req = requestMock({}, {
      username: 'guest',
      password: undefined,
      password2: undefined,
      potato: 'potato'
    });

    jest.spyOn(console, 'error').mockImplementation(() => null);
    jest.spyOn(User, 'find').mockImplementation(() => {
      throw new Error('Database Error')
    });

    await findUserWithUsername(req, res, next);

    const regexTest = regex.test(res.mockJson.msg);
    expect(regexTest).toBe(true);
    done();
  });
});


describe('A middleware function that encrypts a requested password', () => {
  let res;
  const next = jest.fn();
  const regex = /^(Error\:)/;

  beforeEach(() => {
    /**
     * NOTE Setup notes:
     * - restore spies to their original state
     *   - also means spies will call through to the original method
     * - reset the mock response
     * - reset the next() middleware function
     */
    jest.restoreAllMocks();
    res = responseMock();
  });


  // NOTE this is more of an integration test
  test('it should call bcrypt', async (done) => {
    const mockPwd = 'wasd';
    const req = requestMock({}, { username: 'guest', password: mockPwd, password2: undefined, potato: 'potato' });

    const salt = jest.spyOn(bcrypt, 'genSalt');
    const hash = jest.spyOn(bcrypt, 'hash').mockImplementation(() => {
      return mockPwd;
    });

    await encryptPass(req, res, next);

    expect(salt).toHaveBeenCalled();
    expect(hash).toHaveBeenCalled();
    done();
  });

  test('it should pass the password to the next middleware function', async (done) => {
    const mockPwd = 'waaaasd';
    const req = requestMock({}, { username: 'guest', password: mockPwd, password2: undefined, potato: 'potato' });

    jest.spyOn(bcrypt, 'hash').mockImplementation(() => {
      return mockPwd;
    });

    await encryptPass(req, res, next);

    expect(res.locals).toHaveProperty('hashedPwd');
    expect(res.locals.hashedPwd).not.toBe(null);
    expect(next).toHaveBeenCalled();
    done();
  });

  // NOTE this test is expected to run slower than most tests(duration > 50ms)
  test('it should encrypt the password', async (done) => {
    const mockPwd = 'welcome';
    const req = requestMock({}, { username: 'guest', password: mockPwd, password2: undefined, potato: 'potato' });

    await encryptPass(req, res, next);

    expect(res.locals.hashedPwd).not.toEqual(mockPwd);
    expect(next).toHaveBeenCalled();
    done();
  });

  test('it should return a response with JSON if it fails', async (done) => {
    const mockPwd = 'wasd';
    const req = requestMock({}, { username: 'guest', password: mockPwd, password2: undefined, potato: 'potato' });

    jest.spyOn(bcrypt, 'genSalt').mockImplementation(() => {
      throw new Error('mock error')
    });
    jest.spyOn(console, 'error').mockImplementation(() => null);

    await encryptPass(req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          msg: expect.any(String),
        })
    );
    done();
  });

  test('it should send a response starting with "Error":', async (done) => {
    jest.setTimeout(5000);
    const mockPwd = 'waaaasd';
    const req = requestMock({}, { username: 'guest', password: mockPwd, password2: undefined, potato: 'potato' });
    jest.spyOn(bcrypt, 'genSalt').mockImplementation(() => {
      throw new Error('mock error')
    });
    jest.spyOn(console, 'error').mockImplementation(() => null);

    await encryptPass(req, res, next);

    const regexTest = regex.test(res.mockJson.msg);
    expect(regexTest).toBe(true);
    done();
  });

});


describe('A middleware function that adds a user to the database', () => {
  let res;
  const next = jest.fn();
  const regex = /^(Error\:)/;

  beforeAll(() => {
    res = responseMock();
  });

  test('it should try fetching the encrypted password', async (done) => {
    const mockUser = 'guest';
    const mockPwd = 'aaaaaaaaaaaaaaa';
    const mockPromise = new Promise((resolve, reject) => {
      setTimeout(() => resolve('User add success'), 20);
    })
    res.locals.hashedPwd = mockPwd;
    const req = requestMock({}, { username: mockUser });

    const spy = jest.spyOn(User, 'create').mockImplementation(() => mockPromise as any);

    await postNewUser(req, res, next);
    expect(spy).toHaveBeenCalledWith({
      username: mockUser,
      password: res.locals.hashedPwd
    });
    done();
  });

  test('it should try adding a new user', async (done) => {
    const mockPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        const obj = {
          _id: '1234',
          username: 'guest',
          password: mockPwd
        };
        resolve(obj);
      }, 20);
    })
    const mockPwd = 'wasd';
    const req = requestMock({}, { username: 'guest', password: mockPwd, password2: mockPwd, potato: 'potato' });

    const addUser = jest.spyOn(User, 'create').mockImplementation(() => mockPromise as any);

    await postNewUser(req, res, next);

    expect(addUser).toHaveBeenCalled();
    done();
  });

  test('it should return a response with JSON if it succeeds', async (done) => {
    const mockUser = 'guest';
    const mockPwd = 'aaaaaaaaaaaaaa';
    const mockPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        const obj = {
          _id: '1234',
          username: mockUser,
          password: mockPwd
        }
        resolve(obj);
      }, 20);
    })
    res.locals.hashedPwd = mockPwd;
    const req = requestMock({}, { username: mockUser });

    jest.spyOn(User, 'create').mockImplementation(() => mockPromise as any);

    await postNewUser(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        msg: expect.any(String),
        data: expect.objectContaining({
          _id: expect.anything(),
          username: expect.any(String)
        })
      })
    );
    done();
  });

  test('it should return a response with JSON if it fails', async (done) => {
    const mockUser = 'guest';
    const mockPwd = 'aaaaaaaaaaaaaa';
    const mockPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(new Error('mock error msg'));
      }, 20);
    });
    res.locals.hashedPwd = mockPwd;
    const req = requestMock({}, { username: mockUser });

    jest.spyOn(User, 'create').mockImplementation(() => mockPromise as any);
    jest.spyOn(console, 'error').mockImplementation(() => null);

    await postNewUser(req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        msg: expect.any(String),
      })
    );
    done();
  });

  test('it should send a response starting with "Error:" if it fails', async (done) => {
    const mockUser = 'guest';
    const mockPwd = 'aaaaaaaaaaaaaa';
    const mockPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(new Error('mock error msg'));
      }, 20);
    });
    res.locals.hashedPwd = mockPwd;
    const req = requestMock({}, { username: mockUser });

    jest.spyOn(User, 'create').mockImplementation(() => mockPromise as any);
    jest.spyOn(console, 'error').mockImplementation(() => null);

    await postNewUser(req, res, next);

    const regexTest = regex.test(res.mockJson.msg);
    expect(regexTest).toBe(true);
    done();
  });
});
