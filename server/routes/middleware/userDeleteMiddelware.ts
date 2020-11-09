import { RequestHandler, ErrorRequestHandler } from "express";
import CommonService from "./services/CommonService";
import User from "../../models/user";

const { responsifyData, responsifyNoData, responsifyError } = CommonService;

const deleteUser: RequestHandler = async (req, res, next) => {
  // FIXME in the future, make the middleware send an email to confirm
  try {
    if (!req.session) {
      return res
        .status(403)
        .json(
          responsifyError(
            "Invalid client session, delete operation not executed"
          )
        );
    }
    // const sessionId = req.session.passport.user.toString()

    // if (sessionId !== req.user.id) {
    //   return res.status(403).json(responsifyError('Invalid client session, delete operation not executed'))
    // }
    // const { user } = req.session.passport;
    const id = req.user;
    const result = await User.destroy({
      where: { id },
    });

    if (!result) throw new Error("No valid user found");
    req.logout();

    req.session.destroy((err) => {
      if (err) {
        throw new Error(err.message);
      }
    });

    res.status(200).json(responsifyNoData("User  successfully deleted"));
  } catch (error) {
    res.status(500).json(responsifyError("Internal server error"));
  } finally {
    next();
  }
};

export { deleteUser };
