// Import MySQL connection
var connection = require("./connection.js");

// Assign an object for all our SQL statement functions
var orm = {
    // Select all function
    selectAll: function (tableInput, cb) {
        // Assign a variable to hold the MySQL query to select all rows (tasks) from the table passed to the function (tablename)
        var queryString = "SELECT * FROM ??"; // Prevent injection
        // Establish a connection to the SQL database with the query
        connection.query(queryString, [tableInput], function (err, result) {
            // Check for errors
            if (err) {
                throw err;
            }
            // If no errors, pass the result of the query to the callback function from sparrow.js model
            cb(result);
        });

    },
    // Insert one task into database
    insertOne: function (table, cols, vals, cb) {
        // Assign a variable to hold the MySQL query to insert one new row (task (vals parameter)) from the user input into the table and field (cols) passed to the function
        var queryString = "INSERT INTO ?? (??) VALUES (?)"; // Prevent injection
        // Establish a connection to the SQL database with the query
        connection.query(queryString, [table, cols, vals], function (err, result) {
            // Check for errors
            if (err) {
                throw err;
            }
            // If no errors, pass the result of the query to the callback function from sparrow.js model
            cb(result);
        });
    },
    // Update one task by 'assigning' it
    updateOne: function (table, ObjColVals, condition, id, cb) {
        // Assign a variable to hold the MySQL query to update one existing row (task (parameter ObjColVals)) to condition ('assigned': Boolean value of 1), at the id specified by the 'Assign" button clicked, which comes to this from sparrow.js model by way of sparrow_controller.js (routing)
        var queryString = "UPDATE ?? SET ?? = ? WHERE id = ?";
        // Establish a connection to the SQL database with the query
        connection.query(queryString, [table, ObjColVals, condition, id], function (err, result) {
            // Check for errors
            if (err) {
                throw err;
            }
            // If no errors, pass the result of the query to the callback function from sparrow.js model
            cb(result);
        });
    }
};
// Export the orm object for the model (sparrow.js).
module.exports = orm;