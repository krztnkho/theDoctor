var express = require('express'),
	routes= require('./routes/index'),
	api=require('./routes/api'),
	mongoose=require('mongoose'),
	passport = require('passport');
	//path=require('path');
var app = express();
mongoose.connect('mongodb://localhost/doctor');





app.configure(function () {
	app.set('view engine', 'ejs');
	app.set('views', __dirname + '/public/views');
	app.use(express.cookieParser());
	app.use(express.bodyParser());
	//simulate delete and put
	app.use(express.methodOverride());
	app.use(express.session({secret: 'its a s3cr3t'}));
	//passport
	app.use(passport.initialize());
  	app.use(passport.session());
	app.use(app.router);
	app.use(express.static(__dirname + '/public'));
	//app.use(express.static(path.join(__dirname + '/public')));
	
	
});



// curl localhost:9090
app.get('/', routes.index);
//logging in
//app.post('/',routes.validate);
app.post('/',
  passport.authenticate('local',  { successRedirect: '/office', failureRedirect: '/' }),
									  function(req, res) {
									    // If this function gets called, authentication was successful.
									    // `req.user` contains the authenticated user.
									    console.log(req.user.username);
									    res.redirect('/office' + req.user.username);
									  });	
//sign up
app.post('/office',api.addUser);

//access success
app.get('/office',routes.checkAuth,api.ofc);

//logout
app.get('/logout', routes.logout);

app.delete('/office',api.delUser);
app.post('/chat',api.find_Response);

app.listen(9090, function () {
	console.log('App listening on localhost:9090');
});