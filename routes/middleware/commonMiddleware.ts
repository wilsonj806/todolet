import { RequestHandler } from 'express';
import { validationResult } from 'express-validator/check';
import { errorResponse } from '../../types/index';

const checkFormErrors: RequestHandler = (req, res, next): any => {
  const validationErr = validationResult(req);
  if (!validationErr.isEmpty()) {
    const errors = validationErr.mapped();

    const resJson: errorResponse = {
      msg: 'Error: Invalid form fields',
      errors,
    };
    res.status(400).json(resJson);
  } else {
    next();
  }
};

// export {
//   checkFormErrors,
// };

export default checkFormErrors;
