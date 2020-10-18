<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class logs extends Model
{
    protected $fillable = [
        'token', 'userId'
    ];
}
