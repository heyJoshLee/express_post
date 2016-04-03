var express = require('express');
var router = express.Router();
var Post = require("../models/post.js");
var Category = require("../models/category.js");
var helpers = require("../helpers.js");
/* Redirect to home page. */


function slugify(title) {
  var slugged = title.replace(/[^a-zA-Z\d]/g, "-");
  slugged = slugged.replace(/-{2,}/g, "-");
  return slugged;
}

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) { return next() }
    req.flash('error', 'You need to be logged in to do that');
    res.redirect("/");
}

router.get("/", function(req, res, next) {
  res.redirect("/");
});

// Show new form
router.get('/new', isLoggedIn, function(req, res, next) {
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

router.post("/:slug/delete", isLoggedIn, function(req, res, next) {
  var slug  = req.body.slug;

  Post.remove({slug: slug}, function(err, doc) {
    if (err) {
      console.log(err)
      return;
    } else {
      req.flash('success', 'Post successfully deleted');

      res.redirect("/");
    }
  });
});

router.get("/:slug/edit", isLoggedIn, function(req, res, next) {

  Post.findOne({slug: req.params["slug"]}, function(err, doc) {

    Category.find({}, function(err2, categories) {
      res.render("posts_edit", {
        title: "Editing: " + doc.title,
        categories: categories,
        post: doc
      });

    })
  });
});

router.post("/:slug/edit", isLoggedIn, function(req, res, next) {
  var title = req.body["title"],
      image = req.body["image"],
      body = req.body["body"],
      old_slug = req.body["slug"],
      categories = req.body["categories[]"];
  var slug = slugify(title)

      
  Post.update( { slug: old_slug }, 
    {
      $set: {
        title: title,
        image: image,
        body: body,
        slug: slug,
        categories: categories
      }
    }, function(err, doc) {
      req.flash('success', 'Post successfully saved');
      var redirect_url = "/posts/" + slug
      res.redirect(redirect_url)
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
router.post("/new", isLoggedIn, function(req, res, next) {
  
  var title = req.body["title"],
      image = req.body["image"],
      body = req.body["body"],
      categories = req.body["categories"]
      
  var slug = slugify(title);

  var post = {
    title: title,
    image: image,
    body: body,
    slug: slug,
    categories: categories,
    created_at: new Date(),
    author: req.user.username
  };

  Post.create(post, function(err, doc) {
    if (err) {
      console.log(err);
    } else {
      console.log("Saved");
      console.log(doc);
      req.flash('success', 'Post successfully created');
      res.redirect("/");
    }
  });  

});


module.exports = router;
