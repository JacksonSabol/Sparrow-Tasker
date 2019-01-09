// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our models
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all of the tasks
  app.get("/api/tasks", function(req, res) {
    var query = {};
    if (req.query.user_id) {
      query.AuthorId = req.query.user_id;
    }
    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.User
    db.Task.findAll({
      where: query,
      include: [db.User]
    }).then(function(dbTask) {
      res.json(dbTask);
    });
  });

  // Get route for retrieving a single task
  app.get("/api/tasks/:id", function(req, res) {
    // Here we add an "include" property to our options in our findOne query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.User
    db.Task.findOne({
      where: {
        id: req.params.id
      },
      include: [db.User]
    }).then(function(dbTask) {
      res.json(dbTask);
    });
  });

  // POST route for saving a new task
  app.post("/api/tasks", function(req, res) {
    db.Task.create(req.body).then(function(dbTask) {
      res.json(dbTask);
    });
  });

  // DELETE route for deleting tasks
  app.delete("/api/tasks/:id", function(req, res) {
    db.Task.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbTask) {
      res.json(dbTask);
    });
  });

  // PUT route for updating posts based on characteristic of 'update' button clicked on the 'body' of the page
  app.put("/api/posts", function(req, res) {
    db.Task.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      }).then(function(dbTask) {
      res.json(dbTask);
    });
  });
};
