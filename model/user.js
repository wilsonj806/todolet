let mongoose = require('mongoose');

// User Schema
let userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

let User = module.exports = mongoose.model('User', userSchema, 'users');