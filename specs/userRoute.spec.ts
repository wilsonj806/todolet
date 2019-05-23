/**
 * ANCHOR Unit tests and Integration tests for the User Route
 * =======================================================================
 *
 */
import bcrypt from 'bcryptjs';
import { requestMock, responseMock } from './mocks/mockReqRes';
import * as validator from 'express-validator/check';
import User from '../models/user';
import {
  postNewUser,
  getOneUser,
  postLogin,
  postLoginFail,
  getLogout,
  checkFormErrors,
  findUserWithUsername,
} from '../routes/middleware/userMiddleware';
const { validationResult } = validator;
/**
 * NOTE Both unit tests and integration tests will need to be included
 * - unit tests should make sure the function gives the same output everytime and makes whatever calls needed
 * - integration tests should verify that the database is being called and stuff like that
 *
 * NOTE `validationResult` and `bCrypt` need mocking
 *
 */
/**
 * ANCHOR Unit Tests for middleware
 * =============================================================
 * - It's all blackbox testing, ignores internals, ignores any dependencies and network calls
 *
 */

describe('checkFormError middleware function to check the form for errors', () => {
  beforeEach(()=> {

  });

  test('it should send a response with JSON if it failed', () => {
    const req = requestMock({}, {
      username: 'guest',
      password: undefined,
      password2: undefined,
      potato: 'potato'
    });
    req._validationErrors = [{location: 'username'}];
    const res = responseMock();
    const next = jest.fn(()=> 'success');
    const spy = jest.spyOn(User, 'find');
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
    const res = responseMock();
    const next = jest.fn(()=> 'success');

    checkFormErrors(req, res, next);
    expect(next).toHaveBeenCalled();
  });
});

describe('findUserWithUsername middleware function', () => {
  test('should call the next middleware function if there\'s no matching user',
    async (done) => {
      jest.setTimeout(30000);
      const req = requestMock({}, {
        username: 'guest',
      });
      const res = responseMock();
      const next = jest.fn(()=> 'success');
      jest.spyOn(User, 'find').mockImplementation(() => ([] as any));

      await findUserWithUsername(req, res, next);
      expect(next).toHaveBeenCalled();
      done();
  });

  test('should return a response with JSON if there is a matching user',
    async (done) => {
      jest.setTimeout(30000);
      const req = requestMock({}, {
        username: 'guest',
      });
      const res = responseMock();
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
      const res = responseMock();
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

describe('postNewUser middleware function', () => {
  beforeEach(() => jest.setTimeout(10000))
  test('it should call bcrypt', async (done) => {
    jest.mock('bcryptjs');
    const req = requestMock({}, { username: 'guest', password: undefined, password2: undefined, potato: 'potato' });
    const res = responseMock();
    const next = () => 'success';
    const salt = jest.spyOn(bcrypt, 'genSalt');
    const hash = jest.spyOn(bcrypt, 'hash');
    await postNewUser(req, res, next);
    expect(salt).toHaveBeenCalled();
    expect(hash).toHaveBeenCalled();
    done();
  });
})