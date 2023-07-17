<?php

namespace App\Http\Controllers;

use App\Models\Revenu;
use App\Models\TypeRevenu;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class RevenuController extends Controller
{
    public function getTotalRevenuParMois($famille_id){
        $data = DB::select('SELECT * FROM v_total_revenu_par_mois WHERE famille_id = ?',[$famille_id]);
        return response()->json(['revenus' => $data], 200);
    }

    public function getTotalRevenuDuMois($famille_id){
        $data = DB::select('SELECT * FROM v_total_revenu_du_mois WHERE famille_id = ?',[$famille_id]);
        return response()->json(['revenu' => $data], 200);
    }
    public function getAllTypeRevenu() {
        $data = TypeRevenu::all();
        return response()->json(['typerevenus' => $data], 200);
    }

    public function createRevenu(Request $request) {
        $request->validate([
            'famille' => 'required|exists:familles,id',
            'membre' => 'required|exists:membres,id',
            'type' => 'required|exists:typerevenus,id',
            'montant' => 'required|int',
            'libelle' => 'required|string',
            'date' => 'required|date'
        ]);

        if($request->input('montant') <= 0 ) {
            return response()->json(['message' => 'Veuillez entrer un montant supérieur à 0'], 422);
        }

        $revenu = new Revenu();
        $revenu->famille_id = $request->input('famille');
        $revenu->membre_id = $request->input('membre');
        $revenu->typerevenu_id = $request->input('type');
        $revenu->montant = $request->input('montant');
        $revenu->libelle = $request->input('libelle');
        $revenu->date_revenu = $request->input('date');
        $revenu->save();

        return response()->json(['message' => 'Nouveau revenu enregistré.'], 201);

    }

}
