import { RequestHandler, ErrorRequestHandler } from 'express';
import { validationResult } from 'express-validator/check';
import bcrypt from 'bcryptjs';
import { postUserReq, responseObj, errorResponse } from '../../types/index';

import 'dotenv/config';

import User from '../../models/user';

const postNewUser: RequestHandler = async (req, res, next): Promise<any> => {
  const { username, password }: postUserReq = req.body;
  const validationErr = validationResult(req);
  /**
   * TODO verify that error handling actually works the way error handling should;
   *
   */
  try {
    if (!validationErr.isEmpty()) {
      const errors = validationErr.mapped();

      const resJson: errorResponse = {
        msg: 'Registration failed',
        errors,
      };
      res.status(400).json(resJson);
    } else {
      const result = await User.find({ username });
      if (result.length === 0) {
        const genSalt = await bcrypt.genSalt(10);
        const newPass = await bcrypt.hash(password, genSalt);
        const newUser = await User.create({ username, password: newPass });

        const { _id } = newUser;
        const resJson: responseObj = {
          msg: 'User added',
          user: {
            _id,
            username,
          },
        };
        res.status(200).json(resJson);
      } else {
        const resJson: errorResponse = {
          msg: `Error, user with username: ${username} exists already`,
        };
        res.status(400).json(resJson);
      }
    }
  } catch (err) {
    const resJson: responseObj = {
      msg: 'Internal server error, sorry :(',
    };
    res.status(500).json(resJson);
    console.error('Error alert, check below for additional logging \n', err);
  } finally {
    next();
  }
};

// TODO: Properly implement the below login and logout things
const postLogin: RequestHandler = (req, res, next): any => {
  const { username, _id } = req.user;
  const resJson: responseObj = {
    msg: 'Login Successful',
    user: {
      _id,
      username,
    },
  };
  res.status(200).json(resJson);
  next();
};

const postLoginFail: ErrorRequestHandler = (err, req, res, next): any => {
  res.status(401).json({ msg: 'Login failed' });
  next();
};


const getLogout: RequestHandler = (req, res, next): any => {
  // console.log(req.session);
  req.logout();
  res.status(200).json({ msg: 'Logged out successfully' });
  next();
};

// TODO Figure out what to do with this
const getOneUser: RequestHandler = (req, res, next): any => {
  next();
};


export {
  postNewUser,
  getOneUser,
  postLogin,
  postLoginFail,
  getLogout,
};
