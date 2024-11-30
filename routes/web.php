<?php

use App\Http\Controllers\GameController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\QuizController;
use App\Models\Quiz;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Landing', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard', [
        "quizzes" => Quiz::all()
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::prefix('quizzes')->group(function () {
    // Protected routes
    Route::middleware('auth')->group(function () {
        Route::get('/create', [QuizController::class, 'create'])->name('quiz.create');
        Route::get('/{id}/edit', [QuizController::class, 'edit'])->name('quiz.edit');
    });
    Route::post('/', [QuizController::class, 'store'])->name('quiz.store');
    Route::put('/{id}', [QuizController::class, 'update'])->name('quiz.update');
    Route::delete('/{id}', [QuizController::class, 'destroy'])->name('quiz.destroy');

    // Public routes
    Route::get("/", [QuizController::class, "index"])->name('quiz.index');
    Route::get("/{id}", [QuizController::class, "show"])->name('quiz.show');
});

Route::prefix('game')->group(function () {
    Route::get('/join/{pin}', [GameController::class, 'join'])->name('game.join');
});

require __DIR__ . '/auth.php';
