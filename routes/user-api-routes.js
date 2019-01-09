// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our models
var db = require("../models");

module.exports = function(app) {
  // If we want to add a feature to show all users 
  app.get("/api/users", function(req, res) {
    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Task
    db.User.findAll({
      include: [db.Task]
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });
  // GET request for a specific user, if we want to add a way to look at other user's profiles/star rating/etc
  app.get("/api/users/:id", function(req, res) {
    // Here we add an "include" property to our options in our findOne query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Task
    db.Author.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Task]
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });
  // POST request for creating a new user with form data from the DOM
  app.post("/api/users", function(req, res) {
    db.User.create(req.body).then(function(dbUser) {
      res.json(dbUser);
    });
  });
  // PUT route for updating user information based on form data sent from DOM and characteristic (unique user id) of 'update' button clicked on the 'body' of the page
  app.put("/api/users", function(req, res) {
    db.User.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      }).then(function(dbUser) {
      res.json(dbUser);
    });
  });
  // If we want to add a 'delete account' feature
  app.delete("/api/users/:id", function(req, res) {
    db.User.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });

};
