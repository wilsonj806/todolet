import express from 'express';
import { body } from 'express-validator/check';

import {
  postNewTodo,
  getUsersTodos,
  updateTodo,
  deleteTodo,
} from './middleware/todoMiddleware'

// TODO check if we need the :userid param

const router = express.Router();

router.post(
  '/',
  postNewTodo,
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
  getUsersTodos
)

export default router;