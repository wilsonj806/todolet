import { NODE_ENV, ENV } from './@types';
import express from 'express';
import session from 'express-session';
import passport from 'passport';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import mongodb from 'mongodb';

import 'dotenv/config';
import passportConfig from './config/passport';

import Todos from './models/todo';

import routerUser from './routes/user';

// ANCHOR Dotenv setup
const { NODE_ENV, DBNAME, DBNAME_LOCAL, SESSION_SECRET }: ENV = process.env;

const uri: any = (NODE_ENV === 'production')
  ? process.env.MONGODB_URI
  : process.env.MONGODB_URI_LOCAL;
const dbName: any = (NODE_ENV === 'production')
  ? DBNAME
  : DBNAME_LOCAL;
const PORT = process.env.PORT || 5000 || 8000;

// ANCHOR Connect to database
(async () => {
  try {
    mongoose.connect(uri, {
      useNewUrlParser: true,
      dbName: dbName
    });
    console.log('Connection successful');
  } catch(error) {
    console.log('Error alert, see below for additional logging \n', error);
  }
})();

let db = mongoose.connection;

// ANCHOR Check database connection
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
 * Use Express session middleware
 *
 * TODO: CONFIGURE THIS PROPERLY
 *
 */
app.use(session({
  secret: SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
}));

// PassportJs middleware
passportConfig(passport);

app.use(passport.initialize());
app.use(passport.session());

app.use('/user', routerUser);

app.listen(PORT, () => {console.log(`Server started on port ${PORT}`)});

export {};