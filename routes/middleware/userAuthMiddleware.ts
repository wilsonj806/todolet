import { RequestHandler, ErrorRequestHandler } from 'express';
import CommonService from './services/CommonService';

const { responsifyData, responsifyNoData, responsifyError } = CommonService;

// NOTE this is the last method in the Login service chain
const postLogin: RequestHandler = (req, res, next): any => {
  const user = {...req.user._doc };
  user.userId = user._id.toString().slice();
  delete user._id;
  delete user.__v;
  delete user.password;
  res.status(200).json(responsifyData('Login Successful', { ...user }));
  next();
};

const postLoginFail: ErrorRequestHandler = (err, req, res, next): any => {
  res.status(401).json(responsifyError('Login failed'));
  next();
};


const getLogout: RequestHandler = (req, res, next): any => {
  req.logout();
  res.redirect(200, '/logout');
  next();
};

export {
  postLogin,
  postLoginFail,
  getLogout,
};
