<?php

namespace App\Http\Controllers;

use App\Models\Famille;
use Illuminate\Http\Request;

class FamilleController extends Controller
{
    public function createFamille(Request $request)
    {
        $request->validate([
            'nom' => 'required|string|max:255',
        ]);

        $famille = new Famille();
        $famille->nom = $request->input('nom');
        $famille->save();
        return response()->json(['message' => 'Famille créée avec succès', 'famille' => $famille], 201);
    }
}
