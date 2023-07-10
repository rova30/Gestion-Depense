<?php

namespace App\Http\Controllers;

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
}
