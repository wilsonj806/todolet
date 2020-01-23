import express from 'express';
import { returnHtml, gatherState } from './middleware/htmlMiddleware';
import { prefetchUserTodos } from './middleware/todoMiddleware';

const router = express.Router();
router.get('/*',
  prefetchUserTodos,
  gatherState,
  returnHtml
);

export default router