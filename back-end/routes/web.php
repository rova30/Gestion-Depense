<?php

use App\Http\Controllers\FamilleController;
use App\Http\Controllers\MembreController;
use App\Http\Controllers\RoleController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/roles', [RoleController::class, 'getAllRole']);

Route::post('/familles', [FamilleController::class, 'createFamille']);
Route::post('/membres', [MembreController::class, 'createMembre']);
