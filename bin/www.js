#!/usr/bin/env node

/**
This code is the first executed, and is responsible for starting the server,
setting the port, and responding the server errors. Most of this code
is from the Express Generator(http://expressjs.com/en/starter/generator.html),
which build a framework and is a handy quick start for web applications.
 */

/**
Module dependencies.
 */

//The application itself. This houses the logic for routing and everything else
var app = require('../app');
//This just prints nicer debugs. It came with express. debugs made with This
//library will only appear in DEBUG mode
var debug = require('debug')('nine-code-challenge:server');
var http = require('http');

/**
Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '80');
app.set('port', port);

/**
Create HTTP server.
 */

var server = http.createServer(app);

/**
Listen on provided port, on all network interfaces. Log the special events
to the referenced functions.
 */

server.on('error', onError);
server.on('listening', onListening);
server.listen(port);

/**
Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
Event listener for HTTP server "error" event. This makes sure that when the
actual server encounters and issue, it shuts down correctly, like when
attempting to listen to a port that is already being used.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
