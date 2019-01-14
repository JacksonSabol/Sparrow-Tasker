//var authController = require('../controllers/authcontroller.js');
//var express = require("express");
//var passport = require("passport");
var passport = require("../config/passport/passport.js");
var path = require("path");
var db = require("../models");
//console.log("passport",passport);
module.exports = function (app, passport) {
    // 


    app.get("/dashboard/:userId", isLoggedIn, function (req, res) {
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
    // Login test
    app.post("/login",
        passport.authenticate("local"),
        function (req, res) {
            // If this function gets called, authentication was successful.
            // `req.user` contains the authenticated user.
            res.redirect("/tasks/personal");
        });

    app.get("/logout", function (req, res) {
        console.log("Log Out Route Hit");
        req.session.destroy(function (err) {
            if (err) console.log(err)
            //req.logout();
            res.redirect('/');
        });
    });


    app.post('/signup/newuser', passport.authenticate('local-signup'), function (req, res) {
        console.log(req.user);
        res.redirect('/tasks/personal');
    });

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