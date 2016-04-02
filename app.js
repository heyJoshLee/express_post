var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var expressValidator = require('express-validator');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var stylus = require("stylus");
var nib = require("nib");
var flash = require('connect-flash');
var session = require('express-session');
var passport = require("passport");
var mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/express_post");

require('./config/passport')(passport);

var routes = require('./routes/index');
var users = require('./routes/users');
var posts = require('./routes/posts');
var categories = require('./routes/categories');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(stylus.middleware({
  src: path.join(__dirname, "public"),
  compile: function(str, p) {
    return stylus(str).set("filename", p).use(nib());
  }
}));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: "mykey",
  saveUninitialized: true,
  resave: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(require('connect-flash')());

app.use(function(req, res, next){
    res.locals.success_messages = req.flash('success');
    res.locals.error_messages = req.flash('error');
    next();
});

app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

app.use('/', routes);
app.use('/users', users);
app.use('/posts', posts);
app.use('/categories', categories);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


app.locals.basedir = path.join(__dirname, "views");

app.locals.body_preview = function(body) {
  var output = body;
  if(body.length > 140) {
    output =  body.substring(0, 137);
    output += "..."
  }
  return output;
} 

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
