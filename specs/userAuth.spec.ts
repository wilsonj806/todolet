/**
 * ANCHOR Unit Tests for User Authorization middleware
 * =============================================================
 * - Test suites for:
 *   - postLogin()
 *   - postLoginFail()
 *   - getLogout()
 *
 * TODO
 * =============================================================
 *
 */

import { requestMock, responseMock } from './mocks/mockReqRes';

import {
  postLogin,
  postLoginFail,
  getLogout,
} from '../routes/middleware/userAuthMiddleware';


/**
 * ANCHOR Unit tests
 * =============================================================
 *  - Note, an integration test/ AB test for PassportJS will be needed at some point
 */

describe('A middleware function for sending a response when login succeeds', () => {
  let res;
  const next = jest.fn();
  const regex = /^(Error\:)/;
  const user = {
    _id: 42,
    username: 'guest'
  };

  beforeAll(() => {
    res = responseMock();
  });

  test('it should return a json response with a message and HTTP status code', () => {
    const req = requestMock();
    req.user = user;

    postLogin(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalled();
  });

  test('it should return a json response with the user info', () => {
    const req = requestMock();
    req.user = user;

    postLogin(req, res, next);

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        msg: expect.any(String),
        data: expect.objectContaining({
          _id: expect.anything(),
          username: expect.any(String)
        })
      })
    );
  });

  test('it should call the next middleware function in the stack', () => {
    const req = requestMock();
    req.user = user;

    postLogin(req, res, next);

    expect(next).toHaveBeenCalled();
  });
});

/*
 * ---------- TODO expand this test suite, why'd login fail and etc
 * - add something for checking for form errors
*/
describe('A middleware function for sending a response when login fails', () => {
  let res;
  const next = jest.fn();
  const err = new Error('mock error');
  const regex = /^(Error\:)/;

  beforeAll(() => {
    res = responseMock();
  });

  test('it should return a json response with a message and HTTP status code', () => {
    const req = requestMock();

    postLoginFail(err, req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        msg: expect.any(String),
      })
    );
  });

  test('it should call the next middleware function in the stack', () => {
    const req = requestMock();

    postLoginFail(err, req, res, next);

    expect(next).toHaveBeenCalled();
  });

});


describe('A middleware function for completing a logout request', () => {
  let res;
  const next = jest.fn();
  const req = requestMock();
  const regex = /^(Error\:)/;

  beforeAll(() => {
    res = responseMock();
  });

  test('it should call a function or method for logging out', () => {
    getLogout(req, res, next);

    expect(req.logout).toHaveBeenCalled();
  });

  test('it should return a json response with a message and HTTP status code', () => {
    getLogout(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        msg: expect.any(String),
      })
    );
  });

  test('it should call the next middleware function in the stack', () => {
    getLogout(req, res, next);

    expect(next).toHaveBeenCalled();
  });
});
