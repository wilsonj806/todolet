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
    const spy = jest.spyOn(User, 'findByIdAndUpdate')
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
    jest.spyOn(User, 'findByIdAndUpdate')
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

    jest.spyOn(User, 'findByIdAndUpdate')
      .mockImplementation(() => 'test user updated' as any)

    await putUser(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    done()
  })

  it('should send a success response with json if it suceeds', async (done) => {
    const req = requestMock();
    req.user = {};
    req.user._doc = { ...user };

    jest.spyOn(User, 'findByIdAndUpdate')
      .mockImplementation((arg1, arg2) => 'test user updated' as any)

    await putUser(req, res, next);

    expect(res.json).toHaveBeenCalled();
    done()
  })
})


describe('A middleware function for adding new todos to a user', () => {
  let res;
  const next = jest.fn();
  const regex = /^(Error\:)/;
  // FIXME setting req.user.attributes isn't great, it's implementation details
  let user;
  const init = {
    _id: '1239oij',
    username: 'guest',
    todos: []
  };

  beforeAll(() => {
    res = responseMock();
    user = {...init};
  });

  it('calls the database to update the user document', async (done) => {
    const req = requestMock();
    req.user = {...init};
    res.locals = {}
    res.locals[NEW_TODO] = '333333';
    const spy = jest.spyOn(User, 'findByIdAndUpdate')

    await updateUserTodos(req, res, next);

    expect(spy).toHaveBeenCalled();
    done()
  })


  it('calls next if user update is successful', async (done) => {
    const req = requestMock();
    req.user = {...init};
    res.locals = {}
    res.locals[NEW_TODO] = '333333';
    jest.spyOn(User, 'findByIdAndUpdate').mockImplementation(() => ({...init}) as any)

    await updateUserTodos(req, res, next);

    expect(next).toHaveBeenCalled();
    done()
  })

  it('sends a response if it failed', async (done) => {
    const req = requestMock();
    req.user = {...init};
    res.locals = {}
    res.locals[NEW_TODO] = '333333';
    jest.spyOn(User, 'findByIdAndUpdate').mockImplementation(() => {throw new Error('fail')})
    await updateUserTodos(req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    done()
  })
})

describe('A middleware function for deleting a todo from a user', () => {
  let res;
  const next = jest.fn();
  const regex = /^(Error\:)/;
  // FIXME setting req.user.attributes isn't great, it's implementation details
  let user;
  const init = {
    _id: '1239oij',
    username: 'guest',
    todos: ['11111']
  };

  beforeAll(() => {
    res = responseMock();
    user = {...init};
  });

  it('calls the database to update the user document', async (done) => {
    const req = requestMock();
    req.user = {...init};
    req.params = { todoId : '11111' }
    const spy = jest.spyOn(User, 'findByIdAndUpdate')

    await deleteSingleUserTodo(req, res, next);

    expect(spy).toHaveBeenCalled();
    done()
  })


  it('calls next if user update is successful', async (done) => {
    const req = requestMock();
    req.user = {...init};
    req.params = { todoId : '11111' }
    jest.spyOn(User, 'findByIdAndUpdate').mockImplementation(() => ({...init}) as any)

    await deleteSingleUserTodo(req, res, next);

    expect(next).toHaveBeenCalled();
    done()
  })

  it('sends a response if it failed', async (done) => {
    const req = requestMock();
    req.user = {...init};
    req.params = { todoId : '11111' }
    jest.spyOn(User, 'findByIdAndUpdate').mockImplementation(() => {throw new Error('fail')})
    await deleteSingleUserTodo(req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    done()
  })
})