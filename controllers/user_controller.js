
var users = { admin:   { id:1, username:"admin", password:"1234"},
              armando: { id:2, username:"armando", password:"admin"}
};

exports.autenticar = function(login, password, callback) {

  if (users[login] && password === users[login].password)
    callback(null, users[login]);
  else
    callback(new Error("Usuario o password incorrectos"));
};
