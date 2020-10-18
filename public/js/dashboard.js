function getNotes(){
    let token = getCookie('token'); // Get Auth Token

    // Generate Ajax request to method: get.notes(Look in NotesController)
    var settings = {
        "async": true,
        "crossDomain": false,
        "url": $('#metaInfo').attr('asset') + "api/get.notes?token=" + token,
        "method": "GET",
    }
    $.ajax(settings).done(function (data) {
        data = JSON.parse(data); // Json string to array
        if (data.result == 'success') {
            window['notes'] = data.notes; // Add notes array in "window" then later you can get data

            $(".allNotesList").html(''); // Clear block
            for (let i = 0; i < data.notes.length; i++) {
                let id = $('#metaInfo').attr('noteid'); // Get noteId in meta-tag
                let active = '';

                if (parseInt(id, 10) == parseInt(data.notes[i].id, 10))
                {
                    active = 'active'; // Add class to paint for active block
                }

                // Add Blocks
                $(".allNotesList").append('\
                    <div class="notesListBlock ' + active + '" key="' + data.notes[i].id + '" ikey="' + i + '">\
                        <h2>' + shorterTitle(data.notes[i].title) + '</h2>\
                        <p>' + entersUnConvertInput(shorterText(data.notes[i].text)) + '</p>\
                    </div>\
                ');
            }
        }

        //Errors
        if (data.result == 'error'){
            console.log('Error #' + data.code);

            if (data.code == 0) {
                deleteCookie('token'); // Delete token from cookie
            }
            if (data.code == 2) {
                deleteCookie('token'); // Delete token from cookie
            }

            window.location.replace("./"); // Replace to Auth
        }
    });
}

function note(){
    let token = getCookie('token'); // Get Auth Token
    let id = $('#metaInfo').attr('noteid'); // Get noteId in meta-tag
    let title = $("#noteTitle").val(); // Get Input
    let text = $("#noteText").val(); // Get TextArea
    let url = $('#metaInfo').attr('asset'); // Get Asset

    if (title == "") // Checking if a title exists(does not exist)
    {
        title = 'Title';
    }

    if (text == "") // Checking if a text exists(does not exist)
    {
        text = 'Text...';
    }

    text = entersConvert(text);

    if (id == "") // Checking if a noteId exists(does not exist)
    {
        $("#noteTitle").prop("disabled", true); // Disable Input
        $("#noteText").prop("disabled", true); // Disable TextArea

        // Generate Ajax request to method: create.note(Look in NotesController)
        var settings = {
            "async": true,
            "crossDomain": false,
            "url": url + "api/create.note?token=" + token + "&title=" + title + "&text=" + text,
            "method": "GET",
        }
        $.ajax(settings).done(function (data) {
            data = JSON.parse(data); // Json string to array
            if (data.result == 'success'){
                $("#metaInfo").attr("noteid", data.id); // Change noteId in meta-tag

                $("#noteTitle").prop("disabled", false); // Enable Input
                $("#noteText").prop("disabled", false); // Enable TextArea

                $("#noteTitle").focus(); // Focus on Input

                getNotes(); // Update Notes
            }

            // Errors
            if (data.result == 'error'){
                console.log('Error #' + data.code);

                if (data.code == 0) {
                    deleteCookie('token'); // Delete token from cookie
                }
                if (data.code == 1) {
                    deleteCookie('token'); // Delete token from cookie
                }
                if (data.code == 2) {
                    deleteCookie('token'); // Delete token from cookie
                }

                window.location.replace("./"); // Replace to Auth
            }
        });
    }

    if (id != "") // Checking if a noteId exists(does exist)
    {

        // Generate Ajax request to method: update.note(Look in NotesController)
        var settings = {
            "async": true,
            "crossDomain": false,
            "url": url + "api/update.note?token=" + token + "&title=" + title + "&text=" + text + "&id=" + id,
            "method": "GET",
        }
        $.ajax(settings).done(function (data) {
            data = JSON.parse(data); // Json string to array
            if (data.result == 'success'){
                getNotes(); // Update Notes
            }

            // Errors
            if (data.result == 'error'){
                console.log('Error #' + data.code);

                if (data.code == 0) {
                    deleteCookie('token'); // Delete token from cookie
                    window.location.replace("./"); // Replace to Auth
                }
                if (data.code == 1) {
                    deleteCookie('token'); // Delete token from cookie
                    window.location.replace("./"); // Replace to Auth
                }
                if (data.code == 2) {
                    deleteCookie('token'); // Delete token from cookie
                    window.location.replace("./"); // Replace to Auth
                }
                if (data.code == 50) {
                    alert('Error 50. The note does not belong to the user');
                }
                if (data.code == 51) {
                    alert('Error 51. Note does not exist');
                }
            }
        });
    }
}


function checkShare(){
    let hash = getAllUrlParams().note; // Get parameter "note"
    console.log(hash);
    if (hash != undefined)
    {
        let token = getCookie('token'); // Get Auth Token

        // Generate Ajax request to method: add.share.note(Look in UsersController)
        var settings = {
            "async": true,
            "crossDomain": false,
            "url": $('#metaInfo').attr('asset') + "api/add.share.note?token=" + token + "&hash=" + hash,
            "method": "GET",
        }
        $.ajax(settings).done(function (data) {
            data = JSON.parse(data); // Json string to array
            if (data.result == "success")
            {
                if (data.data.my == true)
                {
                    $("#metaInfo").attr("noteid", data.data.noteId); // Update noteId in meta-teg
                    $("#noteShare").css('opacity', 1); // Opacity Share Button

                    $("#noteTitle").val(data.data.title); // Paste title
                    $("#noteText").val(entersUnConvert(data.data.text)); // Paste text

                    getNotes();
                }

                if (data.data.my == false)
                {
                    $("#metaInfo").attr("noteid", data.data.noteId); // Update noteId in meta-teg
                    $("#noteShare").css('opacity', 0.5); // Opacity Share Button

                    $("#noteTitle").val(data.data.title); // Paste title
                    $("#noteText").val(entersUnConvert(data.data.text)); // Paste text

                    getNotes();
                }
            }

            if (data.result == 'error'){
                console.log('Error #' + data.code);

                if (data.code == 0) {
                    deleteCookie('token'); // Delete token from cookie
                    window.location.replace("./"); // Replace to Auth
                }
                if (data.code == 1) {
                    alert('Error 1. None once parameter');
                }
                if (data.code == 2) {
                    deleteCookie('token'); // Delete token from cookie
                    window.location.replace("./"); // Replace to Auth
                }
                if (data.code == 51) {
                    alert('Error 51. Note does not exist');
                }
            }
        });
    }
}

function userInfo(){
    let token = getCookie('token'); // Get Auth Token

    // Generate Ajax request to method: get.user(Look in UsersController)
    var settings = {
        "async": true,
        "crossDomain": false,
        "url": $('#metaInfo').attr('asset') + "api/get.user?token=" + token,
        "method": "GET",
    }
    $.ajax(settings).done(function (data) {
        data = JSON.parse(data); // Json string to array
        if (data.result == 'success')
        {
            $("p","#userCircle").html(data.data.email.substr(0,1));
            $("h3","#userText").html(data.data.email);
            $("p","#userText").html(data.data.name);
        }

        if (data.result == 'error')
        {
            console.log('Error #' + data.code);

            if (data.code == 0) {
                deleteCookie('token'); // Delete token from cookie
            }
            if (data.code == 2) {
                deleteCookie('token'); // Delete token from cookie
            }

            window.location.replace("./"); // Replace to Auth
        }
    });
}


$(document).ready(function() {
    //
    // Check Auth
    //

    let token = getCookie('token'); // Get Auth Token

    if (token != undefined) { // Checking if a token exists(does not exist)

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
                startAnimationOpacity('#dashboard'); // Block Animation(Check in function.js)
                getNotes(); // Update Notes
                checkShare(); // Check get request for share note
                userInfo() // Get User Information


            }

            // Errors
            if (data.result == 'error') {
                console.log('Error #' + data.code);

                if (data.code == 0) {
                    deleteCookie('token'); // Delete token from cookie
                }
                if (data.code == 1) {
                    deleteCookie('token'); // Delete token from cookie
                }

                window.location.replace("./"); // Replace to Auth
            }
        });
    } else {
        window.location.replace("./"); // Replace to Auth
    }

    //
    // KeyPress Events
    //

    $('#noteTitle').on( "keyup", function (){
        note();
    });

    $('#noteText').on( "keyup", function (){
        note();
    });
});


//
// Choice note from list
//

$(document).on('click', '.notesListBlock',function(){
    $("#metaInfo").attr("noteid", $(this).attr("key")); // Update noteId in meta-teg

    let ikey = parseInt($(this).attr('ikey'),10); // Get key(This key is needed to select the desired array)

    $("#noteTitle").val(window.notes[ikey].title); // Paste title
    $("#noteText").val(entersUnConvert(window.notes[ikey].text)); // Paste text

    if (window.notes[ikey].access == 0)
    {
        $("#noteShare").css('opacity', 0.5); // Opacity Share Button
    }

    if (window.notes[ikey].access == 1)
    {
        $("#noteShare").css('opacity', 1); // Opacity Share Button
    }

    $(this).toggleClass('active'); // Change background on selected block
    getNotes(); // Update Notes
});


//
// Delete Note
//

$("#noteDelete").click(function(){
    let token = getCookie('token'); // Get Auth Token
    let id = $("#metaInfo").attr("noteid"); // Get Note Id
    let url = $('#metaInfo').attr('asset'); // Get Asset

    // Generate Ajax request to method: delete.note(Look in NotesController)
    var settings = {
        "async": true,
        "crossDomain": false,
        "url": url + "api/delete.note?token=" + token + "&id=" + id,
        "method": "GET",
    }
    $.ajax(settings).done(function (data) {
        data = JSON.parse(data); // Json string to array
        if (data.result == 'success'){
            $("#metaInfo").attr("noteid", ""); // Clear noteId in meta-tag
            $("#noteShare").css('opacity', 0.5); // Opacity Share Button

            $("#noteTitle").val(""); // Clear Input
            $("#noteText").val(""); // Clear TextArea

            $("#noteTitle").focus(); // Focus to Input

            getNotes(); // Update Notes
        }

        // Errors
        if (data.result == 'error'){
            console.log('Error #' + data.code);

            if (data.code == 0) {
                deleteCookie('token'); // Delete token from cookie
                window.location.replace("./"); // Replace to Auth
            }
            if (data.code == 2) {
                deleteCookie('token'); // Delete token from cookie
                window.location.replace("./"); // Replace to Auth
            }
            if (data.code == 50) {
                alert('Error 50. The note does not belong to the user');
            }
            if (data.code == 51) {
                alert('Error 51. Note does not exist');
            }
        }
    });
});


//
// Create New Note
//

$("#noteNew").click(function(){
    $("#metaInfo").attr("noteid", ""); // Clear noteId in meta-tag
    $("#noteShare").css('opacity', 0.5); // Opacity Share Button

    $("#noteTitle").val(""); // Clear Input
    $("#noteText").val(""); // Clear TextArea

    $("#noteTitle").focus(); // Focus on Input

    getNotes(); // Update Notes
});

$("#noteShare").click(function(){
    let token = getCookie('token'); // Get Auth Token
    let id = $("#metaInfo").attr("noteid"); // Get Note Id
    let url = $('#metaInfo').attr('asset'); // Get Asset

    // Generate Ajax request to method: delete.note(Look in NotesController)
    var settings = {
        "async": true,
        "crossDomain": false,
        "url": url + "api/share.note?token=" + token + "&id=" + id,
        "method": "GET",
    }
    $.ajax(settings).done(function (data) {
        data = JSON.parse(data); // Json string to array
        if (data.result == 'success'){
            if (data.access == true){
                let text = $("#noteText").val(); // Copy Text

                $("#noteShare").css('opacity', 1); // Opacity Share Button
                copyToClipboard(url + "dashboard?note=" + data.hash); // Copy link to Clipboard
                $("#noteText").val(text + "\n\nLink to share - " + url + "dashboard?note=" + data.hash); // Add Link

                note(); // Save note
            }
            if (data.access == false){
                $("#noteShare").css('opacity', 0.5); // Opacity Share Button
            }
        }

        // Errors
        if (data.result == 'error'){
            console.log('Error #' + data.code);

            if (data.code == 0) {
                deleteCookie('token'); // Delete token from cookie
                window.location.replace("./"); // Replace to Auth
            }
            if (data.code == 2) {
                deleteCookie('token'); // Delete token from cookie
                window.location.replace("./"); // Replace to Auth
            }
            if (data.code == 50) {
                alert('Error 50. The note does not belong to the user');
            }
            if (data.code == 51) {
                alert('Error 51. Note does not exist');
            }
        }
    });
});



