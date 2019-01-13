
var bCrypt = require('bcrypt-nodejs');
var passport = require("passport");
var LocalStrategy   = require('passport-local').Strategy;
//var models = require("")


module.exports = function(passport, auth) {
    var Auth = auth;
    //console.log(Auth);

    var LocalStrategy = require('passport-local').Strategy;
 
//console.log(passport.authenticate);

passport.use('local-signup', new LocalStrategy(
 
    {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true // allows us to pass back the entire request to the callback
 
    },function(req, email, password, done) {
        console.log("Signup for - ",email)
        var generateHash = function(password) {
            return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
 
}
    Auth.findOne({
    where: {
        email: email
    }
    }).then(function(user) {
    //console.log(user);
    if(user) {
        return done(null, false, {
            message: 'That email is already taken'
        });
        console.log('That email is already taken');
    } else {
        var userPassword = generateHash(password);
        var data = {
            email: email,
            password: userPassword,
            firstname: req.body.firstname,
            lastname: req.body.lastname
        };
 
        Auth.create(data).then(function(newUser, created) {
            if (!newUser) {
                return done(null, false);
            }
            if(newUser) {
                return done(null, newUser);
            }
 
        });
    }
});
    }
            ));
    
    //LOCAL SIGNIN
passport.use('local-signin', new LocalStrategy(
 
    {
 
        // by default, local strategy uses username and password, we will override with email
 
        usernameField: 'email',
 
        passwordField: 'password',
 
        passReqToCallback: true // allows us to pass back the entire request to the callback
 
    },
 
 
    function(req, email, password, done) {
 
        var Auth = auth;
 
        var isValidPassword = function(userpass, password) {
 
            return bCrypt.compareSync(password, userpass);
 
        }
        console.log("logged to",email)
        Auth.findOne({
            where: {
                email: email
            }
        }).then(function(user) {
 
            if (!user) {
 
                return done(null, false, {
                    message: 'Email does not exist'
                });
 
            }
 
            if (!isValidPassword(user.password, password)) {
 
                return done(null, false, {
                    message: 'Incorrect password.'
                });
 
            }
 
 
            var userinfo = user.get();
            return done(null, userinfo);
 
 
        }).catch(function(err) {
 
            console.log("Error:", err);
 
            return done(null, false, {
                message: 'Something went wrong with your Signin'
            });
 
        });
 
 
    }
 
));
    
    //serialize
passport.serializeUser(function(auth, done) {
 
    done(null, auth.id);
 
});

// deserialize user 
passport.deserializeUser(function(id, done) {
 
    Auth.findById(id).then(function(user) {
 
        if (user) {
 
            done(null, user.get());
 
        } else {
 
            done(user.errors, null);
 
        }
 
    });
 
});

    
}


    


