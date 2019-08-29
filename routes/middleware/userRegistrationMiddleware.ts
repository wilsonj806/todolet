import { RequestHandler, ErrorRequestHandler } from 'express';
import bcrypt from 'bcryptjs';
import { postUserReq, errorResponse } from '../../types';

import 'dotenv/config';

import User from '../../models/user';

import CommonService from './services/CommonService';

const { responsifyData, responsifyNoData, responsifyError } = CommonService;

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

const postRegisterFailure: ErrorRequestHandler = (err, req, res, next): void => {
  res.status(401).json(responsifyError('Login failed', err));
  next();
};



export {
  findUserWithUsername,
  postRegisterFailure,
};
