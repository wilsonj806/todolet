import User from '../../models/user'
import Todo from '../../models/todo'
import { requestMock, responseMock } from './mocks/mockReqRes';

import { postNewTodo, getUsersTodos } from '../middleware/todoMiddleware';

describe('A middleware function for posting new todos', () => {
  let res;
  const next = jest.fn();
  const regex = /^(Error\:)/;
  // FIXME setting req.user.attributes isn't great, it's implementation details
  const user = {
    _id: [1, 2, 3 ,4],
    username: 'guest'
  };

  beforeAll(() => {
    res = responseMock();
  });

  test('it should call the database and post it', () => {
    // Setup the request with the Todo
    // Add a todo entry and a priority entry
    const req = requestMock({}, {
      todo: 'hello',
      priority: 'high'
    });
    req.user = user;

    const spy = jest.spyOn(Todo, 'create');
    postNewTodo(req, res, next);
    expect(spy).toHaveBeenCalled();
  })

  test('it should send a response with an error if it failed', () => {
    const req = requestMock({}, {
      todo: 'hello',
      priority: 'high'
    });
    req.user = user;


    jest.spyOn(Todo, 'create')
      .mockImplementation(() => {
        throw new Error('mock err')
      });
    postNewTodo(req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
  })

  test('it should call the next middleware function in the stack', async (done) => {
    const req = requestMock({}, {
      todo: 'hello',
      priority: 'high'
    });
    req.user = user;


    jest.spyOn(Todo, 'create')
      .mockReturnValue(true as any);
    await postNewTodo(req, res, next);
    expect(next).toHaveBeenCalled();
    done();
  })
})

describe('A middleware function for getting all todos for a user', () => {
  let res;
  const next = jest.fn();
  const regex = /^(Error\:)/;
  // FIXME setting req.user.attributes isn't great, it's implementation details
  const user = {
    _id: [1, 2, 3 ,4],
    username: 'guest',
    todos: ['333','444']
  };

  beforeAll(() => {
    res = responseMock();
  });
  test('it should call the user db', async (done) => {
    const req = requestMock();
    req.user = user;

    const spy = jest.spyOn(User, 'findById');

    await getUsersTodos(req, res, next);

    expect(spy).toHaveBeenCalled();
    done()
  })

  test('it should call the todos db', async (done) => {
    const req = requestMock();
    req.user = user;

    jest.spyOn(User, 'findById')
      .mockImplementation(() => user as any);
    const spy = jest.spyOn(Todo, 'find');

    await getUsersTodos(req, res, next);

    expect(spy).toHaveBeenCalled();
    done();
  })

  test('it should send an HTTP response with a 200 status code', async (done) => {
    const req = requestMock();
    req.user = user;

  jest.spyOn(User, 'findById')
    .mockImplementation(() => user as any);
  jest.spyOn(Todo, 'find')
    .mockImplementation(() => [] as any);

    await getUsersTodos(req, res, next);
    expect(res.status).toHaveBeenCalledWith(200)
    done();
  })

  test('it should send an HTTP response with the todos', async (done) => {
    const req = requestMock();
    req.user = user;

    await getUsersTodos(req, res, next);
    expect(res.json).toHaveBeenCalled()
    done();
  })

  test('it should send an error response if it failed', () => {

  })
})