import User from '../models/user'
import { responseMock, requestMock } from "./mocks/mockReqRes";
import { IUserObj } from '../types';

import putUser from '../routes/middleware/userUpdateMiddleware'

describe('A middleware function for updating a user', () => {
  let res;
  const next = jest.fn();
  const regex = /^(Error\:)/;
  // FIXME setting req.user.attributes isn't great, it's implementation details
  const user = {
    _id: [1, 2, 3 ,4],
    username: 'guest'
  };

  jest.spyOn(User, 'findById')
    .mockImplementation(() => user as any)

  beforeAll(() => {
    res = responseMock();
  });

  test.skip('it should error out if there are incorrect fields', async (done) => {
    const req = requestMock();
    req.user = {};
    req.user._doc = { ...user };
    req.body = { mamba: 'wod' }
    await putUser(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400)
    done()
  })

  test('it should try to update the user', async (done) => {
    const spy = jest.spyOn(User, 'findOneAndUpdate')
      .mockImplementation(() => user as any)

    const req = requestMock();
    req.user = {};
    req.user._doc = { ...user };
    await putUser(req, res, next);

    expect(spy).toHaveBeenCalled()
    done()
  })

  test('it should send an error response if it fails', async (done) => {
    const testMsg = 'test error'
    jest.spyOn(User, 'findOneAndUpdate')
      .mockImplementation(() => { throw new Error(testMsg)})
    const req = requestMock();
    req.user = {};
    req.user._doc = { ...user };
    await putUser(req, res, next);

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.json).toHaveBeenCalledWith({ msg: 'test error' })
    done()
  })

  test('it should send a success response with a 200 HTTP code if it suceeds', async (done) => {
    const req = requestMock();
    req.user = {};
    req.user._doc = {...user};

    jest.spyOn(User, 'findOneAndUpdate')
      .mockImplementation(() => 'test user updated' as any)

    await putUser(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    done()
  })

  test('it should send a success response with json if it suceeds', async (done) => {
    const req = requestMock();
    req.user = {};
    req.user._doc = { ...user };

    jest.spyOn(User, 'findOneAndUpdate')
      .mockImplementation((arg1, arg2) => 'test user updated' as any)

    await putUser(req, res, next);

    expect(res.json).toHaveBeenCalled();
    done()
  })
})