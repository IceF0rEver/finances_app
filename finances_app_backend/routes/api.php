<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SankeyDataController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\UserController;


Route::middleware(['auth:sanctum'])->group(function () {

    Route::prefix('/user')->group(function () {
        Route::get('/', function (Request $request) {return $request->user();});
        Route::patch('/update', [UserController::class, 'update'])->name('update');
    });

    Route::prefix('/sankey')->group(function () {
        Route::get('/', [SankeyDataController::class, 'index']);
        Route::post('/', [SankeyDataController::class, 'store']);
        Route::delete('/', [SankeyDataController::class, 'destroy']);
        Route::patch('/update', [SankeyDataController::class, 'update'])->name('update');
    });
    
    Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout');
});

Route::middleware('guest')->group(function () {

    Route::post('/register', [RegisteredUserController::class, 'store'])->name('register');

    Route::post('/login', [AuthenticatedSessionController::class, 'store'])->name('login');
});