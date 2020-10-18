<?php

namespace App\Http\Controllers;

use App\logs;
use App\User;
use Illuminate\Http\Request;

class UsersController extends Controller
{
    public function signIn(Request $request)
    {
    //
    // Request Vars
    //

        $email = $request->get('email');
        $password = $request->get('password');

        $userClass = new User;
        $user = $userClass->where('email', '=', [(string)$email])->get();

    //
    // End Request Vars
    //

    //
    // Errors
    //

        if (!isset($email) || !isset($password))
        {
            $result = [
                'result' => 'error',
                'code' => 0
            ];

            return json_encode($result);
        }

        if ((trim($email) == '') || (trim($password) == ''))
        {
            $result = [
                'result' => 'error',
                'code' => 1
            ];

            return json_encode($result);
        }

        if (!isset($user[0]['email']))
        {
            $result = [
                'result' => 'error',
                'code' => 40
            ];

            return json_encode($result);
        }

        if ($user[0]['password'] != sha1($password))
        {
            $result = [
                'result' => 'error',
                'code' => 41
            ];

            return json_encode($result);
        }

    //
    // End Errors
    //

    //
    // Main Code
    //

        $token = sha1($user[0]['id'] . ' | ' . $password . ' | ' . date('U'));

        $log = new logs([
            'userId' => $user[0]['id'],
            'token' => $token
        ]);
        $log->save();

        $result = [
            'result' => 'success',
            'data' => [
                'userId' => $user[0]['id'],
                'email' => $user[0]['email'],
                'name' => $user[0]['name'],
                'token' => $token
            ]
        ];

        return json_encode($result);

    }

    public function signUp(Request $request)
    {
    //
    // Request Vars
    //

        $email = $request->get('email');
        $name = $request->get('name');
        $password = $request->get('password');
        $passwordConfirm = $request->get('passwordConfirm');

        $userClass = new User;
        $emailExist = $userClass->where('email', '=', [(string)$email])->get();


    //
    // End Request Vars
    //

    //
    // Errors
    //
        if (!isset($email) || !isset($name) || !isset($password) || !isset($passwordConfirm))
        {
            $result = [
                'result' => 'error',
                'code' => 0
            ];

            return json_encode($result);
        }

        if ((trim($email) == '') || (trim($name) == '') || (trim($password) == '') || (trim($passwordConfirm) == ''))
        {
            $result = [
                'result' => 'error',
                'code' => 1
            ];

            return json_encode($result);
        }

        if ($password != $passwordConfirm)
        {
            $result = [
                'result' => 'error',
                'code' => 30
            ];

            return json_encode($result);
        }

        if (isset($emailExist[0]['email']))
        {
            $result = [
                'result' => 'error',
                'code' => 31
            ];

            return json_encode($result);
        }

    //
    // End Errors
    //

    //
    // Main Code
    //

        $createUser = new User([
            'email' => $email,
            'name' => $name,
            'password' => sha1($password)
        ]);
        $createUser->save();

        $userClass = new User;
        $user = $userClass->where('email', '=', [(string)$email])->get();
        $token = sha1($user[0]['id'] . ' | ' . $password . ' | ' . date('U'));

        $log = new logs([
            'userId' => $user[0]['id'],
            'token' => $token
        ]);
        $log->save();

        $result = [
            'result' => 'success',
            'data' => [
                'userId' => $user[0]['id'],
                'email' => $user[0]['email'],
                'name' => $user[0]['name'],
                'token' => $token
            ]
        ];

        return json_encode($result);


    //
    // End Main Code
    //
    }



    public function getUser(Request $request)
    {
    //
    // Request Vars
    //
        $token = $request->get('token');

        $logClass = new logs;
        $log = $logClass->where('token', '=', [$token])->get();

    //
    // End Request Vars
    //

    //
    // Errors
    //

        if (!isset($token))
        {
            $result = [
                'result' => 'error',
                'code' => 0
            ];

            return json_encode($result);
        }

        if (!isset($log[0]['userId']))
        {
            $result = [
                'result' => 'error',
                'code' => 2
            ];

            return json_encode($result);
        }

    //
    // End Errors
    //

    //
    // Main Code
    //

        $userClass = new User;
        $user = $userClass->where('id', '=', $log[0]['userId'])->get();

        $result = [
            'result' => 'success',
            'data' => [
                'userId' => $user[0]['id'],
                'email' => $user[0]['email'],
                'name' => $user[0]['name']
            ]
        ];

        return json_encode($result);

    //
    // End Main Code
    //
    }
}
