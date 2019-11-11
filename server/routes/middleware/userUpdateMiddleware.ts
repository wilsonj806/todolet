import { RequestHandler, ErrorRequestHandler } from 'express';
import CommonService from './services/CommonService';
import User from '../../models/user';


const { responsifyData, responsifyNoData, responsifyError } = CommonService;

const VALID_KEYS = ["username", "email", "password", "projectFilters","tagFilters"];
const VALID_KEYS_LENGTH = VALID_KEYS.length;

// FIXME TODO implement key validation
const putUser: RequestHandler = async (req, res, next) => {
  try {
    const { user, body } = req
    // console.log(body);
    await User.findOneAndUpdate({ _id:user._id }, body)

    const updatedUser = await User.findById(user._id) || null;
    if (updatedUser === null) throw new Error('Internal Server Error')

    delete updatedUser.password;
    delete updatedUser.__v;

    res.status(200).json(responsifyData('Update to user successful', updatedUser))
  } catch (error) {
    res.status(500).json(responsifyError(error.message))
  }
}

export default putUser
