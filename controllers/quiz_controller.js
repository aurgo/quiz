var models = require('../models/models.js');

exports.load = function (req, res, next, quizId) {
    models.Quiz.find({
        where: { id: Number(quizId) },
        include: [{ model: models.Comment }]
    }).then( function(quiz){
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
  var options = {};
  if (req.query.search != undefined)
  {
    var texto_a_buscar = req.query.search.replace(new RegExp(' ', "g" ),'%');
    options = {where: ["pregunta like ?", '%' + texto_a_buscar + '%']}
  }
  models.Quiz.findAll(options).then(
    function(quizes) {
      res.render('quizes/index.ejs', { quizes: quizes, errors:[] });
    }
  ).catch( function(error) { next(error) });
};

exports.show = function (req, res){
    res.render('quizes/show', { quiz : req.quiz, errors:[] });
};

exports.answer = function(req, res) {
    var respuesta = 'Incorrecto';
    if (req.query.respuesta === req.quiz.respuesta)
       respuesta = 'Correcto';

  res.render('quizes/answer', { quiz: req.quiz, resultado : respuesta, errors:[]});
};

exports.new = function (req, res){
  var quiz = models.Quiz.build( { pregunta: "", respuesta: "", tema: "otro"} );
  res.render('quizes/new', { quiz : quiz, errors:[] });
};

exports.create = function (req, res){
  var quiz = models.Quiz.build( req.body.quiz );
  console.log(req.body);
  quiz.validate()
  .then(
    function(err){
      if (err)
         res.render('quizes/new', {quiz: quiz, errors: err.errors });
      else
      {
         quiz.save({ fields: ["pregunta", "respuesta", "tema"]})
         .then(function() { res.redirect('/quizes') })
      }
    }
  );
};

exports.edit = function (req, res){
  var quiz = req.quiz;
  console.log(req.quiz);
  res.render('quizes/edit', { quiz : quiz, errors:[] });
};

exports.update = function (req, res){
  req.quiz.pregunta = req.body.quiz.pregunta;
  req.quiz.respuesta = req.body.quiz.respuesta;
  req.quiz.tema = req.body.quiz.tema;

  req.quiz.validate()
  .then(
    function(err){
      if (err)
         res.render('quizes/edit', {quiz: req.quiz, errors: err.errors });
      else
      {
         req.quiz.save({ fields: ["pregunta", "respuesta", "tema"]})
         .then(function() { res.redirect('/quizes') })
      }
    }
  );
};

exports.delete = function (req, res){
  req.quiz.destroy().then( function(err){
    res.redirect('/quizes');
  }).catch(function(error) { next(error)});
};


exports.author = function(req, res) {
      res.render('author', { title: 'Quiz', errors:[] });
};
