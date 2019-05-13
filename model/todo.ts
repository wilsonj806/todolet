import mongoose from 'mongoose';

// Todo Schema
let todoSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  todo: {
    type: String,
    required: true
  },
  priority: {
    type: String,
    required: true
  },
  date_added: {
    type: Date,
    required: true
  },
  tags: {
    type: [String],
    default: undefined
  },
});

export default todoSchema;