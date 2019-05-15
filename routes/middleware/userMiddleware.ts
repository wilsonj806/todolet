import { RequestHandler } from "express";
import { postUserReq, responseObj, errorResponse } from '../../@types/index';
import { validationResult } from 'express-validator/check';
import passport from 'passport';
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

const getOneUser: RequestHandler = (req, res, next) => {
  next();
}

const getAndValidateLogin: RequestHandler = (req, res, next) => {
  next();
}

export {
  postNewUser,
  getOneUser,
  getAndValidateLogin
}