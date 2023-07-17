<?php

namespace App\Http\Controllers;

use App\Models\BudgetDepense;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class BudgetDepenseController extends Controller
{
    public function addBudget(Request $request){
        $request->validate([
            'famille' => 'required|exists:familles,id',
            'typedepense' => 'required|exists:typedepenses,id',
            'montant' => 'required|int'
        ]);

        if($request->input('montant') <= 0 ) {
            return response()->json(['message' => 'Veuillez entrer un montant supérieur à 0'], 422);
        }

        $check = BudgetDepense::where('famille_id', $request->input('famille'))
        ->where('typedepense_id', $request->input('typedepense'))
        ->where(DB::raw('EXTRACT(MONTH FROM mois)'), '=', DB::raw('EXTRACT(MONTH FROM NOW())'))
        ->first();

        if($check != null) {
            return response()->json(['message' => 'Vous avez déjà défini le budget pour cette catégorie de ce mois.'], 422);
        }

        $budget = new BudgetDepense();
        $budget->typedepense_id = $request->input('typedepense');
        $budget->famille_id = $request->input('famille');
        $budget->montant = $request->input('montant');
        $budget->mois = Carbon::now();
        $budget->save();
        return response()->json(['message' => 'Budget ajouté'], 201);
    }

    public function getAllBudgetOfTheMonthByFamilleId($famille_id){
        $budgets = DB::select("SELECT * from v_budget_par_categorie_par_mois WHERE EXTRACT('month' FROM mois) = EXTRACT('month' FROM now()) AND famille_id = ?", [$famille_id]);
        return response()->json(['message' => 'Budgets récupérés avec succés','budgets' => $budgets], 201);
    }
}
