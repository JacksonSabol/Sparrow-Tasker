// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our models
var db = require("../models");

// Routes
// =============================================================
module.exports = function (app) {

  // GET route for getting all of the logged-in user's tasks
  app.get("/api/tasks", function (req, res) {
    var query = {};
    if (req.query.user_id) {
      query.UserId = req.query.user_id;
    }
    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.User
    db.Task.findAll({
      where: query,
      include: [db.User]
    }).then(function (data) {
      // Once Handlebars pages are set up, render JSON object to the template instead of as a response
      // res.json(data);
      // Assign a variable to point to object to hold the data from the SQL database
      var hbsObject = {
        tasks: data
      };
      // Render the new object to the '<pageName>.handlebars' template
      res.render("documentation.handlebars", hbsObject);
    });
  });

  // Get route for retrieving a single task
  app.get("/api/tasks/:id", function (req, res) {
    // Here we add an "include" property to our options in our findOne query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.User
    db.Task.findOne({
      where: {
        id: req.params.id
      },
      include: [db.User]
    }).then(function (dbTask) {
      // Once Handlebars pages are set up, render JSON object to the template instead of as a response
      res.json(dbTask);
    });
  });

  // POST route for saving a new task
  app.post("/api/tasks", function (req, res) {
    db.Task.create(req.body).then(function (dbTask) {
      // Once Handlebars pages are set up, render JSON object to the template instead of as a response
      res.json(dbTask);
    });
  });

  // DELETE route for deleting tasks
  app.delete("/api/tasks/:id", function (req, res) {
    db.Task.destroy({
      where: {
        id: req.params.id
      }
    }).then(function (dbTask) {
      // Once Handlebars pages are set up, render JSON object to the template instead of as a response
      res.json(dbTask);
    });
  });

  // PUT route for editing tasks based on characteristics of the body of the 'Update Task' form
  app.put("/api/tasks/edit", function (req, res) {
    db.Task.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      }).then(function (dbTask) {
        // Once Handlebars pages are set up, render JSON object to the template instead of as a response
        res.json(dbTask);
      });
  });
  // PUT route for updating status of task based on characteristic of 'update' button clicked on the 'body' of the page
  app.put("/api/tasks/progress", function (req, res) {
    db.Task.update(
      { status: req.body.status },
      {
        where: {
          id: req.body.id
        }
      }).then(function (dbTask) {
        // Once Handlebars pages are set up, render JSON object to the template instead of as a response
        res.json(dbTask);
      });
  });
  // PUT route for updating status of task to 'Verified' so users' dollar balances are editted as well
  app.put("/api/tasks/verified", function (req, res) {
    db.Task.update(
      { status: req.body.status },
      {
        where: {
          id: req.body.id
        }
      }).then(function (dbTask) {
        // Once Handlebars pages are set up, render JSON object to the template instead of as a response
        res.json(dbTask);
        // Update User's dollar balance
        db.User.update(
          { balance: req.body.offer_amount }, // Set on HTML/Handlebars when making the task
          {
            where: {
              id: req.body.id // Set task ID into every button on HTML/Handlebars pages to task>foreignKey
            }
          }).then(function (dbTask) {
            // Return true to continue
            res.json(true);
          });
          db.User.update(
            { balance: req.body.offer_amount }, // Set on HTML/Handlebars when making the task
            {
              where: {
                id: req.body.id // Set sparrow_id into button on HTML/Handlebars
              }
            }).then(function (dbTask) {
              // Return true to continue
              res.json(true);
            });
      });
  });
};
