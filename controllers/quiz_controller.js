var models = require('../models/models.js');

exports.index = function(req, res) {
  var options = {};

  models.Quiz.findAll(options).then(
    function(quizes) {
      res.render('index.ejs', {title : 'Quiz'});
    }
  ).catch(function(error){next(error)});
};

exports.question = function (req, res){
  models.Quiz.findAll().then(function (quiz) {
    res.render('quizes/question', { pregunta: quiz[0].pregunta })
  })
};

exports.answer = function(req, res) {
  models.Quiz.findAll().then(function (quiz) {
    if (req.query.respuesta === quiz[0].respuesta)
       res.render('quizes/answer', { resultado : 'Correcto'})
    else
       res.render('quizes/answer', { resultado : 'Incorrecto'})
  })
};

exports.author = function(req, res) {
      res.render('author', { title: 'Quiz' });
};
