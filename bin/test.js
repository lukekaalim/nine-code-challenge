#!/usr/bin/env node

/**
  This code is responsible for starting and managing all the test cases,
  which includes booting up the server, and shutting it down once we're done.
  
 */

//get the main application code
const app = require('../app.js');

//start up a server.
const http = require('http');
const server = http.createServer(app);

//run the texts themselves
require('../test/main.js')(server);

//close the server (not really necessary, but a good habit)
server.close();
