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
  slug: {
    type: String
  },
  categories: [String],
  created_at: {
    type: Date,
    default: Date.now
  }
});

var Post = module.exports = mongoose.model('Post', postSchema);


// Get user by id
module.exports.getPostById = function(id, callback){
  Post.findById(id, callback);
}

// Get user by username
module.exports.getPostBySlug = function(slug, callback){
  Post.findOne({slug: slug}, callback);
}
