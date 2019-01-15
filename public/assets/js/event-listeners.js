$(document).ready(function () {

    // When user clicks on 'Create Task' button for tasksTemplate
    $("#create-task").on("click", function (event) {
        // Getting jQuery references to the Task title, description, and deadline
        var titleInput = $("#task-title");
        var descriptionInput = $("#task-description");
        var deadline = $("#deadline");
        // Prevent default action of refreshing page
        event.preventDefault();
        // Make sure input fields are filled out
        if (!titleInput.val().trim() || !descriptionInput.val().trim() || !deadline.val()) {
            return;
        }
        // Constructing a newTask object to hand to the database
        var newTask = {
            title: titleInput
                .val()
                .trim(),
            description: descriptionInput
                .val()
                .trim(),
            deadline: deadline.val()
        };
        // Send an AJAX POST-request with jQuery
        $.post("/api/tasks", newTask, function () {
            window.location.href = "/tasks/personal";
        });
    });

    //** working
    // Redirects new users to signup page
    $("#sign-up").on("click", function (event) {
        // Prevent default action of refreshing page
        event.preventDefault();
        // Assign a variable to hold the id of the button 'clicked'
        // Send an AJAX POST-request with jQuery
        console.log("signed up");
        //$(this).attr("href","/signup");
        window.location.href = "/signup"
        $.ajax({
            url: "/signup",
            type: 'GET',
            success: function (response) {
                console.log("success signed up")
                // Do something with the response if necessary
                // This reloads the page, for example
                // location.reload();
            }
        });
    });
    //** working
    // When user clicks on 'Save' button when signing up
    $("#addNewUser").on("click", function (event) {
        // Prevent default action of refreshing page
        event.preventDefault();
        // Assign a variable to hold the id of the button 'clicked'
        // Send an AJAX POST-request with jQuery
        $.ajax({
            url: "/signup/newuser",
            type: 'POST',
            success: function (response) {
                // Do something with the response if necessary
                // This reloads the page, for example
                location.reload();
                console.log("post")
                //window.location.href = "/dashboard"
            }
        });
    });
    
    // directs existing user to signin page
    // When user clicks on 'Save' button when signing up
    $("#sign-in").on("click", function (event) {
    // Prevent default action of refreshing page
    event.preventDefault();
    // Assign a variable to hold the id of the button 'clicked'
    // Send an AJAX POST-request with jQuery
    console.log("signed in form");
    //$(this).attr("href","/signup");
    window.location.href = "/signin"
   $.ajax({
       url: "/signin",
       type: 'GET',
       success: function (response) {
           console.log("success signed in form")
			// Do something with the response if necessary
           // This reloads the page, for example
           // location.reload();
       }
   });
});

    // ** 
    // When user clicks on 'Save' button when signing up
    $("#claimed-tasks-link").on("click", function (event) {
        // Prevent default action of refreshing page
        event.preventDefault();
        // Assign a variable to hold the id of the button 'clicked'
        var buttonClicked = $(this).data("id");
        // Send an AJAX POST-request with jQuery
        $.ajax({
            url: "/api/tasks" + buttonClicked + "",
            type: 'POST',
            success: function (response) {
                // Do something with the response if necessary
                // This reloads the page, for example
                // location.reload();
            }
        });
    });

    // When user clicks on 'Save' button when signing up
    $("#outsourced-tasks-link").on("click", function (event) {
        // Prevent default action of refreshing page
        event.preventDefault();
        // Assign a variable to hold the id of the button 'clicked'
        var buttonClicked = $(this).data("id");
        // Send an AJAX POST-request with jQuery
        $.ajax({
            url: "/api/tasks" + buttonClicked + "",
            type: 'POST',
            success: function (response) {
                // Do something with the response if necessary
                // This reloads the page, for example
                // location.reload();
            }
        });
    });

    // When user clicks on 'Save' button when signing up
    $("#completed-tasks-link").on("click", function (event) {
        // Prevent default action of refreshing page
        event.preventDefault();
        // Assign a variable to hold the id of the button 'clicked'
        var buttonClicked = $(this).data("id");
        // Send an AJAX POST-request with jQuery
        $.ajax({
            url: "/api/tasks" + buttonClicked + "",
            type: 'POST',
            success: function (response) {
                // Do something with the response if necessary
                // This reloads the page, for example
                // location.reload();
            }
        });
    });

});