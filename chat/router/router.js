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

// session test
router.get('/setcolor', function(req, res, next) {
  req.session.favColor = "green";
  res.send('Setting favourite color!');
});

router.get('/getcolor', function(req, res, next) {
  var favColor = req.session.favColor ? req.session.favColor : 'Not found';
  res.send('Favourite color: ' + favColor);
});

module.exports = router;