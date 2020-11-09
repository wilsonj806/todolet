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
    const newTodo = {
      ...body,
    }
    const result = await Todo.create({user_index: user, ...newTodo});
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
    const updatedTodo = await Todo.update(todoToUpdate, {where: { id: _id }});
    res.status(200).json({
      updatedTodo
    })
  } catch (e) {
    res.status(500).json({ msg: 'server error' });
  }
}

const deleteTodo: RequestHandler = async (req, res, next) => {
  const { user } = req;
  if (!user) {
    return res.status(403).json({ msg: 'Not authorized to access this resource' })
  } else if (!req.params) {
    return res.status(400).json({ msg: 'Bad request'})
  }
  try {
    const { todoId } = req.params;

    const result = await Todo.destroy({where:{id:todoId}})
    if (!result) return res.status(404).json({ msg: 'Resource not found'})

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
}
