var passport = require("../config/passport/passport.js");

module.exports = function (app, passport) {
    // Logout user
    app.get("/logout", function (req, res) {
        req.session.destroy(function (err) {
            if (err) console.log(err)
            res.redirect('/');
        });
    });

    // Authorize new user
    app.post('/signup/newuser', passport.authenticate('local-signup'), function (req, res) {
        res.redirect('/tasks/personal');
    });

    // Authorize existing user
    app.post("/signin/user", passport.authenticate('local-signin'), function (req, res) {
        res.redirect('/tasks/personal');
    });
}