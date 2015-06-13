var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var partials = require('express-partials');
var methodOverride = require('method-override');
var session = require('express-session');

/* ROUTES */
var routes = require('./routes/index');
/* ROUTES */

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(partials());
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser('Quiz-2015'));
app.use(session({ secret: 'Quiz-2015',
                  resave: false,
                  saveUninitialized: true,
                  rolling: true,
                  cookie: { maxAge: 120000 }
                }));

app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next){

  // Guardamos el path en session.redir para despues del login
  if (!req.path.match(/\/login|\/logout/)) {
    req.session.redir = req.path;
  }

  // Hacer visible req.session en las vistas
  res.locals.session = req.session;
  next();
});

/* ROUTES */
app.use('/', routes);
app.use('/quizes', routes);
app.use('/quizes/:quizId(\\d+)', routes);
app.use('/quizes/:quizId(\\d+)/answer', routes);
app.use('/quizes/:quizId(\\d+)/edit', routes);
app.use('/author', routes);
/* ROUTES */


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err,
      errors:[]
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {},
    errors:[]
  });
});


module.exports = app;
