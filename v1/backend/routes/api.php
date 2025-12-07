<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\PollController;
use App\Http\Controllers\Api\VoteController;
use Illuminate\Support\Facades\Route;

// Public routes
Route::post('/auth/login', [AuthController::class, 'login']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/auth/logout', [AuthController::class, 'logout']);
    Route::get('/auth/me', [AuthController::class, 'me']);

    // Polls
    Route::get('/polls', [PollController::class, 'index']);
    Route::post('/polls', [PollController::class, 'store']);
    Route::get('/polls/{id}', [PollController::class, 'show']);
    Route::delete('/polls/{id}', [PollController::class, 'destroy']);

    // Voting
    Route::post('/polls/{pollId}/vote', [VoteController::class, 'vote']);
    Route::delete('/polls/{pollId}/vote', [VoteController::class, 'removeVote']);
});
