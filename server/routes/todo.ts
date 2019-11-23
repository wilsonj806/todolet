import express from 'express';
import { body } from 'express-validator/check';

import {
  postNewTodo
} from './middleware/todoMiddleware'

const router = express.Router();

router.post('/:userid',
  postNewTodo,
)


export default router;