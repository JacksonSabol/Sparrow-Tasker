//var authController = require('../controllers/authcontroller.js');
//var express = require("express");
//var passport = require("passport");
var passport = require("../config/passport/passport.js");
var path = require("path");
var db = require("../models");
//console.log("passport",passport);
module.exports = function (app, passport) {
    // 


    app.get("/dashboard/:userId/", isLoggedIn, function (req, res) {
        var getUserId = req.params.userId;
        console.log("Auth Route: " + getUserId);
        db.Task.findAll({
            where: { AuthId: getUserId },
            include: [db.Auth]
        }).then(function (data) {
            var hbsObject = { tasks: data };
            res.render("dashboard", hbsObject);
        });
    });
    
  // Logout users out of session
    app.get("/logout", function (req, res) {
        console.log("Log Out Route Hit");
        req.session.destroy(function (err) {
            if (err) console.log(err)
            //req.logout();
            res.redirect('/');
        });
    });

   // Authorize new users
    app.post('/signup/newuser', passport.authenticate('local-signup'), function (req, res) {
        console.log("inside signup");
        console.log(req.user);
        res.redirect('/tasks/personal');
    });

   // Authorize existing users for login

    app.post("/signin/user",passport.authenticate('local-signin'),function(req,res) {
        console.log("*******inside signin post*****");
        console.log("on success" ,req.user.email);
        res.redirect('/tasks/personal');

    });

    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated())
            return next();
        res.redirect('/signin');

    }
}