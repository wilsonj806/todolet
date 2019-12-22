import { RequestHandler, ErrorRequestHandler } from 'express';

import CommonService from './services/CommonService';

const { responsifyData, responsifyNoData, responsifyError } = CommonService;

// NOTE This middleware function runs after Passport logs in successfully, so we can use the bang operator on line 8
const postLogin: RequestHandler = (req, res, next): any => {
  // const { user } : any = {...req!.user!._doc };
  const { _doc } : any = {...req!.user! };
  // console.log(_doc);
  const user  = { ..._doc };
  user.userId = user._id.toString().slice();
  delete user._id;
  delete user.__v;
  delete user.password;
  res.status(200).json(responsifyData('Login Successful', { ...user }));
  next();
};

const postLoginFail: ErrorRequestHandler = (err, req, res, next): any => {
  console.log(err);
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
