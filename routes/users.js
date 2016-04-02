var express = require('express');
var router = express.Router();
var User = require("../models/user.js");
var Post = require("../models/post.js");


/* GET users listing. */
router.get('/', function(req, res, next) {
  User.find({}, function(err, doc) {
      if(err) {
        console.log(err);
        return
      } else {
        res.render("users_index", {
        title: "All users",
        users: doc
      });
      }
  });

});

router.get("/:username", function(req, res, next) {
  var author = req.params["username"]
  Post.find({ author: author}, function(err, doc) {
    if (err) {
      console.log(err);
      return;
    } else {
      res.render("users_show", {
        title: "User | " + author,
        preview_user: author,
        posts: doc
      });
    }
  });
});

module.exports = router;
