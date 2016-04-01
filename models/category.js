var mongoose = require('mongoose');

// User Schema
var categorySchema = mongoose.Schema({
  name: {
    type: String
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

var Category = module.exports = mongoose.model('Category', categorySchema);
