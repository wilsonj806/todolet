import { RequestHandler, ErrorRequestHandler, Request } from "express";
import { postUserReq, responseObj, errorResponse } from '../../types/index';
import { validationResult } from 'express-validator/check';
import bcrypt from 'bcryptjs';

import 'dotenv/config';

import User from '../../models/user';

const postNewUser: RequestHandler = async (req, res, next) => {
  const { username, password }: postUserReq = req.body;
  const validationErr = validationResult(req);
  /**
   * TODO verify that error handling actually works the way error handling should;
   *
   */
  try {
    if(!validationErr.isEmpty()) {
      const errors = validationErr.mapped();

      const resJson: errorResponse = {
        msg: 'Registration failed',
        errors: errors
      }
      res.status(400).json(resJson);
    } else {
      const result = await User.find({username: username});
      if (result.length === 0) {
        const genSalt = await bcrypt.genSalt(10);
        const newPass = await bcrypt.hash(password, genSalt);
        const newUser = await User.create({ username: username, password: newPass });

        const { _id } = newUser;
        const resJson: responseObj = {
          msg: 'User added',
          user: {
            _id,
            username
          }
        }
        res.status(200).json(resJson);
      } else {
        const resJson: errorResponse = {
          msg: `Error, user with username: ${username} exists already`
        }
        res.status(400).json(resJson);
      }
    }
  } catch(err) {
    const resJson: responseObj = {
      msg: 'Internal server error, sorry :('
    }
    res.status(500).json(resJson);
    console.log('Error alert, check below for additional logging \n', err);
  } finally {
    next();
  }
}

// TODO: Properly implement the below login and logout things
const postLogin: RequestHandler = (req, res, next) => {
  const { username, _id} = req.user;
  const resJson: responseObj = {
    msg: 'Login Successful',
    user: {
      _id: _id,
      username: username
    }
  }
  res.status(200).json(resJson);
  next();
}

const postLoginFail: ErrorRequestHandler = (err, req, res, next) => {
  res.status(401).json({ msg: 'Login failed' });
  next();
}


const getLogout: RequestHandler = (req, res, next) => {
  console.log(req.session);
  req.logout();
  res.status(200).json({ msg: 'Logged out successfully'});
  next();
}

// TODO Figure out what to do with this
const getOneUser: RequestHandler = (req, res, next) => {
  next();
}


export {
  postNewUser,
  getOneUser,
  postLogin,
  postLoginFail,
  getLogout
}