/**
 * ======================================================
 *
 *                  Routes handled
 *
 * ======================================================
 *
 * `/user/:id`       : Single user lookup
 * `/user/login`     : Login and authentication
 * `/user/logout`    : Login and authentication
 * `/user/register`  : Register user
 */
import express from 'express';
import { body } from 'express-validator/check';
import passport from 'passport';
import {
  checkFormErrors, findUserWithUsername, postNewUser, postLogin, postLoginFail, getLogout,
} from './middleware/userMiddleware';


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
router.post(
  '/register',
  [
    body('username', 'Username is required').exists({ checkFalsy: true }),
    body('password', 'Password is required').exists({ checkFalsy: true }),
    body('password2', 'Passwords don\'t match').exists()
      .custom((value, { req }): boolean => value === req.body.password),
  ],
  checkFormErrors,
  findUserWithUsername,
  postNewUser,
);

/**
 * ANCHOR: POST login user with credentials
 * =============================================================
 * Requirements(NOTE should be replaced with actual test specs):
 *  - authenticate user login request
 *  - on failure to login, send a response saying that the login failed
 *  - OR send a response to the client saying that the login succeeded
 */
router.post(
  '/login',
  passport.authenticate('local', { failWithError: true }),
  postLogin,
  postLoginFail,
);

/**
 * ANCHOR: POST logout user
 * =============================================================
 * Requirements(NOTE should be replaced with actual test specs):
 *
 */
router.get('/logout', getLogout);


/**
 * ANCHOR: GET single user data
 * =============================================================
 * TODO Figure out what to do with this
 *
 * Requirements(NOTE should be replaced with actual test specs):
 *
 */
// router.get('/:id', () => {

// });

export default router;
