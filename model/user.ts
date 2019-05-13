import mongoose from 'mongoose';

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

export default userSchema;