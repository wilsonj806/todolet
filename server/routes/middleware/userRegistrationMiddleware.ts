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
    const user = await User.findOne({ where: {username} });
    if (!user) {
      res.status(400).json(responsifyError(`Error: User with username: ${username} exists already`));
    } else {
      next();
    }
  } catch (error) {
    res.status(500).json(responsifyError('Error: Internal server error, sorry :('));
    console.error('Error alert, check below for additional logging \n', error);
  }
};

const postRegisterFailure: ErrorRequestHandler = (err, req, res, next): void => {
  res.status(401).json(responsifyError('Login failed'));
  next();
};



export {
  findUserWithUsername,
  postRegisterFailure,
};
