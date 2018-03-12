var mongoose = require('mongoose');
var categorySchema = require('../schemas/categorySchema');

module.exports = mongoose.model('Category', categorySchema);
