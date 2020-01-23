import express from 'express';
import { body } from 'express-validator/check';

import {
  postNewTodo,
  getUsersTodos,
  updateTodo,
  deleteTodo,
  bulkUpdateTodoIndices
} from './middleware/todoMiddleware'
import {
  updateUserTodos,
  deleteSingleUserTodo
} from './middleware/userUpdateMiddleware'

// TODO check if we need the :userid param

const router = express.Router();

router.post(
  '/',
  postNewTodo,
  updateUserTodos,
  getUsersTodos
)

router.get(
  '/',
  getUsersTodos
)

router.put(
  '/:_id',
  updateTodo,
  // getUsersTodos
)

router.delete(
  '/:todoId',
  deleteTodo,
  bulkUpdateTodoIndices,
  deleteSingleUserTodo,
  getUsersTodos
)

export default router;