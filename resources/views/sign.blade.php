<html>
<head>
    <title>Notes</title>

    <meta charset="utf-8">
    <meta content="width=device-width, initial-scale=1" shrink-to-fit="no" user-scalable="no" viewport-fit="cover" name="viewport" />
    <meta id="metaInfo" asset="{{asset('/')}}">

    <link href="https://fonts.googleapis.com/css?family=Montserrat:100,200,300,400,500,600,700,800,900&display=swap" rel="stylesheet">
    <link href="{{ asset('css/style.css') }}" rel="stylesheet" type="text/css">
    <link href="{{ asset('css/sign.css') }}" rel="stylesheet" type="text/css">

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
</head>
<body>
    <div class="block" id="sign">
        <div class="signWindow">
            <div class="signHeader">
                <div id="signUpButton" class="signButton active">
                    <p>SignUp</p>
                </div>
                <div id="signInButton" class="signButton">
                    <p>SignIn</p>
                </div>
            </div>
            <div id="signUp" class="signBlock active">
                <div class="signInputBlock">
                    <input type="text" id="signUpInputName"placeholder="Ivan Ivanov">
                    <p>Имя</p>
                </div>
                <div class="signInputBlock">
                    <input type="text" id="signUpInputEmail" placeholder="user@domain.com">
                    <p>Почта</p>
                </div>
                <div class="signInputBlock">
                    <input type="password" id="signUpInputPassword" placeholder="∗∗∗∗∗∗∗∗">
                    <p>Пароль</p>
                </div>
                <div class="signInputBlock">
                    <input type="password" id="signUpInputPasswordConfirm" placeholder="∗∗∗∗∗∗∗∗">
                    <p>Повтор пароля</p>
                </div>
                <div id="signUpSubmit" class="signSubmit">
                    <p>SignUp</p>
                </div>
            </div>
            <div id="signIn" class="signBlock">
                <div class="signInputBlock">
                    <input type="text" id="signInInputEmail" placeholder="user@domain.com">
                    <p>Почта</p>
                </div>
                <div class="signInputBlock">
                    <input type="password" id="signInInputPassword" placeholder="∗∗∗∗∗∗∗∗">
                    <p>Пароль</p>
                </div>
                <div id="signInSubmit" class="signSubmit">
                    <p>SignIn</p>
                </div>
            </div>
        </div>
    </div>

    <script src="{{ asset('js/jquery.cookie.js') }}"></script>
    <script src="{{ asset('js/functions.js') }}"></script>
    <script src="{{ asset('js/sign.js') }}"></script>
</body>
</html>
