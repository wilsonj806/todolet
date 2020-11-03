import User from '../../models/user'
import Todo from '../../models/todo'
import { requestMock, responseMock } from './mocks/mockReqRes';

import { postNewTodo, getUsersTodos, prefetchUserTodos, updateTodo, deleteTodo, DECREMENT_FROM_USER_INDEX, bulkUpdateTodoIndices } from '../middleware/todoMiddleware';

describe('A middleware function for posting new todos', () => {
  let res;
  const next = jest.fn();
  const regex = /^(Error\:)/;
  const user = {
    _id: [1, 2, 3 ,4],
    username: 'guest',
    todos: []
  };

  beforeAll(() => {
    res = responseMock();
  });

  it('should call the database and post it', () => {
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

  it('should send a response with an error if it failed', () => {
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

  it('should call the next middleware function in the stack', async (done) => {
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
  let res = responseMock();
  const next = jest.fn();
  const regex = /^(Error\:)/;
  const user = {
    _id: [1, 2, 3 ,4],
    username: 'guest',
    todos: ['333','444']
  };

  beforeAll(() => {
    res = responseMock();
  });
  it('should check for a valid session', async (done) => {
    const req = requestMock();
    req.user = undefined;

    await getUsersTodos(req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    done()
  })

  it('should call the todos db', async (done) => {
    const req = requestMock();
    req.user = user;

    const spy = jest.spyOn(Todo, 'findAll');

    await getUsersTodos(req, res, next);

    expect(spy).toHaveBeenCalled();
    done();
  })

  it('should send an HTTP response with a 200 status code', async (done) => {
    const req = requestMock();
    req.user = user;
    req.user._doc = user;

    jest.spyOn(Todo, 'findAll')
      .mockImplementation(() => [] as any);

    await getUsersTodos(req, res, next);
    expect(res.status).toHaveBeenCalledWith(200)
    done();
  })

  it('should send an HTTP response with the todos and the updated user', async (done) => {
    const req = requestMock();
    req.user = user;
    req.user._doc = user;
    const arr = [1,2,3]
    jest.spyOn(Todo, 'findAll')
    .mockImplementation(() => arr as any);


    await getUsersTodos(req, res, next);
    expect(res.json).toHaveBeenCalledWith({
      todos: arr,
      authorizedUser: user
    })
    done();
  })

  it('should send an error response if it failed', async (done) => {
    const res = responseMock();
    const req = requestMock();
    req.user = user;
    req.user._doc = user;


    jest.spyOn(Todo, 'findAll')
      .mockImplementation(() => { throw new Error('test') });
    await getUsersTodos(req, res, next);
    expect(res.status).toHaveBeenCalledWith(500);
    done();
  })
})

describe('A middleware function that gets all todos for a user and stores them for later use in the middleware chain', () => {
  let res;
  const next = jest.fn();
  const regex = /^(Error\:)/;
  const user = {
    _id: [1, 2, 3 ,4],
    username: 'guest',
    todos: ['333','444']
  };

  beforeAll(() => {
    res = responseMock();
    res.locals = Object.assign({});
  });

  afterAll(() => {
    res.locals = Object.assign({});
  })
  it('should call the todos db', async (done) => {
    const req = requestMock();
    req.user = user;

    const spy = jest.spyOn(Todo, 'findAll');

    await prefetchUserTodos(req, res, next);

    expect(spy).toHaveBeenCalled();
    done()
  })


  it('should store the todos in res.locals', async (done) => {
    const res = responseMock();
    const req = requestMock();
    req.user = user;

    jest.spyOn(Todo, 'findAll')
      .mockImplementation(() => [] as any);

    const initRes = { ...res.locals };
    await prefetchUserTodos(req, res, next);

    expect(res.locals).not.toStrictEqual(initRes);
    done();
  })

  it('should send an error response if it failed', async (done) => {
    const res = responseMock();
    const req = requestMock();
    req.user = user;

    jest.spyOn(Todo, 'findAll')
      .mockImplementation(() => { throw new Error('test') });
    await prefetchUserTodos(req, res, next);
    expect(res.status).toHaveBeenCalledWith(500);
    done();
  })
})

describe('A middleware function for updating todos', () => {
  let res;
  const next = jest.fn();
  const regex = /^(Error\:)/;
  const user = {
    _id: [1, 2, 3 ,4],
    username: 'guest',
    todos: ['11111']
  };
  const mockBody = {
    originalTodo: {
      todo: 'hello',
      priority: 'high',
      isCompleted: false
    },
    updatedValue: {
      isCompleted: true
    }
  };

  beforeAll(() => {
    res = responseMock();
  });

  it('should call the database and update a todo', () => {
    // Setup the request with the Todo
    // Add a todo entry and a priority entry
    const req = requestMock({}, mockBody);
    req.user = user;
    req.params._id = '11111'

    const spy = jest.spyOn(Todo, 'findByIdAndUpdate')

    updateTodo(req, res, next);
    expect(spy).toHaveBeenCalled();
  })

  it('should send a response with an error if it failed', () => {
    const req = requestMock({}, mockBody);
    req.user = user;
    req.params._id = '11111'


    jest.spyOn(Todo, 'findByIdAndUpdate')
      .mockImplementation(() => {
        throw new Error('mock err')
      });
    updateTodo(req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
  })

  it('should send a response with the updated todo', async (done) => {
    const req = requestMock({}, mockBody);
    req.user = user;
    req.params._id


    jest.spyOn(Todo, 'findByIdAndUpdate')
      .mockReturnValue(mockBody.originalTodo as any);
    await updateTodo(req, res, next);
    expect(res.json).toHaveBeenCalledWith({
      updatedTodo: mockBody.originalTodo
    });
    done();
  })
})


describe('A middleware function for deleting a todo', () => {
  let res;
  const next = jest.fn();
  const mockParam = '1111'
  const user = {
    _id: [1, 2, 3 ,4],
    username: 'guest',
    todos: [mockParam]
  };
  const mockBody = {
    originalTodo: {
      todo: 'hello',
      priority: 'high',
      isCompleted: false
    },
    updatedValue: {
      isCompleted: true
    }
  };

  beforeAll(() => {
    res = responseMock();
  });

  it('should call the database and delete a todo', () => {
    // Setup the request with the Todo
    // Add a todo entry and a priority entry
    const req = requestMock({});
    req.user = user;
    req.params.todoId = mockParam

    const spy = jest.spyOn(Todo, 'findByIdAndDelete')

    deleteTodo(req, res, next);
    expect(spy).toHaveBeenCalled();
  })

  it('should send a response with an error if it failed', () => {
    const req = requestMock({});
    req.user = user;
    req.params.todoId = mockParam


    jest.spyOn(Todo, 'findByIdAndDelete')
      .mockImplementation(() => {
        throw new Error('mock err')
      });
    deleteTodo(req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
  })

  it('should add a new prop to res.locals', async (done) => {
    const req = requestMock({});
    req.user = user;
    req.params.todoId = mockParam
    const assertDeletedUserIndex = { [DECREMENT_FROM_USER_INDEX]: 0 };

    jest.spyOn(Todo, 'findByIdAndDelete').mockReturnValue({ userIndex: 0 } as any)

    await deleteTodo(req, res, next);
    expect(res.locals).toStrictEqual(assertDeletedUserIndex);
    done();
  })

  it('should call next on success', async (done) => {
    const req = requestMock({});
    req.user = user;
    req.params.todoId = mockParam


    jest.spyOn(Todo, 'findByIdAndDelete').mockReturnValue({ userIndex: 0 } as any)

    await deleteTodo(req, res, next);
    expect(next).toHaveBeenCalled();
    done();
  })
})