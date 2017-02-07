'use strict';

var path = require('path');

var express = require('express');
var app = express();
var hogan = require('hogan-express');
var cookieParser = require('cookie-parser');
var session = require('express-session');

var env = process.env.NODE_ENV || 'development';
var port = process.env.NODE_PORT || 3000;
var router = require('./router/router.js');



app.set('views', path.join(__dirname, 'views'));
app.engine('html', hogan);
app.set('view engine', 'html');
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use('/', router);

if (env === 'development') {
  app.use(session({
    secret: 'topsecret',
    saveUninitialized: true,
    resave: true
  }));
} else {

}


app.listen(3000, function() {
  console.log(`MegaChat working on port ${port}`);
  console.log(`Mode: ${env}`);
});
