import { RequestHandler, ErrorRequestHandler } from 'express';
import { validationResult } from 'express-validator/check';
import bcrypt from 'bcryptjs';
import { postUserReq, responseObj, errorResponse } from '../../types/index';

import 'dotenv/config';

import User from '../../models/user';

const checkFormErrors: RequestHandler = (req, res, next): any => {
  const validationErr = validationResult(req);
  if (!validationErr.isEmpty()) {
    const errors = validationErr.mapped();

    const resJson: errorResponse = {
      msg: 'Error invalid form fields',
      errors,
    };
    res.status(400).json(resJson);
  } else {
    next();
  }
};

const findUserWithUsername: RequestHandler = async (req, res, next): Promise<any> => {
  try {
    const { username }: postUserReq = req.body;
    const results = await User.find({ username });
    if (results.length !== 0) {
      const resJson: errorResponse = {
        msg: `Error, user with username: ${username} exists already`,
      };
      res.status(400).json(resJson);
    } else {
      next();
    }
  } catch (error) {
    const resJson: responseObj = {
      msg: 'Internal server error, sorry :(',
    };
    res.status(500).json(resJson);
    console.error('Error alert, check below for additional logging \n', error);
  }
};

const encryptPass: RequestHandler = async (req, res, next): Promise<any> => {
  try {
    const { password }: postUserReq = req.body;
    const genSalt = await bcrypt.genSalt(10);
    const newPass = await bcrypt.hash(password, genSalt);
    res.locals.hashedPwd = newPass;
    next();
  } catch (error) {
    const resJson: responseObj = {
      msg: 'Internal server error, sorry :(',
    };
    res.status(500).json(resJson);
    console.error('Error alert, check below for additional logging \n', error);
  }
};


const postNewUser: RequestHandler = async (req, res, next): Promise<any> => {
  try {
    const { username }: postUserReq = req.body;
    const newUser = await User.create({ username, password: res.locals.hashedPwd });

    const { _id } = newUser;
    const resJson: responseObj = {
      msg: 'User added',
      user: {
        _id,
        username,
      },
    };
    res.status(200).json(resJson);
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
  req.logout();
  res.status(200).json({ msg: 'Logged out successfully' });
  next();
};

// TODO Figure out what to do with this
const getOneUser: RequestHandler = (req, res, next): any => {
  next();
};


export {
  checkFormErrors,
  findUserWithUsername,
  encryptPass,
  postNewUser,
  getOneUser,
  postLogin,
  postLoginFail,
  getLogout,
};
