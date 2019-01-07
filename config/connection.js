// Import MySQL Node Module
var mysql = require("mysql");

// Create a connection to JawsDB or localhost and the MySQL database
var connection;

if (process.env.JAWSDB_URL) {
	connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
	connection = mysql.createConnection({
		host: "localhost",
		user: "root",
		password: "",
		database: "tablename"
	});
};

connection.connect(function (err) {
    // Check for errors
    if (err) {
        console.error("Error connecting: " + err.stack);
        return;
    }
    // If no errors are thrown, log the connection id
    console.log("Connected as id " + connection.threadId);
});

module.exports = connection;