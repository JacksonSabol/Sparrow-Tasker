// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
var express = require("express");
// Import Handlebars
var exphbs = require("express-handlebars");

// Sets up the Express App
// =============================================================
var app = express();
var passport   = require('passport');
var session    = require('express-session');
var bodyParser = require('body-parser');
var env = require('dotenv').load();
var PORT = process.env.PORT || 8080;


// Requiring our models for syncing
var db = require("./models");


// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// For passport
app.use(session({ secret: 'keyboard cat',resave: true, saveUninitialized:true})); // session secret
 
app.use(passport.initialize());
 
app.use(passport.session()); // persistent login sessions

// Static directory
app.use(express.static("public"));

// Routes
// =============================================================
require("./routes/html-routes.js")(app);
require("./routes/auth-routes.js")(app,passport);
require("./routes/task-api-routes.js")(app);
require("./routes/user-api-routes.js")(app);
//load passport strategies
require("./config/passport/passport.js")(passport, db.Auth);

// Set Express to use Handlebars engine to generate HTML layouts
app.engine("handlebars", exphbs({ defaultLayout: "main" }));//SM change it to main before git push
app.set("view engine", "handlebars");

// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync({ force: false }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
    //console.log("'Nice! Database looks fine'")
  });
});
//// For passport
//db.sequelize.sync().then(function(){
//    console.log('Nice! Database looks fine')
// }).catch(function(err) {
//    console.log(err, "Something went wrong with the Database Update!")
//});