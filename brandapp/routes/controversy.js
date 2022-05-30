var express = require('express');
var router = express.Router();

/* GET controversy. */
router.get('/', function(req, res, next) {
  res.render('controversy');
});

module.exports = router;
