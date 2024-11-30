<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    protected $fillable = ['quiz_id', 'question', 'answers', 'correct_answer', 'time', 'double_points'];

    public function quiz()
    {
        return $this->belongsTo(Quiz::class);
    }

    protected function casts(): array
    {
        return [
            'answers' => 'array',
            'double_points' => 'boolean'
        ];
    }
}
