const mongoose = require('mongoose');
const bbsSchema = require('../schemas/bbsSchema');

module.exports = mongoose.model('BBS', bbsSchema);
