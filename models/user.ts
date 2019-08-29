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
  sessionId: {
    type: String,
    required: false,
  },
  sortTodoBy: {
    type: String,
    required: false,
  },
  projectFilters: {
    type: [String],
    required: false,
  },
  tagFilters: {
    type: [String],
    required: false,
  }
});
/* eslint-enable @typescript-eslint/camelcase */

const User = mongoose.model<IUserModel>('User', userSchema);

export default User;
