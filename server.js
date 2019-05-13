const express = require('express');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');

// Check if there's a URI for the MongoDB database
if (!process.env.MONGODB_URI) {
  require('dotenv').config()
}

const uri = process.env.MONGODB_URI;
const PORT = process.env.PORT || 5000 || 8000;

// ANCHOR Connect to database
mongoose.connect(uri, {
  useNewUrlParser: true,
  dbName: "Todos"
}, (err, res) => {
  if (err) {
    console.log('Error alert, error below');
    console.error(err);
  } else {
    console.log('Connection successful');
  }
});

let db = mongoose.connection;
let Todos = require('./model/todo');

// ANCHOR Check database connection
db.once('open', async () => {
  try {
    // TODO figure out how to add error checking for this Node event
    const result = await Todos.findOne();
    console.log('Connection to MongoDB Atlas confirmed');
  } catch (error) {
    throw new Error(error);
  }
});

const app = express();

app.listen(PORT, () => {console.log(`Server started on port ${PORT}`)});
