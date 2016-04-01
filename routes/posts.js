var express = require('express');
var router = express.Router();
var Post = require("../models/post.js");
var Category = require("../models/category.js");

/* Redirect to home page. */


function slugify(title) {
  var slugged = title.replace(/[^a-zA-Z\d]/g, "-");
  slugged = slugged.replace(/-{2,}/g, "-");
  return slugged;
}

router.get("/", function(req, res, next) {
  res.redirect("/");
});


// Show new form
router.get('/new', function(req, res, next) {
  Category.find({}, function(err, doc) {
    if (err) {
      console.log(err);
      return;
    } else {
      res.render('posts_new', { 
        title: 'New Post',
        categories: doc
      });
    }
  });
});

router.get("/:slug", function(req, res, next) {
  Post.findOne({slug: req.params["slug"]}, function(err, doc) {
    res.render("posts_show", {
      title: doc.title,
      post: doc
    })
  });
});



// Create new Post
router.post("/new", function(req, res, next) {
  
  var title = req.body["title"],
      image = req.body["image"],
      body = req.body["body"],
      categories = req.body["categories[]"]
      
  var slug = slugify(title);

  var post = {
    title: title,
    image: image,
    body: body,
    slug: slug,
    categories: categories,
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
