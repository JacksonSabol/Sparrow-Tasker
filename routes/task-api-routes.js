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
  // GET route for getting all of the logged-in user's Personal tasks
  app.get("/tasks/personal", loggedIn, function (req, res, next) {
    var getUserID = req.user.id;
    db.Task.findAll({
      where: {
        AuthId: getUserID,
        status: "Personal"
      },
      include: [db.Auth]
    }).then(function (data) {
      // Assign a variable to point to object to hold the data from the SQL database
      var hbsObject = {
        tasks: data
      };
      // Render the new object to the 'dashboard.handlebars' template
      res.render("dashboard", hbsObject);
    });
  });
  // GET route for getting all of the logged-in user's Claimed tasks
  app.get("/tasks/claimed", loggedIn, function (req, res, next) {
    var getUserID = req.user.id;
    db.Task.findAll({
      where: {
        AuthId: getUserID,
        status: "Claimed"
      },
      include: [db.Auth]
    }).then(function (data) {
      // Assign a variable to point to object to hold the data from the SQL database
      var hbsObject = {
        tasks: data
      };
      // Render the new object to the 'claimed.handlebars' template
      res.render("claimed", hbsObject);
    });
  });
  // GET route for getting all of the logged-in user's Outsourced tasks
  app.get("/tasks/outsourced", loggedIn, function (req, res, next) {
    var getUserID = req.user.id;
    db.Task.findAll({
      where: {
        AuthId: getUserID,
        status: "Outsourced"
      },
      include: [db.Auth]
    }).then(function (data) {
      // Assign a variable to point to object to hold the data from the SQL database
      var hbsObject = {
        tasks: data
      };
      // Render the new object to the 'outsourced.handlebars' template
      res.render("outsourced", hbsObject);
    });
  });
  // GET route for getting all of the logged-in user's completed tasks
  app.get("/tasks/completed", loggedIn, function (req, res, next) {
    var getUserID = req.user.id;
    db.Task.findAll({
      where: {
        AuthId: getUserID,
        status: "Completed"
      },
      include: [db.Auth]
    }).then(function (data) {
      // Assign a variable to point to object to hold the data from the SQL database
      var hbsObject = {
        tasks: data
      };
      // Render the new object to the 'completed.handlebars' template
      res.render("completed", hbsObject);
    });
  });
  // GET route for getting all of the Outsourced tasks that have yet to be claimed (Global list)
  app.get("/tasks/global", loggedIn, function (req, res, next) {
    db.Task.findAll({
      where: { status: "Outsourced" }
    }).then(function (data) {
      // Assign a variable to point to object to hold the data from the SQL database
      var hbsObject = {
        tasks: data
      };
      // Render the new object to the '<pageName>.handlebars' template
      res.render("global", hbsObject);
    });
  });
  // POST route for saving a new task
  app.post("/api/tasks", loggedIn, function (req, res, next) {
    console.log("Server side New Task");
    console.log(req.body);
    var getUserID = req.user.id;
    console.log(getUserID);
    var newTask = req.body;
    newTask["AuthId"] = getUserID;
    db.Task.create(newTask).then(function (data) {
      // Return a true response to redirect on client side
      res.json(true);
    });
  });

  // DELETE route for deleting tasks
  app.delete("/api/tasks/:id", function (req, res) {
    db.Task.destroy({
      where: {
        id: req.params.id
      }
    }).then(function (data) {
      // Once Handlebars pages are set up, render JSON object to the template instead of as a response
      // res.json(dbTask);
      // Assign a variable to point to object to hold the data from the SQL database
      var hbsObject = {
        tasks: data
      };
      // Render the new object to the 'documentation.handlebars' template for displaying the "Personal" tasks tab
      res.render("documentation.handlebars", hbsObject);
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
      }).then(function (data) {
        // res.json(dbTask);
        // Assign a variable to point to object to hold the data from the SQL database
        var hbsObject = {
          tasks: data
        };
        // Return 'true' to the DOM and redirect to dashboard on client side
        res.json(true);
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
        // Return the updated Task object as a JSON response for management on the front-end Progress bar - no need to render to a Handlebars template
        res.json(dbTask);
      });
  });
  // PUT route for updating status of task to 'Verified' so users' dollar balances are edited as well
  app.put("/api/tasks/verified", function (req, res) {
    // Update the Task status to 'Verified'
    var updateTask = db.Task.update(
      { status: req.body.status },
      {
        where: {
          id: req.body.id
        }
      });

    var updateUserBalance = db.User.update(
      { balance: req.body.offer_amount }, // Set on HTML/Handlebars when making the task
      {
        where: {
          id: req.body.id // Set task ID into every button on HTML/Handlebars pages to task>foreignKey
        }
      });

    var updateSparrowBalance = db.User.update(
      { balance: req.body.offer_amount }, // Set on HTML/Handlebars when making the task
      {
        where: {
          id: req.body.id // Set sparrow_id into button on HTML/Handlebars
        }
      });
    Promise
      .all([updateTask, updateUserBalance, updateSparrowBalance])
      .then(function (responses) {
        console.log('**********COMPLETE RESULTS****************');
        console.log(responses[0]); // updated Task
        console.log(responses[1]); // updated User balance
        console.log(responses[2]); // updated Sparrow balance
        // Assign a variable to point to object to hold the data from the SQL database
        var hbsObject = {
          tasks: responses[0]
        };
        // Render the updated object to the 'documentation.handlebars' template for displaying the "Personal" tasks tab
        res.render("documentation.handlebars", hbsObject);
      })
      .catch(function (err) {
        console.log('**********ERROR RESULT****************');
        console.log(err);
      });
  });
};
// Middleware function to check if user is logged in and get their info if they are
function loggedIn(req, res, next) {
  if (req.user) {
    next();
  }
  else {
    console.log("Logged in was not conserved");
    res.redirect('/');
  }
}