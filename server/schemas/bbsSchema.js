const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
  username: String,
  content: String,
  time: {
    type: Date,
    default: new Date()
  },
  email: String,
  website: String
});
