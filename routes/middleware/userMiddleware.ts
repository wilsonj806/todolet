import { Request, Response, NextFunction } from "express";
import { postUserReq, responseObj } from '../../@types/index';
import { validationResult } from 'express-validator/check';
import passport from 'passport';
import bcrypt from 'bcryptjs';

import 'dotenv/config';

import User from '../../models/user';

export const postNewUser = async (req: Request, res: Response, next: NextFunction) => {
  const { username, password }: postUserReq = req.body;
  /**
   * TODO verify that error handling actually works the way error handling should;
   *
   */
  try {
    const result = await User.find({username: username});
    if (result.length === 0) {
      const salt = await bcrypt.genSalt(10);
      const newPass = await bcrypt.hash(password, salt);
      const user = await User.create({ username: username, password: newPass });
      const { _id } = user;
      const resJson: responseObj = {
        msg: 'User added',
        user: {
          _id,
          username
        }
      }
      res.status(200).json(resJson);
    } else {
      const resJson: responseObj = {
        msg: `Error, user with username: ${username} exists already`
      }
      res.status(400).json(resJson);
    }
  } catch(err) {
    // TODO check what type of error is sent
    const resJson: responseObj = {
      msg: 'Internal server error, sorry :('
    }
    res.status(500).json(resJson);
    console.log('Error alert, check below for additional logging \n', err);
  } finally {
    next();
  }
}

export const getOneUser = (req: Request, res: Response, next: NextFunction) => {
  next();
}

export const getAndValidateLogin = (req: Request, res: Response, next: NextFunction) => {
  next();
}