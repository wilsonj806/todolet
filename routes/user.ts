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
import express, { Request, Response } from 'express';
import { body } from 'express-validator/check';

import User from '../models/user';
import { postNewUser } from './middleware/userMiddleware';


const router = express.Router();

/**
 * ANCHOR: POST register new user
 * =============================================================
 * Requirements(NOTE should be replaced with actual test specs):
 *  - validate request form
 *  - check if the username exists
 *  - encrypt the password
 *  - add the user into the database
 *  - send a response saying it went okay
 *  - OR send a response saying it failed
 */
router.post('/register', [
  body('username', 'Username is required').exists({checkFalsy: true}),
  body('password', 'Password is required').exists({checkFalsy: true}),
  body('password2', 'Passwords don\'t match').exists()
    .custom((value, { req }) => value === req.body.password)
], postNewUser);


/**
 * ANCHOR: GET user credentials and validate against request
 * =============================================================
 * Requirements(NOTE should be replaced with actual test specs):
 *
 */
router.get('/login', (req: Request, res:Response) => {

});


/**
 * ANCHOR: GET single user
 * =============================================================
 * Requirements(NOTE should be replaced with actual test specs):
 *
 */
router.get('/:id', () => {

});

export default router;