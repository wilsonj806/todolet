import mongoose from 'mongoose';
import { IUserModel } from '../types';

// ANCHOR User Schema
/* eslint-disable @typescript-eslint/camelcase */
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});
/* eslint-enable @typescript-eslint/camelcase */

const User = mongoose.model<IUserModel>('User', userSchema);

export default User;
