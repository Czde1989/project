const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
  content: String,
  time: {
    type: Date,
    default: new Date()
  },
  pictures: {
    type: Array,
    default: []
  },
  tags: {
    type: Array,
    default: []
  },
  comments: {
    type: Array,
    default: []
  },
  views: {
    type: Number,
    default: 0
  },
  audio: {
    type: Array,
    default: []
  },
  video: {
    type: Array,
    default: []
  }
});
