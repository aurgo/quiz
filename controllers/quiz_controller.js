var models = require('../models/models.js');

exports.load = function (req, res, next, quizId) {
    models.Quiz.findById(quizId).then( function(quiz){
    if (quiz)
    {
      console.log("Existe el Quiz");
      req.quiz = quiz;
      next();
    }
    else { console.log("NO Existe el Quiz"); next(new Error('No existe quizId=' + quizId)); }
  }).catch( function(error) { next(error) });
}

exports.index = function(req, res) {
  models.Quiz.findAll().then(
    function(quizes) {
      res.render('quizes/index.ejs', { quizes: quizes });
    }
  ).catch( function(error) { next(error) });
};

exports.index = function(req, res) {
  models.Quiz.findAll().then(
    function(quizes) {
      res.render('quizes/index.ejs', { quizes: quizes });
    }
  ).catch( function(error) { next(error) });
};

exports.show = function (req, res){
    res.render('quizes/show', { quiz : req.quiz });
};

exports.answer = function(req, res) {
    var respuesta = 'Incorrecto';
    if (req.query.respuesta === req.quiz.respuesta)
       respuesta = 'Correcto';

  res.render('quizes/answer', { quiz: req.quiz, resultado : respuesta});
};

exports.author = function(req, res) {
      res.render('author', { title: 'Quiz' });
};
