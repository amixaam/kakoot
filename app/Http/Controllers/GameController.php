<?php

namespace App\Http\Controllers;

use App\Models\Game;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GameController extends Controller
{
    public function validate(Request $request)
    {
        // find game by its pin
        $game = Game::where('pin', $request->pin)->first();

        if (!$game) {
            return back()->withErrors(['error' => "Game not found"]);
        } else {
            return back()->with(['game' => $game]);
        }
    }
}
