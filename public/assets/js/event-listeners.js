$(document).ready(function(){
    


// When user clicks on 'Save' button when signing up
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

// When user clicks on 'Save' button when signing up
$("#signin").on("click", function (event) {
    // Prevent default action of refreshing page
    event.preventDefault();
    // Assign a variable to hold the id of the button 'clicked'
    // Send an AJAX POST-request with jQuery
    $.ajax({
        url: "/signin",
        type: 'GET',
        success: function (response) {
			// Do something with the response if necessary
            // This reloads the page, for example
            // location.reload();
        }
    });
});

// When user clicks on 'Save' button when signing up
$("#loginUser").on("click", function (event) {
    // Prevent default action of refreshing page
    event.preventDefault();
    // Assign a variable to hold the id of the button 'clicked'
    // Send an AJAX POST-request with jQuery
    $.ajax({
        url: "/signin",
        type: 'POST',
        success: function (response) {
			// Do something with the response if necessary
            // This reloads the page, for example
            // location.reload();
        }
    });
});

// When user clicks on 'Save' button when signing up
$("#personal-tasks-link").on("click", function (event) {
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