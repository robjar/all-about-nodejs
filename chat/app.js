'use strict';

var path = require('path');

var express = require('express');
var app = express();
var hogan = require('hogan-express');

var router = require('./router/router.js');



app.set('views', path.join(__dirname, 'views'));
app.engine('html', hogan);
app.set('view engine', 'html');
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', router);

app.listen(3000, function() {
  console.log('MegaChat working on port 3000');
});
