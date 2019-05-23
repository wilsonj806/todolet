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
} from '../routes/middleware/userMiddleware';
const { validationResult } = validator;
const middleware = jest.requireActual('../routes/middleware/userMiddleware');
const mockReqRes = jest.requireActual('./mocks/mockReqRes');
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

describe('checkFormError middleware function for checking the form for errors', () => {
  beforeEach(()=> {

  });

  test('it should send a response if it failed', () => {
    const req = mockReqRes.requestMock({}, {
      username: 'guest',
      password: undefined,
      password2: undefined,
      potato: 'potato'
    });
    req._validationErrors = [{location: 'username'}];
    const res = mockReqRes.responseMock();
    const next = jest.fn(()=> 'success');

    checkFormErrors(req, res, next);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalled();
  });

  test('it should go to the next middleware function if there are no issues', () => {
    const req = mockReqRes.requestMock({}, {
      username: 'guest',
      password: undefined,
      password2: undefined,
      potato: 'potato'
    });
    req._validationErrors = []
    const res = mockReqRes.responseMock();
    const next = jest.fn(()=> 'success');

    checkFormErrors(req, res, next);
    expect(next).toHaveBeenCalled();
  });
});

// describe('postNewUser middleware function', () => {
//   beforeEach(() => jest.setTimeout(10000))
// test('it should call bcrypt', async (done) => {
//     try{
//       jest.mock('bcryptjs');
//       const req = requestMock({}, { username: 'guest', password: undefined, password2: undefined, potato: 'potato' });
//       const res = responseMock();
//       const next = () => 'success';
//       await postNewUser(req, res, next);
//       expect(bCrypt.genSalt).resolves.toHaveBeenCalled();
//       expect(bCrypt.hash).resolves.toHaveBeenCalled();
//       done();
//     } catch (error) {
//       done();
//       console.error(error);
//     }
//   });
// })