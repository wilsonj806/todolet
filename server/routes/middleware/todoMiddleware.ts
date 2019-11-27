import { RequestHandler, ErrorRequestHandler } from 'express';

import Todo from '../../models/todo';
import User from '../../models/user';

const postNewTodo: RequestHandler = async (req, res, next) => {
  const { body, user } = req;
  const { _id } = user as any;
  if (!_id) {
    return res.status(500).json({ msg: 'you not loggedin' })
  };
  try {
    const result = await Todo.create({...body});
    console.log(result._id.toString());
    res.locals.new_todo = result._id.toString();
    // Fetch the id from the new todo
    // put the id into res.locals
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
    const { todos } = dbUser;
    console.log('this is todo ids ',todos);
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


export {
  postNewTodo,
  getUsersTodos,
}
