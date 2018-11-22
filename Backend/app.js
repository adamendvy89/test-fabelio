var createError = require('http-errors');
var express = require('express');
const mongoose = require ('mongoose')
var path = require('path');
var cors = require('cors')
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
var productRouter = require ('./routes/product')

var app = express();
app.use(cors())
// mongoose.connect("mongodb://127.0.0.1:27017/webScraping",{useNewUrlParser:true})
mongoose.connect("mongodb://fabeliouser:fabeliouser123@ds111244.mlab.com:11244/fabelio",{useNewUrlParser:true})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/product',productRouter)

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

module.exports = app;
