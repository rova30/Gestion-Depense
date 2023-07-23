<?php

namespace App\Http\Controllers;

use App\Models\Famille;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class FamilleController extends Controller
{
    public function createFamille(Request $request)
    {
        $request->validate([
            'nom' => 'required|string|max:50',
            'responsable' => 'required|string|max:50'
        ]);

        $famille = new Famille();
        $famille->nom = $request->input('nom');
        $famille->responsable = $request->input('responsable');
        $famille->save();
        return response()->json(['famille' => $famille], 201);
    }

    public function getFamilleById($famille_id) {
        $famille = Famille::find($famille_id);
        return response()->json(['famille' => $famille], 201);
    }

    public function getTotalCaisseParFamille($famille_id){
        $caisse = DB::select("SELECT * FROM v_total_en_caisse_par_famille WHERE famille_id = ?", [$famille_id]);
        return response()->json(['message' => 'Caisse récupérée avec succès', 'caisse' => $caisse], 201);
    }
}
