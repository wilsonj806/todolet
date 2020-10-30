import psLocal from 'passport-local';
import bcrypt from 'bcryptjs';
import { PassportStatic } from 'passport';
import User from './models/user';

import { IUserObj } from './types';
import {v1 as uuid} from 'uuid';

/* eslint-disable no-console */
const LocalStrategy = psLocal.Strategy;

const passportConfig = (passport: PassportStatic): any => {
  // ----- Login
  passport.use('login',new LocalStrategy(
    async (username: string, password: string, done: any): Promise<any> => {
    // Match username
      const query = { username };
      try {
        const user = await User.findOne({where : { username: query},rejectOnEmpty: true});
        if (user == null) {
          return done(null, false, { message: 'No user found' });
        }

        // Match password
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch === true) {
          return done(null, user);
        }
        return done(null, false, { message: 'Wrong password' });
      } catch (err) {
        console.error('Error alert, check below for additional logging \n', err);
      }
      return done(null, false);
    },
  ));
  passport.use('guest',new LocalStrategy(
    async (username: string, password: string, done: any): Promise<any> => {
    // Match username
      try {
        const user = await User.findOne({where : { username: 'MyAppGuest'}});
        if (user == null) {
          const genSalt = await bcrypt.genSalt(10);
          const newPass = await bcrypt.hash(process.env.GUEST_PASS!, genSalt);
          const newGuest = await User.create({
            username: 'MyAppGuest',
            password: newPass,
            id: uuid()
          })
          return done(null, newGuest)
        }

        // // Match password
        // const isMatch = await bcrypt.compare(password, user.password);
        // if (isMatch === true) {
        // console.log(user)
        return done(null, user);
        // }
        // return done(null, false, { message: 'Wrong password' });
      } catch (err) {
        console.error('Error alert, check below for additional logging \n', err);
      }
      return done(null, false);
    },
  ));

  // ----- Register
  passport.use('register',new LocalStrategy({ passReqToCallback: true},
    async (req, username: string, password: string, done: any): Promise<any> => {
      try {
        // console.log('making new password')
        const genSalt = await bcrypt.genSalt(10);
        const newPass = await bcrypt.hash(password, genSalt);
        const newUser = await User.create({ username, password: newPass });

        // ----- once done is called with the new user, Passport calls req.user = newUser
        return done(null, newUser);
      } catch (error) {
        console.log(error);
        return done(error, false);
      }
    }));

  passport.serializeUser((user: any, done: any): any => {
    done(null, user.id);
  });

  passport.deserializeUser((id: any, done: any): any => {
    done(null, id)})
};

export default passportConfig;
