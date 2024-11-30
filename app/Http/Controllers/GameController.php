<?php

namespace App\Http\Controllers;

use App\Models\Game;
use Error;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GameController extends Controller
{
    public function validate(string $pin)
    {
        if (strlen($pin) != 6) {
            return response("PIN should be 6 characters: " . strlen($pin) . ".", 404);
        }

        $game = Game::where('pin', $pin)->first();

        if (!$game) {
            return response("Game not found.", 404);
        } else {
            return response($game, 200);
        }
    }

    public function join(string $pin) {}
}
