<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Game extends Model
{
    protected $fillable = ['quiz_id', 'code', 'status'];

    public function quiz()
    {
        return $this->belongsTo(Quiz::class);
    }

    public function users()
    {
        return $this->belongsTo(User::class);
    }
}
