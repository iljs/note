$(document).ready(function(){
    let token = getCookie('token'); // Get Auth Token

    //
    // Check Auth
    //

    if(token != undefined) // Checking if a token exists(does not exist)
    {
        // Generate Ajax request to method: check.token(Look in LogsController)
        var settings = {
            "async": true,
            "crossDomain": false,
            "url": $('#metaInfo').attr('asset') + "api/check.token?token=" + token,
            "method": "GET",
        }
        $.ajax(settings).done(function (data) {
            data = JSON.parse(data); // Json string to array
            if (data.result == 'success') {
                window.location.replace("./dashboard"); // Replace to DashBoard
            }

            // Errors
            if (data.result == 'error') {
                startAnimationOpacity('#sign'); // Smooth block appearance
                console.log('Error #' + data.code);
                if (data.code == 0) {
                    deleteCookie('token'); // Delete token from cookie
                }
                if (data.code == 1) {
                    deleteCookie('token'); // Delete token from cookie
                }
            }
        });
    }else{
        startAnimationOpacity('#sign'); // Block Animation(Check in function.js)
    }

    //
    // End Check Auth
    //

    //
    // Sign Header Clicks
    //

    $('#signInButton').click(function(){
        $('#signUpButton').removeClass('active');
        $('#signInButton').removeClass('active');

        $('#signUp').removeClass('active');
        $('#signIn').removeClass('active');

        $('#signInButton').toggleClass('active');
        $('#signIn').toggleClass('active');
    });

    $('#signUpButton').click(function(){
        $('#signUpButton').removeClass('active');
        $('#signInButton').removeClass('active');

        $('#signUp').removeClass('active');
        $('#signIn').removeClass('active');

        $('#signUpButton').toggleClass('active');
        $('#signUp').toggleClass('active');
    });

    //
    // End Sign Header Clicks
    //

    //
    // Sign Buttons
    //

    $(document).on('click', '#signUpSubmit', function() {
        let url = $('#metaInfo').attr('asset'); // Get Asset

        let email = $('#signUpInputEmail').val(); // Get Email
        let name = $('#signUpInputName').val(); // Get Name
        let password = $('#signUpInputPassword').val(); // Get Password
        let passwordConfirm = $('#signUpInputPasswordConfirm').val(); // Get Password Confirm

        // Generate Ajax request to method: auth.signup(Look in UsersController)
        var settings = {
            "async": true,
            "crossDomain": false,
            "url": url + "api/auth.signup?name=" + name + "&email=" + email + "&password=" + password + "&passwordConfirm=" + passwordConfirm,
            "method": "GET",
        }
        $.ajax(settings).done(function (data) {
            data = JSON.parse(data); // Json string to array
            if (data.result == 'success') {
                setCookie('token', data.data.token); // Set token in cookie
                endAnimationOpacity('#sign'); // Block Animation(Check in function.js)

                setTimeout(function(){
                    window.location.replace("./dashboard"); // Replace to DashBoard
                },500);
            }

            // Errors
            if (data.result == 'error') {
                console.log('Error #' + data.code);
                if (data.code == 0) {

                    // Change Css
                    $('#signUpInputName').css('border-color', 'red');
                    $('#signUpInputEmail').css('border-color', 'red');
                    $('#signUpInputPassword').css('border-color', 'red');
                    $('#signUpInputPasswordConfirm').css('border-color', 'red');

                    setTimeout(function () {
                        // Change Css
                        $('#signUpInputName').css('border-color', 'white');
                        $('#signUpInputEmail').css('border-color', 'white');
                        $('#signUpInputPassword').css('border-color', 'white');
                        $('#signUpInputPasswordConfirm').css('border-color', 'white');
                    }, 3000);
                }
                if (data.code == 1) {

                    // Change Css
                    $('#signUpInputName').css('border-color', 'red');
                    $('#signUpInputEmail').css('border-color', 'red');
                    $('#signUpInputPassword').css('border-color', 'red');
                    $('#signUpInputPasswordConfirm').css('border-color', 'red');

                    setTimeout(function () {
                        // Change Css
                        $('#signUpInputName').css('border-color', 'white');
                        $('#signUpInputEmail').css('border-color', 'white');
                        $('#signUpInputPassword').css('border-color', 'white');
                        $('#signUpInputPasswordConfirm').css('border-color', 'white');
                    }, 3000);
                }
                if (data.code == 30) {

                    // Change Css
                    $('#signUpInputPassword').css('border-color', 'red');
                    $('#signUpInputPasswordConfirm').css('border-color', 'red');

                    setTimeout(function () {
                        // Change Css
                        $('#signUpInputPassword').css('border-color', 'white');
                        $('#signUpInputPasswordConfirm').css('border-color', 'white');
                    }, 3000);
                }
                if (data.code == 31) {

                    // Change Css
                    $('#signUpInputEmail').css('border-color', 'red');

                    setTimeout(function () {
                        // Change Css
                        $('#signUpInputEmail').css('border-color', 'white');
                    }, 3000);
                }
            }
        });
    });

    $(document).on('click', '#signInSubmit', function(){
        let url = $('#metaInfo').attr('asset'); // Get Asset

        let email = $('#signInInputEmail').val(); // Get Email
        let password = $('#signInInputPassword').val(); // Get Password

        // Generate Ajax request to method: auth.signin(Look in UsersController)
        var settings = {
            "async": true,
            "crossDomain": false,
            "url": url + "api/auth.signin?email=" + email + "&password=" + password,
            "method": "GET",
        }
        $.ajax(settings).done(function(data) {
            data = JSON.parse(data); // Json string to array
            if (data.result == 'success')
            {
                setCookie('token', data.data.token); // Set token in cookie
                endAnimationOpacity('#sign'); // Block Animation(Check in function.js)

                setTimeout(function(){
                    window.location.replace("./dashboard"); // Replace to DashBoard
                },500);
            }
            if (data.result == 'error')
            {
                console.log('Error #' + data.code);
                if (data.code == 0)
                {
                    // Change Css
                    $('#signInInputEmail').css('border-color', 'red');
                    $('#signInInputPassword').css('border-color', 'red');

                    setTimeout(function(){
                        // Change Css
                        $('#signInInputEmail').css('border-color', 'white');
                        $('#signInInputPassword').css('border-color', 'white');
                    },3000);
                }
                if (data.code == 1)
                {

                    // Change Css
                    $('#signInInputEmail').css('border-color', 'red');
                    $('#signInInputPassword').css('border-color', 'red');

                    setTimeout(function(){
                        // Change Css
                        $('#signInInputEmail').css('border-color', 'white');
                        $('#signInInputPassword').css('border-color', 'white');
                    },3000);
                }
                if (data.code == 40)
                {

                    // Change Css
                    $('#signInInputEmail').css('border-color', 'red');

                    setTimeout(function(){
                        // Change Css
                        $('#signInInputEmail').css('border-color', 'white');
                    },3000);
                }

                if (data.code == 41)
                {

                    // Change Css
                    $('#signInInputPassword').css('border-color', 'red');

                    setTimeout(function(){
                        // Change Css
                        $('#signInInputPassword').css('border-color', 'white');
                    },3000);
                }
            }
        });
    });

    //
    // End Sign Buttons
    //
});






/*
 * Error Codes
 *
 * 0 - Request Error
 * 1 - Request Error
 * 2 - Token Error
 * 30 - Password error
 * 31 - Email already used
 * 40 - Email not registered
 * 41 - Incorrect password
 * 50 - The note does not belong to the user
 * 51 - Note does not exist
 */
