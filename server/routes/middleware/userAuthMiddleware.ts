import { RequestHandler, ErrorRequestHandler } from 'express';

import CommonService from './services/CommonService';

const { responsifyData, responsifyNoData, responsifyError } = CommonService;

// NOTE This middleware function runs after Passport logs in successfully, so we can use the bang operator on line 8
const postLogin: RequestHandler = (req: any, res, next): any => {
  // const { user } : any = {...req!.user!._doc };
  const {user: { dataValues}} = req;
  delete dataValues.password
  const {id: userId} = dataValues
  res.status(200).json(responsifyData('Login Successful', { ...dataValues, userId }));
  next();
};

const postLoginFail: ErrorRequestHandler = (err, req, res, next): any => {
  // eslint-disable-next-line no-console
  console.log(err);
  res.status(401).json(responsifyError('Login failed'));
  next();
};


const getLogout: RequestHandler = (req, res, next): any => {
  req.session!.destroy((err) => {
    if (err) {
      throw new Error(err.message)
    }
    req.logout();
    res.status(200).send();
  })
};

export {
  postLogin,
  postLoginFail,
  getLogout,
};
