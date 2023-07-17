<?php

namespace App\Http\Controllers;

use App\Models\BudgetDepense;
use App\Models\Depense;
use App\Models\TypeDepense;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DepenseController extends Controller
{
    public function getTotalDepenseParMois($famille_id){
        $data = DB::select('SELECT * FROM v_total_depense_par_mois WHERE famille_id = ?',[$famille_id]);
        return response()->json(['depenses' => $data], 200);
    }

    public function getTotalDepenseDuMois($famille_id){
        $data = DB::select('SELECT * FROM v_total_depense_du_mois WHERE famille_id = ?',[$famille_id]);
        return response()->json(['depense' => $data], 200);
    }

    public function getAllTypeDepense() {
        $data = TypeDepense::all();
        return response()->json(['typedepenses' => $data], 200);
    }

    public function createDepense(Request $request) {
        $request->validate([
            'famille' => 'required|exists:familles,id',
            'membre' => 'required|exists:membres,id',
            'type' => 'required|exists:typedepenses,id',
            'montant' => 'required|int',
            'libelle' => 'required|string',
            'date' => 'required|date'
        ]);

        if($request->input('montant') <= 0 ) {
            return response()->json(['message' => 'Veuillez entrer un montant supérieur à 0'], 422);
        }

        $budgets = DB::select("SELECT * from v_budget_par_categorie_par_mois WHERE typedepense_id = ? AND EXTRACT('month' FROM mois) = EXTRACT('month' FROM ?::timestamp) AND famille_id = ?", [$request->input('type'), $request->input('date'), $request->input('famille')]);

        $typedepense = TypeDepense::find($request->input('type'));

        if($budgets[0]->reste_budget < $request->input('montant')){
            $depense = new Depense();
            $depense->famille_id = $request->input('famille');
            $depense->membre_id = $request->input('membre');
            $depense->typedepense_id = $request->input('type');
            $depense->montant = $request->input('montant');
            $depense->libelle = $request->input('libelle');
            $depense->date_depense = $request->input('date');
            $depense->save();
            return response()->json(['message' => 'Vous dépassez le budget pour la catégorie '.$typedepense->nom], 202);
        }

        $depense = new Depense();
        $depense->famille_id = $request->input('famille');
        $depense->membre_id = $request->input('membre');
        $depense->typedepense_id = $request->input('type');
        $depense->montant = $request->input('montant');
        $depense->libelle = $request->input('libelle');
        $depense->date_depense = $request->input('date');
        $depense->save();

        return response()->json(['message' => 'Nouvelle dépense enregistrée.'], 201);

    }
}
