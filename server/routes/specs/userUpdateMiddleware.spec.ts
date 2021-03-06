import User from '../../models/user'
import { responseMock, requestMock } from "./mocks/mockReqRes";
import { IUserObj } from '../../types';

import { putUser, updateUserTodos, deleteSingleUserTodo } from '../middleware/userUpdateMiddleware'
import { NEW_TODO } from '../middleware/todoMiddleware';

describe('A middleware function for updating a user', () => {
  let res;
  const next = jest.fn();
  const regex = /^(Error\:)/;
  // FIXME setting req.user.attributes isn't great, it's implementation details
  const user = {
    _id: '1239oij',
    username: 'guest'
  };

  beforeAll(() => {
    res = responseMock();
  });

  it.skip('should error out if there are incorrect fields', async (done) => {
    const req = requestMock();
    req.user = {};
    req.user._doc = { ...user };
    req.body = { mamba: 'wod' }
    await putUser(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400)
    done()
  })

  it('should try to update the user', async (done) => {
    expect.assertions(1);
    const spy = jest.spyOn(User, 'update')
      .mockImplementation((): any => Promise.resolve(user as any))

    const req = requestMock();
    req.user = {...user};
    req.user._doc = { ...user };
    req.body = { username: 'guest2'};
    await putUser(req, res, next);

    expect(spy).toHaveBeenCalled()
    done()
  })

  it('should send an error response if it fails', async (done) => {
    const testMsg = 'test error'
    jest.spyOn(User, 'update')
      .mockImplementation(() => { throw new Error(testMsg)})
    const req = requestMock();
    req.user = {...user};
    req.user._doc = { ...user };
    await putUser(req, res, next);

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.json).toHaveBeenCalledWith({ msg: 'test error' })
    done()
  })

  it('should send a success response with a 200 HTTP code if it suceeds', async (done) => {
    const req = requestMock();
    req.user = {};
    req.user._doc = {...user};

    jest.spyOn(User, 'update')
      .mockImplementation(() => 'test user updated' as any)

    await putUser(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    done()
  })

  it('should send a success response with json if it suceeds', async (done) => {
    const req = requestMock();
    req.user = {};
    req.user._doc = { ...user };

    jest.spyOn(User, 'update')
      .mockImplementation((arg1, arg2) => [2,{password: ''}] as any)

    await putUser(req, res, next);

    expect(res.json).toHaveBeenCalled();
    done()
  })
})
