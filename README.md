# [Sparrow - "Buy some time" - Task Management System](https://sparrow-tasker.herokuapp.com/)

[Sparrow "Buy some time"](https://sparrow-tasker.herokuapp.com/) is a task management system that allows a user to create a list of there daily, weekly or monthly tasks. Sparrow then allows a user to choose to either complete there own task or post it to the global claimboard which allows another person aka a sparrow to claim the task and complete it on the user behalf. This allows someone to in a sense buy time for themselves to complete other tasks or to spend time with loved ones. 

## Usage
No special features needed to access Sparrow. Sparrow can be opened in your default browser.
Use the Guest Login to play around with the application if you don't want to create a new account.

Guest Email: guest@guest.com  
Guest Password: password

## About

[Watch the video](https://youtu.be/WGTQugQ1uz8)


What is Sparrow?
	At Sparrow we believe that time is the most valuable thing we have. In todays fast paced world we seem to never have enough of it, but that doesn't have to be the case thanks to Sparrow's task management software. Sparrow allows you to create a personal task list and then push tasks to a global claim board that allows another Sparrow to claim the task and complete it. This allows a single person to delagate there to do list and free there time up to accomplish personal tasks or take a day off and enjoy the beach on a sunny day. 

## Basic Usage
Login / Create and account, Create a task in your dashboard, Save it to your personal list or our claimboard. Once a task is claimed you will be notified and a live tracker will keep you updated on the progress of your task until completed. 

[Watch the video](https://drive.google.com/file/d/18kxQ96SxQLaQLnJ3MelalGqiBq0oJ3pc/view)

## Technical Aspects
 Object-oriented, functional programming allows us to minimize the amount of work each file does, making a more efficient application. In this instance, we utilized Sequelize as an ORM that works together with models and functions from other files to query a MySQL database. The creation of new data and rendering it to the DOM is done by separate, but connected files:

 ``` javascript
// Snippet of the Sequelize 'Task' model we created
module.exports = function (sequelize, DataTypes) {
    var Task = sequelize.define("Task", {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 140]
            }
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                len: [1]
            }
		} // etc...
	});
    Task.associate = function (models) {
        // We're saying that a Task should belong to a user
        // A Task can't be created without a user due to the foreign key constraint
        Task.belongsTo(models.Auth, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Task;
};
 ```
 ``` javascript
// Snippet of the task API route responsible for rendering user's personal task list
app.get("/tasks/personal", loggedIn, function (req, res, next) {
    var getUserID = req.user.id;
    db.Task.findAll({
      where: {
        AuthId: getUserID,
        status: "Personal"
      },
      include: [db.Auth]
    }).then(function (data) {
      var hbsObject = {
        tasks: data
      };
      res.render("dashboard", hbsObject);
    });
});
```
## Collaborators

* Charles Gedeon
* Fernando Mendoza
* Saranya Mohandas
* Jackson Sabol

## Technologies Utilized
* HTML
* CSS
* JavaScript
* jQuery
* PIXLR
* Handlebars.js
* GitHub
* Heroku
* bCrypt-NodeJS
* Express.js
* Express-Session
* MySQL
* Node.js
* Passport.js
* Sequelize

## Copyright and License
The MIT License (MIT)

Copyright (c) 2013-2019 Blackrock Digital LLC