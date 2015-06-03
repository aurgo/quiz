var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');

router.get('/author', function(req, res, next) {
  res.render('author', { title: 'Quiz' });
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Quiz' });
});

module.exports = router;
