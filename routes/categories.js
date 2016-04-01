var express = require('express');
var router = express.Router();
var Category = require("../models/category.js");
var Post = require("../models/post.js");

/* GET home page. */

router.get("/", function(req, res, next) {
  Category.find({}, function(err, doc) {
    if (err) {
      console.log(err);
      return;
    } else {
      res.render("categories_index", {
        categories: doc
      });
    }
  });
});

router.get('/new', function(req, res, next) {
  res.render("categories_new");
});

router.post('/new', function(req, res, next) {
  var name = req.body["name"];

  Category.create({name: name}, function(err, doc) {
    if (err) {
      console.log(err);
      return;
    } else {
      res.redirect("/categories");
    }
  });

});

router.get("/:name", function(req, res, next) {
  var category = req.params["name"];
  Post.find({categories: { $in: [category] } }, function(err, doc) {
    if (err) {
      console.log(err);
      return;
    } else {
      
      res.render("categories_show", {
        category: category,
        posts: doc
      }); 
    }
  });
});


module.exports = router;
