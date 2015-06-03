var express = require('express');
var router = express.Router();

//var quizController = require('../controllers/quiz_controller');

router.get('/', function(req, res, next) {
  var mensaje = (req.query.respuesta.toUpperCase() == "ROMA" ? "Correcto" : "Incorrecto");

  res.render('quizes/answer.ejs', { title: 'Quiz' , resultado: mensaje });
});

module.exports = router;
