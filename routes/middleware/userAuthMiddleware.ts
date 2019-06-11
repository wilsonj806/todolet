import { RequestHandler, ErrorRequestHandler } from 'express';
import { responseObj } from '../../types/index';


const postLogin: RequestHandler = (req, res, next): any => {
  const { username, _id } = req.user;
  const resJson: responseObj = {
    msg: 'Login Successful',
    user: {
      _id,
      username,
    },
  };
  res.status(200).json(resJson);
  next();
};

const postLoginFail: ErrorRequestHandler = (err, req, res, next): any => {
  res.status(401).json({ msg: 'Login failed' });
  next();
};


const getLogout: RequestHandler = (req, res, next): any => {
  req.logout();
  res.status(200).json({ msg: 'Logged out successfully' });
  next();
};

export {
  postLogin,
  postLoginFail,
  getLogout,
};
