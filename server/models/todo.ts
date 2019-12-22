import mongoose from 'mongoose';


// ANCHOR Todo Schema
/* eslint-disable @typescript-eslint/camelcase */
const todoSchema = new mongoose.Schema({
  todo: {
    type: String,
    required: true,
  },
  priority: {
    type: String,
    required: true,
  },
  date_added: {
    type: Date,
    required: true,
    default: new Date()
  },
  tags: {
    type: [String],
    default: undefined,
  },
  isCompleted: {
    type: Boolean,
    default: false
  }
});
/* eslint-enable @typescript-eslint/camelcase */

const Todo = mongoose.model('Todo', todoSchema);

export default Todo;
