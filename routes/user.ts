/**
 * ======================================================
 *
 *                  Routes handled
 *
 * ======================================================
 *
 * `/user/:id`       : Single user lookup
 * `/user/login`     : Login and authentication
 * `/user/register`  : Register user
 */
import express from 'express';

import User from '../model/user';

const router = express.Router();

// ANCHOR POST new user
router.post('/register', (req: Express.Request, res: Express.Response) => {

});


// ANCHOR GET user credentials and validate against request
router.get('/login', (req: Express.Request, res: Express.Response) => {

});

//ANCHOR GET single user
router.get('/:id', () => {

});

export default router;