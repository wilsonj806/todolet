import { RequestHandler, ErrorRequestHandler } from 'express';

import { storeInResLocals } from './commonMiddleware';

import Todo from '../../models/todo';
import User from '../../models/user';

// FIXME check if the getTodos functions even needs to call the Users database

const NEW_TODO = '__NEW_TODO__';
const postNewTodo: RequestHandler = async (req, res, next) => {
  const { body, user } = req;
  const { _id } = user as any;
  if (!_id) {
    return res.status(500).json({ msg: 'you not loggedin' })
  };
  try {
    const result = await Todo.create({...body});
    // console.log(result._id.toString());
    // Fetch the id from the new todo
    const newTodoId = result._id.toString();
    // put the id into res.locals
    storeInResLocals(res,NEW_TODO, newTodoId);
    next()
  } catch (err) {
    console.log(err);
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
    const dbUser = await User.findById(user._id);
    const { todos }: any = dbUser;
    // console.log('this is todo ids ',todos);
    const fetchedTodos = await Todo.find({
      _id: {
        $in: todos
      }
    })
    // console.log(fetchedTodos);
    res.status(200).json({ todos: fetchedTodos });
  } catch (e) {
    res.status(500).json({ msg: 'Server error sorry :('})
  }
}

const PREFETCHED_TODOS_KEY = '__PREFETCHED_TODOS__';
const prefetchUserTodos: RequestHandler = async (req, res, next) => {
  const { user }: any = req;
  if (!user) {
    // NOTE If there's no valid session, then just keep going
    next();
  } else {
    try {
      // console.log('this is user\n', user);
      const dbUser = await User.findById(user._id);
      const { todos }: any = dbUser;
      // console.log('this is todo ids ',todos);
      const fetchedTodos = await Todo.find({
        _id: {
          $in: todos
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

export {
  postNewTodo,
  getUsersTodos,
  prefetchUserTodos,
  PREFETCHED_TODOS_KEY,
  NEW_TODO
}
