import { RequestHandler, ErrorRequestHandler } from 'express';
import CommonService from './services/CommonService';
import User from '../../models/user';
import { NEW_TODO } from './todoMiddleware';


const { responsifyData, responsifyNoData, responsifyError } = CommonService;

const VALID_KEYS = ["username", "password", "projectFilters","tagFilters"];
const VALID_KEYS_LENGTH = VALID_KEYS.length;

// FIXME TODO implement key validation
const putUser: RequestHandler = async (req, res, next) => {
  try {
    const { user, body } = req as any;
    if (user == undefined) {
      return res.status(500).json({ msg: 'you not loggedin' })
    };
    const [qtyRow, updatedUser] = await User.update(body, { where: { id: user } })
    console.log(updatedUser)
    if (updatedUser === null) throw new Error('Internal Server Error')

    delete updatedUser.password;

    res.status(200).json(responsifyData('Update to user successful', updatedUser))
    next();
  } catch (error) {
    res.status(500).json(responsifyError(error.message))
    next(error);
  }
}

export {
  putUser,
}
