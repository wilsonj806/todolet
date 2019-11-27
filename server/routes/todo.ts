import express from 'express';
import { body } from 'express-validator/check';

import {
  postNewTodo,
  getUsersTodos
} from './middleware/todoMiddleware'
import {
  updateUserTodos,
} from './middleware/userUpdateMiddleware'

// TODO check if we need the :userid param

const router = express.Router();

router.post('/',
  postNewTodo,
  updateUserTodos
)

router.get('/',
  getUsersTodos
)

export default router;