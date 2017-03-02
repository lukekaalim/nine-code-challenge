const express = require('express');
const bodyParser = require('body-parser')
const router = express.Router();

const errorMessage = {
  "error": "Could not decode request: JSON parsing failed"
}

//Every Content-Type should be treated as text.
router.use(bodyParser.text({ type: '*/*'}));

//Parse every request that comes through here as JSON.
router.use(function(req, res, next) {
  try {
    req.body = JSON.parse(req.body);
  }
  catch(err) {
    req.body = undefined;
  }
  finally {
    next();
  }
});

/* GET home page. */
router.all('/', function(req, res, next) {
  //if there is no body parsed, I.E there is no JSON to use
  if(!req.body) {
    //Throw an error
    next(new Error("Non-JSON input"));
    return;
  }

  const payload = req.body['payload'];
  if(!payload) {
    //Throw an error
    next(new Error("No Payload property to enumerate"));
    return;
  }


});

//Specific error handler for this route
router.use(function(err, req, res, next) {
  res.status(400);
  res.json(errorMessage).end();
})

module.exports = router;
