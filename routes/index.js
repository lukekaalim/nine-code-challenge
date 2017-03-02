/**
  This file resolves what hapens
  when a user posts data to the root URL of this application.
 */

const express = require('express');
const bodyParser = require('body-parser')
const router = express.Router();

//Our module which handles how to sort the show
const shows = require('../lib/shows.js');
//The standard error message that we give every response that is not successful
const errorMessage = {
  "error": "Could not decode request: JSON parsing failed"
}

//Every Content-Type should be treated as text
router.use(bodyParser.text({ type: '*/*'}));

//Try to parse every request that comes through here as JSON.
router.use(function(req, res, next) {
  try {
    req.body = JSON.parse(req.body);
  }
  catch(err) {
    //If this isn't any kind of JSON, then mark the body as empty, since
    //this route only handles JSON requests.
    req.body = undefined;
  }
  finally {
    //Go to the next middleware/route
    next();
  }
});

//This route is used for every method( as denoted by the) 'ALL',
//since "The Challenge" section of http://codingchallenge.nine.com.au/
//only loosly implies that it would be a POST method. Better safe than sorry.
router.all('/', function(req, res, next) {
  //if there is no body parsed, I.E there is no JSON to use
  if(!req.body) {
    //Throw an error and stop
    next(new Error("Non-JSON input"));
    return;
  }

  //If there is no payload property, or the payload propery isn't an Array
  const payload = req.body['payload'];
  if(!payload || !Array.isArray(payload)) {
    //Throw an error and stop
    next(new Error("No Payload property to enumerate"));
    return;
  }

  //If everthing is fine, then sort the shows from the payload.
  const validShows = shows.getValidShowsFromArray(payload);

  //And send the response
  res.json({
    response: validShows
  });
  res.status(200);
  //and close the connection
  res.end();
});

//Specific error handler for this route. This is triggered whenever
//someone posts something to this route that does not Parse to JSON
router.use(function(err, req, res, next) {
  res.status(400);
  res.json(errorMessage)
  res.end();
})

module.exports = router;
