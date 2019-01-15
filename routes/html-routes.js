// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");


// Routes
// =============================================================
module.exports = function (app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.

  // Root route loads landingPage.html
  app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/docs/landingPage.html"));
  });
  // Route to direct user to signUp page
  app.get("/signup", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/docs/signUp.html"));
  });

 //Route existing users to login page
  app.get("/signin", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/docs/login.html"));
  });

  // Route to update User's profile page
  app.get("/update/profile", function (req, res) {
    // Could potentially use a DB query and Handlebars to render User's current information into the placeholders of the input fields
    res.sendFile(path.join(__dirname, "../public/docs/sparrowUser.html"));
  });
  // Route to create a new Task
  app.get("/tasks/new", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/docs/tasksTemplate.html"));

  });
  // Routes to Sign In, Sign Up, and Log Out are handled in the auth-routes.js

};
