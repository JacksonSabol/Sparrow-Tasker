$(document).ready(function () {
    // When Sparrow Completes a Task
    $(".complete-btn").on("click", function (event) {
        // Prevent default action of refreshing page
        event.preventDefault();
        // Assign a variable to hold the id of the Task to be Completed
        var taskCompleted = $(this).data("id");
        // Send an AJAX PUT-request with jQuery
        $.ajax({
            url: "/api/tasks/complete/" + taskCompleted + "",
            type: 'PUT',
            success: function (response) {
                // Redirect to completed tasks list after 'true' response confirms update in the database
                window.location.href = "/tasks/completed";
            }
        });
    });
    // When Sparrow Claims a Task
    $(".claim-btn").on("click", function (event) {
        // Prevent default action of refreshing page
        event.preventDefault();
        // Assign a variable to hold the id of the Task to be Outsourced
        var taskClaimed = $(this).data("id");
        // Send an AJAX PUT-request with jQuery
        $.ajax({
            url: "/api/tasks/claim/" + taskClaimed + "",
            type: 'PUT',
            success: function (response) {
                // Redirect to claimed tasks list after 'true' response confirms update in the database
                window.location.href = "/tasks/claimed";
            }
        });
    });
    // When user Outsources a Task
    $(".outsource-btn").on("click", function (event) {
        // Prevent default action of refreshing page
        event.preventDefault();
        // Assign a variable to hold the id of the Task to be Outsourced
        var taskOutsourced = $(this).data("id");
        // Send an AJAX PUT-request with jQuery
        $.ajax({
            url: "/api/tasks/outsource/" + taskOutsourced + "",
            type: 'PUT',
            success: function (response) {
                // Redirect to global tasks list after 'true' response confirms update in the database
                window.location.href = "/tasks/global";
            }
        });
    });
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
        // Send an AJAX POST-request with jQuery
        $.ajax({
            url: "/signup/newuser",
            type: 'POST',
            success: function (response) {
                // Do something with the response if necessary
                // location.reload();
            }
        });
    });
});