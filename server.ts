import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import mongodb from 'mongodb';

import 'dotenv/config';

import Todos from './model/todo';

const uri: any = process.env.MONGODB_URI;
const PORT: Number | String = process.env.PORT || 5000 || 8000;

// ANCHOR Connect to database
mongoose.connect(uri, {
  useNewUrlParser: true,
  dbName: "Todos"
}, (err: mongodb.MongoError) => {
  if (err) {
    console.log('Error alert, error below');
    console.error(err);
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
    console.log(result);
    console.log('Connection to MongoDB Atlas confirmed');
  } catch (error) {
    throw new Error(error);
  }
});

const app = express();

app.listen(PORT, () => {console.log(`Server started on port ${PORT}`)});

export {};