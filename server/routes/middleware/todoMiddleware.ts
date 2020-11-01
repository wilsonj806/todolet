import { RequestHandler, ErrorRequestHandler } from 'express';

import { storeInResLocals } from './commonMiddleware';

import Todo from '../../models/todo';
import User from '../../models/user';


const NEW_TODO = '__NEW_TODO__';
const postNewTodo: RequestHandler = async (req, res, next) => {
  const { body, user } = req;
  const { _id } = user as any;
  if (!_id) {
    return res.status(500).json({ msg: 'you not loggedin' })
  };
  try {
    const { todos: userTodos } = user;
    const newTodo = {
      ...body,
      userIndex: userTodos.length !== 0 ? userTodos.length : 0
    }
    const result = await Todo.create(newTodo);
    // console.log(result._id.toString());
    // Fetch the id from the new todo
    const newTodoId = result._id.toString();
    // put the id into res.locals
    // console.log('this is new todo id', newTodoId);
    storeInResLocals(res,NEW_TODO, newTodoId);
    // console.log(res.locals[NEW_TODO]);
    next()
  } catch (err) {
    // console.log(err);
    res.status(500).json({msg: 'It broke'})
    next(err);
  }
}


const getUsersTodos: RequestHandler = async (req, res, next) => {
  const { user }: any = req;
  if (!user) {
    return res.status(500).json({ msg: 'Not authorized to access this resource' })
  };
  try {
    // console.log('this is user\n', user);
    // const dbUser = await User.findById(user._id);
    // console.log('this is todo ids ',todos);
    const fetchedTodos = await Todo.findAll({
      where: {
        user_index: user
      }
    })
    delete user.password;
    // console.log(fetchedTodos);
    res.status(200).json({ todos: fetchedTodos, user });
  } catch (e) {
    res.status(500).json({ msg: 'Server error sorry :('})
  }
}

const PREFETCHED_TODOS_KEY = '__PREFETCHED_TODOS__';
const prefetchUserTodos: RequestHandler = async (req, res, next) => {
  const { user } : any = req;
  if (!user) {
    // NOTE If there's no valid session, then just keep going
    next();
  } else {
    try {
      // console.log('this is user\n', user);
      // FIXME figure out if you even need this DB call
      // console.log('this is todo ids ',todos);
      const fetchedTodos = await Todo.findAll({
        where: {
          user_index: user
        }
      })
      // Store the todos into res.locals
      storeInResLocals(res,PREFETCHED_TODOS_KEY, fetchedTodos);
      next();
    } catch (e) {
      res.status(500).json({ msg: 'Server error sorry :('})
    }
  }
}

const updateTodo: RequestHandler = async (req, res, next) => {
  const { user } = req;
  if (!user) {
    return res.status(403).json({ msg: 'Not authorized to access this resource' })
  } else if (!req.params) {
    return res.status(400).json({ msg: 'Bad request'})
  }
  try {
    const { originalTodo, updatedValue } = req.body;
    const { _id } = req.params;
    const todoToUpdate = { ...originalTodo, ...updatedValue };
    const updatedTodo = await Todo.findByIdAndUpdate(_id, todoToUpdate, { new: true });
    res.status(200).json({
      updatedTodo
    })
  } catch (e) {
    res.status(500).json({ msg: 'server error' });
  }
}

const DECREMENT_FROM_USER_INDEX ='DECREMENT_FROM_USER_INDEX';
const deleteTodo: RequestHandler = async (req, res, next) => {
  const { user } = req;
  if (!user) {
    return res.status(403).json({ msg: 'Not authorized to access this resource' })
  } else if (!req.params) {
    return res.status(400).json({ msg: 'Bad request'})
  }
  try {
    const { todoId } = req.params;

    const result = await Todo.findByIdAndDelete(todoId)
    if (!result) return res.status(404).json({ msg: 'Resource not found'})
    const { userIndex } = result;
    storeInResLocals(res, DECREMENT_FROM_USER_INDEX, userIndex);

    next()
  } catch (e) {
    res.status(500).json({ msg: 'server error'})
  }
}

const bulkUpdateTodoIndices: RequestHandler = async (req, res, next) => {
  try {
    const userIndex = res.locals[DECREMENT_FROM_USER_INDEX];
    // Update all todos with a userIndex greater than the userIndex of the deleted todo(decrement by 1)
    const update = await Todo.updateMany({ userIndex: { $gt: userIndex }}, { $inc: { userIndex: -1 } });
    next()
  } catch (e) {
    res.status(500).json({ msg: 'server error'})
  }
}

export {
  postNewTodo,
  getUsersTodos,
  prefetchUserTodos,
  updateTodo,
  PREFETCHED_TODOS_KEY,
  NEW_TODO,
  deleteTodo,
  DECREMENT_FROM_USER_INDEX,
  bulkUpdateTodoIndices
}
