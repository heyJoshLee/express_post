var express = require('express');
var router = express.Router();
var Post = require("../models/post.js");


router.get("/flash", function(req, res, next) {
  res.redirect("/");
});

/* GET home page. */
router.get('/', function(req, res, next) {

  Post.find({}, function(err, doc) {
      if (err) {
        res.render("error");
      }
      res.render('posts_index', { 
      title: 'Post It',
      posts: doc    
    });

  });

});

module.exports = router;
