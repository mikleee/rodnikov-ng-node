var express = require('express');
const path = require("path");
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('users/users', { title: 'Express' });
});

module.exports = router;
