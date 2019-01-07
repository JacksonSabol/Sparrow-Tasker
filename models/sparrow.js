// Import the ORM to create functions that will interact with the database
var orm = require("../config/orm.js");

// Create the sparrow model
var sparrow = {
    // Select all tasks function - parameter 'cb' is a callback function from the the sparrow_controller
    selectAll: function (cb) {
        // Invoke the ORM's selectAll function to query the SQL database with the tableInput as "<tablename>"
        orm.selectAll("tablename", function (res) {
            // Pass the results of the SQL database query to the callback function passed by sparrow_controller once the results are received
            cb(res);
        });
    },
    // Insert one task function - cols parameter is key sent from sparrow_controller, vals is the value, and cb is the callback
    insertOne: function (cols, vals, cb) {
        // Invoke the ORM's insertOne function to query the SQL database to insert one into the table of "<tablename>", the field of "cols" (task_name from sparrow_controller), with the value of vals (user inputted task name)
        orm.insertOne("tablename", cols, vals, function (res) {
            // Pass the results of the SQL database query to the callback function passed by sparrow_controller once the results are received
            cb(res);
        });
    },
    // Update one task function (i.e. assign one task) - objColValues parameter is key from sparrow_controller (assigned), condition is boolean value (of 1 for true), id is the id of the row (task) to be updated as 'assigned', and cb is the callback function to return the data to sparrow_controller
    updateOne: function (objColValues, condition, id, cb) {
        // Invoke the ORM's updateOne function to query the SQL database to update one row (task) in the table of "<tablename>": update the field of "objColValues" (assigned from sparrow_controller) to the condition (1 for true from sparrow_controller), at the id specified by the 'Assign" button clicked which also comes to this from sparrow_controller (routing)
        orm.updateOne("tablename", objColValues, condition, id, function (res) {
            // Pass the results of the SQL database query to the callback function passed by sparrow_controller once the results are received
            cb(res);
        });
    }
};

// Export the database functions for the controller (sparrow_controller.js)
module.exports = sparrow;