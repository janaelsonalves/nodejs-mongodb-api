var express = require('express');

var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res) {
  res.send('User respond with a resource');
});

module.exports = router;