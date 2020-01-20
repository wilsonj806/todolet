import { RequestHandler, ErrorRequestHandler } from 'express';
import CommonService from './services/CommonService';
import User from '../../models/user';
import { NEW_TODO } from './todoMiddleware';


const { responsifyData, responsifyNoData, responsifyError } = CommonService;

const VALID_KEYS = ["username", "email", "password", "projectFilters","tagFilters"];
const VALID_KEYS_LENGTH = VALID_KEYS.length;

// FIXME TODO implement key validation
const putUser: RequestHandler = async (req, res, next) => {
  try {
    const { user, body } = req as any;
    if (user == undefined) {
      return res.status(500).json({ msg: 'you not loggedin' })
    };
    const updatedUser = await User.findByIdAndUpdate(user._id, body, { new: true })
    if (updatedUser === null) throw new Error('Internal Server Error')

    delete updatedUser.password;
    delete updatedUser.__v;

    res.status(200).json(responsifyData('Update to user successful', updatedUser))
    next();
  } catch (error) {
    res.status(500).json(responsifyError(error.message))
    next(error);
  }
}

const updateUserTodos: RequestHandler = async (req, res, next) => {
  const { user } = req;
  if (user == undefined) {
    return res.status(500).json({ msg: 'you not loggedin' })
  };
  const { todos, _id } = user as any;
  const todoId = res.locals[NEW_TODO];
  // console.log('original todos length for user', todos.length);
  if (!todoId) {
    return res.status(500).json({ msg: 'not authorized to see this' })
  }
  const updated = { todos: [...todos, todoId] };
  try {
    const user = await User.findByIdAndUpdate(_id, updated, { new: true });
    // console.log('this is updated user todos length', user.todos.length);
    // console.log('this is session todos length', req.user.todos.length)
    // FIXME make sure to update Session User data!!!
    // TODO Find a less hokey way to do this(i.e some Express Session method)
    req!.user!.todos = user!.todos;
    // console.log('this is session todos length part 2', req.user.todos.length)
    next()
  } catch (e) {
    // console.log(e);
    res.status(500).json({ msg: 'it broke' })
  }
}

const deleteSingleUserTodo: RequestHandler = async (req, res, next) => {
  const { user } = req;
  if (user == undefined) {
    return res.status(500).json({ msg: 'you not loggedin' })
  };
  const { todos, _id } = user;
  const newTodos = todos.filter(todo => todo !== req.params.todoId)
  try {
    const updatedUser = await User.findByIdAndUpdate(_id, newTodos, { new: true });
    req!.user!.todos = updatedUser!.todos;
    // res.status(200).send('Todo delete success')
    next();
  } catch (e) {
    res.status(500).json({ msg: 'server err'})
  }
}

export {
  putUser,
  updateUserTodos,
  deleteSingleUserTodo
}
