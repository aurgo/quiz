var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');

router.get('/', quizController.index);
router.get('/quizes', quizController.index);
router.get('/author', quizController.author);
router.get('/question', quizController.question);
router.get('/answer', quizController.answer);

module.exports = router;
