var mongoose = require('mongoose');

// User Schema
var userSchema = mongoose.Schema({
  username: {
    type: String
  },
  password: {
    type: String
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

var User = module.exports = mongoose.model('User', userSchema);
