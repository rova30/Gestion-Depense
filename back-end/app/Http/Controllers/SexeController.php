<?php

namespace App\Http\Controllers;

use App\Models\Sexe;
use Illuminate\Http\Request;

class SexeController extends Controller
{
    public function getAllSexe()
    {
        $sexes = Sexe::all();

        return response()->json(['sexes' => $sexes], 200);
    }
}
