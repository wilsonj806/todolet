import express from 'express';
import { returnHtml } from './middleware/htmlMiddleware';

const router = express.Router();
router.get('/*', returnHtml);

export default router