import { Request, Response, NextFunction } from "express";
import { postUserReq, responseObj } from '../../@types/index';
import { validationResult } from 'express-validator/check';
import passport from 'passport';
import bcrypt from 'bcryptjs';

import 'dotenv/config';

import User from '../../models/user';

export const postNewUser = async (req: Request, res: Response, next: NextFunction) => {
  const { username, password }: postUserReq = req.body;
  /**
   * TODO verify that error handling actually works the way error handling should;
   *
   */
  try {
    const result = await User.find({username: username});
    if (result.length === 0) {
      let newPass = '';
      bcrypt.genSalt(10, (err, salt) => {
        if(err) {
          console.log(err);
          return err;
        }
        bcrypt.hash(password, salt, (err, hash) => {
          if(err) {
            console.log(err);
            return err;
          } else {
            newPass = hash;
            User.create({ username: username, password: newPass }, (err: any) => {
              if(err) {
                console.log(err);
                return err;
              }
            });
            const resJson: responseObj = {
              msg: 'User added'
            }
            res.status(200).json(resJson);
          }
        });
      });
    } else {
      const resJson: responseObj = {
        msg: `Error, user with username: ${username} exists already`
      }
      res.status(400).json(resJson);
    }
  } catch(err) {
    console.log(err);
    throw new Error('Error alert, check above for additional logging');
  } finally {
    next();
  }
}

export const getOneUser = (req: Request, res: Response, next: NextFunction) => {
  next();
}

export const getAndValidateLogin = (req: Request, res: Response, next: NextFunction) => {
  next();
}