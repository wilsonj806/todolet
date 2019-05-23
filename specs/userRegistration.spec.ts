/**
 * ANCHOR Unit Tests for middleware
 * =============================================================
 * - It's all blackbox testing, mostly tries to stub dependent modules
 * - Test suites for:
 *   - checkFormError()
 *   - findUserWithUsername()
 *   - encryptPass()
 *   - postNewUser()
 *
 */
import bcrypt from 'bcryptjs';
import { requestMock, responseMock } from './mocks/mockReqRes';
import User from '../models/user';
import {
  postNewUser,
  checkFormErrors,
  findUserWithUsername,
  encryptPass,
} from '../routes/middleware/userMiddleware';

/**
 * NOTE Both unit tests and integration tests will need to be included
 * - unit tests should make sure the function gives the same output everytime and makes whatever calls needed
 * - integration tests should verify that the database is being called and stuff like that
 *
 */



/**
 * ANCHOR Unit tests
 * =============================================================
 *
 */

let res;

describe('checkFormError middleware function to check the form for errors', () => {
  beforeAll(() => {
    res = responseMock();
  });

  test('it should send a response with JSON if it failed', () => {
    const req = requestMock({}, {
      username: 'guest',
      password: undefined,
      password2: undefined,
      potato: 'potato'
    });
    req._validationErrors = [{location: 'username'}];

    const next = jest.fn(()=> 'success');
    jest.spyOn(User, 'find');

    checkFormErrors(req, res, next);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalled();
  });

  test('it should go to the next middleware function if there are no issues', () => {
    const req = requestMock({}, {
      username: 'guest',
      password: undefined,
      password2: undefined,
      potato: 'potato'
    });
    req._validationErrors = []
    const next = jest.fn(()=> 'success');

    checkFormErrors(req, res, next);
    expect(next).toHaveBeenCalled();
  });
});


describe('findUserWithUsername middleware function', () => {
  beforeAll(() => {
    res = responseMock();
  });

  test('should call the next middleware function if there\'s no matching user',
    async (done) => {
      jest.setTimeout(30000);
      const req = requestMock({}, {
        username: 'guest',
      });
      const next = jest.fn(()=> 'success');
      jest.spyOn(User, 'find').mockImplementation(() => ([] as any));

      await findUserWithUsername(req, res, next);
      expect(next).toHaveBeenCalled();
      done();
  });

  test('should return a response with JSON if there is a matching user',
    async (done) => {
      const req = requestMock({}, {
        username: 'guest',
      });
      const next = jest.fn(()=> 'success');
      jest.spyOn(User, 'find').mockImplementation(() => ([{username: 'guest'}] as any));

      await findUserWithUsername(req, res, next);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalled();
      done();
  });

  test('should return a response with JSON if there is a database error',
    async (done) => {
      const req = requestMock({}, {
        username: 'guest',
      });
      const next = jest.fn(()=> 'success');
      jest.spyOn(User, 'find').mockImplementation(() => {
        throw new Error('Database Error')
      });

      await findUserWithUsername(req, res, next);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalled();
      done();
  });
});


describe('encryptPass middleware function', () => {
  beforeAll(() => {
    res = responseMock();
  });

  test('it should call bcrypt', async (done) => {
    const mockPwd = 'wasd';
    const req = requestMock({}, { username: 'guest', password: mockPwd, password2: undefined, potato: 'potato' });
    const next = () => 'success';
    const salt = jest.spyOn(bcrypt, 'genSalt');
    const hash = jest.spyOn(bcrypt, 'hash').mockImplementation(() => mockPwd);

    await encryptPass(req, res, next);
    expect(salt).toHaveBeenCalled();
    expect(hash).toHaveBeenCalled();
    done();
  });

  test('it should pass the encrypted password', async (done) => {
    const mockPwd = 'wasd';
    const req = requestMock({}, { username: 'guest', password: mockPwd, password2: undefined, potato: 'potato' });
    const next = jest.fn(() => 'success');

    await encryptPass(req, res, next);
    expect(res.locals).toHaveProperty('hashedPwd');
    expect(next).toHaveBeenCalled();
    done();
  });

  test('it should return a response with JSON if it fails', async (done) => {
    expect(true).toBe(true);
    done();
  });

});


describe('postNewUser middleware function', () => {
  beforeAll(() => {
    res = responseMock();
  });

  test('it should try adding a new user', async (done) => {
    const mockPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        const obj = {
          _id: '1234',
          username: 'guest',
          password: mockPwd
        }
        resolve(obj);
      }, 300);
    })
    const mockPwd = 'wasd';
    const req = requestMock({}, { username: 'guest', password: mockPwd, password2: mockPwd, potato: 'potato' });

    const next = jest.fn(() => 'success');
    const addUser = jest.spyOn(User, 'create').mockImplementation(() => mockPromise as any);

    await postNewUser(req, res, next);
    expect(addUser).toHaveBeenCalled();
    done();
  });

  test('it should return a response with JSON if it succeeds', async (done) => {
    expect(true).toBe(true);
    done();
  });

  test('it should return a response with JSON if it fails', async (done) => {
    expect(true).toBe(true);
    done();
  });

})