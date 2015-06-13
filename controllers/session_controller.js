
exports.loginRequired = function(req, res, next) {
  if (req.session.user)
     next();
  else
    res.redirect('/login');
};

exports.new = function (req, res){
  var errors = req.session.errors || {};
  req.session.errors = {};

  res.render('sessions/new', { errors: errors });
};

exports.create = function (req, res) {

  var login    = req.body.login;
  var password = req.body.password;

  var userController = require('./user_controller');
  userController.autenticar(login, password, function (error, user){

    if (error){
      req.session.errors = [{ "message" : '' + error }];
      res.redirect("/login");
      return;
    }

    // Guardamos el Id y el Nobre en una variable de session
    req.session.user = {id : user.id, username: user.username};

    if (!req.session.redir)
       req.session.redir = '/';

    res.redirect(req.session.redir.toString());

  });

};

exports.delete = function(req, res) {
  delete req.session.user;

  if (!req.session.redir)
     req.session.redir = '/';

  res.redirect(req.session.redir.toString());
}
