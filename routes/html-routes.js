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
    
  app.get("/signup", function (req, res) {
      console.log("requested sigup")
      console.log(path.join(__dirname, "../public/docs/signUp.html"));
    res.sendFile(path.join(__dirname, "../public/docs/signUp.html"));
  });

//pop-up sign in used. delete below getb before final staging

//   app.get("/signin", function (req, res) {
//    res.sendFile(path.join(__dirname, "../public/docs/signin.html"));
//  });
//    
//    app.get("/dashboard", function (req, res) {
//        console.log("dashboard redirected")
//    res.sendFile(path.join(__dirname, "../public/docs/global.html"));
//        
//});

    
  // Route to User's "Personal" tasks list
  app.get("/lists/personal", function (req, res) {
    // Change to render to Handlebars template when they're complete
    res.sendFile(path.join(__dirname, "../public/docs/documentation.html"));
  });
  // Route to User's "Outsourced" tasks list
  app.get("/lists/outsourced", function (req, res) {
    // Change to render to Handlebars template when they're complete
    res.sendFile(path.join(__dirname, "../public/docs/outsourced.html"));
  });
  // Route to User's "Claimed" tasks list
  app.get("/lists/claimed", function (req, res) {
    // Change to render to Handlebars template when they're complete
    res.sendFile(path.join(__dirname, "../public/assets/docs/claimed.html"));
  });
  // Route to "Global" tasks list
  app.get("/lists/global", function (req, res) {
    // Change to render to Handlebars template when they're complete
    res.sendFile(path.join(__dirname, "../public/assets/docs/global.html"));
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
