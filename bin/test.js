#!/usr/bin/env node

/**
  This code is responsible for starting and managing all the test cases,
  which includes booting up the server, and shutting it down once we're done.
 */

//get the main application code
var app = require('../app.js');

//start up a server.
var http = require('http');
var server = http.createServer(app);

//run the tests themselves

//these tests will send mock requests to an instance of the app
describe('Functional Tests', function() {
  require('../test/nine.test.js')(server);
  require('../test/application.test.js')(server);
});
describe('Unit Tests', function() {
  require('../test/shows.test.js')();
})

//close the server (not really necessary, but a good habit)
server.close();
