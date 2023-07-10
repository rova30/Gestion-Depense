<?php

namespace App\Http\Controllers;

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
}
