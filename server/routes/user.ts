/**
 * ======================================================
 *
 *                  Routes handled
 *
 * ======================================================
 *
 * `/api/user/:id`       : Single user lookup
 * `/api/user/login`     : Login and authentication
 * `/api/user/logout`    : Login and authentication
 * `/api/user/register`  : Register user
 */
import express from 'express';
import { body } from 'express-validator/check';
import passport from 'passport';
import {
  findUserWithUsername,
  postRegisterFailure
} from './middleware/userRegistrationMiddleware';
import {
  postLogin,
  postLoginFail,
  getLogout,
} from './middleware/userAuthMiddleware';
import checkFormErrors from './middleware/commonMiddleware';
import { deleteUser } from './middleware/userDeleteMiddelware';
import { putUser } from './middleware/userUpdateMiddleware';
// import { checkFormErrors } from './middleware/commonMiddleware';


const router = express.Router();

/**
 * ANCHOR: POST register new user
 * =============================================================
 * TODO Add passport.authenticate() in
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
  passport.authenticate('register', { failWithError: true }),
  postLogin,
  postRegisterFailure
);

/**
 * ANCHOR: POST login user with credentials
 * =============================================================
 */
router.post(
  '/login',
  [
    body('username', 'Username is required').exists({ checkFalsy: true }),
    body('password', 'Password is required').exists({ checkFalsy: true }),
  ],
  checkFormErrors,
  passport.authenticate('login', { failWithError: true }),
  postLogin,
  postLoginFail,
);
router.post(
  '/guest',
  passport.authenticate('guest', { failWithError: true }),
  postLogin,
  postLoginFail,
);

/**
 * ANCHOR: POST logout user
 * =============================================================
 */
router.post('/logout', getLogout);

/**
 * ANCHOR: DELETE user
 * =============================================================
 */
router.delete('/delete', deleteUser);

/**
 * ANCHOR: GET single user data
 * =============================================================
 *
 */

router.get('/:id', (req,res,next) => {
  // console.log(req.session)
  res.status(200).send()
})

/**
 * ANCHOR: PUT User update
 * =============================================================
 *
 */
router.put('/:id', putUser)




export default router;
