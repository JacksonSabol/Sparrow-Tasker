// Import Express.js
var express = require("express");
// Import Handlebars
var exphbs = require("express-handlebars");
// Assign a variable to create an instance of Express.js
var app = express();
// Assign the PORT to allow for Heroku' port of choice or (||) localhost usage at port 8080
var PORT = process.env.PORT || 8080;

// Allow Express to serve static directories (like stylesheets)
app.use(express.static("public"));

// Set up the Express app to handle data parsing (body-parser module)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set Express to use Handlebars engine to generate HTML layouts
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Import routes and give the server access to them
var routes = require('./controllers/sparrow_controller.js');
app.use(routes);

// Start the server so that it can begin listening to client requests
app.listen(PORT, function() {
  // Log (server-side) when the server has started
  console.log("Server listening on PORT: " + PORT);
});