import { RequestHandler } from 'express';
import bcrypt from 'bcryptjs';
import { postUserReq, responseObj, errorResponse } from '../../types/server';

import 'dotenv/config';

import User from '../../models/user';

const findUserWithUsername: RequestHandler = async (req, res, next): Promise<any> => {
  try {
    const { username }: postUserReq = req.body;
    const results = await User.find({ username });
    if (results.length !== 0) {
      const resJson: errorResponse = {
        msg: `Error: User with username: ${username} exists already`,
      };
      res.status(400).json(resJson);
    } else {
      next();
    }
  } catch (error) {
    const resJson: responseObj = {
      msg: 'Error: Internal server error, sorry :(',
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
      msg: 'Error: Internal server error, sorry :(',
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
      msg: 'Error: Internal server error, sorry :(',
    };
    res.status(500).json(resJson);
    console.error('Error alert, check below for additional logging \n', err);
  } finally {
    next();
  }
};

export {
  findUserWithUsername,
  encryptPass,
  postNewUser,
};
