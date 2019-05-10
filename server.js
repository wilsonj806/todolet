const express = require('express');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');

if (!process.env.MONGODB_URI) {
  require('dotenv').config()
}

const uri = process.env.MONGODB_URI;
const PORT = process.env.PORT || 5000;


mongoose.connect(uri, {
  useNewUrlParser: true,
  dbName: "Todos"
});
let db = mongoose.connection;
let Todos = require('./model/todo');

// check connection
db.once('open', async () => {
  try {
    // TODO figure out how to add error checking for this Node event
    const result = await Todos.findOne();
    console.log('Connected to MongoDB');
    console.log(result);
  } catch(error) {
    console.log(error);
  }
});

const app = express();

app.listen(PORT, () => {console.log(`Server started on port ${PORT}`)});
