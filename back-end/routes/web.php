<?php

use App\Http\Controllers\DepenseController;
use App\Http\Controllers\FamilleController;
use App\Http\Controllers\MembreController;
use App\Http\Controllers\RevenuController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\SexeController;
use App\Http\Controllers\TransactionController;
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
Route::get('/sexes', [SexeController::class, 'getAllSexe']);

Route::post('/familles', [FamilleController::class, 'createFamille']);
Route::post('/membres', [MembreController::class, 'createMembre']);
Route::post('/login', [MembreController::class,'login']);

Route::get('/total-depense-par-mois/{famille_id}', [DepenseController::class, 'getTotalDepenseParMois']);
Route::get('/total-depense-du-mois/{famille_id}', [DepenseController::class, 'getTotalDepenseDuMois']);
Route::get('/typedepenses', [DepenseController::class, 'getAllTypeDepense']);
Route::get('/total-revenu-par-mois/{famille_id}', [RevenuController::class, 'getTotalRevenuParMois']);
Route::get('/total-revenu-du-mois/{famille_id}', [RevenuController::class, 'getTotalRevenuDuMois']);
Route::get('/typerevenus', [RevenuController::class, 'getAllTypeRevenu']);

Route::post('/ajout-depense', [DepenseController::class, 'createDepense']);
Route::post('/ajout-revenu', [RevenuController::class, 'createRevenu']);

Route::get('/membre/{token}', [MembreController::class,'getMembreByToken']);


Route::get('/transactions/{famille_id}',[TransactionController::class,'getAllTransactionByFamilleId']);
Route::get('/caisse/{famille_id}', [FamilleController::class,'getTotalCaisseParFamille']);
