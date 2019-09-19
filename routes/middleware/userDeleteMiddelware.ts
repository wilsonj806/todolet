import { RequestHandler, ErrorRequestHandler } from 'express';
import CommonService from './services/CommonService';
import User from '../../models/user';


const { responsifyData, responsifyNoData, responsifyError } = CommonService;

const deleteUser: RequestHandler = async (req, res, next) => {
  /*
  Delete user flow:
  ===================
  - check that there's a valid session
  - check that the user exists
  - check that the user logged in is the same as the session user
  - log the user out
  - find and delete the user by the id from the session

  */
 try {
   if (!req.session) {
     return res.status(403).json(responsifyError('Invalid client session, delete operation not executed'))
    }
    const sessionId = req.session.passport.user.toString()
    const passportId = req.user._id.toString()

   if (sessionId !== passportId) {
     return res.status(403).json(responsifyError('Invalid client session, delete operation not executed'))
   }
   const { user } = req.session.passport;
   req.logout()
   const result = await User.findByIdAndDelete(user);

   if (!result) throw new Error('No valid user found')

   res.status(200).json(responsifyNoData('User with username ' + result.username + ' successfully deleted'))
 } catch (error) {
   res.status(500).json(responsifyError('Internal server error'))
 } finally {
   console.log('should get here')
   next()
  }
}

export { deleteUser }