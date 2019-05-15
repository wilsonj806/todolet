import psLocal from 'passport-local';
import User from '../models/user';
import bcrypt from 'bcryptjs';
import { PassportStatic } from 'passport';

import { IUserObj } from '../@types/index';

const LocalStrategy = psLocal.Strategy;

const passportConfig = (passport: PassportStatic) => {
  passport.use(new LocalStrategy( async (username: string, password: string, done: any) => {
    // Match username
    let query = {username: username};
    try {
      const user: IUserObj | null = await User.findOne(query);
      if(user == null) {
        return done(null, false, { message: 'No user found' });
      }

      // Match password
      const isMatch = await bcrypt.compare(password, user.password);
      if(isMatch === true) {
        return done(null, user);
      } else {
        return done(null, false, {message: 'Wrong password'});
      }
    } catch(err) {
      console.log('Error alert, check below for additional logging \n', err)
    }
  }));

  passport.serializeUser((user: any, done: any) => {
    done(null, user.id);
  });

  passport.deserializeUser((id: any, done: any) => {
    User.findById(id, function(err, user) {
      done(err, user);
    })
  })
}

export default passportConfig;