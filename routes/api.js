var User = require('../model/user'),
  KBase = require("../model/knowledgebase"),
	mongoose = require('mongoose'),
	passport = require('passport'), 
	LocalStrategy = require('passport-local').Strategy;

var ObjectId =mongoose.Types.ObjectId;

//oath
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new LocalStrategy(function(username, password, done) {
    User.findOne({ username: username }, function(err, user) {
      if (err) { 
        return done(err); 
      }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (user.password !=password) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));
//oath

exports.ofc=function (req, res) {
		res.render('office',{	title: "The Doctor is In", user: req.user.username});	

}
//user model
exports.addUser=function (req,res,next) {
	var post=req.body;
  
  	var user_data = {
  		username : post.username,
  		password : post.password
  	}
  	var user = new User(user_data);
    
	user.save(function(err,data){
		if(err){
			res.json(error);
		}else{
			console.log("Added a User"+data);
			res.redirect("/");
		}
	});
	
}


exports.delUser=function(req,res){
	//console.log("delete "+req.body.username);
	//User.remove({key:value});
	User.findOne( {username: req.body.username}, function ( err, usr ){
   	usr.remove(function ( err ){
      		if( err ) return res.json(err);
      		console.log("remove user "+usr);
      		res.send(usr);
  		});
  	});
	
	
}

//user model end

//knowldege base
exports.find_Response= function(req,res){
  var output=JSON.stringify(req.body);
  
  console.log("Request.body: "+output);
  KBase.findOne({input: req.body.message}, function(err, result){
   
    if(result){
      console.log("Result1: "+typeof(result)+" ="+result);
      res.send(result);
    }else{
      KBase.findOne({input: "OTHERS"}, function(err,result){
        console.log("Result2: "+typeof(result)+" ="+result);
        res.send(result);   
      });
    }
  });    
}
//knowledge base end
