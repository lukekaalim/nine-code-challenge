/**
This file contains the actual application code, booting up the express
framework, assigning the routers.
 */

//The server framework
var express = require('express');
//utilities
var path = require('path');
var morganLogger = require('morgan');
//standard middleware
var bodyParser = require('body-parser');

var index = require('./routes/index');

var app = express();

//Make sure to log every request with morganlogger
app.use(morganLogger('dev'));

//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: false }));

//Route all requests to the root URL to Index.js
app.use('/', index);


// catch 404 and forward to error handler. If the request does not respond

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
