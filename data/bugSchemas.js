const mongoose = require('mongoose');
const comment = require('./commentSchemas');

// eslint-disable-next-line prefer-const
// eslint-disable-next-line prefer-destructuring
const commentSchema = comment.commentSchema;

const tagSchema = new mongoose.Schema({
  name: { type: String, required: true },
  colour: { type: String, required: true }
});

const bugSchema = new mongoose.Schema({
  name: { type: String, required: true },
  author: { type: String, required: true },
  status: { type: String, required: true },
  description: { type: String },
  tags: [tagSchema],
  date: { type: Date, default: Date.now() },
  comments: [commentSchema],
  archived: { type: Boolean, default: false }
});

const bugModel = mongoose.model('bugs', bugSchema);

module.exports = {
  bugSchema,
  bugModel
};
