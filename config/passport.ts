import psLocal from 'passport-local';
import bcrypt from 'bcryptjs';
import { PassportStatic } from 'passport';
import User from '../models/user';

import { IUserObj } from '../types';

const LocalStrategy = psLocal.Strategy;

const passportConfig = (passport: PassportStatic): any => {
  passport.use(new LocalStrategy(
    async (username: string, password: string, done: any): Promise<any> => {
    // Match username
      const query = { username };
      try {
        const user: IUserObj | null = await User.findOne(query);
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

  passport.serializeUser((user: any, done: any): any => {
    done(null, user.id);
  });

  passport.deserializeUser((id: any, done: any): any => {
    User.findById(id, (err, user): any => {
      done(err, user);
    });
  });
};

export default passportConfig;
