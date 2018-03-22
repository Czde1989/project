const mongoose = require('mongoose');
const lifeSchema = require('../schemas/lifeSchema');

module.exports = mongoose.model('Life', lifeSchema);
