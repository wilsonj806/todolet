import { RequestHandler, ErrorRequestHandler } from 'express';

import Todo from '../../models/todo';
import User from '../../models/user';

const postNewTodo: RequestHandler = async (req, res, next) => {
  const { body, params, session } = req;
  console.log(params);
  console.log(session);
  try {
    const postedTodo = {
      ...body,
      date_added: new Date()
    };

    const result = await Todo.create(postedTodo);
    console.log(result._id.toString());
    res.locals.new_todo = result._id.toString();
    // Fetch the id from the new todo
    // put the id into res.locals
    next()
    res.json({msg: 'yerr'})
  } catch (err) {
    console.log(err);
    res.status(500).json({msg: 'It broke'})
  }
}

const updateUserTodos: RequestHandler = async (req, res, next) => {
  const todoId = res.locals.new_todo;
}

const getUsersTodos: RequestHandler = async (req, res, next) => {

}


export {
  postNewTodo,
  getUsersTodos,
}