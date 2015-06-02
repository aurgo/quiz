var express = require('express');
var router = express.Router();

//var quizController = require('../controllers/quiz_controller');

router.get('/', function(req, res, next) {
  res.render('quizes/question.ejs', { title: 'Quiz' });
});

module.exports = router;
