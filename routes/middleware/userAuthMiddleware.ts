import { RequestHandler, ErrorRequestHandler } from 'express';
import CommonService from './services/CommonService';

const { responsifyData, responsifyNoData } = CommonService;

const postLogin: RequestHandler = (req, res, next): any => {
  const { username, _id } = req.user;

  res.status(200).json(responsifyData('LoginSuccessful', { _id, username }));
  next();
};

const postLoginFail: ErrorRequestHandler = (err, req, res, next): any => {
  res.status(401).json(responsifyNoData('Login failed'));
  next();
};


const getLogout: RequestHandler = (req, res, next): any => {
  req.logout();
  res.status(200).json(responsifyNoData('Logged out successfully'));
  next();
};

export {
  postLogin,
  postLoginFail,
  getLogout,
};
