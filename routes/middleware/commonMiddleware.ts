import { RequestHandler } from 'express';
import { validationResult } from 'express-validator/check';
import { errorResponse } from '../../types';
import CommonService from './services/CommonService';

const { responsifyError } = CommonService;

const checkFormErrors: RequestHandler = (req, res, next): any => {
  const validationErr = validationResult(req);
  if (!validationErr.isEmpty()) {

    res.status(400).json(responsifyError('Error: Invalid form fields'));
  } else {
    next();
  }
};

// export {
//   checkFormErrors,
// };

export default checkFormErrors;
