import express from 'express';
import { body } from 'express-validator/check';

import {
  postNewTodo,
  getUsersTodos,
  updateTodo
} from './middleware/todoMiddleware'
import {
  updateUserTodos,
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

export default router;