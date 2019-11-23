import User from '../../models/user'
import Todo from '../../models/todo'
import { requestMock, responseMock } from './mocks/mockReqRes';

import { postNewTodo, getUsersTodo } from '../middleware/todoMiddleware';

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
    const spy = jest.spyOn(Todo, 'create');
    postNewTodo(req, res, next);
    expect(spy).toHaveBeenCalled();
  })

  test('it should send a response with an error if it failed', () => {

    expect(res.status).toHaveBeenCalledWith(500);
  })

  test('it should call the next middleware function in the stack', () => {
    expect(next).toHaveBeenCalled()
  })
})

describe('A middleware function for getting all todos for a user', () => {
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
  test('it should call the user db', () => {
    const spy = jest.spyOn(User, 'findById');
  })

  test('it should loop over the list of todos depending on the length of the user\'s todo array', () => {
    const spy = jest.spyOn(Todo, 'findById')

    expect(spy).toHaveBeenCalledTimes(6666666666);
  })

  test('it should send an HTTP response with the todos', () => {


    expect(res.json).toHaveBeenCalled()
  })

  test('it should send an error response if it failed', () => {

  })
})