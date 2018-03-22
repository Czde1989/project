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
  audio: {
    type: Array,
    default: []
  },
  video: {
    type: Array,
    default: []
  }
});
