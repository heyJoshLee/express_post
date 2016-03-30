var mongoose = require('mongoose');

// User Schema
var postSchema = mongoose.Schema({
  title: {
    type: String
  },
  image: {
    type: String
  },
  body: {
    type: String
  },
  author: {
    type: String
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

var Post = module.exports = mongoose.model('Post', postSchema);
