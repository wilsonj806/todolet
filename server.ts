import { NODE_ENV, ENV } from './@types';
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import mongodb from 'mongodb';

import 'dotenv/config';

import Todos from './models/todo';

import routerUser from './routes/user';

// ANCHOR Dotenv setup
const { NODE_ENV, DBNAME, DBNAME_LOCAL }: ENV = process.env;

const uri: any = (NODE_ENV === 'production') ? process.env.MONGODB_URI : process.env.MONGODB_URI_LOCAL;
const dbName: any = (NODE_ENV === 'production') ? DBNAME : DBNAME_LOCAL;
const PORT = process.env.PORT || 5000 || 8000;

// ANCHOR Connect to database
mongoose.connect(uri, {
  useNewUrlParser: true,
  dbName: dbName
}, (err: mongodb.MongoError) => {
  if (err) {
    console.error(err);
    throw new Error('Error alert, see above for additional details');
  } else {
    console.log('Connection successful');
  }
});

let db = mongoose.connection;

// ANCHOR Check database connection
db.once('open', async () => {
  try {
    // TODO figure out how to add error checking for this Node event
    const result: mongoose.Document | null = await Todos.findOne();
    if (result == null) throw new Error('connection failed, check databases');
    console.log(`Connection to MongoDB database: ${dbName} confirmed`);
  } catch (error) {
    throw new Error(error);
  }
});

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/user', routerUser);

app.listen(PORT, () => {console.log(`Server started on port ${PORT}`)});

export {};