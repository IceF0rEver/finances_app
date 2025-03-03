<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\UserController;


Route::middleware(['auth:sanctum'])->group(function () {

    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::patch('/user/update', [UserController::class, 'update'])
    ->name('update');

    Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])
    ->name('logout');
});

Route::middleware('guest')->group(function () {

    Route::post('/register', [RegisteredUserController::class, 'store'])
    ->name('register');

    Route::post('/login', [AuthenticatedSessionController::class, 'store'])
    ->name('login');
});