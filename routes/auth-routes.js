//var authController = require('../controllers/authcontroller.js');
//var express = require("express");
//var passport = require("passport");
var passport = require("../config/passport/passport.js");
var path = require("path");
var db = require("../models");
//console.log("passport",passport);
module.exports = function(app,passport) {
 
//  app.get('/signup', function(req, res) {
//     res.render("signup");
// });
    app.get('/signin', function(req, res) {
     
     res.render("signin");
 });
    app.get("/dashboard/:userId" ,isLoggedIn,function(req,res){
        
//    res.sendFile(path.join(__dirname, "../public/docs/global.html"));
        //add data to hbs
        var getUserId = req.param.userId;
        db.user.findOne({
            where: {id:5}
        }).then(function(data){
            var hbsObject = { tasks : data };                   
              res.render("global",hbsObject);  
       // res.render("global"); 
       
    });
    });
    
   app.get("/logout",function(req,res){
       console.log("you hit me")
       req.session.destroy(function(err) {
           if(err) console.log(err)
           //req.logout();
           res.redirect('/signup');
       });
   });
    
    
    app.post('/signup/newuser', passport.authenticate('local-signup'),function(req,res){
        console.log(req.user);
        res.redirect('/dashboard/' + req.user.id);
    });
    
//    app.post('/signup/newuser', passport.authenticate('local-signup', 
//        {
//       
//        successRedirect: "/dashboard",
// 
//        failureRedirect: '/'
//    }
//                                                      ));
//                                                      
//    app.post("/signup/newuser",function(req,res){
//            console.log(req.body.email);
//             console.log("post recieved!")
//             
//             
//             })
                                                      
                                                      
                                                      
//   app.post('/signup/newuser', passport.authenticate('local-signup', {
//       
//        successRedirect: '/dashboard',
// 
//        failureRedirect: '/signup'
//    }
//));
    app.post('/signin/user', passport.authenticate('local-signin', {
        successRedirect: '/dashboard',
 
        failureRedirect: '/'
    }
                                             ));
    
   function isLoggedIn(req, res, next) {
            if (req.isAuthenticated())
                return next();
    res.redirect('/signin');
 
}                                       
                                             
 

    
 
}