<?php

namespace App\Http\Controllers;

use App\Models\Question;
use App\Models\Quiz;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Mockery\Undefined;

class QuizController extends Controller
{
    public function index()
    {
        $quizzes = Quiz::all();
        return response($quizzes, 200);
    }

    public function show(string $id)
    {
        $quiz = Quiz::firstWhere("id", $id);

        if (!$quiz) {
            return response("Quiz not found.", 404);
        }

        return response($quiz, 200);
    }

    // redirect to dashboard form
    public function create()
    {
        return Inertia::render('NewQuiz');
    }

    // POST
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string|max:255',
            'questions' => 'required|array|min:1',
            'questions.*.question' => 'required|string|max:255',
            'questions.*.answers' => ['required', 'array', 'min:2', 'max:4'],
            'questions.*.answers.*' => 'required|string|min:1|max:255', // Validates each answer string
            'questions.*.correct_answer' => [
                'required',
                'integer',
                'min:0',
                function ($attribute, $value, $fail) use ($request) {
                    // Get the question index from the attribute name
                    preg_match('/questions\.(\d+)\.correct_answer/', $attribute, $matches);
                    $index = $matches[1];

                    // Check if the correct_answer index exists in the answers array
                    if (!isset($request->input("questions.$index.answers")[$value])) {
                        $fail('The selected correct answer is invalid.');
                    }
                },
            ],
            'questions.*.time' => 'required|integer|min:10|max:120',
            'questions.*.double_points' => 'boolean',
        ]);

        $quiz = Quiz::create([
            "user_id" => $request->user()->id,
            "name" => $validated["name"],
            "description" => $validated["description"] ?? 'No description available',
        ]);

        foreach ($validated["questions"] as $question) {
            Question::create([
                "quiz_id" => $quiz->id,
                "question" => $question["question"],
                "answers" => array_values($question["answers"]), // Re-index the array
                "correct_answer" => $question["correct_answer"],
                "time" => $question["time"] ?? 30,
                "double_points" => $question["double_points"] ?? false,
            ]);
        }

        return back()->with('success', 'Quiz created successfully');
    }
}
