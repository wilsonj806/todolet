import path from 'path';
import express from 'express';
import cors from 'cors';
import session from 'express-session';
import passport from 'passport';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import 'dotenv/config';
import {
  uri, dbName, sessConfig, corsOptions, NodeENV
} from './config/config';

import passportConfig from './config/passport';

import routerUser from './routes/user';
import routerHtml from './routes/html'

/* eslint-disable no-console */

/**
 * ANCHOR Connect to database
 * =============================================================
 *
 * NOTE The app runs off of `app/dist` because that's where TypeScript builds the app to
 */
(async (): Promise<any> => {
  try {
    mongoose.set('useFindAndModify', false);
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      dbName,
    });
    console.log('Connection successful');
  } catch (error) {
    console.error('Error alert, see below for additional logging \n', error);
  }
})();

const app = express();

// Use Express Body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// NOTE if the corsOptions needs to be more complex, use Object.assign and more corsOptions objects
app.use(cors(corsOptions));

/**
 * ANCHOR Use and configure Express session middleware
 * =============================================================
 * TODO Figure out how to configure and export an express-session
 *  the below isn't super nice to look through
 *
 */

if (app.get('env') === 'production') {
  app.set('trust proxy', 1); // trust first proxy
  if (sessConfig.cookie) {
    sessConfig.cookie.secure = true; // serve secure cookies
  }
}

app.use(session(sessConfig));

/**
 * ANCHOR Use and initialize PassportJS
 * =============================================================
 *
 */
passportConfig(passport);

app.use(passport.initialize());
app.use(passport.session());

const staticLocation = NodeENV === 'production' ? express.static(path.join(__dirname, '../assets')) : express.static(path.join(__dirname, 'assets'))

app.use('/static', staticLocation);
app.use('/dist', express.static(path.join(__dirname, 'dist')));
/**
 * ANCHOR Routes
 * =============================================================
 *
 */
app.use('/api/user', routerUser);

app.get('/test', (req,res,next) => {
  res.status(200).json({ message: 'hi' })
})

app.use('/', routerHtml)
// app.get('/*', (req, res) =>
//   res.sendFile(path.join(__dirname, staticLocation,'index.html')
// ))
/* eslint-enable no-console */

export { app, mongoose, staticLocation };
