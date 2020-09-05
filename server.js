var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var methodOverride=require('method-override');
var cron=require('node-cron');
var session = require('express-session');
//var passport = require('passport');
var cron=require('node-cron');
var em = require('./controllers/email');
const Option = require('./models/option');

// cron.schedule('1,2,4,5 * * * *', () => {
//   console.log('running every minute 1, 2, 4 and 5');
// });

require('dotenv').config();
require('./config/database');
//require('./config/passport');

var indexRouter = require('./routes/index');
var optionsRouter = require('./routes/options');

var app = express();
app.use(methodOverride("_method"));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cookieParser());
app.use(session({
  secret: 'SEIRocks!',
  resave: false,
  saveUninitialized: true
}));
//app.use(passport.initialize());
//app.use(passport.session());

app.use(function (req, res, next) {
  res.locals.user = req.user;
  next();
}); // important (not getting error)

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/options', optionsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

Option.find({}, function(err, options) {
  //console.log(options)
  em.sendEmail(options, 'vijaybabu.srireddy@gmail.com');
});

app.listen(3001);

module.exports = app;