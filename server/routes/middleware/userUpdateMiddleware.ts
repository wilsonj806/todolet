import { RequestHandler, ErrorRequestHandler } from 'express';
import CommonService from './services/CommonService';
import User from '../../models/user';


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
  const todoId = res.locals.new_todo;
  if (!todoId) {
    return res.status(500).json({ msg: 'not authorized to see this' })
  }
  const updated = { todos: [...todos, todoId] };
  try {
    await User.findByIdAndUpdate(_id, updated, { new: true });
    next()
  } catch (e) {
    console.log(e);
    res.status(500).json({ msg: 'it broke' })
  }
}

export {
  putUser,
  updateUserTodos,
}
