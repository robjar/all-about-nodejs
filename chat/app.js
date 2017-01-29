'use strict';

var path = require('path');

var express = require('express');
var app = express();
var hogan = require('hogan-express');


app.set('views', path.join(__dirname, 'views'));
app.engine('html', hogan);
app.set('view engine', 'html');
app.use(express.static(path.join(__dirname, 'public')));


app.route('/').get(function(req, res, next) {
  res.render('index', {title: 'Welcome to MegaChat!'});
});

app.route('/room').get(function(req, res, next) {
  res.render('room', {title: 'Room: room_name'});
});

app.route('/chatroom').get(function(req, res, next) {
  res.render('chatroom', {title: 'Welcome to MegaChat!'});
});

app.listen(3000, function() {
  console.log('MegaChat working on port 3000');
});
