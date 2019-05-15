import mongoose from 'mongoose';
import { IUserModel } from '../@types/index';

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

const User = mongoose.model<IUserModel>('User', userSchema);

export default User;