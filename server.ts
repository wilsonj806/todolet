import express from 'express';
import session from 'express-session';
import passport from 'passport';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import 'dotenv/config';
import { uri, dbName, PORT, sessConfig } from './config/config';
import passportConfig from './config/passport';

import Todos from './models/todo';

import routerUser from './routes/user';

/**
 * ANCHOR Connect to database
 * =============================================================
 *
 */
(async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      dbName: dbName
    });
    console.log('Connection successful');
  } catch(error) {
    console.log('Error alert, see below for additional logging \n', error);
  }
})();

let db = mongoose.connection;

/**
 * ANCHOR Check database connection
 * =============================================================
 *
 */
db.once('open', async () => {
  try {
    // TODO figure out how to add error checking for this Node event
    const result: mongoose.Document | null = await Todos.findOne();
    if (result == null) throw new Error('connection failed, check databases');
    console.log(`Connection to MongoDB database: ${dbName} confirmed`);
  } catch (error) {
    console.log('Error alert, check below for additional logging \n', error);
  }
});

const app = express();

// Use Express Body-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

/**
 * ANCHOR Use and configure Express session middleware
 * =============================================================
 * TODO Figure out how to configure and export an express-session
 *  the below isn't super nice to look through
 *
 */

if (app.get('env') === 'production') {
  app.set('trust proxy', 1) // trust first proxy
  sessConfig.cookie!.secure = true // serve secure cookies
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

app.use('/user', routerUser);

app.listen(PORT, () => {console.log(`Server started on port ${PORT}`)});

export {};