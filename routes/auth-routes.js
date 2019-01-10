//var authController = require('../controllers/authcontroller.js');
//var express = require("express");
//var passport = require("passport");
var passport = require("../config/passport/passport.js")
//console.log("passport",passport);
module.exports = function(app,passport) {
 
  app.get('/signup', function(req, res) {
     res.render("signup");
 });
    app.get('/signin', function(req, res) {
     res.render("signin");
 });
    app.get("/dashboard",isLoggedIn,function(req,res){
        res.render("dashboard");
    })
    
   app.get("/logout",function(req,res){
       console.log("you hit me")
       req.session.destroy(function(err) {
           if(err) console.log(err)
           //req.logout();
           res.redirect('/signup');
       });
   });
    
   app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/dashboard',
 
        failureRedirect: '/signup'
    }
                                            ));
    app.post('/signin', passport.authenticate('local-signin', {
        successRedirect: '/dashboard',
 
        failureRedirect: '/signin'
    }
                                             ));
    
   function isLoggedIn(req, res, next) {
            if (req.isAuthenticated())
                return next();
    res.redirect('/signin');
 
}                                       
                                             
 

    
 
}