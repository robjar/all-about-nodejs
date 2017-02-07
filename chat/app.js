'use strict';

var path = require('path');
var extend = require('util')._extend;

var express = require('express');
var app = express();
var hogan = require('hogan-express');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var ConnectMongo = require('connect-mongo')(session);

var env = process.env.NODE_ENV || 'development';
var port = process.env.NODE_PORT || 3000;
var config = require('./config');
var router = require('./router/router.js');


var sessionConfig = {
  secret: config.sessionSecret,
  saveUninitialized: true,
  resave: true
};

if (env !== 'development') {
  sessionConfig = extend(sessionConfig, {
    store: new ConnectMongo({
      url: config.dbURL,
      stringify: true
    })
  });
}


app.set('views', path.join(__dirname, 'views'));
app.engine('html', hogan);
app.set('view engine', 'html');
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(session(sessionConfig));
app.use('/', router);


app.listen(3000, function() {
  console.log(`MegaChat working on port ${port}`);
  console.log(`Mode: ${env}`);
});
