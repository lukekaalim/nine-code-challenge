var express = require('express');
var router = express.Router();


router.use(function(req, res, next) {
  next();
});

/* GET home page. */
router.all('/', function(req, res, next) {
  res.status(400).end();
});

module.exports = router;
