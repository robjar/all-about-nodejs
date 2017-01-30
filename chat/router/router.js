var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', {title: 'Welcome to MegaChat!'});
});

router.get('/room', function(req, res, next) {
  res.render('room', {title: 'Room: room_name'});
});

router.get('/chatroom', function(req, res, next) {
  res.render('chatroom', {title: 'Welcome to MegaChat!'});
});

module.exports = router;