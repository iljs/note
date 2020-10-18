<html>
<head>
    <title>Notes</title>

    <meta charset="utf-8">
    <meta content="width=device-width, initial-scale=1" shrink-to-fit="no" user-scalable="no" viewport-fit="cover" name="viewport" />
    <meta id="metaInfo" asset="{{asset('/')}}" noteId="">

    <link href="https://fonts.googleapis.com/css?family=Montserrat:100,200,300,400,500,600,700,800,900&display=swap" rel="stylesheet">
    <link href="{{ asset('css/style.css') }}" rel="stylesheet" type="text/css">
    <link href="{{ asset('css/dashboard.css') }}" rel="stylesheet" type="text/css">

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
</head>
<body>

    <div class="block" id="dashboard">
        <div class="notesWindow">
            <div class="notes">
                <div class="allNotes">
                    <div class="notesHeader">
                        <img src="{{asset('/img/plus.svg')}}" height="24" id="noteNew" style="float: left">
                        <img src="{{asset('/img/delete.svg')}}" height="24" id="noteDelete" style="float: right">
                        <img src="{{asset('/img/share.svg')}}" height="24" id="noteShare" style="float: right; opacity: 0.4;">
                    </div>
                    <div class="allNotesList">

                    </div>
                </div>
                <div class="note">
                    <input type="text" placeholder="Title" id="noteTitle">
                    <textarea type="text" placeholder="Note..." id="noteText"></textarea>
                </div>
            </div>
        </div>
        <div id="userInfo">
            <div id="userCircle">
                <p></p>
            </div>
            <div id="userText">
                <h3></h3>
                <p></p>
            </div>
        </div>
    </div>

    <script src="{{ asset('js/jquery.cookie.js') }}"></script>
    <script src="{{ asset('js/functions.js') }}"></script>
    <script src="{{ asset('js/dashboard.js') }}"></script>
</body>
</html>
