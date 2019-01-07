// Import Express
var express = require("express");
// Create an Express router for the app
var router = express.Router();
// Import the model (sparrow.js) to use its database functions
var sparrow = require("../models/sparrow.js");

// Create all the routes and set up logic within those routes where required
// Root route GET request
router.get("/", function (req, res) {
    // When the root route is hit (GET request made by the browser), invoke the selectAll function inside sparrow.js
    sparrow.selectAll(function (data) {
        // Assign a variable to point to object to hold the data from the SQL database
        var hbsObject = {
            sparrows: data
        };
        // Log for testing
        console.log(hbsObject);
        // Render the new object to the 'home.handlebars' template
        res.render("index", hbsObject);
    });
});
// Root route POST request
router.post("/", function (req, res) {
    // When a POST request is made to the root route (a new task is made), invoke the insertOne function inside sparrow.js
    // Pass the appropriate parameters: task_name for field name to be targeted, the value inside the input field for the name of the new task, and the callback function
    sparrow.insertOne("task_name", req.body.name, function () {
        // Since the ORM adds the new task object to the database, redirecting to the root route will trigger the selectAll function and display the new task
        // ** Change this to return a JSON object that can be appended to the page
        res.redirect("/");
    });
});
// PUT request - update task as 'assigned' by SQL id
router.put("/api/tasks/:id", function (req, res) {
    // When a PUT request is made to the root route (update a task), invoke the updateOne function in sparrow.js
    // Pass the appropriate parameters: field 'assigned', boolean condition value of true (1 in MySQL), 'id' of row (task) to be updated, and callback function
    sparrow.updateOne("assigned", 1, req.params.id, function (data) {
        // Return the JSON data from updating the SQL database record
        res.json(data);
    });
});

// Export the router variable (HTTP routes) for server.js to us
module.exports = router;