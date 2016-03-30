var express = require('express');
var router = express.Router();
var Post = require("../models/post.js");

/* Redirect to home page. */
router.get("/", function(req, res, next) {
  res.redirect("/");
});


// Show new form
router.get('/new', function(req, res, next) {
  res.render('posts_new', { title: 'New Post' });
});

// Create new Post
router.post("/new", function(req, res, next) {
  var title = req.body["title"],
      image = req.body["image"],
      body = req.body["body"];

  var post = {
    title: title,
    image: image,
    body: body,
    created_at: new Date(),
    author: "Unknown"
  };

  Post.create(post, function(err, doc) {
    if (err) {
      console.log(err);
    } else {
      console.log("Saved");
      console.log(doc)
      res.redirect("/");
    }
  });

});


module.exports = router;
