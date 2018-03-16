const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
  username: String,
  content: String,
  time: {
    type: Date,
    default: new Date()
  },
  reply: {
    type: Array,
    default: []
  },
  email: String,
  website: String
});
