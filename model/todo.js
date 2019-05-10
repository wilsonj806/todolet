let mongoose = require('mongoose');

// Article Schema
/* This is a basic schema for your articles, looks sort of like how TypeScript does typing */
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

let Todo = module.exports = mongoose.model('Todo', todoSchema, 'todos');