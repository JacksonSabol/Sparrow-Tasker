var bCrypt = require('bcrypt-nodejs');
module.exports = function(passport, auth) {
    
    var Auth = auth;
    var LocalStrategy = require('passport-local').Strategy;
 
};

passport.use('local-signup', new LocalStrategy(
 
    {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true // allows us to pass back the entire request to the callback
 
    },function(req, email, password, done) {
 
}
 
));