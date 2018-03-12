var mongoose = require('mongoose');
var articleSchema = require('../schemas/articleSchema');

module.exports = mongoose.model('Article', articleSchema);
