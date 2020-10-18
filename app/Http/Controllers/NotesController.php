<?php

namespace App\Http\Controllers;

use App\logs;
use App\Notes;
use App\User;
use Illuminate\Http\Request;

class NotesController extends Controller{
    public function getNotes(Request $request)
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

        $noteClass = new Notes;

        $notes = $noteClass::where('userId', '=', [$log[0]['userId']])->get();


        $result = [
            'result' => 'success',
            'notes' => $notes
        ];

        return json_encode($result);

    //
    // End Main Code
    //

    }



    public function createNote(Request $request)
    {
    //
    // Request Vars
    //

        $title = $request->get('title');
        $text = $request->get('text');

        $token = $request->get('token');

        $logClass = new logs;
        $log = $logClass->where('token', '=', [$token])->get();

    //
    // End Request Vars
    //

    //
    // Errors
    //

        if (!isset($title) || !isset($token))
        {
            $result = [
                'result' => 'error',
                'code' => 0
            ];

            return json_encode($result);
        }

        if (trim($title) == '')
        {
            $result = [
                'result' => 'error',
                'code' => 1
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


        $note = new Notes([
            'title' => $title,
            'text' => $text,
            'hash' => "",
            'access' => false,
            'userId' => $log[0]['userId']
        ]);
        $note->save();

        $noteClass = new Notes;
        $note = $noteClass->latest()->get();

        $result = [
            'result' => 'success',
            'id' => $note[0]['id']
        ];

        return json_encode($result);

    //
    // End Main Code
    //
    }



    public function updateNote(Request $request)
    {
    //
    // Request Vars
    //
        $id = $request->get('id');
        $title = $request->get('title');
        $text = $request->get('text');

        $token = $request->get('token');

        $logClass = new logs;
        $log = $logClass->where('token', '=', [$token])->get();

        $noteClass = new Notes;
        $note = $noteClass->where('id', '=', [$id])->get();

    //
    // End Request Vars
    //

    //
    // Errors
    //

        if (!isset($title) || !isset($id))
        {
            $result = [
                'result' => 'error',
                'code' => 0
            ];

            return json_encode($result);
        }

        if ((trim($title) == '') || (trim($id) == ''))
        {
            $result = [
                'result' => 'error',
                'code' => 1
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

        if (!isset($note[0]['id']))
        {
            $result = [
                'result' => 'error',
                'code' => 51
            ];

            return json_encode($result);
        }

        if ($log[0]['userId'] != $note[0]['userId'])
        {
            $result = [
                'result' => 'error',
                'code' => 50
            ];

            return json_encode($result);
        }

    //
    // End Errors
    //

    //
    // Main Code
    //

        $note = $noteClass->find($id);
        $note->title = $title;
        $note->text = $text;
        $note->save();

        $result = [
            'result' => 'success'
        ];

        return json_encode($result);

    //
    // End Main Code
    //
    }

    public function deleteNote(Request $request)
    {
    //
    // Request Vars
    //

        $id = $request->get('id');

        $token = $request->get('token');

        $logClass = new logs;
        $log = $logClass->where('token', '=', [$token])->get();

        $noteClass = new Notes;
        $note = $noteClass->where('id', '=', [$id])->get();

    //
    // End Request Vars
    //

    //
    // Errors
    //

        if (!isset($id))
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

        if (!isset($note[0]['id']))
        {
            $result = [
                'result' => 'error',
                'code' => 51
            ];

            return json_encode($result);
        }

        if ($log[0]['userId'] != $note[0]['userId'])
        {
            $result = [
                'result' => 'error',
                'code' => 50
            ];

            return json_encode($result);
        }

    //
    // End Errors
    //

    //
    // Main Code
    //

        $noteClass->find($id)->delete();

        $result = [
            'result' => 'success'
        ];

        return json_encode($result);

    //
    // End Main Code
    //
    }

    public function shareNote(Request $request)
    {
    //
    // Request Vars
    //

        $id = $request->get('id');

        $token = $request->get('token');

        $logClass = new logs;
        $log = $logClass->where('token', '=', [$token])->get();

        $noteClass = new Notes;
        $note = $noteClass->where('id', '=', [$id])->get();

    //
    // End Request Vars
    //

    //
    // Errors
    //

        if (!isset($id) || !isset($token))
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

        if (!isset($note[0]['id']))
        {
            $result = [
                'result' => 'error',
                'code' => 51
            ];

            return json_encode($result);
        }

        if ($log[0]['userId'] != $note[0]['userId'])
        {
            $result = [
                'result' => 'error',
                'code' => 50
            ];

            return json_encode($result);
        }

    //
    // End Errors
    //

    //
    // Main Code
    //
        $hash = "";
        $access = false;

        if ($note[0]['access'] == false)
        {
            $hash = sha1($log[0]['userId'] . ' | ' . date('U') . ' | ' . $note[0]['text']);
            $access = true;

            $note = $noteClass->find($id);
            $note->access = true;
            $note->hash = $hash;
            $note->save();
        }

        if ($note[0]['access'] == true)
        {
            $note = $noteClass->find($id);
            $note->access = false;
            $note->hash = "";
            $note->save();
        }

        $result = [
            'result' => 'success',
            'hash' => $hash,
            'access' => $access
        ];

        return json_encode($result);

    //
    // End Main Code
    //
    }


    public function addShareNote(Request $request)
    {
    //
    // Request Vars
    //
        $hash = $request->get('hash');

        $token = $request->get('token');

        $logClass = new logs;
        $log = $logClass->where('token', '=', [$token])->get();

        $noteClass = new Notes;
        $note = $noteClass->where('hash', '=', [$hash])->get();

    //
    // End Request Vars
    //

    //
    // Errors
    //

        if (!isset($hash) || !isset($token))
        {
            $result = [
                'result' => 'error',
                'code' => 0
            ];

            return json_encode($result);
        }

        if (($hash == "") || ($token == ""))
        {
            $result = [
                'result' => 'error',
                'code' => 1
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

        if (!isset($note[0]['id']))
        {
            $result = [
                'result' => 'error',
                'code' => 51
            ];

            return json_encode($result);
        }

    //
    // End Errors
    //

    //
    // Main Code
    //

        if ($log[0]['userId'] != $note[0]['userId'])
        {
            $newNote = new Notes([
                'title' => $note[0]['title'],
                'text' => $note[0]['text'],
                'hash' => "",
                'access' => false,
                'userId' => $log[0]['userId']
            ]);
            $newNote->save();

            $noteClass = new Notes;
            $note = $noteClass->latest()->get();

            $result = [
                'result' => 'success',
                'data' => [
                    'my' => false,
                    'noteId' => $note[0]['id'],
                    'title' => $note[0]['title'],
                    'text' => $note[0]['text']
                ]
            ];

            return json_encode($result);
        }

        if ($log[0]['userId'] == $note[0]['userId'])
        {
            $result = [
                'result' => 'success',
                'data' => [
                    'my' => true,
                    'noteId' => $note[0]['id'],
                    'title' => $note[0]['title'],
                    'text' => $note[0]['text']
                ]
            ];

            return json_encode($result);
        }

    }
}



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
