var express = require('express');
var router = express.Router();
var Post = require("../models/post.js");
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;


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

router.get("/login", function(req, res, next) {
  res.render("login", {
    title: "Log in"
  })
});

router.get("/register", function(req, res, next) {
  res.render("register", {
    title: "Register"
  });
});

router.post("/register", function(req, res, next) {
  var username = req.body.username,
      password = req.body.password,
      password2 = req.body.password2;


  req.checkBody('username', 'Name field is required').notEmpty();
  req.checkBody('password', 'Password field is required').notEmpty();
  req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

  var errors = req.validationErrors();

  if (errors){
    res.render('register',{
      errors: errors
    });
  } else {
    passport.authenticate("local-register", {
      successRedirect: "/",
      failureRedirect: "/register",
      failureFlash: true,
      successFlash: true
    })(req, res, next);
  }
});

router.get("/logout", function(req, res, next) {
  req.logout();
  req.flash("success", "You have successfully logged out");
  res.redirect("/");
});


router.post("/login", function(req, res, next) {
  var username = req.body.username,
      password = req.body.password;

     passport.authenticate("local-login", {
       successRedirect: "/",
       failureRedirect: "/login",
       successFlash: true,
       failureFlash: true
      })(req, res, next);
});


module.exports = router;
