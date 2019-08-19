import { RequestHandler } from 'express';
import bcrypt from 'bcryptjs';
import { postUserReq, errorResponse } from '../../types/server';

import 'dotenv/config';

import User from '../../models/user';

import CommonService from './services/CommonService';

const { responsifyData, responsifyNoData } = CommonService;

const findUserWithUsername: RequestHandler = async (req, res, next): Promise<any> => {
  try {
    const { username }: postUserReq = req.body;
    const results = await User.find({ username });
    if (results.length !== 0) {
      res.status(400).json(responsifyNoData(`Error: User with username: ${username} exists already`));
    } else {
      next();
    }
  } catch (error) {
    res.status(500).json(responsifyNoData('Error: Internal server error, sorry :('));
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
    res.status(500).json(responsifyNoData('Error: Internal server error, sorry :('));
    console.error('Error alert, check below for additional logging \n', error);
  }
};


const postNewUser: RequestHandler = async (req, res, next): Promise<any> => {
  try {
    const { username }: postUserReq = req.body;
    const newUser = await User.create({ username, password: res.locals.hashedPwd });

    const { _id } = newUser;

    res.status(200).json(responsifyData('User added', { _id, username }));
  } catch (err) {
    res.status(500).json(responsifyNoData('Error: Internal server error, sorry :('));
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
