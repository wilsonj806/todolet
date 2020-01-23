/**
 * ANCHOR Unit Tests for User Registration middleware
 * =============================================================
 * - It's all blackbox testing, mostly tries to stub dependent modules
 * - All test suites check to make sure error responses are consistent!
 * - Test suites for:
 *   - checkFormError()
 *   - findUserWithUsername()
 *   - postRegisterFailure()
 */
import { requestMock, responseMock } from './mocks/mockReqRes';
import User from '../../models/user';

import {
  findUserWithUsername,
  postRegisterFailure,
} from '../middleware/userRegistrationMiddleware';


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


  it('should call the next middleware function if there\'s no matching user',
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
  it('should return an error response with JSON if there is a matching user',
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

  it('should return a response with JSON if there is a database error',
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

  it('should send a response starting with "Error":', async (done) => {
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

describe('A middleware function for sending a response when login fails', () => {
  let res;
  const next = jest.fn();
  const err = new Error('mock error');
  const regex = /^(Error\:)/;

  beforeAll(() => {
    res = responseMock();
  });

  it('should return a json response with a message, and HTTP status code', () => {
    const req = requestMock();

    postRegisterFailure(err, req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        msg: expect.any(String),
      })
    );
  });

  it('should call the next middleware function in the stack', () => {
    const req = requestMock();

    postRegisterFailure(err, req, res, next);

    expect(next).toHaveBeenCalled();
  });

});