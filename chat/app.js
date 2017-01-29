'use strict';

var express = require('express');
var app = express();

app.route('/').get(function(req, res, next) {
  res.send('<h1>Hello World!');
});

app.listen(3000, function() {
  console.log('MegaChat working on port 3000');
});
