<?php

use App\Http\Controllers\Api\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::prefix('users')
    ->controller(AuthController::class)
    ->group(function () {
        Route::get('/', 'userDetails');
        Route::post('register', 'register');
        Route::post('login', 'login');
        Route::post('email-verify', 'emailVerify');
        // Route::post('verify-email', 'verifyEmail');
        Route::post('email-verification', 'verifyEmail');
        Route::post('forgot-password', 'forgotPassword');
        Route::post('change-password', 'changePassword');
    });
