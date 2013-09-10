exports.index=function (req, res) {
	res.render('login', { title: 'The Doctor'});
}

exports.logout = function (req, res) {
  delete req.user;
  req.logout();
  res.redirect('/');
}




exports.checkAuth = function(req, res, next) {
 if ( !req.user) {
 	res.redirect('/');
  } else {
    next();
  }
}