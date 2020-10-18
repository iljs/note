<?php

namespace App\Http\Controllers;

use App\logs;
use Illuminate\Http\Request;

class LogsController extends Controller
{
    public function checkToken(Request $request){
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

        $result = [
            'result' => 'success'
        ];

        return json_encode($result);

    //
    // End Main Code
    //
    }
}
