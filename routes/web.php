<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

//Auth
Route::get('/', function () {
    return view('sign');
});

// DashBoard
Route::get('/dashboard', function () {
    return view('dashboard');
});

// NotesController
Route::get('/api/get.notes', 'NotesController@getNotes'); // Get all notes(token)
Route::get('/api/create.note', 'NotesController@createNote'); // Create new note(token, title, text)
Route::get('/api/update.note', 'NotesController@updateNote'); // Update note(token, id, title, text)
Route::get('/api/delete.note', 'NotesController@deleteNote'); // Delete note(token, id)
Route::get('/api/share.note', 'NotesController@shareNote'); // Get share link(token, id)
Route::get('/api/add.share.note', 'NotesController@addShareNote'); // Add share note(token, hash)

// UserController
Route::get('/api/auth.signin', 'UsersController@signIn'); // SignIn user(email, password)
Route::get('/api/auth.signup', 'UsersController@signUp'); // SignUp user(email, name, password, passwordConfirm)
Route::get('/api/get.user', 'UsersController@getUser'); // Get user data(token)

// LogsController
Route::get('/api/check.token', 'LogsController@checkToken'); // Check auth token(token)
